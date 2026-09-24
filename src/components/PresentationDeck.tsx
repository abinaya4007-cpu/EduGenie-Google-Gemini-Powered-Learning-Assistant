import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  BookOpen,
  GraduationCap,
  Layers,
  Cpu,
  Server,
  Code2,
  HelpCircle,
  Clock,
  ShieldAlert,
  Rocket,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Database,
  Smartphone,
  Award,
  Share2,
  Bot,
  Compass,
  FileText,
  Lightbulb,
  Layout,
  Boxes,
  TrendingUp,
  Zap,
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  content: React.ReactNode;
}

export const PresentationDeck: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  const slides: Slide[] = [
    // Slide 1 - Title
    {
      id: 1,
      title: 'EduGenie',
      subtitle: 'AI-Powered Learning Assistant',
      category: 'Project Title',
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-amber-300 text-sm font-semibold backdrop-blur-md animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Google Gemini & Lightweight AI Powered</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
              EduGenie
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-300 via-indigo-200 to-white bg-clip-text text-transparent">
              AI-Powered Learning Assistant
            </h2>
            <p className="text-base sm:text-xl text-slate-300 max-w-xl mx-auto font-medium">
              A Smart and Personalized Educational Platform for Students
            </p>
          </div>

          {/* AI, Education & Tech Badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg w-full">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <Sparkles className="w-6 h-6 text-amber-300 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">Generative AI</div>
              <div className="text-[10px] text-slate-300">Intelligent Q&A</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <GraduationCap className="w-6 h-6 text-indigo-300 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">Student First</div>
              <div className="text-[10px] text-slate-300">Custom Pathways</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <Server className="w-6 h-6 text-emerald-300 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">FastAPI Stack</div>
              <div className="text-[10px] text-slate-300">High Performance</div>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium pt-2">
            Academic Project Presentation • Department of Computer Science & Engineering
          </div>
        </div>
      ),
    },

    // Slide 2 - Project Overview
    {
      id: 2,
      title: 'Project Overview',
      subtitle: 'What is EduGenie and How Does It Empower Students?',
      category: 'Introduction',
      content: (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-950 font-medium text-sm sm:text-base leading-relaxed">
            <strong>EduGenie</strong> is a lightweight, responsive, AI-powered educational assistant designed to help students master academic concepts effortlessly through state-of-the-art Generative AI.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-indigo-600 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Generative AI Intelligence
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Harnesses advanced Large Language Models (LLMs) to synthesize complex textbook concepts into bite-sized, intuitive lessons.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-indigo-600 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant Academic Q&A
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provides real-time, student-friendly answers without long waits or navigating cluttered ad-heavy search engines.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-indigo-600 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated Quiz Generation
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tests comprehension immediately by generating MCQ assessments with options, explanations, and instant feedback.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="text-indigo-600 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Step-by-Step Learning Paths
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recommends structured roadmaps from <strong>Beginner</strong> to <strong>Advanced</strong> levels with clear timelines.
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 3 - Problem Statement
    {
      id: 3,
      title: 'Problem Statement',
      subtitle: 'Key Learning Challenges Faced by Modern Students',
      category: 'Problem Analysis',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Traditional textbooks and standard online searches leave students frustrated due to five critical academic pain points:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs">
                01
              </div>
              <div>
                <h4 className="text-sm font-bold text-rose-950">Difficulty Understanding Complex Concepts</h4>
                <p className="text-xs text-rose-800/80 mt-0.5">Heavy academic jargon and abstract theorems discourage learners from grasping core intuition.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-xs">
                02
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950">Lack of Personalized Support</h4>
                <p className="text-xs text-amber-800/80 mt-0.5">Classrooms cannot accommodate individual learning speeds; private 1-on-1 tutoring is prohibitively expensive.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 font-bold text-xs">
                03
              </div>
              <div>
                <h4 className="text-sm font-bold text-orange-950">Time-Consuming Revision</h4>
                <p className="text-xs text-orange-800/80 mt-0.5">Students spend hours re-reading 50-page slides rather than practicing high-yield recall questions.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold text-xs">
                04
              </div>
              <div>
                <h4 className="text-sm font-bold text-purple-950">Difficulty Creating Practice Quizzes</h4>
                <p className="text-xs text-purple-800/80 mt-0.5">Students struggle to self-test without objective question banks matching their exact syllabus.</p>
              </div>
            </div>

            <div className="sm:col-span-2 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                05
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-950">Lengthy Content Hard to Revise</h4>
                <p className="text-xs text-blue-800/80 mt-0.5">Exams require high-density summaries and cheat-sheets that students don’t have time to write manually.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 4 - Objectives
    {
      id: 4,
      title: 'Project Objectives',
      subtitle: 'What EduGenie Aims to Achieve',
      category: 'Goals',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">1</div>
            <h4 className="text-sm font-bold text-slate-900">Simplify Complex Concepts</h4>
            <p className="text-xs text-slate-600">Break down tough theorems and formulas using everyday analogies and plain student-friendly terms.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">2</div>
            <h4 className="text-sm font-bold text-slate-900">Provide Instant Answers</h4>
            <p className="text-xs text-slate-600">Eliminate study roadblocks with 24/7 immediate conversational responses powered by Google Gemini AI.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">3</div>
            <h4 className="text-sm font-bold text-slate-900">Generate Practice Quizzes</h4>
            <p className="text-xs text-slate-600">Instantly generate valid 4-option MCQs with explanations to reinforce active recall.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">4</div>
            <h4 className="text-sm font-bold text-slate-900">Summarize Lengthy Content</h4>
            <p className="text-xs text-slate-600">Condense long textbook pages and lecture chapters into structured, high-yield bullet summaries.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">5</div>
            <h4 className="text-sm font-bold text-slate-900">Recommend Learning Paths</h4>
            <p className="text-xs text-slate-600">Structure learning milestones from Beginner to Advanced with practical timeline estimates.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">6</div>
            <h4 className="text-sm font-bold text-slate-900">Accessible & Interactive</h4>
            <p className="text-xs text-slate-600">Provide a frictionless web interface that works on mobile, tablet, and desktop without clutter.</p>
          </div>
        </div>
      ),
    },

    // Slide 5 - Key Features
    {
      id: 5,
      title: 'Key Features of EduGenie',
      subtitle: 'Comprehensive Capabilities of the AI-Powered Learning Assistant',
      category: 'Key Features',
      content: (
        <div className="space-y-3">
          {/* Top Banner with Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-emerald-500/10 border border-indigo-100/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-950">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>Full-Spectrum Academic Support • 10 Core Features Powered by Gemini & LaMini AI</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">
                Gemini AI
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                LaMini-Flan-T5
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-100 text-cyan-800">
                FastAPI
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                HTML/CSS
              </span>
            </div>
          </div>

          {/* 10 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
            {/* 1. AI-Powered Question Answering */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-blue-50/80 to-white border border-blue-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-1.5 py-0.5 rounded">01</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">AI-Powered Q&A</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Allows students to ask academic & general knowledge inquiries and receive smart, concise answers using <strong className="text-blue-700">Google Gemini AI</strong>.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-blue-100/80 text-[10px] text-blue-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" /> Context-Aware AI
              </div>
            </div>

            {/* 2. Simplified Concept Explanation */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-emerald-50/80 to-white border border-emerald-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">02</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">Concept Explanation</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  The Explanation Module uses lightweight <strong className="text-emerald-700">LaMini-Flan-T5</strong> to convert difficult concepts into simple, readable explanations.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-emerald-100/80 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <Cpu className="w-3 h-3 text-emerald-600" /> LaMini-Flan-T5 Model
              </div>
            </div>

            {/* 3. Automatic Quiz Generation */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50/80 to-white border border-amber-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.5 rounded">03</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">Automatic Quiz Generation</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Generates <strong className="text-amber-800">3 multiple-choice questions</strong> with <strong className="text-amber-800">4 options</strong> each and verified answers to test comprehension.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-amber-100/80 text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-amber-600" /> 3 MCQs • 4 Options
              </div>
            </div>

            {/* 4. Intelligent Summarization */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-purple-50/80 to-white border border-purple-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100/80 px-1.5 py-0.5 rounded">04</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">Intelligent Summarization</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Uses <strong className="text-purple-700">Generative AI</strong> to convert lengthy passages into short, meaningful summaries while preserving vital key points.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-purple-100/80 text-[10px] text-purple-700 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3 text-purple-600" /> Fast Exam Revision
              </div>
            </div>

            {/* 5. Personalized Learning Recommendations */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-indigo-50/80 to-white border border-indigo-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-1.5 py-0.5 rounded">05</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">Personalized Pathways</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Creates structured learning roadmaps from <strong className="text-indigo-700">Beginner</strong> foundational basics to <strong className="text-indigo-700">Advanced</strong> topics.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-indigo-100/80 text-[10px] text-indigo-700 font-semibold flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-indigo-600" /> Beginner → Advanced
              </div>
            </div>

            {/* 6. Learning Resources and Guidance */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-teal-50/80 to-white border border-teal-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-100/80 px-1.5 py-0.5 rounded">06</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">Resources & Guidance</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Provides curated study suggestions such as <strong className="text-teal-800">videos, articles, books</strong>, and practical step-by-step guidance.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-teal-100/80 text-[10px] text-teal-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-teal-600" /> Curated Materials
              </div>
            </div>

            {/* 7. Modular AI Architecture */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-slate-100/80 to-white border border-slate-300 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-1.5 py-0.5 rounded">07</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">Modular Architecture</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Divided into 5 independent modules (<strong className="text-slate-800">Q&A, Explain, Quiz, Summary, Learn</strong>) for maintainability and testing.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-slate-200 text-[10px] text-slate-700 font-semibold flex items-center gap-1">
                <Layers className="w-3 h-3 text-slate-600" /> 5 Decoupled Modules
              </div>
            </div>

            {/* 8. FastAPI Backend */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-cyan-50/80 to-white border border-cyan-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    <Server className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-cyan-700 bg-cyan-100/80 px-1.5 py-0.5 rounded">08</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">FastAPI Backend</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Powers REST endpoints: <code className="text-[10px] text-cyan-800 font-bold">/qa</code>, <code className="text-[10px] text-cyan-800 font-bold">/explain</code>, <code className="text-[10px] text-cyan-800 font-bold">/quiz</code>, <code className="text-[10px] text-cyan-800 font-bold">/summarize</code>, <code className="text-[10px] text-cyan-800 font-bold">/learn</code>.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-cyan-100/80 text-[10px] text-cyan-700 font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3 text-cyan-600" /> Async REST Endpoints
              </div>
            </div>

            {/* 9. Simple Web Interface */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-orange-50/80 to-white border border-orange-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    <Layout className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100/80 px-1.5 py-0.5 rounded">09</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">Simple Web Interface</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  The <strong className="text-orange-700">HTML & CSS</strong> frontend provides a task selection menu, prompt input area, submit button, and instant results.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-orange-100/80 text-[10px] text-orange-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-orange-600" /> HTML & CSS UI
              </div>
            </div>

            {/* 10. Lightweight and Accessible */}
            <div className="p-3 rounded-2xl bg-gradient-to-b from-violet-50/80 to-white border border-violet-200/90 shadow-2xs hover:shadow-xs transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-violet-700 bg-violet-100/80 px-1.5 py-0.5 rounded">10</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">Lightweight & Accessible</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Combines local AI (<strong className="text-violet-700">LaMini</strong>) with cloud AI (<strong className="text-violet-700">Gemini</strong>), optimal for devices with limited compute.
                </p>
              </div>
              <div className="mt-2 pt-1.5 border-t border-violet-100/80 text-[10px] text-violet-700 font-semibold flex items-center gap-1">
                <Cpu className="w-3 h-3 text-violet-600" /> Edge + Cloud Hybrid
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 6 - Technologies Used
    {
      id: 6,
      title: 'Technologies Used',
      subtitle: 'Modern, Efficient, & Robust Tech Stack',
      category: 'Tech Stack',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="text-indigo-600 font-bold text-sm flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> Python 3.10+
            </div>
            <p className="text-xs text-slate-600">Core programming language for backend AI workflows and robust typing.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="text-emerald-600 font-bold text-sm flex items-center gap-1.5">
              <Server className="w-4 h-4" /> FastAPI
            </div>
            <p className="text-xs text-slate-600">High-performance async web framework for REST API endpoints and automatic docs.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="text-amber-600 font-bold text-sm flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> HTML5 & CSS3
            </div>
            <p className="text-xs text-slate-600">Modern semantic structure styled with student-friendly responsive utility classes.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="text-purple-600 font-bold text-sm flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> Jinja2
            </div>
            <p className="text-xs text-slate-600">Server-side template engine for dynamic rendering and lightweight state rendering.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="text-cyan-600 font-bold text-sm flex items-center gap-1.5">
              <Rocket className="w-4 h-4" /> Uvicorn
            </div>
            <p className="text-xs text-slate-600">Lightning-fast ASGI web server implementation for async Python concurrency.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="text-blue-600 font-bold text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Google Gemini API
            </div>
            <p className="text-xs text-slate-600">High-reasoning cloud LLM for complex derivations, quizzes, and learning roadmaps.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="text-rose-600 font-bold text-sm flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> LaMini-Flan-T5
            </div>
            <p className="text-xs text-slate-600">Lightweight local instruction-tuned model for fast on-device concept explanations.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
            <div className="text-slate-800 font-bold text-sm flex items-center gap-1.5">
              <Database className="w-4 h-4" /> JSON Schema
            </div>
            <p className="text-xs text-slate-600">Enforces structured output validation for flawless quiz and milestone rendering.</p>
          </div>
        </div>
      ),
    },

    // Slide 7 - System Architecture
    {
      id: 7,
      title: 'System Architecture',
      subtitle: 'End-to-End Modular Architecture Flow',
      category: 'Architecture',
      content: (
        <div className="space-y-4">
          {/* Visual Flow Diagram */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white shadow-md">
            <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">
              Data Flow Pipeline
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-center font-bold">
                👤 Student
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="p-2.5 rounded-xl bg-indigo-900 border border-indigo-700 text-center font-bold text-indigo-200">
                🌐 HTML / CSS UI
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-700 text-center font-bold text-emerald-300">
                ⚡ FastAPI Backend
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-700 text-center font-bold text-amber-300">
                🧩 Specialized Modules
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="p-2.5 rounded-xl bg-purple-950 border border-purple-700 text-center font-bold text-purple-300">
                🧠 Gemini / LaMini AI
              </div>
            </div>
          </div>

          {/* Major Modules Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <div className="text-xs font-bold text-blue-700">Q&A Module</div>
              <div className="text-[11px] text-slate-500 mt-1">Direct inquiries & multi-turn dialogue</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <div className="text-xs font-bold text-indigo-700">Explanation</div>
              <div className="text-[11px] text-slate-500 mt-1">Simplified analogies & concept breakdown</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <div className="text-xs font-bold text-emerald-700">Quiz Module</div>
              <div className="text-[11px] text-slate-500 mt-1">3 MCQs with 4 options & feedback</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <div className="text-xs font-bold text-purple-700">Summary</div>
              <div className="text-[11px] text-slate-500 mt-1">High-yield bullet points & takeaways</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <div className="text-xs font-bold text-amber-700">Learning Path</div>
              <div className="text-[11px] text-slate-500 mt-1">Beginner to Advanced curriculum</div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 8 - Project Workflow
    {
      id: 8,
      title: 'Project Workflow',
      subtitle: '7-Step Sequential Execution Pipeline',
      category: 'Process',
      content: (
        <div className="space-y-2">
          {[
            { step: '1', title: 'User Selects Task', desc: 'Student selects Q&A, Explanation, Quiz, Summary, or Learning Path.' },
            { step: '2', title: 'User Enters Question / Content', desc: 'Inputs academic topic, homework problem, or paste paragraph.' },
            { step: '3', title: 'Frontend Sends Request', desc: 'Browser initiates async REST request with JSON payload to backend.' },
            { step: '4', title: 'FastAPI Processes Request', desc: 'Validates input, checks academic level, and routes to appropriate handler.' },
            { step: '5', title: 'AI Module & Model Selected', desc: 'Selects Google Gemini API (cloud) or LaMini-Flan-T5 (lightweight local).' },
            { step: '6', title: 'AI Generates Structured Output', desc: 'Generates explanation, JSON quiz schema, or multi-week roadmap.' },
            { step: '7', title: 'Result Rendered to Student', desc: 'Formatted cleanly with educational cards, instant copy, and feedback.' },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {item.step}
              </div>
              <div className="text-xs font-bold text-slate-900 w-44 shrink-0">{item.title}</div>
              <div className="text-xs text-slate-600">{item.desc}</div>
            </div>
          ))}
        </div>
      ),
    },

    // Slide 9 - AI Models
    {
      id: 9,
      title: 'AI Models Strategy',
      subtitle: 'Hybrid Intelligence: Cloud Gemini + Lightweight Local AI',
      category: 'AI Engine',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-indigo-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" /> Google Gemini API
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-200 text-indigo-800">Cloud Model</span>
            </div>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Handles high-reasoning tasks: multi-turn Socratic tutoring, 4-option quiz creation with JSON validation, comprehensive summarization, and customized multi-week learning roadmaps.
            </p>
            <div className="text-xs text-indigo-800 font-semibold space-y-1">
              <div>✓ High theoretical accuracy</div>
              <div>✓ Multimodal and multilingual support</div>
              <div>✓ Deep academic reasoning</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-600" /> LaMini-Flan-T5
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-800">Lightweight Local</span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Specialized for fast, short concept definitions and elementary explanations without incurring external cloud latency or API quotas.
            </p>
            <div className="text-xs text-emerald-800 font-semibold space-y-1">
              <div>✓ Zero API cost & runs offline/locally</div>
              <div>✓ Sub-second latency for simple definitions</div>
              <div>✓ Privacy-preserving processing</div>
            </div>
          </div>

          <div className="sm:col-span-2 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <strong>Why Hybrid?</strong> Combining cloud Gemini with a lightweight local model optimizes responsiveness, reduces operational costs, and ensures students get high-accuracy answers without latency delays.
          </div>
        </div>
      ),
    },

    // Slide 10 - Q&A Module
    {
      id: 10,
      title: 'Q&A Module',
      subtitle: 'Ask Any Academic Question & Receive Instant Clarification',
      category: 'Core Modules',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Students can ask any natural language inquiry across STEM, humanities, or business subjects. The assistant interprets intent and provides an intuitive, structured answer.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> Sample Student Inquiry:
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white font-medium text-xs">
              "Which is the largest ocean on Earth and why is it important?"
            </div>

            <div className="text-xs font-bold text-slate-700 pt-2">Sample AI Response:</div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1.5 shadow-2xs">
              <p>
                <strong>The Pacific Ocean</strong> is the largest and deepest ocean on Earth, covering over <strong>63 million square miles</strong> (more than 30% of Earth’s surface).
              </p>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                <li>Contains the Mariana Trench (deepest point at ~11,000 meters).</li>
                <li>Drives global climate systems including El Niño and La Niña oscillations.</li>
                <li>Houses the "Ring of Fire," producing over 75% of the world's volcanoes.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 11 - Explanation Module
    {
      id: 11,
      title: 'Explanation Module',
      subtitle: 'Deconstructing Difficult Concepts into Intuitive Understanding',
      category: 'Core Modules',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Converts technical formulas into step-by-step intuition, real-world analogies, and foundational proofs.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-indigo-700">Example: "Explain the Pythagoras Theorem"</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                <div className="font-bold text-slate-900 mb-1">📖 The Core Formula</div>
                <div className="text-base font-bold text-indigo-600 my-1">a² + b² = c²</div>
                <p className="text-slate-500 text-[11px]">In any right-angled triangle, the square of hypotenuse (c) equals the sum of squares of both sides (a & b).</p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                <div className="font-bold text-slate-900 mb-1">💡 Real-World Analogy</div>
                <p className="text-slate-600 text-[11px]">
                  Walking diagonally across a rectangular grass park is always shorter than walking along the two perpendicular edges.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs">
                <div className="font-bold text-slate-900 mb-1">📐 Worked Example</div>
                <p className="text-slate-600 text-[11px]">
                  Sides: 3 and 4.<br />
                  3² + 4² = 9 + 16 = 25.<br />
                  √25 = <strong>c = 5</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 12 - Quiz Module
    {
      id: 12,
      title: 'Quiz Module',
      subtitle: 'Automated MCQ Generation with Structured JSON & Instant Scoring',
      category: 'Core Modules',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Module Highlights</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Generates <strong>3 Multiple Choice Questions</strong> per topic</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Each question contains <strong>4 distinct options</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Provides verified correct answer key & rationale</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Uses strict <strong>JSON output</strong> for instant client rendering</span>
                </li>
              </ul>
            </div>

            {/* Quiz Preview Card */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs space-y-2">
              <div className="font-bold text-slate-900">Q1. In a right triangle, what is the side opposite to 90°?</div>
              <div className="space-y-1 text-[11px]">
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">A) Adjacent side</div>
                <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold">
                  B) Hypotenuse (✓ Correct)
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">C) Altitude</div>
                <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-200">D) Tangent</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 13 - Summary Module
    {
      id: 13,
      title: 'Summary Module',
      subtitle: 'Converting Dense Text into Concise, High-Yield Knowledge',
      category: 'Core Modules',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Students can paste lengthy textbook sections, research articles, or lecture transcripts to generate clear Cornell notes and bullet summaries.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-700">Raw Input (1000+ words):</div>
              <p className="text-slate-500 italic line-clamp-4 leading-relaxed">
                "Photosynthesis is a biological process utilized by green plants and certain organisms to convert solar radiant energy into chemical energy stored in glucose molecules..."
              </p>
              <div className="text-[10px] text-slate-400">Dense paragraphs with heavy extraneous text</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
              <div className="font-bold text-emerald-900">EduGenie Smart Summary:</div>
              <ul className="list-disc pl-4 space-y-1 text-emerald-800 text-[11px]">
                <li><strong>Equation:</strong> 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂</li>
                <li><strong>Phase 1:</strong> Light reactions in thylakoid split H₂O and generate ATP/NADPH.</li>
                <li><strong>Phase 2:</strong> Calvin cycle in stroma fixes CO₂ into glucose.</li>
              </ul>
              <div className="text-[10px] font-bold text-emerald-700">75% Time Saved on Revision</div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 14 - Learning Path Module
    {
      id: 14,
      title: 'Learning Path Module',
      subtitle: 'Personalized Progression: Beginner → Intermediate → Advanced',
      category: 'Core Modules',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">Level 1: Beginner</div>
              <h5 className="font-bold text-sm text-blue-950">Foundational Basics</h5>
              <ul className="text-xs text-blue-800 space-y-1 list-disc pl-4">
                <li>Core terminology & syntax</li>
                <li>Visual analogies & simple exercises</li>
                <li>Estimated: 1-2 weeks</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
              <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Level 2: Intermediate</div>
              <h5 className="font-bold text-sm text-indigo-950">Practical Application</h5>
              <ul className="text-xs text-indigo-800 space-y-1 list-disc pl-4">
                <li>Problem-solving & mini-projects</li>
                <li>Algorithmic edge cases</li>
                <li>Estimated: 2-3 weeks</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
              <div className="text-xs font-bold text-purple-900 uppercase tracking-wider">Level 3: Advanced</div>
              <h5 className="font-bold text-sm text-purple-950">Mastery & Optimization</h5>
              <ul className="text-xs text-purple-800 space-y-1 list-disc pl-4">
                <li>System design & derivations</li>
                <li>Real-world exam challenge questions</li>
                <li>Estimated: 3+ weeks</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Includes curated open-source resources, milestones, and active-recall checkpoints.</span>
            <span className="font-bold text-indigo-600">Adaptive Sequencing</span>
          </div>
        </div>
      ),
    },

    // Slide 15 - API Endpoints
    {
      id: 15,
      title: 'API Endpoints',
      subtitle: 'Clean RESTful Interface connecting Frontend to AI Engine',
      category: 'Backend Architecture',
      content: (
        <div className="space-y-3">
          {[
            { method: 'POST', endpoint: '/qa', module: 'Q&A Module', desc: 'Accepts query string and returns clear educational answer.' },
            { method: 'POST', endpoint: '/explain', module: 'Explanation Module', desc: 'Returns simple, jargon-free analogies and breakdowns.' },
            { method: 'POST', endpoint: '/quiz', module: 'Quiz Module', desc: 'Returns 3 MCQs with options, answer key, and explanation in JSON.' },
            { method: 'POST', endpoint: '/summarize', module: 'Summary Module', desc: 'Condenses pasted article into bullet points and Cornell notes.' },
            { method: 'POST', endpoint: '/learn/recommendations', module: 'Learning Path Module', desc: 'Outputs structured Beginner → Intermediate → Advanced roadmap.' },
          ].map((api) => (
            <div key={api.endpoint} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">{api.method}</span>
              <span className="font-mono text-xs font-bold text-indigo-600 w-48">{api.endpoint}</span>
              <span className="text-xs font-bold text-slate-800 w-36">{api.module}</span>
              <span className="text-xs text-slate-500 hidden sm:inline">{api.desc}</span>
            </div>
          ))}
        </div>
      ),
    },

    // Slide 16 - User Interface
    {
      id: 16,
      title: 'User Interface',
      subtitle: 'Clean, Modern, Student-Friendly Web Layout',
      category: 'Frontend Design',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900">4 Core Interface Components</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>1. Task Selection Bar:</strong> Instant tabs to switch between Q&A, Explanations, Quizzes, Summaries, and Roadmaps.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>2. Main Input Area:</strong> Minimalist prompt box with pre-built sample queries.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>3. Interactive Action Button:</strong> "Ask EduGenie" with responsive loading state.
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong>4. Result Display Card:</strong> Structured sections with copy-to-clipboard and follow-up chips.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-900 text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="text-xs font-bold text-amber-300 mb-1">Live Design Philosophy</div>
              <div className="text-sm font-bold">Zero Friction for College Students</div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                No complex configuration, zero required login hurdles for instant answers, responsive across phones, tablets, and desktop displays.
              </p>
            </div>
            <div className="text-[11px] text-indigo-300 pt-4 border-t border-indigo-800">
              Styled using modern Tailwind CSS & semantic HTML.
            </div>
          </div>
        </div>
      ),
    },

    // Slide 17 - Use Case Scenarios
    {
      id: 17,
      title: 'Use Case Scenarios',
      subtitle: 'Practical Real-World Student Workflows',
      category: 'Applications',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="text-xs font-bold text-blue-600">Scenario 1</div>
            <h5 className="font-bold text-sm text-slate-900">Geography Revision</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Student asks: <em>"Explain the water cycle and difference between rivers and oceans."</em> EduGenie returns evaporation stages with clear water-budget diagrams.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="text-xs font-bold text-emerald-600">Scenario 2</div>
            <h5 className="font-bold text-sm text-slate-900">Exam Self-Test</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Student enters <em>"Pythagoras Theorem"</em> and clicks Generate Quiz. Takes 3 MCQs, scores 100%, and reads answer rationale before their midterm.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
            <div className="text-xs font-bold text-purple-600">Scenario 3</div>
            <h5 className="font-bold text-sm text-slate-900">Skill Upgrading</h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              Student requests: <em>"SQL learning roadmap from beginner to advanced."</em> EduGenie creates a 4-week progression covering SELECT queries to indexing.
            </p>
          </div>
        </div>
      ),
    },

    // Slide 18 - Testing & Validation
    {
      id: 18,
      title: 'Testing & Validation',
      subtitle: 'Verified Functionality & Robustness Checks',
      category: 'Quality Assurance',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            All 5 core educational modules were systematically tested with diverse prompts and stress tests:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: 'Asking Academic Questions', status: 'Passed', detail: 'Accurate factual responses across Biology, Physics, and CS.' },
              { name: 'Explaining Concepts', status: 'Passed', detail: 'Successfully simplifies formulas without omitting core scientific truths.' },
              { name: 'Generating Quizzes', status: 'Passed', detail: 'Strict 4-option JSON schema parsed without formatting errors.' },
              { name: 'Summarizing Content', status: 'Passed', detail: 'Retained 90%+ key concepts while reducing word count by ~70%.' },
              { name: 'Learning Recommendations', status: 'Passed', detail: 'Logical milestone sequencing from prerequisites to advanced topics.' },
              { name: 'Cross-Device Responsiveness', status: 'Passed', detail: 'Seamless UI rendering on mobile, tablet, and desktop viewports.' },
            ].map((t) => (
              <div key={t.name} className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.detail}</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // Slide 19 - Benefits
    {
      id: 19,
      title: 'Key Benefits',
      subtitle: 'Tangible Advantages for Students and Educators',
      category: 'Impact',
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <Clock className="w-5 h-5 text-emerald-600 mb-1" />
            <h5 className="font-bold text-xs text-emerald-950">Saves Learning Time</h5>
            <p className="text-[11px] text-emerald-800">Cuts research and manual note-making time in half.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
            <Sparkles className="w-5 h-5 text-indigo-600 mb-1" />
            <h5 className="font-bold text-xs text-indigo-950">Easy Explanations</h5>
            <p className="text-[11px] text-indigo-800">Accessible analogies eliminate frustration with textbook jargon.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
            <GraduationCap className="w-5 h-5 text-blue-600 mb-1" />
            <h5 className="font-bold text-xs text-blue-950">Personalized Support</h5>
            <p className="text-[11px] text-blue-800">Adapts to the student's current academic level and pace.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
            <HelpCircle className="w-5 h-5 text-amber-600 mb-1" />
            <h5 className="font-bold text-xs text-amber-950">Interactive Practice</h5>
            <p className="text-[11px] text-amber-800">Continuous self-testing enhances long-term memory retention.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
            <BookOpen className="w-5 h-5 text-purple-600 mb-1" />
            <h5 className="font-bold text-xs text-purple-950">Quick Exam Revision</h5>
            <p className="text-[11px] text-purple-800">Instant cheat sheets and high-yield bullet summaries.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
            <Rocket className="w-5 h-5 text-rose-600 mb-1" />
            <h5 className="font-bold text-xs text-rose-950">24/7 Accessibility</h5>
            <p className="text-[11px] text-rose-800">Always available on any device whenever questions arise.</p>
          </div>
        </div>
      ),
    },

    // Slide 20 - Challenges & Mitigations
    {
      id: 20,
      title: 'Challenges & Engineering Solutions',
      subtitle: 'Navigating Technical and Practical Obstacles',
      category: 'Engineering',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <div className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> 1. AI Hallucination & Accuracy
            </div>
            <p className="text-xs text-slate-600">
              <strong>Mitigation:</strong> Strict system prompts, grounding, and structured JSON schemas ensure answers adhere to proven academic textbooks.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <div className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
              <Server className="w-4 h-4" /> 2. API Quota & Internet Dependency
            </div>
            <p className="text-xs text-slate-600">
              <strong>Mitigation:</strong> Hybrid pairing of cloud Gemini with lightweight local fallback models to maintain service availability.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <div className="text-xs font-bold text-indigo-600 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> 3. Performance Optimization
            </div>
            <p className="text-xs text-slate-600">
              <strong>Mitigation:</strong> Async FastAPI non-blocking endpoints, minimal frontend bundle size, and prompt caching.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> 4. Prompt Engineering
            </div>
            <p className="text-xs text-slate-600">
              <strong>Mitigation:</strong> Rigorously calibrated system instructions for student levels (High School, College, Graduate).
            </p>
          </div>
        </div>
      ),
    },

    // Slide 21 - Future Enhancements
    {
      id: 21,
      title: 'Future Enhancements',
      subtitle: 'Roadmap for EduGenie’s Next Iteration',
      category: 'Future Scope',
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="font-bold text-indigo-700 mb-0.5">🎙️ Voice Interaction</div>
            <p className="text-slate-500 text-[11px]">Hands-free conversational tutoring via Speech-to-Text & TTS.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="font-bold text-indigo-700 mb-0.5">🌐 Multilingual Voice</div>
            <p className="text-slate-500 text-[11px]">Real-time regional language tutoring across Indian & global tongues.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="font-bold text-indigo-700 mb-0.5">📱 Native Mobile App</div>
            <p className="text-slate-500 text-[11px]">Offline mode for study anywhere via Android / iOS.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="font-bold text-indigo-700 mb-0.5">🎮 Gamification</div>
            <p className="text-slate-500 text-[11px]">Daily streaks, mastery badges, and leaderboards to keep students engaged.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="font-bold text-indigo-700 mb-0.5">📷 Image & PDF Vision</div>
            <p className="text-slate-500 text-[11px]">Snap handwritten math problems or upload full syllabus PDFs.</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="font-bold text-indigo-700 mb-0.5">🏫 Teacher & LMS Integration</div>
            <p className="text-slate-500 text-[11px]">Canvas, Moodle, and Google Classroom sync for educators.</p>
          </div>
        </div>
      ),
    },

    // Slide 22 - Conclusion
    {
      id: 22,
      title: 'Conclusion',
      subtitle: 'Empowering Education through Thoughtful AI Design',
      category: 'Summary',
      content: (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-indigo-900 text-white shadow-md space-y-3">
            <h4 className="text-lg font-bold text-amber-300">
              EduGenie: A 24/7 Personal Digital Learning Companion
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              By combining Google Gemini intelligence, a lightning-fast FastAPI backend, and an intuitive student interface, EduGenie bridges the gap between intimidating academic material and clear student comprehension.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-base font-extrabold text-indigo-600">Simplicity</div>
              <div className="text-xs text-slate-500 mt-1">No complicated setup or jargon</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-base font-extrabold text-emerald-600">Accuracy</div>
              <div className="text-xs text-slate-500 mt-1">Structured educational explanations</div>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-base font-extrabold text-amber-600">Scalability</div>
              <div className="text-xs text-slate-500 mt-1">Extensible micro-service design</div>
            </div>
          </div>
        </div>
      ),
    },

    // Slide 23 - Thank You
    {
      id: 23,
      title: 'Thank You!',
      subtitle: 'Questions & Answers',
      category: 'Conclusion',
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-8 h-8 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Thank You!
            </h1>
            <p className="text-lg sm:text-xl font-bold text-indigo-600">
              Any Questions or Discussion?
            </p>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              We welcome your thoughts, feedback, and questions on EduGenie – AI-Powered Learning Assistant.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-sm w-full space-y-1">
            <div className="font-bold text-slate-800">Project: EduGenie Learning Assistant</div>
            <div>Powered by Google Gemini AI & FastAPI</div>
            <div className="text-indigo-600 font-semibold pt-1">Open for live software demonstration</div>
          </div>
        </div>
      ),
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const toggleFullscreen = () => {
    if (!deckRef.current) return;
    if (!document.fullscreenElement) {
      deckRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const copyAllMarkdown = () => {
    const md = `# EduGenie – AI-Powered Learning Assistant
College Project Presentation Deck (23 Slides)

---
## Slide 1: Title
**EduGenie: AI-Powered Learning Assistant**
* A Smart and Personalized Educational Platform for Students
* Generative AI • Student First • FastAPI Stack

---
## Slide 2: Project Overview
* Lightweight AI-powered educational assistant
* Generative AI synthesizes complex concepts into intuitive lessons
* Quick answers, explanations, quizzes, summaries, and learning recommendations

---
## Slide 3: Problem Statement
* Difficulty understanding complex concepts & heavy technical jargon
* Lack of personalized 1-on-1 learning support
* Time-consuming revision of lengthy slides
* Difficulty creating practice quizzes for self-testing
* Long educational content that is difficult to revise

---
## Slide 4: Objectives
* Simplify complex educational concepts
* Provide instant answers to eliminate study roadblocks
* Generate personalized quizzes with verified answers
* Summarize lengthy content into high-yield Cornell points
* Recommend structured learning paths from Beginner to Advanced
* Make learning accessible and interactive on all devices

---
## Slide 5: Key Features
1. AI-Powered Q&A – Quick and intelligent answers
2. Simple Concept Explanation – Converts complex topics into clear language
3. Quiz Generation – Automatically creates MCQ quizzes with 4 options & feedback
4. Smart Summarization – Converts lengthy content into short summaries
5. Personalized Learning Paths – Step-by-step learning recommendations
6. User-Friendly Web Interface – Simple HTML & CSS interface
7. FastAPI Backend – High-speed RESTful APIs
8. Gemini AI Integration – High-reasoning cloud LLM
9. Lightweight and Accessible Architecture – Runs smoothly on any device

---
## Slide 6: Technologies Used
* Python 3.10+ (Core backend language)
* FastAPI (High-performance async web framework)
* HTML5 & CSS3 (Semantic responsive structure)
* Jinja2 (Dynamic server-side templates)
* Uvicorn (Lightning-fast ASGI server)
* Google Gemini API (High-reasoning cloud LLM)
* LaMini-Flan-T5 (Lightweight local concept explainer)
* JSON Schema (Structured output enforcement)

---
## Slide 7: System Architecture
Student -> HTML/CSS Frontend -> FastAPI Backend -> Specialized Modules -> AI Models -> Response to User
Modules:
* Q&A Module
* Explanation Module
* Quiz Module
* Summary Module
* Learning Path Module

---
## Slide 8: Project Workflow
1. User selects a task
2. User enters question or content
3. Frontend sends request
4. FastAPI processes and routes request
5. Appropriate AI module is selected
6. AI generates response
7. Result is displayed to user

---
## Slide 9: AI Models
* Gemini API: Cloud model for deep Q&A, quizzes, summaries, and roadmaps
* LaMini-Flan-T5: Lightweight local model for instant concept definitions
* Hybrid benefits: Zero local cost for simple tasks, deep reasoning when needed

---
## Slide 10: Q&A Module
* Natural language inquiries with contextual depth
* Example: "Which is the largest ocean?"
* Response: Pacific Ocean (63M sq mi), Mariana Trench, Ring of Fire climate driver

---
## Slide 11: Explanation Module
* Converts formulas to intuitive understanding
* Example: "Explain Pythagoras Theorem"
* a² + b² = c² with diagonal park walking analogy and 3-4-5 worked example

---
## Slide 12: Quiz Module
* 3 Multiple-choice questions per topic
* 4 options per question with verified correct answer
* Structured JSON output for client scoring

---
## Slide 13: Summary Module
* Converts 1000+ word textbook sections into high-yield summaries
* Saves 75% time on exam revision

---
## Slide 14: Learning Path Module
* Structured progression: Beginner -> Intermediate -> Advanced
* Includes timelines, resources, and self-checks

---
## Slide 15: API Endpoints
* POST /qa (Q&A Module)
* POST /explain (Explanation Module)
* POST /quiz (Quiz Module)
* POST /summarize (Summary Module)
* POST /learn/recommendations (Learning Path Module)

---
## Slide 16: User Interface
* Task selection dropdown/tabs
* Minimalist text input area
* "Ask EduGenie" action button
* Structured educational result card

---
## Slide 17: Use Case Scenarios
1. Geography student asks about water cycle and river systems
2. Math student generates Pythagoras Theorem quiz for midterm test
3. Computer science student requests 4-week SQL learning roadmap

---
## Slide 18: Testing & Validation
* Tested questions, explanations, quizzes, summaries, and recommendations
* Validated cross-device responsiveness and sub-second API speeds

---
## Slide 19: Benefits
* Saves learning time
* Easy-to-understand explanations
* Personalized learning support
* Interactive practice
* Quick revision
* 24/7 accessible assistance

---
## Slide 20: Challenges & Mitigations
* AI accuracy -> Grounded system prompts & structured JSON
* API quota -> Hybrid cloud + local model architecture
* Latency -> Async FastAPI & prompt caching

---
## Slide 21: Future Enhancements
* Voice interaction (Speech-to-Text & TTS)
* Multilingual voice support
* Mobile application
* Progress tracking & gamification
* Image & PDF document analysis
* Teacher & LMS integration

---
## Slide 22: Conclusion
* Combines AI, simple web interface, and personalized learning
* Provides an accessible 24/7 digital learning companion for students

---
## Slide 23: Thank You
* Thank You!
* Any Questions or Discussion?
* Open for live demonstration
`;
    navigator.clipboard.writeText(md);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const downloadHtmlDeck = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EduGenie - Presentation Deck</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      .slide-break { page-break-after: always; height: 100vh; }
      .no-print { display: none; }
    }
  </style>
</head>
<body class="bg-slate-900 text-slate-100 font-sans p-6 sm:p-12">
  <div class="max-w-4xl mx-auto space-y-12">
    <div class="text-center space-y-2 no-print border-b border-slate-800 pb-6">
      <h1 class="text-3xl font-extrabold text-amber-400">EduGenie Presentation Deck</h1>
      <p class="text-sm text-slate-400">23 Complete College Presentation Slides • Press Ctrl+P / Cmd+P to Save as PDF</p>
    </div>
    ${slides
      .map(
        (s) => `
      <div class="slide-break bg-slate-800 rounded-3xl p-8 sm:p-12 border border-slate-700 shadow-2xl min-h-[480px] flex flex-col justify-between mb-8">
        <div>
          <div class="flex items-center justify-between text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
            <span>Slide ${s.id} of 23 • ${s.category}</span>
            <span>EduGenie AI</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white">${s.title}</h2>
          ${s.subtitle ? `<h3 class="text-sm font-semibold text-slate-300 mt-1 mb-6">${s.subtitle}</h3>` : ''}
        </div>
        <div class="my-auto py-4">
          ${renderSlideHtml(s.id)}
        </div>
        <div class="pt-4 border-t border-slate-700 flex justify-between text-[11px] text-slate-400">
          <span>Department of Computer Science • Project Presentation</span>
          <span>Slide ${s.id}</span>
        </div>
      </div>
    `
      )
      .join('')}
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'EduGenie_Presentation_Deck.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderSlideHtml = (id: number): string => {
    switch (id) {
      case 1:
        return `<div class="text-center space-y-4">
          <h1 class="text-4xl font-extrabold text-amber-300">EduGenie</h1>
          <h2 class="text-2xl font-bold text-white">AI-Powered Learning Assistant</h2>
          <p class="text-slate-300">A Smart and Personalized Educational Platform for Students</p>
        </div>`;
      case 2:
        return `<ul class="space-y-3 text-slate-200">
          <li><strong>What is EduGenie:</strong> A lightweight, responsive, AI-powered learning assistant.</li>
          <li><strong>Generative AI:</strong> Powered by LLMs to synthesize textbooks into bite-sized lessons.</li>
          <li><strong>Core Deliverables:</strong> Quick answers, explanations, quizzes, summaries, and learning roadmaps.</li>
        </ul>`;
      case 3:
        return `<ul class="space-y-2 text-slate-200">
          <li>• Difficulty understanding complex concepts & heavy technical jargon</li>
          <li>• Lack of personalized 1-on-1 learning support</li>
          <li>• Time-consuming revision of lengthy slides</li>
          <li>• Difficulty creating practice quizzes for self-testing</li>
          <li>• Long educational content that is difficult to revise</li>
        </ul>`;
      case 4:
        return `<ul class="space-y-2 text-slate-200">
          <li>✓ Simplify complex educational concepts with analogies</li>
          <li>✓ Provide instant answers to eliminate study roadblocks</li>
          <li>✓ Generate personalized quizzes with verified answers</li>
          <li>✓ Summarize lengthy content into high-yield Cornell points</li>
          <li>✓ Recommend structured learning paths from Beginner to Advanced</li>
          <li>✓ Make learning accessible and interactive on all devices</li>
        </ul>`;
      case 5:
        return `<div class="grid grid-cols-2 gap-2.5 text-xs text-slate-200">
          <div><strong>1. AI-Powered Q&A:</strong> Smart, context-aware answers using <em>Google Gemini AI</em>.</div>
          <div><strong>2. Concept Explanation:</strong> Simplified readable explanations via <em>LaMini-Flan-T5</em>.</div>
          <div><strong>3. Quiz Generation:</strong> 3 MCQs with 4 options each and verified answers.</div>
          <div><strong>4. Intelligent Summarization:</strong> Generative AI high-yield summaries for quick revision.</div>
          <div><strong>5. Personalized Recommendations:</strong> Structured path from Beginner to Advanced.</div>
          <div><strong>6. Resources & Guidance:</strong> Curated videos, articles, books, and step-by-step guidance.</div>
          <div><strong>7. Modular AI Architecture:</strong> 5 decoupled modules (Q&A, Explain, Quiz, Summary, Learn).</div>
          <div><strong>8. FastAPI Backend:</strong> High-performance async REST APIs (/qa, /explain, /quiz, etc.).</div>
          <div><strong>9. Simple Web Interface:</strong> Clean, responsive HTML & CSS UI with instant results.</div>
          <div><strong>10. Lightweight & Accessible:</strong> Hybrid local (LaMini) + cloud (Gemini) efficiency.</div>
        </div>`;
      case 6:
        return `<div class="grid grid-cols-2 gap-3 text-xs text-slate-200">
          <div><strong>Python 3.10+:</strong> Core backend language</div>
          <div><strong>FastAPI:</strong> High-speed async REST endpoints</div>
          <div><strong>HTML & CSS:</strong> Responsive student interface</div>
          <div><strong>Jinja2:</strong> Dynamic server-side templating</div>
          <div><strong>Uvicorn:</strong> Async ASGI web server</div>
          <div><strong>Gemini API:</strong> High-reasoning cloud LLM</div>
          <div><strong>LaMini-Flan-T5:</strong> Local lightweight model</div>
          <div><strong>JSON Schema:</strong> Structured response validation</div>
        </div>`;
      case 7:
        return `<p class="font-mono text-xs text-indigo-300">User -> HTML/CSS Frontend -> FastAPI Backend -> Specialized Modules -> AI Models -> Response to User</p>
        <p class="mt-3 text-xs text-slate-300">Modules: Q&A Module • Explanation Module • Quiz Module • Summary Module • Learning Path Module</p>`;
      case 8:
        return `<ol class="list-decimal pl-5 space-y-1 text-xs text-slate-200">
          <li>User selects a task</li><li>User enters a question or content</li>
          <li>Frontend sends the request</li><li>FastAPI processes the request</li>
          <li>Appropriate AI module is selected</li><li>AI generates the response</li>
          <li>Result is displayed to the user</li>
        </ol>`;
      case 9:
        return `<p class="text-xs text-slate-200 mb-2"><strong>Gemini API:</strong> Deep reasoning, quiz generation, summarization, roadmaps.</p>
        <p class="text-xs text-slate-200 mb-2"><strong>LaMini-Flan-T5:</strong> Fast, local concept explanations with zero API latency.</p>
        <p class="text-xs text-amber-300"><strong>Why Hybrid?</strong> Balances high intelligence with speed, zero cost, and offline privacy.</p>`;
      case 10:
        return `<p class="text-xs text-slate-200"><strong>Question:</strong> "Which is the largest ocean?"</p>
        <p class="text-xs text-slate-300 mt-2"><strong>Response:</strong> Pacific Ocean covers over 63 million sq mi (>30% of Earth), contains Mariana Trench, and drives global climate systems.</p>`;
      case 11:
        return `<p class="text-xs text-slate-200"><strong>Concept:</strong> Pythagoras Theorem (a² + b² = c²)</p>
        <p class="text-xs text-slate-300 mt-2"><strong>Explanation:</strong> In a right-angled triangle, the hypotenuse squared equals the sum of the squares of the two other sides. Example: 3² + 4² = 9 + 16 = 25, √25 = 5.</p>`;
      case 12:
        return `<ul class="text-xs text-slate-200 space-y-1">
          <li>• Generates 3 Multiple Choice Questions</li>
          <li>• 4 distinct options per question</li>
          <li>• Verified answer key & rationale</li>
          <li>• Strict JSON output format for client rendering</li>
        </ul>`;
      case 13:
        return `<p class="text-xs text-slate-200">Converts 1,000+ words of dense biology/physics textbook text into concise Cornell notes and high-yield bullet takeaways, saving 75% revision time.</p>`;
      case 14:
        return `<div class="text-xs text-slate-200 space-y-2">
          <div><strong>Beginner:</strong> Core concepts, terminology, 1-2 weeks</div>
          <div><strong>Intermediate:</strong> Applied problems, mini-projects, 2-3 weeks</div>
          <div><strong>Advanced:</strong> Complex derivations, real-world case studies, 3+ weeks</div>
        </div>`;
      case 15:
        return `<div class="font-mono text-xs text-emerald-400 space-y-1">
          <div>POST /qa -> Q&A Module</div>
          <div>POST /explain -> Explanation Module</div>
          <div>POST /quiz -> Quiz Module</div>
          <div>POST /summarize -> Summary Module</div>
          <div>POST /learn/recommendations -> Learning Path Module</div>
        </div>`;
      case 16:
        return `<ul class="text-xs text-slate-200 space-y-1">
          <li>• Task selection dropdown / quick tabs</li>
          <li>• Clean minimalist text input area</li>
          <li>• "Ask EduGenie" action button</li>
          <li>• Structured result display with copy buttons</li>
        </ul>`;
      case 17:
        return `<div class="text-xs text-slate-200 space-y-2">
          <div>1. Student asks about oceans and rivers -> Instant hydrological cycle explanation</div>
          <div>2. Student generates Pythagoras Theorem quiz -> Takes 3 MCQs before test</div>
          <div>3. Student requests SQL learning path -> 4-week structured milestone curriculum</div>
        </div>`;
      case 18:
        return `<p class="text-xs text-emerald-300 font-bold mb-2">✓ All 5 core functional modules passed validation testing:</p>
        <ul class="text-xs text-slate-300 space-y-1">
          <li>Q&A inquiries, Concept explanations, JSON Quiz generation, Smart Summarization, Learning Roadmaps.</li>
        </ul>`;
      case 19:
        return `<div class="grid grid-cols-2 gap-2 text-xs text-slate-200">
          <div>• Saves learning time</div><div>• Easy-to-understand explanations</div>
          <div>• Personalized support</div><div>• Interactive practice</div>
          <div>• Quick exam revision</div><div>• 24/7 accessible assistance</div>
        </div>`;
      case 20:
        return `<ul class="text-xs text-slate-200 space-y-1">
          <li>• AI Accuracy -> Grounded system prompts & JSON validation</li>
          <li>• API Dependency -> Hybrid cloud Gemini + local model fallback</li>
          <li>• Latency -> Async FastAPI non-blocking endpoints</li>
          <li>• Prompt Engineering -> Multi-level educational calibration</li>
        </ul>`;
      case 21:
        return `<div class="text-xs text-slate-200 space-y-1">
          <div>• Voice interaction (STT & TTS)</div>
          <div>• Multilingual support for Indian & global languages</div>
          <div>• Mobile application (Android / iOS)</div>
          <div>• Progress tracking & gamification badges</div>
          <div>• Image & PDF document analysis</div>
          <div>• LMS & Teacher dashboards</div>
        </div>`;
      case 22:
        return `<p class="text-xs text-slate-200 leading-relaxed">EduGenie bridges the gap between intimidating textbooks and clear student comprehension by fusing Generative AI, a fast RESTful FastAPI architecture, and a modern student-friendly web interface.</p>`;
      case 23:
        return `<div class="text-center py-4">
          <h2 class="text-3xl font-extrabold text-amber-400 mb-2">Thank You!</h2>
          <p class="text-lg text-white font-semibold">Any Questions or Discussion?</p>
          <p class="text-xs text-slate-400 mt-2">Open for live demonstration</p>
        </div>`;
      default:
        return `<p class="text-xs text-slate-300">Slide content</p>`;
    }
  };

  const isTitleSlide = currentSlideIndex === 0;

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-16">
      {/* Top Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <PresentationIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              College Project Presentation Deck
            </h2>
            <div className="text-[11px] text-slate-500">
              EduGenie – AI-Powered Learning Assistant • 23 Professional Slides
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyAllMarkdown}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Copy all 23 slides in formatted Markdown for PowerPoint / Google Slides"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAll ? 'Copied All Slides!' : 'Copy for PPT / Slides'}</span>
          </button>

          <button
            onClick={downloadHtmlDeck}
            className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition"
            title="Download complete 23-slide deck as a standalone HTML / PDF file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download HTML / PDF</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            title="Toggle Fullscreen (or press F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage (16:9 Aspect Ratio) */}
      <div
        ref={deckRef}
        className={`relative w-full rounded-3xl overflow-hidden shadow-2xl transition-all border ${
          isFullscreen
            ? 'h-screen w-screen p-8 sm:p-14 bg-slate-950 flex flex-col justify-between'
            : isTitleSlide
            ? 'min-h-[520px] bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 sm:p-10 border-indigo-800/40 flex flex-col justify-between'
            : 'min-h-[520px] bg-white text-slate-900 p-6 sm:p-10 border-slate-200/90 flex flex-col justify-between'
        }`}
      >
        {/* Slide Header */}
        {!isTitleSlide && (
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                Slide {currentSlide.id} / 23
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500">{currentSlide.category}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EduGenie</span>
            </div>
          </div>
        )}

        {/* Slide Title */}
        {!isTitleSlide && (
          <div className="pt-2 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentSlide.title}
            </h2>
            {currentSlide.subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                {currentSlide.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Slide Body */}
        <div className="flex-1 flex flex-col justify-center py-2">
          {currentSlide.content}
        </div>

        {/* Slide Footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Project: EduGenie – AI-Powered Learning Assistant</span>
            <span>•</span>
            <span>College Project Presentation</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-600">
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>
          </div>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Slide Selector Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Jump to:</span>
          <select
            value={currentSlideIndex}
            onChange={(e) => setCurrentSlideIndex(Number(e.target.value))}
            className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:border-indigo-500 w-full sm:w-64"
          >
            {slides.map((s, idx) => (
              <option key={s.id} value={idx}>
                Slide {s.id}: {s.title}
              </option>
            ))}
          </select>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-48 bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full transition-all duration-200"
            style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Next / Previous Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-bold flex items-center gap-1 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-bold text-slate-600 px-1">
            {currentSlideIndex + 1} / {slides.length}
          </span>

          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1 transition shadow-sm"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Mini presentation icon
function PresentationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  );
}
