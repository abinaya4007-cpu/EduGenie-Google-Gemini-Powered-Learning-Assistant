import React, { useState } from 'react';
import {
  Calendar,
  Sparkles,
  Clock,
  CheckCircle2,
  Bookmark,
  Share2,
  Trash2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Target,
  Download,
  Flame,
  Check,
} from 'lucide-react';
import { StudyPlan, StudentLevel, LanguageCode, UserStats } from '../types';

interface StudyPlanGeneratorProps {
  studentLevel: StudentLevel;
  language: LanguageCode;
  savedPlans: StudyPlan[];
  onSavePlan: (plan: StudyPlan) => void;
  onDeletePlan: (id: string) => void;
  stats: UserStats;
  onToggleTask: (planId: string, day: number, taskIndex: number) => void;
}

const PRESET_TOPICS = [
  {
    topic: 'Calculus II & Differential Equations',
    goal: 'Ace university final exam with top marks on Taylor series & integrals',
    days: 7,
    hours: 3,
  },
  {
    topic: 'Data Structures & Algorithms',
    goal: 'Master Trees, Graphs, Dynamic Programming for technical interviews',
    days: 14,
    hours: 2,
  },
  {
    topic: 'Organic Chemistry Reactions',
    goal: 'Memorize reaction mechanisms and retrosynthetic analysis',
    days: 10,
    hours: 2,
  },
  {
    topic: 'Cellular Biology & Genetics',
    goal: 'Understand DNA replication, protein synthesis, and Mendelian inheritance',
    days: 5,
    hours: 2,
  },
];

