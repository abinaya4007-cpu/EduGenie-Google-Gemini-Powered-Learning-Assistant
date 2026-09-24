import React, { useState, useRef } from 'react';
import {
  Sparkles,
  MessageSquare,
  Calendar,
  FileText,
  HelpCircle,
  Calculator,
  FileSearch,
  Award,
  BarChart3,
  ArrowRight,
  Flame,
  Clock,
  BookOpen,
  Zap,
  GraduationCap,
  Lightbulb,
  CheckCircle2,
  Compass,
  Layers,
  ArrowDownCircle,
} from 'lucide-react';
import { StudentLevel, LanguageCode, UserStats, StudyPlan, LearningHistoryItem } from '../types';

interface HeroHomeProps {
  setActiveTab: (tab: string) => void;
  studentLevel: StudentLevel;
  language: LanguageCode;
  stats: UserStats;
  savedPlans: StudyPlan[];
  learningHistory: LearningHistoryItem[];
  onQuickQuery: (query: string) => void;
  onToggleTask: (planId: string, day: number, taskIndex: number) => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({
  setActiveTab,
  studentLevel,
  language,
  stats,
  savedPlans,
  learningHistory,
  onQuickQuery,
  onToggleTask,
}) => {
  const [topicInput, setTopicInput] = useState('');
  const dashboardRef = useRef<HTMLDivElement>(null);

  const demoQuestions = [
    { text: 'Explain Artificial Intelligence.', category: 'Computer Science' },
    { text: "What is Newton's Third Law?", category: 'Physics' },
    { text: 'Explain photosynthesis.', category: 'Biology' },
    { text: 'What is machine learning?', category: 'Data Science' },
  ];

  const handleGetStarted = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
    const inputEl = document.getElementById('main-topic-input');
    if (inputEl) {
      setTimeout(() => inputEl.focus(), 300);
    }
  };

