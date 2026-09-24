import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  MessageSquare,
  History,
  Info,
  Layers,
  Calendar,
  FileText,
  HelpCircle,
  Calculator,
  FileSearch,
  Award,
  BarChart3,
  Globe,
  GraduationCap,
  Flame,
  Menu,
  X,
  ChevronDown,
  Presentation,
} from 'lucide-react';
import { StudentLevel, LanguageCode } from '../types';
import { LANGUAGES, STUDENT_LEVELS, UI_TEXTS } from '../utils/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  studentLevel: StudentLevel;
  setStudentLevel: (level: StudentLevel) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  streakDays: number;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  studentLevel,
  setStudentLevel,
  language,
  setLanguage,
  streakDays,
  historyCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = UI_TEXTS[language] || UI_TEXTS.English;

  // Primary 4 Navigation Links explicitly specified in the prompt
  const primaryNavItems = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'chat', label: 'AI Learning Assistant', icon: MessageSquare },
    { id: 'history', label: 'My Learning', icon: History, count: historyCount },
    { id: 'about', label: 'About', icon: Info },
  ];

  // Secondary Tools
  const secondaryTools = [
    { id: 'presentation', label: 'Presentation (PPT)', icon: Presentation, desc: '23 college project slides' },
    { id: 'plan', label: 'Study Plans', icon: Calendar, desc: 'Daily milestone schedules' },
    { id: 'notes', label: 'Smart Notes', icon: FileText, desc: 'Cornell notes & flashcards' },
    { id: 'quiz', label: 'AI Quiz Generator', icon: HelpCircle, desc: 'Interactive retention checks' },
    { id: 'solver', label: 'Problem Solver', icon: Calculator, desc: 'Step-by-step STEM derivations' },
    { id: 'docs', label: 'Document Analysis', icon: FileSearch, desc: 'PDF & syllabus summarization' },
    { id: 'exam', label: 'Exam Prep', icon: Award, desc: 'Midterms & finals practice' },
    { id: 'dashboard', label: 'Progress Dashboard', icon: BarChart3, desc: 'Study streak & analytics' },
  ];

  const currentLevelObj = STUDENT_LEVELS.find((l) => l.id === studentLevel) || STUDENT_LEVELS[1];
  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const isSecondaryActive = secondaryTools.some((t) => t.id === activeTab);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Subtitle */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-amber-500 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center group-hover:scale-105 transition">
              <div className="w-full h-full bg-indigo-950/40 backdrop-blur-xs rounded-[10px] flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                  EduGenie
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-700 border border-indigo-200">
                  Gemini AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block leading-tight">
                Learning Assistant
              </p>
            </div>
          </div>

          {/* Desktop Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setToolsDropdownOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-600/30'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${
                        isActive ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Study Tools Dropdown */}
            <div className="relative ml-1">
              <button
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  setLevelDropdownOpen(false);
                  setLangDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSecondaryActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>Study Tools</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Extended Learning Suite
                  </div>
                  <div className="space-y-1">
                    {secondaryTools.map((tool) => {
                      const Icon = tool.icon;
                      const isActive = activeTab === tool.id;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => {
                            setActiveTab(tool.id);
                            setToolsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-3 transition ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-700 font-semibold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                              isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">{tool.label}</div>
                            <div className="text-[11px] text-slate-400">{tool.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Quick Actions (Level, Language, Streak, Mobile toggle) */}
          <div className="flex items-center gap-2">
            {/* Streak Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold shadow-2xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
              <span>{streakDays} {t.streak}</span>
            </div>

            {/* Student Level Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setLevelDropdownOpen(!levelDropdownOpen);
                  setLangDropdownOpen(false);
                  setToolsDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition shadow-2xs"
                title="Change Academic Level"
              >
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span className="hidden md:inline font-semibold">{currentLevelObj.id.split(' ')[0]}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {levelDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {t.level}
                  </div>
                  {STUDENT_LEVELS.map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => {
                        setStudentLevel(lvl.id);
                        setLevelDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 text-xs flex items-start gap-2.5 hover:bg-indigo-50/70 transition ${
                        studentLevel === lvl.id ? 'bg-indigo-50/90 text-indigo-700 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <span className="text-base">{lvl.icon}</span>
                      <div>
                        <div className="font-medium text-slate-800">{lvl.label}</div>
                        <div className="text-[11px] text-slate-500 leading-snug">{lvl.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setLevelDropdownOpen(false);
                  setToolsDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition shadow-2xs"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="text-sm">{currentLangObj.flag}</span>
                <span className="hidden lg:inline text-xs font-semibold">{currentLangObj.label}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 max-h-80 overflow-y-auto">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {t.language}
                  </div>
                  {LANGUAGES.map((langItem) => (
                    <button
                      key={langItem.code}
                      onClick={() => {
                        setLanguage(langItem.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-indigo-50 transition ${
                        language === langItem.code ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <span className="text-base">{langItem.flag}</span>
                      <span>{langItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Primary Navigation
          </div>
          <div className="grid grid-cols-2 gap-2">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left ${
                    isActive ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pt-2">
            Study Tools
          </div>
          <div className="grid grid-cols-2 gap-2">
            {secondaryTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTab === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTab(tool.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-left ${
                    isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tool.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