export const StudyPlanGenerator: React.FC<StudyPlanGeneratorProps> = ({
  studentLevel,
  language,
  savedPlans,
  onSavePlan,
  onDeletePlan,
  stats,
  onToggleTask,
}) => {
  const [topic, setTopic] = useState('');
  const [targetGoal, setTargetGoal] = useState('');
  const [durationDays, setDurationDays] = useState(7);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [learningStyle, setLearningStyle] = useState('Practical / Problem Solving');
  const [loading, setLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<StudyPlan | null>(savedPlans[0] || null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleGenerate = async (customTopic?: string, customGoal?: string, customDays?: number, customHours?: number) => {
    const selectedTopic = customTopic || topic;
    const selectedGoal = customGoal || targetGoal || `Master ${selectedTopic} thoroughly`;
    const selectedDays = customDays || durationDays;
    const selectedHours = customHours || hoursPerDay;

    if (!selectedTopic.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic,
          studentLevel,
          targetGoal: selectedGoal,
          hoursPerDay: selectedHours,
          durationDays: selectedDays,
          learningStyle,
          language,
        }),
      });

      const data = await res.json();
      const newPlan: StudyPlan = {
        id: `plan-${Date.now()}`,
        title: data.title || `${selectedTopic} Study Plan`,
        topic: selectedTopic,
        overview: data.overview || `Personalized ${selectedDays}-day curriculum tailored for ${studentLevel}.`,
        studentLevel,
        totalEstimatedHours: data.totalEstimatedHours || selectedDays * selectedHours,
        dailyMilestones: data.dailyMilestones || [],
        highYieldTips: data.highYieldTips || [],
        recommendedResources: data.recommendedResources || [],
        createdAt: new Date().toISOString(),
      };

      setCurrentPlan(newPlan);
      onSavePlan(newPlan);
      setExpandedDay(1);
    } catch (err) {
      console.error(err);
      alert('Could not generate plan. Please verify connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_TOPICS[0]) => {
    setTopic(preset.topic);
    setTargetGoal(preset.goal);
    setDurationDays(preset.days);
    setHoursPerDay(preset.hours);
    handleGenerate(preset.topic, preset.goal, preset.days, preset.hours);
  };

  const exportPlanAsText = () => {
    if (!currentPlan) return;
    let text = `# ${currentPlan.title}\n\n`;
    text += `Target Student Level: ${currentPlan.studentLevel}\n`;
    text += `Total Hours: ${currentPlan.totalEstimatedHours} hrs\n`;
    text += `Overview: ${currentPlan.overview}\n\n`;
    text += `## Daily Road Map:\n`;
    currentPlan.dailyMilestones.forEach((m) => {
      text += `\n### Day ${m.day}: ${m.title} (${m.estimatedMinutes} min)\n`;
      text += `Focus: ${m.focus}\n`;
      text += `Key Concepts: ${m.keyConcepts.join(', ')}\n`;
      text += `Tasks:\n`;
      m.actionTasks.forEach((t) => (text += `- [ ] ${t}\n`));
      text += `Retention Check: ${m.reviewCheck}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Personalized Study Plan Generator</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Custom-built milestone schedules tuned for <span className="font-semibold text-indigo-600">{studentLevel}</span> learners
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap">Try Template:</span>
            {PRESET_TOPICS.map((p, i) => (
              <button
                key={i}
                onClick={() => handleApplyPreset(p)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition font-medium whitespace-nowrap border border-slate-200/60"
              >
                {p.topic.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subject or Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Molecular Biology, Linear Algebra, Macroeconomics"
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 text-sm outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Duration
            </label>
            <select
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 text-sm outline-none font-medium"
            >
              <option value={3}>3-Day Quick Cram</option>
              <option value={7}>7-Day Sprint (1 Week)</option>
              <option value={14}>14-Day Deep Mastery (2 Weeks)</option>
              <option value={30}>30-Day Comprehensive</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Study Time / Day
            </label>
            <select
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(Number(e.target.value))}
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 text-sm outline-none font-medium"
            >
              <option value={1}>1 hour / day (Light)</option>
              <option value={2}>2 hours / day (Standard)</option>
              <option value={3}>3 hours / day (Intensive)</option>
              <option value={5}>5+ hours / day (Full Time)</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Goal / Exam Details
            </label>
            <input
              type="text"
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              placeholder="e.g. Score 90%+ on university midterm next Friday"
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 text-sm outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => handleGenerate()}
              disabled={!topic.trim() || loading}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{loading ? 'Crafting Plan...' : 'Generate Plan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Plan View & Saved Plans sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Plan Detail */}
        <div className="lg:col-span-2 space-y-4">
          {currentPlan ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              {/* Plan Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
                    <Target className="w-3.5 h-3.5" />
                    <span>{currentPlan.studentLevel}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{currentPlan.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">{currentPlan.overview}</p>
                </div>

                <div className="flex items-center gap-2 self-start">
                  <button
                    onClick={exportPlanAsText}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition"
                    title="Copy plan to clipboard"
                  >
                    {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{copiedNotification ? 'Copied!' : 'Export'}</span>
                  </button>
                </div>
              </div>

              {/* Tips & Metrics Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Estimated Time</span>
                  <div className="text-lg font-bold text-slate-800">{currentPlan.totalEstimatedHours} Hours</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-medium">Total Days</span>
                  <div className="text-lg font-bold text-indigo-600">{currentPlan.dailyMilestones.length} Days</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-slate-500 font-medium">Target Topic</span>
                  <div className="text-sm font-bold text-slate-800 truncate">{currentPlan.topic}</div>
                </div>
              </div>

              {/* High Yield Tips */}
              {currentPlan.highYieldTips && currentPlan.highYieldTips.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Genie High-Yield Exam Advice:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-amber-800/90 pl-1">
                    {currentPlan.highYieldTips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Daily Milestones Accordion */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Day-by-Day Learning Roadmap
                </h4>

                {currentPlan.dailyMilestones.map((m) => {
                  const isExpanded = expandedDay === m.day;
                  // Count completed tasks for this day
                  const completedForDay = m.actionTasks.filter(
                    (_, idx) => stats.completedTasks[`${currentPlan.id}-${m.day}-${idx}`]
                  ).length;
                  const allDone = completedForDay === m.actionTasks.length && m.actionTasks.length > 0;

                  return (
                    <div
                      key={m.day}
                      className={`rounded-xl border transition ${
                        allDone
                          ? 'border-emerald-200 bg-emerald-50/20'
                          : isExpanded
                          ? 'border-indigo-300 bg-indigo-50/10 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {/* Accordion Header */}
                      <button
                        onClick={() => setExpandedDay(isExpanded ? null : m.day)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                              allDone
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            D{m.day}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-slate-800">{m.title}</div>
                            <div className="text-xs text-slate-500 font-normal">{m.focus}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                            {completedForDay}/{m.actionTasks.length} Done
                          </span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </button>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-100">
                          {/* Key Concepts Pills */}
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                              Core Concepts to Master:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {m.keyConcepts.map((c, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Tasks Checkable */}
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                              Action Items:
                            </span>
                            <div className="space-y-2">
                              {m.actionTasks.map((task, idx) => {
                                const taskKey = `${currentPlan.id}-${m.day}-${idx}`;
                                const isDone = stats.completedTasks[taskKey];
                                return (
                                  <div
                                    key={idx}
                                    onClick={() => onToggleTask(currentPlan.id, m.day, idx)}
                                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition text-xs text-slate-700"
                                  >
                                    <CheckCircle2
                                      className={`w-4 h-4 mt-0.5 shrink-0 transition ${
                                        isDone
                                          ? 'text-emerald-600 fill-emerald-100'
                                          : 'text-slate-300 hover:text-indigo-600'
                                      }`}
                                    />
                                    <span className={`${isDone ? 'line-through text-slate-400' : 'font-medium'}`}>
                                      {task}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Retention Check Prompt */}
                          {m.reviewCheck && (
                            <div className="p-3 rounded-lg bg-slate-100/80 border border-slate-200/60 text-xs text-slate-700 flex items-start gap-2">
                              <Target className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-slate-800">Retention Self-Check: </span>
                                <span>{m.reviewCheck}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <Calendar className="w-12 h-12 text-indigo-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Study Plan Selected</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Generate a personalized plan using the form above, or click one of the quick templates.
              </p>
            </div>
          )}
        </div>

        {/* Right 1 Col: Saved Plans Library */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-indigo-600" />
                Saved Study Plans ({savedPlans.length})
              </span>
            </h3>

            <div className="space-y-2.5">
              {savedPlans.map((p) => {
                const isSelected = currentPlan?.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setCurrentPlan(p)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{p.title}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletePlan(p.id);
                          }}
                          className="text-slate-400 hover:text-rose-600 transition"
                          title="Delete plan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{p.overview}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mt-3 pt-2 border-t border-slate-200/60">
                      <span>{p.dailyMilestones.length} Days</span>
                      <span>{p.totalEstimatedHours}h total</span>
                    </div>
                  </div>
                );
              })}

              {savedPlans.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400">
                  No saved plans yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
