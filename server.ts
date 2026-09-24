import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));

// Shared Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for safe JSON parsing
function cleanAndParseJson<T>(rawText: string, fallback: T): T {
  try {
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }
    return JSON.parse(cleaned.trim()) as T;
  } catch (err) {
    console.error('Failed to parse Gemini JSON output:', err, rawText);
    return fallback;
  }
}

// 1. AI Chat Tutor Endpoint
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history = [], studentLevel = 'Undergraduate / College', tutorStyle = 'Socratic Tutor', language = 'English' } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const systemInstruction = `You are "EduGenie", an intelligent, empathetic, and inspiring Google Gemini-powered learning assistant designed to support students in understanding academic topics through interactive AI-based learning.
Target Student Level: ${studentLevel}
Tutor Personality: ${tutorStyle} (Options: Socratic Tutor = guides with insightful questions, Simple Explainer = analogies and ELI5 clarity, Detailed Professor = rigorous academic depth with derivations, Quick Exam Prep = high-yield summary and exam-ready tricks).
Output Language: Respond entirely in ${language}.

Core Objectives:
- Act as an educational learning assistant.
- Give clear and accurate explanations using student-friendly language.
- Answer academic questions directly and support intuitive understanding.
- Support follow-up questions gracefully (e.g., "Explain it more simply", "Explain like I'm 5", "Give another example", "How does this apply to calculus?").
- Avoid unnecessarily complicated explanations or jargon without defining them.

Educational Formatting Guidelines:
When explaining a new academic topic, concept, or answering an open academic question, organize the response in a clean, structured educational format using clear Markdown headers when appropriate:
### 📖 Explanation
A clear, student-friendly explanation tailored to their level.

### 📌 Important Points
Key takeaways, core mechanisms, or numbered bullet points.

### 💡 Example
A concrete real-world analogy, step-by-step calculation, or application.

### 🔑 Key Terms
Concise definitions of 2-3 essential terms or formulas.

CRITICAL INSTRUCTION:
Do NOT force these sections when they are not relevant (for instance, when replying to a simple clarification, a brief follow-up like "Explain it more simply", a greeting, or answering a short specific calculation). When a conversational or simpler answer is needed, deliver a direct, lucid, student-friendly explanation without artificial boilerplate.`;

    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    // Append previous dialogue
    for (const h of history.slice(-8)) {
      if (h.role && h.content) {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }],
        });
      }
    }

    // Current message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I could not generate a response. Please try asking again!';
    res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: error.message || 'Error communicating with Gemini AI',
      reply: "I'm having a brief connection hitch. Please verify your GEMINI_API_KEY in the Secrets panel or try again in a moment.",
    });
  }
});

