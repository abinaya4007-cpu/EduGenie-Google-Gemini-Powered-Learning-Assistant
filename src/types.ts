export type StudentLevel =
  | 'High School'
  | 'Undergraduate / College'
  | 'Graduate / Med / Law / Eng'
  | 'Self-Learner';

export type LanguageCode =
  | 'English'
  | 'Spanish'
  | 'French'
  | 'German'
  | 'Hindi'
  | 'Mandarin'
  | 'Japanese'
  | 'Portuguese'
  | 'Arabic';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface DailyMilestone {
  day: number;
  title: string;
  focus: string;
  keyConcepts: string[];
  actionTasks: string[];
  estimatedMinutes: number;
  reviewCheck: string;
}

export interface StudyPlan {
  id: string;
  title: string;
  topic: string;
  overview: string;
  studentLevel: string;
  totalEstimatedHours: number;
  dailyMilestones: DailyMilestone[];
  highYieldTips: string[];
  recommendedResources: string[];
  createdAt: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'mcq' | 'tf';
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint: string;
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  questions: QuizQuestion[];
  createdAt: string;
}

export interface QuizResult {
  id: string;
  quizTitle: string;
  topic: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
  userAnswers: number[];
}

export interface ProblemStep {
  stepNumber: number;
  title: string;
  explanation: string;
  work: string;
}

export interface ProblemSolution {
  problemSummary: string;
  subject: string;
  givenVariables: string[];
  formulasAndTheorems: string[];
  steps: ProblemStep[];
  finalAnswer: string;
  pitfallsToAvoid: string[];
  similarPracticeProblem?: {
    problem: string;
    hint: string;
    answer: string;
  };
}

export interface CornellCue {
  cue: string;
  notes: string;
}

export interface Flashcard {
  front: string;
  back: string;
  difficulty: string;
}

export interface VocabularyTerm {
  term: string;
  definition: string;
}

export interface SmartNote {
  id: string;
  title: string;
  format: 'cornell' | 'bullet' | 'flashcards' | 'brief' | 'mindmap';
  executiveSummary: string;
  cornellCues?: CornellCue[];
  keyTakeaways: string[];
  vocabularyGlossary: VocabularyTerm[];
  flashcards: Flashcard[];
  reviewExamQuestions: string[];
  createdAt: string;
  originalText?: string;
}

export interface ExamPracticeQuestion {
  id: number;
  question: string;
  marks: number;
  type: string;
  rubric: string;
  idealAnswer: string;
  mnemonicOrShortcut: string;
}

export interface ExamPrepPack {
  examTitle: string;
  timeAllocationMinutes: number;
  difficulty: string;
  overview: string;
  practiceQuestions: ExamPracticeQuestion[];
  cheatSheetFormulas: string[];
  nightBeforeTips: string[];
}

export interface LearningHistoryItem {
  id: string;
  topic: string;
  question: string;
  timestamp: string;
  dateFormatted: string;
  category?: string;
  messages?: ChatMessage[];
  summary?: string;
}

export interface UserStats {
  studyMinutes: number;
  quizzesTaken: number;
  averageScore: number;
  streakDays: number;
  problemsSolved: number;
  notesSaved: number;
  completedTasks: Record<string, boolean>; // key: `${planId}-${day}-${taskIndex}`
}
