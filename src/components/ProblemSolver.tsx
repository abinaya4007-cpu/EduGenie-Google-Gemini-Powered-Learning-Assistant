import React, { useState } from 'react';
import {
  Calculator,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { ProblemSolution, StudentLevel, LanguageCode } from '../types';

interface ProblemSolverProps {
  studentLevel: StudentLevel;
  language: LanguageCode;
  onProblemSolved?: () => void;
}

const PRESET_PROBLEMS = [
  {
    subject: 'Physics Mechanics',
    problem:
      'A cannonball is launched from a 45m high cliff with an initial velocity of 20 m/s at an angle of 30° above the horizontal. Assuming g = 9.8 m/s² and negligible air resistance, find the total time of flight and the horizontal range where it lands.',
  },
  {
    subject: 'Calculus',
    problem:
      'Evaluate the definite integral from 0 to π of x * sin(x) dx using integration by parts, and show all intermediate antiderivative steps.',
  },
  {
    subject: 'Chemistry',
    problem:
      'For the reaction 2Al + 3Cl2 -> 2AlCl3, if 54g of aluminum reacts with 142g of chlorine gas, identify the limiting reactant and calculate the theoretical mass of aluminum chloride produced (Molar masses: Al = 27 g/mol, Cl2 = 71 g/mol, AlCl3 = 133.5 g/mol).',
  },
  {
    subject: 'Computer Science',
    problem:
      'Solve the recurrence relation T(n) = 2T(n/2) + O(n log n) using the Master Theorem or recursion tree method, and express the tight asymptotic Big-O bound.',
  },
];

export const ProblemSolver: React.FC<ProblemSolverProps> = ({
  studentLevel,
  language,
  onProblemSolved,
}) => {
  const [problemText, setProblemText] = useState('');
  const [subject, setSubject] = useState('Physics');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<ProblemSolution | null>(null);
  const [showPracticeAnswer, setShowPracticeAnswer] = useState(false);
  const [copied, setCopied] = useState(false);

  // Optional image state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      const base64 = result.split(',')[1];
      setImageBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSolve = async (overrideText?: string, overrideSub?: string) => {
    const text = overrideText || problemText;
    const sub = overrideSub || subject;

    if (!text.trim() && !imageBase64) return;

    setLoading(true);
    setShowPracticeAnswer(false);

    try {
      const res = await fetch('/api/solve-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemText: text,
          subject: sub,
          studentLevel,
          language,
          imageMimeType,
          imageBase64,
        }),
      });

      const data = await res.json();
      setSolution(data);
      if (onProblemSolved) onProblemSolved();
    } catch (err) {
      console.error(err);
      alert('Could not solve problem. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (p: typeof PRESET_PROBLEMS[0]) => {
    setProblemText(p.problem);
    setSubject(p.subject);
    setImagePreview(null);
    setImageBase64(null);
    handleSolve(p.problem, p.subject);
  };

  const copySolution = () => {
    if (!solution) return;
    let text = `# Solution: ${solution.problemSummary}\n\n`;
    text += `## Governing Equations\n` + solution.formulasAndTheorems.join('\n') + '\n\n';
    text += `## Steps\n`;
    solution.steps.forEach((s) => {
      text += `### Step ${s.stepNumber}: ${s.title}\n${s.explanation}\nWork: ${s.work}\n\n`;
    });
    text += `## Final Answer\n${solution.finalAnswer}\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Input Form */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Step-by-Step Problem Solver</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Rigorous derivation, theorem justification, and error-proofing for STEM coursework
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap">Try Example:</span>
            {PRESET_PROBLEMS.map((p, i) => (
              <button
                key={i}
                onClick={() => applyPreset(p)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-violet-50 hover:text-violet-700 text-slate-600 font-medium transition whitespace-nowrap border border-slate-200/60"
              >
                {p.subject.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-3">
            <textarea
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              rows={4}
              placeholder="Paste or type any math, physics, chemistry, or programming problem..."
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-violet-500 text-sm outline-none resize-none font-medium leading-relaxed"
            />
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold outline-none"
              >
                <option value="Physics">Physics Mechanics</option>
                <option value="Calculus">Calculus / Analysis</option>
                <option value="Linear Algebra">Linear Algebra</option>
                <option value="Chemistry">Chemistry & Stoichiometry</option>
                <option value="Computer Science">Computer Science & Algorithms</option>
                <option value="Statistics">Statistics & Probability</option>
              </select>
            </div>

            {/* Image Upload Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Attach Problem Photo
              </label>
              <label className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-dashed border-slate-300 hover:border-violet-500 bg-slate-50 text-slate-600 text-xs font-medium cursor-pointer transition">
                <Upload className="w-3.5 h-3.5 text-violet-600" />
                <span className="truncate">{imagePreview ? 'Photo attached' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Image Preview Banner */}
        {imagePreview && (
          <div className="flex items-center gap-3 p-3 bg-violet-50/70 border border-violet-200 rounded-xl">
            <img src={imagePreview} alt="Problem preview" className="w-12 h-12 object-cover rounded-lg border" />
            <div className="flex-1 text-xs">
              <span className="font-bold text-violet-900 block">Problem image attached</span>
              <span className="text-violet-700">EduGenie will analyze the equation or diagram</span>
            </div>
            <button
              onClick={() => {
                setImagePreview(null);
                setImageBase64(null);
              }}
              className="text-xs text-rose-600 font-semibold hover:underline"
            >
              Remove
            </button>
          </div>
        )}

        <div className="flex justify-end pt-1">
          <button
            onClick={() => handleSolve()}
            disabled={(!problemText.trim() && !imageBase64) || loading}
            className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{loading ? 'Solving Step-by-Step...' : 'Solve Problem'}</span>
          </button>
        </div>
      </div>

      {/* Solution Display */}
      {solution && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-violet-100 text-violet-800">
                {solution.subject}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1.5">{solution.problemSummary}</h3>
            </div>

            <button
              onClick={copySolution}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition self-start"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Solution'}</span>
            </button>
          </div>

          {/* Given & Formulas Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Given Variables & Constants:
              </span>
              <ul className="text-xs text-slate-700 space-y-1 font-mono">
                {solution.givenVariables.map((v, i) => (
                  <li key={i}>• {v}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                Key Equations & Theorems:
              </span>
              <ul className="text-xs text-indigo-950 space-y-1 font-mono">
                {solution.formulasAndTheorems.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step-by-Step Derivation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Detailed Derivation Steps
            </h4>

            {solution.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 relative pl-12"
              >
                <div className="absolute left-3 top-4 w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
                  {step.stepNumber}
                </div>
                <h5 className="text-sm font-bold text-slate-900">{step.title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{step.explanation}</p>
                {step.work && (
                  <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
                    {step.work}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final Boxed Answer */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider opacity-90 block">
              Final Boxed Answer
            </span>
            <div className="text-lg sm:text-xl font-black font-mono tracking-wide">
              {solution.finalAnswer}
            </div>
          </div>

          {/* Common Pitfalls Warning */}
          {solution.pitfallsToAvoid && solution.pitfallsToAvoid.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Common Student Mistakes & Exam Traps:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-rose-800/90 pl-1">
                {solution.pitfallsToAvoid.map((pit, i) => (
                  <li key={i}>{pit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Similar Practice Problem */}
          {solution.similarPracticeProblem && (
            <div className="p-5 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Try a Similar Practice Problem Now
                </span>
                <button
                  onClick={() => setShowPracticeAnswer(!showPracticeAnswer)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                >
                  {showPracticeAnswer ? 'Hide Solution' : 'Reveal Solution'}
                </button>
              </div>

              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                {solution.similarPracticeProblem.problem}
              </p>

              {solution.similarPracticeProblem.hint && (
                <p className="text-[11px] text-slate-500 italic">
                  💡 Hint: {solution.similarPracticeProblem.hint}
                </p>
              )}

              {showPracticeAnswer && (
                <div className="p-3 rounded-lg bg-white border border-indigo-200 text-xs font-mono text-indigo-950 mt-2">
                  <span className="font-bold block mb-1">Answer:</span>
                  {solution.similarPracticeProblem.answer}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