// 2. Personalized Study Plan Generator
app.post('/api/study-plan', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      topic,
      studentLevel = 'Undergraduate / College',
      targetGoal = 'Master core concepts and ace exam',
      hoursPerDay = 2,
      durationDays = 7,
      learningStyle = 'Practical / Application-driven',
      language = 'English',
    } = req.body;

    if (!topic) {
      res.status(400).json({ error: 'Topic is required' });
      return;
    }

    const prompt = `Create a highly structured, personalized ${durationDays}-day study plan for a student studying "${topic}".
Student Level: ${studentLevel}
Target Goal: ${targetGoal}
Study time available: ${hoursPerDay} hours per day
Preferred Learning Style: ${learningStyle}
Respond in language: ${language}

Generate a valid JSON object matching this schema:
{
  "title": "Clear catchy title for the plan",
  "topic": "${topic}",
  "overview": "2-3 sentence overview of the roadmap and philosophy",
  "studentLevel": "${studentLevel}",
  "totalEstimatedHours": number,
  "dailyMilestones": [
    {
      "day": number,
      "title": "Theme of this day",
      "focus": "Core focus",
      "keyConcepts": ["Concept 1", "Concept 2", "Concept 3"],
      "actionTasks": [
        "Read or watch specific topic",
        "Hands-on exercise / problem set",
        "Self-testing prompt"
      ],
      "estimatedMinutes": number,
      "reviewCheck": "Quick self-check question to verify retention"
    }
  ],
  "highYieldTips": ["Tip 1", "Tip 2", "Tip 3"],
  "recommendedResources": ["Resource 1", "Resource 2"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJson(response.text || '{}', {
      title: `${topic} Accelerated Mastery Plan`,
      topic,
      overview: `A structured ${durationDays}-day personalized schedule tailored for ${studentLevel} learners.`,
      studentLevel,
      totalEstimatedHours: Number(hoursPerDay) * Number(durationDays),
      dailyMilestones: Array.from({ length: Number(durationDays) }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1}: Foundational Core of ${topic}`,
        focus: `Deep dive into key concepts`,
        keyConcepts: ['Fundamental definitions', 'Core formulas & principles', 'Application methods'],
        actionTasks: ['Review lecture notes', 'Work through 3 sample problems', 'Write 5 flashcards'],
        estimatedMinutes: Number(hoursPerDay) * 60,
        reviewCheck: 'Can you explain the main mechanism in under 60 seconds?',
      })),
      highYieldTips: ['Use spaced repetition every 48 hours', 'Teach concepts aloud to verify mastery', 'Practice under timed conditions'],
      recommendedResources: ['Official course textbook', 'MIT OpenCourseWare / Khan Academy lectures'],
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/study-plan:', error);
    res.status(500).json({ error: error.message || 'Failed to generate study plan' });
  }
});

// 3. AI Quiz Generator
app.post('/api/generate-quiz', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      topic,
      studentLevel = 'Undergraduate / College',
      numQuestions = 5,
      difficulty = 'Medium',
      questionType = 'mixed', // 'mcq', 'tf', 'mixed'
      notesContent = '',
      language = 'English',
    } = req.body;

    const sourceContext = notesContent ? `Use the following notes as the primary source:\n"""${notesContent.slice(0, 4000)}"""\n` : '';

    const prompt = `Generate an interactive quiz on "${topic}".
${sourceContext}
Student Level: ${studentLevel}
Difficulty: ${difficulty}
Number of questions: ${numQuestions}
Language: ${language}

Output JSON strictly conforming to this schema:
{
  "title": "Catchy Quiz Title",
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": 1,
      "question": "Question text here",
      "type": "mcq", // or "tf" for True/False
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0, // 0-based index of correct option
      "explanation": "Clear, instructive explanation of why this is correct and why other distractors are wrong",
      "hint": "Subtle clue to guide the student without giving it away"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJson(response.text || '{}', {
      title: `${topic} Knowledge Check`,
      topic,
      difficulty,
      questions: [
        {
          id: 1,
          question: `Which of the following is a central principle of ${topic}?`,
          type: 'mcq',
          options: ['Conservation of Energy', 'Linear Superposition', 'Feedback Regulation', 'System Equilibrium'],
          correctAnswerIndex: 0,
          explanation: 'This fundamental theorem forms the backbone of the subject.',
          hint: 'Think about conservation laws.',
        },
      ],
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/generate-quiz:', error);
    res.status(500).json({ error: error.message || 'Failed to generate quiz' });
  }
});

// 4. Step-by-Step Problem Solver
app.post('/api/solve-problem', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      problemText,
      subject = 'General STEM',
      studentLevel = 'Undergraduate / College',
      language = 'English',
      imageMimeType,
      imageBase64,
    } = req.body;

    if (!problemText && !imageBase64) {
      res.status(400).json({ error: 'Problem statement or image is required' });
      return;
    }

    const promptText = `Solve this academic problem step-by-step for a ${studentLevel} student.
Subject: ${subject}
Language: ${language}
Problem: ${problemText || 'Analyze the provided image problem.'}