  const handleAskEduGenie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;
    onQuickQuery(topicInput.trim());
    setActiveTab('chat');
  };

  const handleDemoClick = (questionText: string) => {
    onQuickQuery(questionText);
    setActiveTab('chat');
  };

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Enter Any Topic or Question',
      desc: 'Type an academic concept, homework question, or formula into EduGenie in plain language.',
      icon: MessageSquare,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      step: '02',
      title: 'Google Gemini Adapts to You',
      desc: 'Our Gemini AI tunes the explanation specifically for your study level and native language.',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      step: '03',
      title: 'Master with Structured Sections',
      desc: 'Absorb the material through clean Explanation, Important Points, Examples, and Key Terms.',
      icon: Layers,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      step: '04',
      title: 'Test Retention & Practice',
      desc: 'Ask follow-ups, generate instant quizzes, or convert explanations into Cornell study notes.',
      icon: HelpCircle,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
  ];

  const featureCards = [
    {
      id: 'chat',
      title: 'AI Learning Assistant',
      desc: 'Interactive chat tutor answering academic questions with structured explanations, examples, and follow-ups.',
      icon: MessageSquare,
      color: 'from-blue-600 to-indigo-600',
      badge: 'Core Assistant',
    },
    {
      id: 'plan',
      title: 'Personalized Study Plans',
      desc: 'Generate day-by-day milestone roadmaps tailored to your exam target, hours available, and learning style.',
      icon: Calendar,
      color: 'from-indigo-600 to-purple-600',
      badge: 'Goal-Oriented',
    },
    {
      id: 'notes',
      title: 'Smart Notes & Summarization',
      desc: 'Condense lectures into Cornell notes, summary bullet points, and active-recall flashcard decks.',
      icon: FileText,
      color: 'from-emerald-600 to-teal-600',
      badge: 'Cornell Style',
    },
    {
      id: 'quiz',
      title: 'AI Quiz Generator',
      desc: 'Instant interactive quizzes with detailed answer rationales, hints, score tracking, and feedback.',
      icon: HelpCircle,
      color: 'from-amber-500 to-orange-600',
      badge: 'Interactive',
    },
    {
      id: 'solver',
      title: 'Step-by-Step Problem Solver',
      desc: 'Break down complex math, physics, and chemistry problems with intermediate derivations and pitfalls.',
      icon: Calculator,
      color: 'from-violet-600 to-fuchsia-600',
      badge: 'STEM Rigor',
    },
    {
      id: 'docs',
      title: 'Document & PDF Analysis',
      desc: 'Upload or paste syllabi and textbooks to extract high-yield cheat sheets, key concepts, and sample tests.',
      icon: FileSearch,
      color: 'from-cyan-600 to-blue-600',
      badge: 'Document AI',
    },
    {
      id: 'exam',
      title: 'Exam Prep & Practice',
      desc: 'Targeted midterm and finals practice questions with grading rubrics, memory mnemonics, and cheat sheets.',
      icon: Award,
      color: 'from-rose-500 to-pink-600',
      badge: 'High Yield',
    },
    {
      id: 'dashboard',
      title: 'Learning Progress Dashboard',
      desc: 'Track study streaks, total study minutes, quiz mastery trends, and completed curriculum tasks.',
      icon: BarChart3,
      color: 'from-slate-700 to-slate-900',
      badge: 'Analytics',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. LANDING PAGE HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-8 sm:p-14 shadow-2xl border border-indigo-800/40">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Logo & Subtitle Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold backdrop-blur-md">
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-400 to-indigo-400 flex items-center justify-center text-slate-950">
              <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
            </div>
            <span className="font-semibold text-amber-300">EduGenie</span>
            <span className="text-slate-400">•</span>
            <span>Google Gemini Powered Learning Assistant</span>
          </div>

          {/* Project Name & Hero Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Meet <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-indigo-200 bg-clip-text text-transparent">EduGenie</span>
          </h1>

          <p className="text-lg sm:text-xl font-medium text-indigo-100/90 leading-snug">
            Google Gemini Powered Learning Assistant
          </p>

          {/* Short Description */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Learn, understand and explore academic topics with your AI-powered learning assistant. Get student-friendly explanations, step derivations, personalized study schedules, and interactive self-quizzing.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleGetStarted}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all transform hover:-translate-y-0.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition backdrop-blur-md"
            >
              About EduGenie
            </button>
          </div>
        </div>
      </section>

      {/* 2. STUDENT DASHBOARD SECTION */}
      <section ref={dashboardRef} id="student-dashboard" className="space-y-6 pt-2">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          {/* Welcome Message */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">👋</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Welcome to Your Student Dashboard
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Personalized for <span className="font-semibold text-indigo-600">{studentLevel}</span> studies in <span className="font-semibold text-indigo-600">{language}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{stats.streakDays} Day Streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>{stats.studyMinutes}m Studied</span>
              </div>
            </div>
          </div>

          {/* Main Question / Topic Input Box & "Ask EduGenie" Button */}
          <form onSubmit={handleAskEduGenie} className="mt-6 space-y-4">
            <div>
              <label htmlFor="main-topic-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                What topic or academic question would you like to learn today?
              </label>
              <div className="relative flex flex-col sm:flex-row items-stretch gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                  </div>
                  <input
                    id="main-topic-input"
                    type="text"
                    value={topicInput}
                    onChange={(e) => setTopicInput(e.target.value)}
                    placeholder="Enter an academic question or topic (e.g., Explain photosynthesis, Newton's laws, DNA replication)..."
                    className="w-full py-4 pl-12 pr-4 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 text-sm sm:text-base outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!topicInput.trim()}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Ask EduGenie</span>
                </button>
              </div>
            </div>

            {/* DEMO CONTENT: Example Questions */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Try an example question (click to ask immediately):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {demoQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDemoClick(q.text)}
                    className="group text-left p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/80 border border-slate-200/80 hover:border-indigo-300 transition-all text-xs font-medium text-slate-700 hover:text-indigo-700 flex flex-col justify-between"
                  >
                    <span className="font-semibold text-slate-800 group-hover:text-indigo-700 mb-1">
                      "{q.text}"
                    </span>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 group-hover:text-indigo-500 mt-1">
                      <span>{q.category}</span>
                      <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Recent Learning Questions */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                Recent Learning Questions
              </h3>
              <button
                onClick={() => setActiveTab('history')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1"
              >
                <span>View My Learning History ({learningHistory.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {learningHistory.length === 0 ? (
              <div className="text-xs text-slate-400 py-3 italic">
                No recent questions yet. Enter a topic above to begin!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {learningHistory.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleDemoClick(item.question)}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/70 hover:border-indigo-300 cursor-pointer transition flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-0.5 overflow-hidden">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="font-semibold text-indigo-600">{item.category || 'Topic'}</span>
                        <span>•</span>
                        <span>{item.dateFormatted}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 truncate group-hover:text-indigo-700">
                        {item.question}
                      </p>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-200 shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">How EduGenie Works</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            From confusing academic concept to crystal-clear mastery in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {howItWorksSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${step.color} border flex items-center justify-center font-bold`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-extrabold text-slate-200">{step.step}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Comprehensive Academic Features
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything college students need to understand lectures, solve problems, and prepare for exams
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('about')}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition flex items-center gap-1.5 shadow-2xs"
            >
              <span>🔑 10 Key Features (PPT Slide View)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600">
              8 AI Modules
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureCards.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveTab(feat.id)}
                className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${feat.color} text-white flex items-center justify-center shadow-md shadow-indigo-500/10 group-hover:scale-105 transition`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
                  <span>Open {feat.title}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
