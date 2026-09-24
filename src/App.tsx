/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { ChatTutor } from './components/ChatTutor';
import { MyLearning } from './components/MyLearning';
import { AboutEduGenie } from './components/AboutEduGenie';
import { StudyPlanGenerator } from './components/StudyPlanGenerator';
import { SmartNotes } from './components/SmartNotes';
import { QuizGenerator } from './components/QuizGenerator';
import { ProblemSolver } from './components/ProblemSolver';
import { DocumentAnalysis } from './components/DocumentAnalysis';
import { ExamPrep } from './components/ExamPrep';
import { ProgressDashboard } from './components/ProgressDashboard';
import { PresentationDeck } from './components/PresentationDeck';
import {
  StudentLevel,
  LanguageCode,
  StudyPlan,
  SmartNote,
  QuizResult,
  UserStats,
  LearningHistoryItem,
} from './types';
import {
  loadSettings,
  saveSettings,
  loadStats,
  updateStats,
  loadSavedPlans,
  savePlan,
  deletePlan,
  loadSavedNotes,
  saveSmartNote,
  deleteSmartNote,
  loadQuizResults,
  recordQuizResult,
  loadLearningHistory,
  saveLearningHistoryItem,
  deleteLearningHistoryItem,
  clearLearningHistory,
} from './utils/storage';
import { Sparkles, Heart, GraduationCap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [studentLevel, setStudentLevelState] = useState<StudentLevel>('Undergraduate / College');
  const [language, setLanguageState] = useState<LanguageCode>('English');
  const [stats, setStats] = useState<UserStats>(loadStats);
  const [savedPlans, setSavedPlans] = useState<StudyPlan[]>(loadSavedPlans);
  const [savedNotes, setSavedNotes] = useState<SmartNote[]>(loadSavedNotes);
  const [quizResults, setQuizResults] = useState<QuizResult[]>(loadQuizResults);
  const [learningHistory, setLearningHistory] = useState<LearningHistoryItem[]>(loadLearningHistory);
  const [initialChatQuery, setInitialChatQuery] = useState<string>('');
  const [quizNotesContext, setQuizNotesContext] = useState<string>('');

  useEffect(() => {
    const s = loadSettings();
    setStudentLevelState(s.studentLevel);
    setLanguageState(s.language);
  }, []);

  const handleSetStudentLevel = (level: StudentLevel) => {
    setStudentLevelState(level);
    saveSettings({ studentLevel: level, language });
  };

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    saveSettings({ studentLevel, language: lang });
  };

  const handleSavePlan = (plan: StudyPlan) => {
    savePlan(plan);
    setSavedPlans(loadSavedPlans());
  };

  const handleDeletePlan = (id: string) => {
    deletePlan(id);
    setSavedPlans(loadSavedPlans());
  };

  const handleSaveNote = (note: SmartNote) => {
    saveSmartNote(note);
    setSavedNotes(loadSavedNotes());
    updateStats((prev) => ({ ...prev, notesSaved: prev.notesSaved + 1 }));
    setStats(loadStats());
  };

  const handleDeleteNote = (id: string) => {
    deleteSmartNote(id);
    setSavedNotes(loadSavedNotes());
  };

  const handleRecordQuizResult = (result: QuizResult) => {
    recordQuizResult(result);
    setQuizResults(loadQuizResults());
    setStats(loadStats());
  };

  const handleSaveHistoryItem = (item: LearningHistoryItem) => {
    saveLearningHistoryItem(item);
    setLearningHistory(loadLearningHistory());
  };

  const handleDeleteHistoryItem = (id: string) => {
    deleteLearningHistoryItem(id);
    setLearningHistory(loadLearningHistory());
  };

  const handleClearHistory = () => {
    clearLearningHistory();
    setLearningHistory([]);
  };

  const handleSelectHistoryTopic = (topicOrQuestion: string) => {
    setInitialChatQuery(topicOrQuestion);
    setActiveTab('chat');
  };

  const handleToggleTask = (planId: string, day: number, taskIndex: number) => {
    const key = `${planId}-${day}-${taskIndex}`;
    const updated = updateStats((prev) => ({
      ...prev,
      completedTasks: {
        ...prev.completedTasks,
        [key]: !prev.completedTasks[key],
      },
    }));
    setStats(updated);
  };

  const handleQuickQuery = (query: string) => {
    setInitialChatQuery(query);
  };

  const handleSendDocToQuiz = (docText: string) => {
    setQuizNotesContext(docText);
    setActiveTab('quiz');
  };

  const handleStudyLogged = (minutes: number) => {
    const updated = updateStats((prev) => ({
      ...prev,
      studyMinutes: prev.studyMinutes + minutes,
    }));
    setStats(updated);
  };

  const handleProblemSolved = () => {
    const updated = updateStats((prev) => ({
      ...prev,
      problemsSolved: prev.problemsSolved + 1,
      studyMinutes: prev.studyMinutes + 10,
    }));
    setStats(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Bar with Home, AI Learning Assistant, My Learning, About */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentLevel={studentLevel}
        setStudentLevel={handleSetStudentLevel}
        language={language}
        setLanguage={handleSetLanguage}
        streakDays={stats.streakDays}
        historyCount={learningHistory.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* 1. Home (Landing Page & Student Dashboard) */}
        {activeTab === 'home' && (
          <HeroHome
            setActiveTab={setActiveTab}
            studentLevel={studentLevel}
            language={language}
            stats={stats}
            savedPlans={savedPlans}
            learningHistory={learningHistory}
            onQuickQuery={handleQuickQuery}
            onToggleTask={handleToggleTask}
          />
        )}

        {/* 2. AI Learning Assistant (Main Feature) */}
        {activeTab === 'chat' && (
          <ChatTutor
            studentLevel={studentLevel}
            language={language}
            initialQuery={initialChatQuery}
            onClearInitialQuery={() => setInitialChatQuery('')}
            onStudyLogged={handleStudyLogged}
            onSaveHistory={handleSaveHistoryItem}
          />
        )}

        {/* 3. My Learning (Learning History & Review) */}
        {activeTab === 'history' && (
          <MyLearning
            history={learningHistory}
            onSelectTopic={handleSelectHistoryTopic}
            onDeleteItem={handleDeleteHistoryItem}
            onClearAll={handleClearHistory}
            studentLevel={studentLevel}
            language={language}
          />
        )}

        {/* 4. About Page */}
        {activeTab === 'about' && (
          <AboutEduGenie
            onGetStarted={() => setActiveTab('chat')}
            onOpenPresentation={() => setActiveTab('presentation')}
          />
        )}

        {/* 5. College Project Presentation Deck (23 Slides) */}
        {activeTab === 'presentation' && (
          <PresentationDeck />
        )}

        {/* Extended Tools Suite */}
        {activeTab === 'plan' && (
          <StudyPlanGenerator
            studentLevel={studentLevel}
            language={language}
            savedPlans={savedPlans}
            onSavePlan={handleSavePlan}
            onDeletePlan={handleDeletePlan}
            stats={stats}
            onToggleTask={handleToggleTask}
          />
        )}

        {activeTab === 'notes' && (
          <SmartNotes
            studentLevel={studentLevel}
            language={language}
            savedNotes={savedNotes}
            onSaveNote={handleSaveNote}
            onDeleteNote={handleDeleteNote}
            onStudyLogged={handleStudyLogged}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizGenerator
            studentLevel={studentLevel}
            language={language}
            onRecordResult={handleRecordQuizResult}
            notesContext={quizNotesContext}
          />
        )}

        {activeTab === 'solver' && (
          <ProblemSolver
            studentLevel={studentLevel}
            language={language}
            onProblemSolved={handleProblemSolved}
          />
        )}

        {activeTab === 'docs' && (
          <DocumentAnalysis
            studentLevel={studentLevel}
            language={language}
            onSendToQuiz={handleSendDocToQuiz}
          />
        )}

        {activeTab === 'exam' && (
          <ExamPrep
            studentLevel={studentLevel}
            language={language}
            onStudyLogged={handleStudyLogged}
          />
        )}

        {activeTab === 'dashboard' && (
          <ProgressDashboard
            stats={stats}
            quizResults={quizResults}
            savedPlans={savedPlans}
            savedNotes={savedNotes}
            studentLevel={studentLevel}
            language={language}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="font-bold text-slate-800">EduGenie</span>
              <span className="text-slate-400"> — Google Gemini Powered Learning Assistant</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 font-medium">
            <button onClick={() => setActiveTab('home')} className="hover:text-indigo-600 transition">
              Home
            </button>
            <button onClick={() => setActiveTab('chat')} className="hover:text-indigo-600 transition">
              AI Learning Assistant
            </button>
            <button onClick={() => setActiveTab('history')} className="hover:text-indigo-600 transition">
              My Learning
            </button>
            <button onClick={() => setActiveTab('about')} className="hover:text-indigo-600 transition">
              About
            </button>
            <button onClick={() => setActiveTab('presentation')} className="text-indigo-600 font-bold hover:underline transition">
              Presentation (PPT)
            </button>
            <button onClick={() => setActiveTab('quiz')} className="hover:text-indigo-600 transition">
              Quizzes
            </button>
            <button onClick={() => setActiveTab('plan')} className="hover:text-indigo-600 transition">
              Study Plans
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Student Level: <span className="font-semibold text-slate-600">{studentLevel}</span> ({language})
          </div>
        </div>
      </footer>
    </div>
  );
}
