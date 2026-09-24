import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Trash2,
  Search,
  Sparkles,
  MessageSquare,
  HelpCircle,
  FolderOpen,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { LearningHistoryItem, StudentLevel, LanguageCode } from '../types';

interface MyLearningProps {
  history: LearningHistoryItem[];
  onSelectTopic: (topicOrQuestion: string) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  studentLevel: StudentLevel;
  language: LanguageCode;
}

export const MyLearning: React.FC<MyLearningProps> = ({
  history,
  onSelectTopic,
  onDeleteItem,
  onClearAll,
  studentLevel,
  language,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(history.map((h) => h.category || 'General')))];

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.summary && item.summary.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || (item.category || 'General') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md">
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Learning Activity Log</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Learning</h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Review your previously asked topics and academic questions. Click any topic to continue your conversation with EduGenie right where you left off.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="text-2xl font-bold text-amber-300">{history.length}</div>
            <div className="text-xs text-slate-300 font-medium">Topics Explored</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search past topics or questions..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}

          {history.length > 0 && (
            <button
              onClick={onClearAll}
              className="ml-auto text-xs text-slate-400 hover:text-rose-600 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 transition flex items-center gap-1 shrink-0"
              title="Clear all learning history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* History Items List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <FolderOpen className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No learning history found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm
                ? 'No topics matched your search criteria. Try a different query.'
                : 'Start exploring academic questions with EduGenie to build your personal learning history.'}
            </p>
          </div>
          <button
            onClick={() => onSelectTopic('Explain photosynthesis.')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Try an Example Question</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {item.category || 'Topic'}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.dateFormatted}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {item.topic}
                </h3>

                <div className="text-xs text-slate-600 flex items-start gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span className="font-medium italic">"{item.question}"</span>
                </div>

                {item.summary && (
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pl-1">
                    {item.summary}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => onSelectTopic(item.question)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs group-hover:shadow-xs"
                >
                  <span>Continue Learning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition"
                  title="Delete from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