Return JSON with this exact schema:
{
  "problemSummary": "Precise statement of what needs to be solved",
  "subject": "${subject}",
  "givenVariables": ["Variable 1 = Value", "Variable 2 = Value"],
  "formulasAndTheorems": ["Formula 1", "Relevant Theorem"],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Short title of step",
      "explanation": "Clear prose explanation of reasoning",
      "work": "Mathematical or logical derivation"
    }
  ],
  "finalAnswer": "Boxed final result with proper units",
  "pitfallsToAvoid": ["Common student mistake 1", "Common mistake 2"],
  "similarPracticeProblem": {
    "problem": "A similar problem for the student to practice right now",
    "hint": "Helpful hint",
    "answer": "Solution to check their work"
  }
}`;

    const parts: any[] = [];
    if (imageBase64 && imageMimeType) {
      parts.push({
        inlineData: {
          mimeType: imageMimeType,
          data: imageBase64,
        },
      });
    }
    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: parts.length > 1 ? { parts } : promptText,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJson(response.text || '{}', {
      problemSummary: problemText || 'Uploaded problem',
      subject,
      givenVariables: ['Given values parsed from problem statement'],
      formulasAndTheorems: ['Standard governing equation'],
      steps: [
        {
          stepNumber: 1,
          title: 'Identify Governing Principles',
          explanation: 'Establish reference frame and list assumptions.',
          work: 'State equation and boundary conditions',
        },
      ],
      finalAnswer: 'Solution derived successfully.',
      pitfallsToAvoid: ['Ensure consistent units', 'Do not forget sign conventions'],
      similarPracticeProblem: {
        problem: 'Try solving with the initial velocity doubled.',
        hint: 'Use the quadratic relation between velocity and displacement.',
        answer: 'Result scales by a factor of 4.',
      },
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/solve-problem:', error);
    res.status(500).json({ error: error.message || 'Failed to solve problem' });
  }
});

// 5. Smart Notes and Summarization
app.post('/api/summarize-notes', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      content,
      format = 'cornell', // 'cornell', 'bullet', 'flashcards', 'brief', 'mindmap'
      studentLevel = 'Undergraduate / College',
      language = 'English',
    } = req.body;

    if (!content) {
      res.status(400).json({ error: 'Content is required' });
      return;
    }

    const prompt = `Analyze and transform the following study material into high-yield educational notes.
Format Style: ${format} (options: cornell = cues, notes, summary; bullet = hierarchical bullet points; flashcards = spaced repetition QA; brief = 3-minute executive brief; mindmap = structured nested concept map)
Student Level: ${studentLevel}
Language: ${language}

Material:
"""
${content.slice(0, 12000)}
"""

Return JSON strictly matching:
{
  "title": "Concise Descriptive Title",
  "format": "${format}",
  "executiveSummary": "2-3 sentence core distillation",
  "cornellCues": [
    {
      "cue": "Key Question / Prompt / Keyword",
      "notes": "Detailed notes and explanation corresponding to the cue"
    }
  ],
  "keyTakeaways": ["Point 1", "Point 2", "Point 3", "Point 4"],
  "vocabularyGlossary": [
    {
      "term": "Jargon / Concept",
      "definition": "Clear concise definition with context"
    }
  ],
  "flashcards": [
    {
      "front": "Question or prompt for active recall",
      "back": "Clear concise answer",
      "difficulty": "Easy" // or Medium / Hard
    }
  ],
  "reviewExamQuestions": ["Potential exam question 1", "Potential exam question 2"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJson(response.text || '{}', {
      title: 'Smart Study Notes',
      format,
      executiveSummary: 'Synthesized study material focusing on high-yield exam takeaways.',
      cornellCues: [
        {
          cue: 'Core Mechanism',
          notes: 'Detailed examination of the fundamental principle.',
        },
      ],
      keyTakeaways: ['Primary rule of operation', 'Key formula variables', 'Application in real systems'],
      vocabularyGlossary: [{ term: 'Hypothesis', definition: 'A testable prediction about how things work.' }],
      flashcards: [{ front: 'What is the central concept?', back: 'The core mechanism discussed in notes.', difficulty: 'Easy' }],
      reviewExamQuestions: ['How does this principle apply under non-ideal conditions?'],
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/summarize-notes:', error);
    res.status(500).json({ error: error.message || 'Failed to summarize notes' });
  }
});

// 6. Document Upload Analysis & Q&A
app.post('/api/analyze-doc', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      fileName = 'UploadedDocument.txt',
      textContent,
      analysisType = 'summary', // 'summary', 'questions', 'cheatsheet', 'qa'
      userQuestion = '',
      language = 'English',
    } = req.body;

    if (!textContent) {
      res.status(400).json({ error: 'Document text content is required' });
      return;
    }

    let instruction = '';
    if (analysisType === 'qa') {
      instruction = `Answer this student's question specifically based on the document text: "${userQuestion}".
If the answer is in the document, quote or cite the relevant part. If not directly mentioned, state so and synthesize with sound academic knowledge.`;
    } else if (analysisType === 'cheatsheet') {
      instruction = `Create a high-density "1-Page Exam Cheat Sheet" from this document:
- Crucial formulas & definitions
- Key dates, authors, or theorems
- Quick mental models & mnemonics
- Top 5 things most likely to appear on an exam`;
    } else if (analysisType === 'questions') {
      instruction = `Generate 5 realistic exam practice questions with model answers based directly on this text.`;
    } else {
      instruction = `Provide a comprehensive breakdown:
1. Executive Abstract (3-4 sentences)
2. Main Themes & Sections
3. Critical Findings or Theorems
4. Study Recommendations`;
    }

    const prompt = `Document Name: ${fileName}
Language: ${language}

Task:
${instruction}

Document Content:
"""
${textContent.slice(0, 15000)}
"""`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      },
    });

    res.json({
      fileName,
      analysisType,
      result: response.text || 'No output generated.',
    });
  } catch (error: any) {
    console.error('Error in /api/analyze-doc:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze document' });
  }
});

