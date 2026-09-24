import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Brain,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { ExamPrepPack, StudentLevel, LanguageCode } from '../types';

interface ExamPrepProps {
  studentLevel: StudentLevel;
  language: LanguageCode;
  onStudyLogged?: (minutes: number) => void;
}

const PRESET_EXAMS = [
  { subject: 'Organic Chemistry II', type: 'Final Exam', topics: 'Reaction mechanisms, NMR spectroscopy, synthesis trees' },
  { subject: 'Calculus III (Multivariable)', type: 'Midterm', topics: 'Partial derivatives, Lagrange multipliers, double integrals' },
  { subject: 'Computer Architecture', type: 'Final Exam', topics: 'Pipelining hazards, cache memory mapping, branch prediction' },
  { subject: 'MCAT Biological Foundations', type: 'MCAT / USMLE', topics: 'Amino acid properties, enzyme kinetics, cellular respiration' },
];

export const ExamPrep: React.FC<ExamPrepProps> = ({
  studentLevel,
  language,
  onStudyLogged,
}) => {
  const [subject, setSubject] = useState('Organic Chemistry II');
  const [examType, setExamType] = useState('Final Exam');
  const [topics, setTopics] = useState('');
  const [difficulty, setDifficulty] = useState('Advanced / University');
  const [loading, setLoading] = useState(false);
  const [prepPack, setPrepPack] = useState<ExamPrepPack | null>(null);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [studentAnswers, setStudentAnswers] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (overrideSub?: string, overrideType?: string, overrideTopics?: string) => {
    const sub = overrideSub || subject;
    const type = overrideType || examType;
    const top = overrideTopics || topics;

    if (!sub.trim()) return;

    setLoading(true);
    setRevealedSolutions({});
    setStudentAnswers({});

    try {
      const res = await fetch('/api/exam-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: sub,
          examType: type,
          topics: top,
          difficulty,
          language,
        }),
      });

      const data = await res.json();
      setPrepPack(data);
      if (onStudyLogged) onStudyLogged(15);
    } catch (err) {
      console.error(err);
      alert('Could not generate exam prep pack.');
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (p: typeof PRESET_EXAMS[0]) => {
    setSubject(p.subject);
    setExamType(p.type);
    setTopics(p.topics);
    handleGenerate(p.subject, p.type, p.topics);
  };

  const copyExamPack = () => {
    if (!prepPack) return;
    let text = `# ${prepPack.examTitle}\n\n`;
    text += `Overview: ${prepPack.overview}\nTime: ${prepPack.timeAllocationMinutes} min\n\n`;
    text += `## Practice Questions\n`;
    prepPack.practiceQuestions.forEach((q, i) => {
      text += `### Question ${i + 1} (${q.marks} Marks)\n${q.question}\n\nRubric: ${q.rubric}\n\nModel Solution: ${q.idealAnswer}\n\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Configuration Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Exam Preparation & High-Yield Practice</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Simulated exam questions with professor rubrics, shortcuts, and night-before cheat sheets
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap">Try Exam:</span>
            {PRESET_EXAMS.map((p, i) => (
              <button
                key={i}
                onClick={() => applyPreset(p)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-medium transition whitespace-nowrap border border-slate-200/60"
              >
                {p.subject.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subject / Course
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Molecular Genetics, Macroeconomics, Physics II"
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 text-sm outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Exam Target
            </label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 text-sm outline-none font-medium"
            >
              <option value="Final Exam">University Final Exam</option>
              <option value="Midterm">Midterm Examination</option>
              <option value="AP Exam">AP Exam (CollegeBoard)</option>
              <option value="SAT / ACT">SAT / ACT</option>
              <option value="GRE / GMAT">GRE / GMAT</option>
              <option value="MCAT / USMLE">MCAT / USMLE</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Difficulty Rigor
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 text-sm outline-none font-medium"
            >
              <option value="Standard">Standard Curriculum</option>
              <option value="Advanced / University">Advanced University Standard</option>
              <option value="Honors / Ivy League">Honors / Ivy League / High-Cutoff</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Specific High-Yield Focus Topics (Optional)
            </label>
            <input
              type="text"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="e.g. Chapter 4-7, Reaction mechanisms, Thermodynamic free energy"
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-rose-500 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={() => handleGenerate()}
            disabled={!subject.trim() || loading}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{loading ? 'Building Exam Pack...' : 'Generate Exam Readiness Pack'}</span>
          </button>
        </div>
      </div>

      {/* Generated Exam Pack View */}
      {prepPack && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 text-xs font-semibold mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Suggested Duration: {prepPack.timeAllocationMinutes} Minutes</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{prepPack.examTitle}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{prepPack.overview}</p>
            </div>

            <button
              onClick={copyExamPack}
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition self-start"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy All'}</span>
            </button>
          </div>

          {/* Formulas Cheat Sheet Ribbon */}
          {prepPack.cheatSheetFormulas && prepPack.cheatSheetFormulas.length > 0 && (
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Essential Exam Formulas & Identifications:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {prepPack.cheatSheetFormulas.map((formula, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-lg border border-indigo-100 font-mono text-xs text-indigo-950">
                    {formula}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practice Questions */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Exam Simulation Questions
            </h4>

            {prepPack.practiceQuestions.map((q, idx) => {
              const isRevealed = revealedSolutions[idx];
              return (
                <div key={q.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-xs font-bold shrink-0 mt-0.5">
                        Q{idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-semibold text-slate-500">[{q.marks} Marks • {q.type}]</span>
                        <h5 className="text-sm sm:text-base font-bold text-slate-900 mt-1">{q.question}</h5>
                      </div>
                    </div>
                  </div>

                  {/* Student Scratchpad / Answer input */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Your Draft Answer / Working:
                    </label>
                    <textarea
                      rows={3}
                      value={studentAnswers[idx] || ''}
                      onChange={(e) => setStudentAnswers({ ...studentAnswers, [idx]: e.target.value })}
                      placeholder="Write your answer or derivation here before revealing the professor rubric..."
                      className="w-full p-3 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:border-rose-500 outline-none leading-relaxed"
                    />
                  </div>

                  {/* Reveal Rubric and Solution Button */}
                  <div className="flex items-center justify-between pt-1">
                    {q.mnemonicOrShortcut && (
                      <span className="text-xs text-indigo-600 font-medium flex items-center gap-1">
                        <Brain className="w-3.5 h-3.5 text-indigo-500" />
                        Shortcut: {q.mnemonicOrShortcut}
                      </span>
                    )}

                    <button
                      onClick={() => setRevealedSolutions({ ...revealedSolutions, [idx]: !isRevealed })}
                      className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-rose-300 text-slate-700 text-xs font-semibold transition flex items-center gap-1 ml-auto"
                    >
                      <span>{isRevealed ? 'Hide Model Rubric' : 'Grade with Official Rubric'}</span>
                    </button>
                  </div>

                  {/* Rubric and Ideal Answer */}
                  {isRevealed && (
                    <div className="mt-3 p-4 rounded-xl bg-white border border-emerald-200 space-y-3 animate-in fade-in">
                      <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 text-xs text-emerald-950">
                        <span className="font-bold text-emerald-800 block mb-1">📋 Examiner Scoring Rubric:</span>
                        <p>{q.rubric}</p>
                      </div>

                      <div className="text-xs space-y-1">
                        <span className="font-bold text-slate-900 block">✨ Full-Points Model Solution:</span>
                        <div className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs leading-relaxed whitespace-pre-wrap">
                          {q.idealAnswer}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Night Before Exam Tips */}
          {prepPack.nightBeforeTips && prepPack.nightBeforeTips.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs space-y-1.5">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Night Before Exam Checklist:
              </span>
              <ul className="list-disc list-inside space-y-1 text-amber-900/90 pl-1">
                {prepPack.nightBeforeTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
