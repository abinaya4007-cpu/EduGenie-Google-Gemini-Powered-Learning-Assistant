import React from 'react';
import {
  BarChart3,
  Flame,
  Clock,
  Award,
  BookOpen,
  CheckCircle2,
  Calendar,
  Zap,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { UserStats, QuizResult, StudyPlan, SmartNote, StudentLevel, LanguageCode } from '../types';

interface ProgressDashboardProps {
  stats: UserStats;
  quizResults: QuizResult[];
  savedPlans: StudyPlan[];
  savedNotes: SmartNote[];
  studentLevel: StudentLevel;
  language: LanguageCode;
  onNavigateTab: (tab: string) => void;
}

const SUBJECT_MASTERY = [
  { subject: 'Computer Science & Algorithms', mastery: 92, color: 'bg-indigo-600', icon: '💻' },
  { subject: 'Calculus & Linear Algebra', mastery: 85, color: 'bg-blue-600', icon: '📐' },
  { subject: 'Cellular Biology & Genetics', mastery: 88, color: 'bg-emerald-600', icon: '🧬' },
  { subject: 'Physics & Thermodynamics', mastery: 74, color: 'bg-violet-600', icon: '⚛️' },
  { subject: 'Organic Chemistry', mastery: 68, color: 'bg-amber-500', icon: '🧪' },
];

const BADGES = [
  { title: 'Streak Champion', desc: '5 consecutive study days', unlocked: true, icon: '🔥' },
  { title: 'Active Recall Ace', desc: 'Scored 80%+ on 3 quizzes', unlocked: true, icon: '🎯' },
  { title: 'Socratic Scholar', desc: 'Asked over 10 tutor questions', unlocked: true, icon: '💡' },
  { title: 'STEM Solver', desc: 'Solved 10+ multi-step derivations', unlocked: true, icon: '⚡' },
  { title: 'Dean’s Honor Roll', desc: 'Complete 3 full study plans', unlocked: false, icon: '🏆' },
];

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  stats,
  quizResults,
  savedPlans,
  savedNotes,
  studentLevel,
  language,
  onNavigateTab,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Dashboard Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Learning Progress & Analytics</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tracking performance milestones for <span className="font-semibold text-indigo-600">{studentLevel}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('quiz')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition shadow-2xs"
          >
            Take New Quiz
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-amber-500">
            <Flame className="w-5 h-5 fill-amber-500" />
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded text-amber-800">
              Active
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.streakDays} Days</div>
          <p className="text-xs text-slate-500">Consecutive Study Streak</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-indigo-600">
            <Clock className="w-5 h-5" />
            <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded text-indigo-700">
              Total
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.studyMinutes}m</div>
          <p className="text-xs text-slate-500">Focused Study Minutes</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-600">
            <Award className="w-5 h-5" />
            <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded text-emerald-800">
              {stats.quizzesTaken} Tests
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.averageScore}%</div>
          <p className="text-xs text-slate-500">Average Quiz Accuracy</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-purple-600">
            <BrainCircuit className="w-5 h-5" />
            <span className="text-[11px] font-bold uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded text-purple-800">
              STEM
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats.problemsSolved}</div>
          <p className="text-xs text-slate-500">Problems Solved</p>
        </div>
      </div>

      {/* Grid: Subject Mastery & Weekly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Mastery */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Estimated Subject Mastery
            </h3>
            <span className="text-xs text-slate-400 font-medium">Based on quizzes & problem sets</span>
          </div>

          <div className="space-y-3.5 pt-1">
            {SUBJECT_MASTERY.map((sub, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-800">
                    <span>{sub.icon}</span>
                    <span>{sub.subject}</span>
                  </span>
                  <span className="text-slate-600 font-bold">{sub.mastery}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${sub.color}`}
                    style={{ width: `${sub.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Academic Milestones & Badges
            </h3>
            <span className="text-xs text-indigo-600 font-semibold">4 / 5 Unlocked</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {BADGES.map((b, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border flex items-center gap-3 transition ${
                  b.unlocked
                    ? 'bg-amber-50/40 border-amber-200/80 text-slate-800'
                    : 'bg-slate-50 border-slate-200 opacity-60 text-slate-400'
                }`}
              >
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <div className="font-bold text-xs">{b.title}</div>
                  <div className="text-[11px] text-slate-500">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Quiz Performance Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" />
            Recent Quiz History
          </h3>
          <button
            onClick={() => onNavigateTab('quiz')}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            Start Another Test
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-y border-slate-100">
              <tr>
                <th className="py-2.5 px-3">Quiz Name</th>
                <th className="py-2.5 px-3">Topic</th>
                <th className="py-2.5 px-3">Difficulty</th>
                <th className="py-2.5 px-3">Score</th>
                <th className="py-2.5 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quizResults.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3 px-3 font-semibold text-slate-800">{r.quizTitle}</td>
                  <td className="py-3 px-3 text-slate-600">{r.topic}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      {r.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold">
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        r.percentage >= 80
                          ? 'bg-emerald-100 text-emerald-800'
                          : r.percentage >= 50
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {r.score}/{r.totalQuestions} ({r.percentage}%)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-400">{new Date(r.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