// 7. Exam Preparation and Practice Questions
app.post('/api/exam-prep', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      subject,
      examType = 'Final Exam', // 'Midterm', 'Final Exam', 'SAT / ACT', 'GRE / GMAT', 'MCAT / USMLE', 'AP Exam'
      topics = '',
      difficulty = 'Advanced',
      language = 'English',
    } = req.body;

    const prompt = `You are a university exam creator. Construct an intensive Exam Readiness & Practice Pack.
Subject: ${subject}
Exam Type: ${examType}
Topics: ${topics || 'Comprehensive core curriculum'}
Difficulty: ${difficulty}
Language: ${language}

Return JSON with:
{
  "examTitle": "${subject} ${examType} High-Yield Practice",
  "timeAllocationMinutes": number,
  "difficulty": "${difficulty}",
  "overview": "Advice on how to approach this exam section",
  "practiceQuestions": [
    {
      "id": 1,
      "question": "Question scenario or problem",
      "marks": number,
      "type": "Free Response" or "Multiple Choice",
      "rubric": "What examiners look for to award full points",
      "idealAnswer": "Complete model solution",
      "mnemonicOrShortcut": "Helpful mental shortcut or memory aid"
    }
  ],
  "cheatSheetFormulas": ["Formula / Key Rule 1", "Formula 2"],
  "nightBeforeTips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJson(response.text || '{}', {
      examTitle: `${subject} Practice Pack`,
      timeAllocationMinutes: 45,
      difficulty,
      overview: 'Focus on time management and clear intermediate steps.',
      practiceQuestions: [
        {
          id: 1,
          question: `Explain and evaluate the core mechanism of ${subject}.`,
          marks: 10,
          type: 'Free Response',
          rubric: 'Clear definition (3 pts), working example (4 pts), limitation discussion (3 pts).',
          idealAnswer: 'A comprehensive answer covering all points.',
          mnemonicOrShortcut: 'Use the PEEL structure (Point, Evidence, Explain, Link).',
        },
      ],
      cheatSheetFormulas: ['Key Theorem 1', 'Fundamental Identity 2'],
      nightBeforeTips: ['Get 8 hours of sleep', 'Do light recall without opening new textbooks', 'Prepare stationary & calculator'],
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/exam-prep:', error);
    res.status(500).json({ error: error.message || 'Failed to generate exam prep' });
  }
});

// Vite middleware for dev or static files for prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduGenie server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
