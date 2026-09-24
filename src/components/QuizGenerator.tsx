import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  Flame,
  Check,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Quiz, QuizQuestion, QuizResult, StudentLevel, LanguageCode } from '../types';

interface QuizGeneratorProps {
  studentLevel: StudentLevel;
  language: LanguageCode;
  onRecordResult: (result: QuizResult) => void;
  notesContext?: string;
}

const PRESET_QUIZ_TOPICS = [
  'Calculus Derivatives & Integrals',
  'Cell Biology & Organelles',
  'Algorithms: Sorting & Big-O Notation',
  'Organic Chemistry Functional Groups',
  'Newtonian Physics & Work-Energy',
];

export const QuizGenerator: React.FC<QuizGeneratorProps> = ({
  studentLevel,
  language,
  onRecordResult,
  notesContext = '',
}) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'University'>('Medium');
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  // Quiz running state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    let timer: any;
    if (quiz && !quizSubmitted) {
      timer = setInterval(() => setSecondsElapsed((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [quiz, quizSubmitted]);

  const handleGenerateQuiz = async (overrideTopic?: string) => {
    const selectedTopic = overrideTopic || topic;
    if (!selectedTopic.trim()) return;

    setLoading(true);
    setQuizSubmitted(false);
    setUserAnswers({});
    setShowExplanations({});
    setShowHints({});
    setSecondsElapsed(0);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic,
          studentLevel,
          numQuestions,
          difficulty,
          notesContent: notesContext,
          language,
        }),
      });

      const data = await res.json();
      const newQuiz: Quiz = {
        id: `quiz-${Date.now()}`,
        title: data.title || `${selectedTopic} Knowledge Check`,
        topic: selectedTopic,
        difficulty: data.difficulty || difficulty,
        questions: data.questions || [],
        createdAt: new Date().toISOString(),
      };

      setQuiz(newQuiz);
    } catch (err) {
      console.error(err);
      alert('Could not generate quiz. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const calculateScore = () => {
    if (!quiz) return { correct: 0, total: 0, percentage: 0 };
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        correct++;
      }
    });
    const total = quiz.questions.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, total, percentage };
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    setQuizSubmitted(true);
    const { correct, total, percentage } = calculateScore();

    // Trigger celebration confetti if passed with high score
    if (percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Record result
    const result: QuizResult = {
      id: `result-${Date.now()}`,
      quizTitle: quiz.title,
      topic: quiz.topic,
      difficulty: quiz.difficulty,
      score: correct,
      totalQuestions: total,
      percentage,
      date: new Date().toISOString(),
      userAnswers: quiz.questions.map((_, i) => userAnswers[i] ?? -1),
    };

    onRecordResult(result);
  };

  const scoreInfo = calculateScore();
  const allAnswered = quiz ? Object.keys(userAnswers).length === quiz.questions.length : false;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Generator Form */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Interactive AI Quiz Generator</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Active recall testing adapted for <span className="font-semibold text-amber-600">{studentLevel}</span>
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap">Try Topic:</span>
            {PRESET_QUIZ_TOPICS.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setTopic(p);
                  handleGenerateQuiz(p);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-600 font-medium transition whitespace-nowrap border border-slate-200/60"
              >
                {p.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subject / Topic to Test
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Organic Chemistry Stereochemistry, Calculus Limits, World War II"
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 text-sm outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-500 text-sm outline-none font-medium"
            >
              <option value="Easy">Easy (Conceptual Recall)</option>
              <option value="Medium">Medium (Application)</option>
              <option value="Hard">Hard (Synthesis / Multi-step)</option>
              <option value="University">University / Graduate Exam</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600">Question Count:</span>
            {[3, 5, 10].map((num) => (
              <button
                key={num}
                onClick={() => setNumQuestions(num)}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  numQuestions === num
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {num} Qs
              </button>
            ))}
          </div>

          <button
            onClick={() => handleGenerateQuiz()}
            disabled={!topic.trim() || loading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>{loading ? 'Generating Quiz...' : 'Start Quiz'}</span>
          </button>
        </div>
      </div>

      {/* Active Quiz Runner */}
      {quiz && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          {/* Quiz Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                  {quiz.difficulty}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{quiz.title}</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Topic: {quiz.topic}</p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  {Math.floor(secondsElapsed / 60)}:{(secondsElapsed % 60).toString().padStart(2, '0')}
                </span>
              </div>
              <div className="font-semibold text-slate-500">
                {Object.keys(userAnswers).length} / {quiz.questions.length} Answered
              </div>
            </div>
          </div>

          {/* Quiz Score Summary Banner (Shown when submitted) */}
          {quizSubmitted && (
            <div
              className={`p-6 rounded-2xl text-center space-y-3 ${
                scoreInfo.percentage >= 80
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white'
                  : scoreInfo.percentage >= 50
                  ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                  : 'bg-gradient-to-br from-rose-500 to-pink-700 text-white'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-2xl font-black">
                {scoreInfo.percentage >= 80 ? 'Mastery Achieved! 🎉' : scoreInfo.percentage >= 50 ? 'Good Effort! 👍' : 'Needs Review! 📚'}
              </h4>
              <p className="text-sm opacity-90">
                You scored <span className="font-extrabold">{scoreInfo.correct}</span> out of{' '}
                <span className="font-extrabold">{scoreInfo.total}</span> ({scoreInfo.percentage}%) in{' '}
                {Math.floor(secondsElapsed / 60)}m {secondsElapsed % 60}s.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setUserAnswers({});
                    setSecondsElapsed(0);
                  }}
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-white/90 transition shadow-sm flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={() => handleGenerateQuiz()}
                  className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition border border-white/30"
                >
                  Generate Similar Quiz
                </button>
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-6">
            {quiz.questions.map((q, qIndex) => {
              const selectedOpt = userAnswers[qIndex];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctAnswerIndex;
              const showExp = quizSubmitted || showExplanations[qIndex];
              const showHint = showHints[qIndex];

              return (
                <div
                  key={q.id || qIndex}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
                >
                  {/* Question Prompt */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {qIndex + 1}
                      </span>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    {/* Hint Toggle */}
                    {q.hint && !quizSubmitted && (
                      <button
                        onClick={() => setShowHints((prev) => ({ ...prev, [qIndex]: !prev[qIndex] }))}
                        className="text-xs text-amber-600 hover:text-amber-700 flex items-center gap-1 shrink-0 px-2 py-1 rounded-md bg-amber-50 border border-amber-200/60"
                      >
                        <Lightbulb className="w-3 h-3 text-amber-500" />
                        <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
                      </button>
                    )}
                  </div>

                  {/* Hint Reveal */}
                  {showHint && q.hint && !quizSubmitted && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                      <span className="font-bold">Hint: </span>
                      {q.hint}
                    </div>
                  )}

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOpt === optIndex;
                      const isTargetCorrect = optIndex === q.correctAnswerIndex;

                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70';

                      if (quizSubmitted) {
                        if (isTargetCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
                        } else if (isSelected && !isTargetCorrect) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-800';
                        } else {
                          btnStyle = 'bg-white/60 border-slate-200 text-slate-400 opacity-60';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-900 font-semibold shadow-2xs';
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectOption(qIndex, optIndex)}
                          disabled={quizSubmitted}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition flex items-start gap-2.5 ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-current text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className="flex-1 leading-snug">{opt}</span>
                          {quizSubmitted && isTargetCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          {quizSubmitted && isSelected && !isTargetCorrect && (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Post-submit or toggled explanation */}
                  {showExp && q.explanation && (
                    <div className="mt-3 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                      <div className="font-bold flex items-center gap-1 text-indigo-900">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Explanation:</span>
                      </div>
                      <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          {!quizSubmitted && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {allAnswered ? 'All questions answered! Ready to grade.' : 'Answer all questions to submit.'}
              </span>
              <button
                onClick={handleSubmitQuiz}
                disabled={!allAnswered}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
              >
                <span>Submit & Grade Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
