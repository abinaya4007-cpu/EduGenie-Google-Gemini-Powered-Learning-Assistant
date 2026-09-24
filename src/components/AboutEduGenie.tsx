import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  BrainCircuit,
  MessageSquare,
  Award,
  Layers,
  CheckCircle2,
  ArrowRight,
  Globe2,
  Presentation,
  Copy,
  Check,
  Cpu,
  Smartphone,
  Server,
  FileText,
  HelpCircle,
  Compass,
} from 'lucide-react';

interface AboutEduGenieProps {
  onGetStarted: () => void;
  onOpenPresentation?: () => void;
}

export const KEY_FEATURES_PPT = [
  {
    number: '01',
    title: 'AI-Powered Question Answering',
    description: 'Ask academic & general knowledge questions and receive smart, concise answers using Google Gemini AI.',
    icon: MessageSquare,
    tag: 'Gemini AI',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    number: '02',
    title: 'Simplified Concept Explanation',
    description: 'Uses lightweight LaMini-Flan-T5 to convert complex concepts into simple, readable explanations.',
    icon: Sparkles,
    tag: 'LaMini-Flan-T5',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  {
    number: '03',
    title: 'Automatic Quiz Generation',
    description: 'Creates 3 multiple-choice questions with 4 options each and verified answers for self-testing.',
    icon: HelpCircle,
    tag: '3 MCQs • 4 Options',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  {
    number: '04',
    title: 'Intelligent Summarization',
    description: 'Uses Generative AI to convert lengthy passages into short, meaningful summaries for fast revision.',
    icon: FileText,
    tag: 'Generative AI',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    number: '05',
    title: 'Personalized Learning Recommendations',
    description: 'Creates structured learning paths starting from beginner concepts and progressing to advanced topics.',
    icon: Compass,
    tag: 'Adaptive Paths',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
  {
    number: '06',
    title: 'Learning Resources & Guidance',
    description: 'Curates videos, articles, books, and educational resources along with step-by-step guidance.',
    icon: BookOpen,
    tag: 'Curated Resources',
    color: 'bg-teal-50 text-teal-600 border-teal-200',
  },
  {
    number: '07',
    title: 'Modular AI Architecture',
    description: 'Divided into independent modules (Q&A, Explain, Quiz, Summary, Learn) for clean maintainability.',
    icon: Layers,
    tag: '5 Modules',
    color: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  {
    number: '08',
    title: 'FastAPI Backend',
    description: 'RESTful API endpoints (/qa, /explain, /quiz, /summarize, /learn) linking UI with AI pipelines.',
    icon: Server,
    tag: 'FastAPI REST',
    color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
  },
  {
    number: '09',
    title: 'Simple Web Interface',
    description: 'Clean HTML & CSS frontend with task selection menu, input prompt area, and instant result display.',
    icon: Smartphone,
    tag: 'HTML & CSS',
    color: 'bg-orange-50 text-orange-600 border-orange-200',
  },
  {
    number: '10',
    title: 'Lightweight & Accessible',
    description: 'Combines lightweight local AI (LaMini) with cloud AI (Gemini) for high efficiency on any device.',
    icon: Award,
    tag: 'Hybrid Edge/Cloud',
    color: 'bg-violet-50 text-violet-600 border-violet-200',
  },
];

export const AboutEduGenie: React.FC<AboutEduGenieProps> = ({ onGetStarted, onOpenPresentation }) => {
  const [copiedPpt, setCopiedPpt] = useState(false);

  const pptText = `### 🔑 Key Features of EduGenie (College AI Project)

1. AI-Powered Question Answering – Allows students to ask academic and general knowledge questions and receive smart, concise, and context-aware answers using Google Gemini AI.
2. Simplified Concept Explanation – The Explanation Module uses the lightweight LaMini-Flan-T5 model to convert complex educational concepts into simple, readable explanations.
3. Automatic Quiz Generation – Generates quizzes from any topic with 3 multiple-choice questions, 4 options each, and verified answers to help students test understanding.
4. Intelligent Summarization – Uses Generative AI to convert lengthy educational passages into short, meaningful summaries for fast exam revision.
5. Personalized Learning Recommendations – Creates structured learning roadmaps starting from beginner-level concepts and progressing toward advanced topics.
6. Learning Resources and Guidance – Provides curated study suggestions (videos, articles, books) alongside step-by-step learning guidance.
7. Modular AI Architecture – Divided into 5 independent modules (Q&A, Explanation, Quiz, Summary, Learning Path) for clean maintainability and easy extension.
8. FastAPI Backend – Connects the frontend with AI modules through RESTful endpoints: /qa, /explain, /quiz, /summarize, and /learn/recommendations.
9. Simple Web Interface – Modern HTML and CSS interface with task selection, clean input area, submit button, and instant result display.
10. Lightweight and Accessible – Combines local AI (LaMini-Flan-T5) with cloud AI (Gemini), enabling smooth operation on low-resource devices.`;

  const handleCopyPpt = () => {
    navigator.clipboard.writeText(pptText);
    setCopiedPpt(true);
    setTimeout(() => setCopiedPpt(false), 2500);
  };
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Google Gemini Powered Learning Assistant</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About EduGenie
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          EduGenie is a Google Gemini-powered learning assistant designed to support students in understanding academic topics through interactive AI-based learning.
        </p>
      </div>

      {/* Mission & Purpose Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
            <p className="text-xs text-slate-500">Democratizing world-class personal tutoring for every student</p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          Academic topics often feel overwhelming when taught in rigid, one-size-fits-all formats. EduGenie bridges this gap by acting as an empathetic, always-available study tutor that meets students exactly where they are—whether you're tackling high school biology, collegiate differential equations, or graduate-level research topics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
            <div className="text-indigo-600 font-bold text-sm mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Student-Centric
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides intuitive explanations, step-by-step proofs, and everyday analogies that turn confusing jargon into clear knowledge.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
            <div className="text-indigo-600 font-bold text-sm mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Adaptive Depth
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adjusts vocabulary and rigor in real-time according to your academic level: High School, College, or Graduate.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60">
            <div className="text-indigo-600 font-bold text-sm mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active Retention
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reinforces comprehension through structured sections: Explanation, Important Points, Examples, and Key Terms.
            </p>
          </div>
        </div>
      </div>

      {/* Powered by Google Gemini */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">How Google Gemini Powers EduGenie</h2>
              <p className="text-xs text-indigo-200">Advanced multimodal intelligence designed for academic excellence</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            EduGenie harnesses Google's state-of-the-art Gemini 3.8 Flash model. Gemini's advanced reasoning allows EduGenie to follow multi-turn dialogue, break down complex calculus and organic chemistry derivations, generate interactive quizzes with rubrics, and deliver culturally fluent multilingual support.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="font-bold text-amber-300 text-sm mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure Server-Side Architecture
              </div>
              <p className="text-xs text-slate-300">
                All Gemini API calls are securely proxied server-side. No sensitive API keys or credentials are ever exposed in client-side code.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="font-bold text-amber-300 text-sm mb-1 flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-blue-300" /> Global Multilingual Reach
              </div>
              <p className="text-xs text-slate-300">
                Learn concepts fluently in 9 international languages including English, Spanish, French, German, Hindi, Mandarin, Japanese, Portuguese, and Arabic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Educational Response Standard */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">The EduGenie Response Standard</h2>
            <p className="text-xs text-slate-500">Engineered for readability, clarity, and memory consolidation</p>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Unlike generic chat engines that dump walls of text, EduGenie formats answers using proven pedagogical structures:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-sm font-bold text-indigo-700 mb-1">📖 1. Explanation</div>
            <p className="text-xs text-slate-600">
              A foundational, crystal-clear explanation crafted in student-friendly terms that builds understanding from first principles.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-sm font-bold text-indigo-700 mb-1">📌 2. Important Points</div>
            <p className="text-xs text-slate-600">
              Essential takeaways, logical progressions, and rules organized in scannable bullet points for rapid review.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-sm font-bold text-indigo-700 mb-1">💡 3. Example</div>
            <p className="text-xs text-slate-600">
              A relatable real-world example, thought experiment, or worked-out problem showing how the concept functions in practice.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="text-sm font-bold text-indigo-700 mb-1">🔑 4. Key Terms</div>
            <p className="text-xs text-slate-600">
              High-yield vocabulary and scientific nomenclature defined clearly so you speak the academic language with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* 🔑 Key Features of EduGenie (PPT-Friendly Presentation Format) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
              <Presentation className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🔑</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Key Features of EduGenie
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                10 architectural & pedagogical capabilities in a presentation-ready format
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {onOpenPresentation && (
              <button
                onClick={onOpenPresentation}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
              >
                <Presentation className="w-4 h-4 text-amber-300" />
                <span>Open 23-Slide PPT Deck</span>
              </button>
            )}
            <button
              onClick={handleCopyPpt}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 text-xs font-semibold flex items-center gap-2 transition shadow-2xs"
              title="Copy PPT-friendly text for slides"
            >
              {copiedPpt ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy for PPT / Slides</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 10 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {KEY_FEATURES_PPT.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.number}
                className="group p-4 rounded-2xl bg-slate-50/80 hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-300 transition-all flex items-start gap-3.5"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${feat.color} border flex items-center justify-center shrink-0 font-bold shadow-2xs`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700 tracking-wide">
                      {feat.number}. {feat.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-500 group-hover:text-indigo-600 transition">
                      {feat.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl p-8 border border-indigo-100 space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Ready to master your next academic challenge?
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Start asking questions now and experience intelligent, personalized tutoring tailored just for you.
        </p>
        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition"
        >
          <span>Ask EduGenie a Question</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
