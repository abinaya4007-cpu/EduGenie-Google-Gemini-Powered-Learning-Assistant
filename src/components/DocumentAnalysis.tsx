import React, { useState } from 'react';
import {
  FileSearch,
  Upload,
  FileText,
  Sparkles,
  HelpCircle,
  Copy,
  Check,
  Send,
  BookOpen,
  ArrowRight,
  Award,
} from 'lucide-react';
import { marked } from 'marked';
import { StudentLevel, LanguageCode } from '../types';

interface DocumentAnalysisProps {
  studentLevel: StudentLevel;
  language: LanguageCode;
  onSendToQuiz?: (docText: string) => void;
}

const SAMPLE_DOCS = [
  {
    name: 'Enzyme_Kinetics_Lecture_Notes.txt',
    content: `Enzymes act as biological catalysts by lowering the activation energy (Ea) of biochemical reactions without altering the overall thermodynamic equilibrium (ΔG). 
According to the Michaelis-Menten model, reaction velocity is described by:
v = (Vmax * [S]) / (Km + [S])
where Vmax represents maximum velocity at substrate saturation, [S] is substrate concentration, and Km (Michaelis constant) represents the substrate concentration at which the reaction velocity is half of Vmax. A lower Km indicates higher substrate affinity.
Lineweaver-Burk double reciprocal plots linearize this relationship:
1/v = (Km/Vmax) * (1/[S]) + (1/Vmax)
The y-intercept represents 1/Vmax, and the x-intercept represents -1/Km.
Enzyme Inhibition Mechanisms:
1. Competitive Inhibition: Inhibitor resembles the substrate and binds the active site. Km increases (apparent affinity drops), but Vmax remains unchanged because excess substrate overcomes inhibitor competition.
2. Non-competitive Inhibition: Inhibitor binds an allosteric site regardless of whether substrate is bound. Vmax decreases because catalytic efficiency is impaired, while Km remains unchanged.
3. Uncompetitive Inhibition: Inhibitor binds only to the enzyme-substrate (ES) complex. Both Vmax and Km decrease proportionally.`,
  },
  {
    name: 'CS201_Data_Structures_Syllabus.txt',
    content: `Course Title: Data Structures and Algorithmic Analysis (CS201)
Credits: 4.0 | Prerequisites: Intro to Programming (Python/Java/C++)
Course Overview:
This course examines the design, implementation, and empirical analysis of fundamental data structures. Topics include:
Unit 1: Asymptotic Analysis (Big-O, Big-Omega, Big-Theta, Master Theorem, Amortized Analysis).
Unit 2: Linear Data Structures (Linked Lists, Dynamic Arrays, Stacks, Queues, Deques).
Unit 3: Hierarchical Structures (Binary Search Trees, AVL Trees, Red-Black Trees, Heaps and Priority Queues).
Unit 4: Hashing (Hash functions, separate chaining, open addressing with linear and quadratic probing, load factor management).
Unit 5: Graphs (Adjacency Matrix vs List, BFS, DFS, Dijkstra's Single-Source Shortest Path, Prim's and Kruskal's Minimum Spanning Tree).
Grading Breakdown:
- Programming Problem Sets (4 assignments): 30%
- Midterm Examination: 25%
- Final Comprehensive Exam: 35%
- Quizzes & Lab Participation: 10%
Academic Integrity: All code submissions undergo automated moss similarity analysis. Generative AI tools are permitted solely for conceptual explanation, not for direct code generation.`,
  },
];

export const DocumentAnalysis: React.FC<DocumentAnalysisProps> = ({
  studentLevel,
  language,
  onSendToQuiz,
}) => {
  const [fileName, setFileName] = useState('UploadedDocument.txt');
  const [textContent, setTextContent] = useState('');
  const [analysisType, setAnalysisType] = useState<'summary' | 'cheatsheet' | 'questions' | 'qa'>('summary');
  const [userQuestion, setUserQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      setTextContent(text);
      handleAnalyze(file.name, text, analysisType);
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async (fName?: string, content?: string, type?: typeof analysisType) => {
    const activeText = content || textContent;
    const activeName = fName || fileName;
    const activeType = type || analysisType;

    if (!activeText.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/analyze-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: activeName,
          textContent: activeText,
          analysisType: activeType,
          userQuestion,
          language,
        }),
      });

      const data = await res.json();
      setResult(data.result || 'No output.');
    } catch (err) {
      console.error(err);
      alert('Error analyzing document. Please verify connection.');
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (sample: typeof SAMPLE_DOCS[0]) => {
    setFileName(sample.name);
    setTextContent(sample.content);
    handleAnalyze(sample.name, sample.content, analysisType);
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Upload and Configuration Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <FileSearch className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">PDF & Document Analysis</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Extract high-yield insights, generate exam practice, or interrogate lecture slides
            </p>
          </div>

          {/* Sample Doc Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap">Load Sample:</span>
            {SAMPLE_DOCS.map((s, i) => (
              <button
                key={i}
                onClick={() => loadSample(s)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-cyan-50 hover:text-cyan-700 text-slate-600 font-medium transition whitespace-nowrap border border-slate-200/60"
              >
                {s.name.split('_')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Zone or Text Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              rows={6}
              placeholder="Paste document text, research paper abstract, or syllabus content here..."
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-cyan-500 text-sm outline-none resize-none font-medium leading-relaxed"
            />
          </div>

          <div className="space-y-3">
            <label className="flex flex-col items-center justify-center h-full min-h-[140px] rounded-xl border-2 border-dashed border-slate-300 hover:border-cyan-500 bg-slate-50 text-slate-600 cursor-pointer transition p-4 text-center">
              <Upload className="w-6 h-6 text-cyan-600 mb-2" />
              <span className="text-xs font-bold text-slate-800">Upload File (.txt, .md, .pdf)</span>
              <span className="text-[11px] text-slate-400 mt-0.5">Click or drag & drop</span>
              <input
                type="file"
                accept=".txt,.md,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Analysis Type Selection */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'summary', label: 'Structured Summary & Key Sections' },
              { id: 'cheatsheet', label: '1-Page Exam Cheat Sheet' },
              { id: 'questions', label: 'Generate Practice Questions' },
              { id: 'qa', label: 'Ask Specific Question against Document' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setAnalysisType(mode.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  analysisType === mode.id
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Conditional Input if Q&A mode */}
          {analysisType === 'qa' && (
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                placeholder="Ask what this document says about a specific topic..."
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm outline-none focus:bg-white focus:border-cyan-500"
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => handleAnalyze()}
              disabled={!textContent.trim() || loading}
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{loading ? 'Analyzing with Gemini...' : 'Analyze Document'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Result Box */}
      {result && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-600" />
              <h3 className="text-sm font-bold text-slate-900">Analysis Results: {fileName}</h3>
            </div>

            <div className="flex items-center gap-2">
              {onSendToQuiz && (
                <button
                  onClick={() => onSendToQuiz(textContent)}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Create Quiz From This</span>
                </button>
              )}

              <button
                onClick={copyResult}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div
            className="markdown-content prose prose-sm max-w-none text-slate-800 leading-relaxed text-xs sm:text-sm"
            dangerouslySetInnerHTML={{ __html: marked.parse(result) as string }}
          />
        </div>
      )}
    </div>
  );
};
