import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Bookmark,
  Copy,
  Check,
  RotateCw,
  BookOpen,
  HelpCircle,
  Brain,
  Trash2,
  Download,
  Lightbulb,
} from 'lucide-react';
import { SmartNote, StudentLevel, LanguageCode } from '../types';

interface SmartNotesProps {
  studentLevel: StudentLevel;
  language: LanguageCode;
  savedNotes: SmartNote[];
  onSaveNote: (note: SmartNote) => void;
  onDeleteNote: (id: string) => void;
  onStudyLogged?: (minutes: number) => void;
}

const PRESET_MATERIALS = [
  {
    title: 'Photosynthesis & Light Reactions',
    content: `Photosynthesis occurs within plant chloroplasts, specifically dividing into light-dependent reactions in the thylakoid membranes and light-independent reactions (Calvin Cycle) in the stroma. 
During the light reactions, photons excite electrons in Photosystem II (P680). Water photolysis splits H2O into oxygen, protons, and replacement electrons: 2H2O -> O2 + 4H+ + 4e-. 
Electrons flow through the electron transport chain (plastoquinone, cytochrome b6f complex, plastocyanin) to Photosystem I (P700), pumping H+ ions into the thylakoid lumen to create a proton-motive gradient. ATP synthase uses this chemiosmotic gradient to phosphorylate ADP into ATP, while NADP+ reductase reduces NADP+ into NADPH. 
Both ATP and NADPH then power the Calvin cycle, where RuBisCO catalyzes carbon fixation of CO2 into 3-phosphoglycerate, which is reduced to G3P (glyceraldehyde 3-phosphate) to manufacture glucose and other carbohydrates.`,
  },
  {
    title: 'Macroeconomics: Keynesian vs Classical',
    content: `Classical macroeconomics relies on Say's Law ('supply creates its own demand') and assumes price and wage flexibility will always guide market economies back to full employment naturally in the long run. Any recessionary dip is viewed as temporary, with interest rates acting as the equilibrating mechanism between savings and investment. 
In contrast, John Maynard Keynes argued in 'The General Theory' that aggregate demand drives total economic output, especially in the short run. Keynes highlighted wage stickiness, liquidity traps, and animal spirits: when uncertainty strikes, savings rise while private investment collapses, generating persistent involuntary unemployment. 
Keynesian theory advocates active counter-cyclical fiscal policy—government spending and targeted tax cuts—to inject aggregate demand and escape prolonged deflationary recessions.`,
  },
  {
    title: 'Operating Systems: Virtual Memory & Paging',
    content: `Virtual memory abstracts physical DRAM into contiguous virtual address spaces for each process, protecting processes from one another and allowing programs larger than physical memory to execute. The Memory Management Unit (MMU) translates virtual addresses to physical addresses using Page Tables.
Addresses consist of a virtual page number (VPN) and an offset. Because multi-level page tables require multiple memory lookups, hardware provides a Translation Lookaside Buffer (TLB), an associative cache for recent translations.
When a process references a page not currently present in RAM, the hardware raises a Page Fault interrupt. The operating system kernel locates the requested page on backing swap storage, evicts a victim page if RAM is full (using replacement algorithms like LRU, FIFO, or Clock), and updates the page table. High page-fault frequency leads to thrashing, where CPU spends more time swapping pages than computing.`,
  },
];

export const SmartNotes: React.FC<SmartNotesProps> = ({
  studentLevel,
  language,
  savedNotes,
  onSaveNote,
  onDeleteNote,
  onStudyLogged,
}) => {
  const [inputText, setInputText] = useState('');
  const [format, setFormat] = useState<'cornell' | 'bullet' | 'flashcards' | 'brief'>('cornell');
  const [loading, setLoading] = useState(false);
  const [activeNote, setActiveNote] = useState<SmartNote | null>(savedNotes[0] || null);
  const [activeTab, setActiveTab] = useState<'notes' | 'flashcards' | 'glossary'>('notes');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const handleSummarize = async (overrideContent?: string) => {
    const text = overrideContent || inputText;
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/summarize-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: text,
          format,
          studentLevel,
          language,
        }),
      });

      const data = await res.json();
      const newNote: SmartNote = {
        id: `note-${Date.now()}`,
        title: data.title || 'Summarized Study Notes',
        format,
        executiveSummary: data.executiveSummary || 'Executive summary of key study concepts.',
        cornellCues: data.cornellCues || [],
        keyTakeaways: data.keyTakeaways || [],
        vocabularyGlossary: data.vocabularyGlossary || [],
        flashcards: data.flashcards || [],
        reviewExamQuestions: data.reviewExamQuestions || [],
        createdAt: new Date().toISOString(),
        originalText: text,
      };

      setActiveNote(newNote);
      onSaveNote(newNote);
      setFlippedCards({});
      if (onStudyLogged) onStudyLogged(10);
    } catch (err) {
      console.error(err);
      alert('Error creating notes summary. Please verify connection.');
    } finally {
      setLoading(false);
    }
  };

  const handlePresetSelect = (preset: typeof PRESET_MATERIALS[0]) => {
    setInputText(preset.content);
    handleSummarize(preset.content);
  };

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const copyNotes = () => {
    if (!activeNote) return;
    let text = `# ${activeNote.title}\n\n`;
    text += `## Executive Summary\n${activeNote.executiveSummary}\n\n`;
    if (activeNote.keyTakeaways) {
      text += `## Key Takeaways\n` + activeNote.keyTakeaways.map((t) => `- ${t}`).join('\n') + '\n\n';
    }
    if (activeNote.cornellCues) {
      text += `## Cornell Notes\n` + activeNote.cornellCues.map((c) => `### ${c.cue}\n${c.notes}`).join('\n\n') + '\n\n';
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Input / Form Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Smart Notes & Cornell Summarization</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Transform raw lecture transcripts, textbooks, or research into organized notes with active recall flashcards
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap">Load Preset:</span>
            {PRESET_MATERIALS.map((p, i) => (
              <button
                key={i}
                onClick={() => handlePresetSelect(p)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 font-medium transition whitespace-nowrap border border-slate-200/60"
              >
                {p.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
            placeholder="Paste your study material, lecture transcript, article, or topic here..."
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 text-sm outline-none resize-none font-medium leading-relaxed"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Format Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFormat('cornell')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                format === 'cornell' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cornell Format
            </button>
            <button
              onClick={() => setFormat('bullet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                format === 'bullet' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Key Bullets
            </button>
            <button
              onClick={() => setFormat('flashcards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                format === 'flashcards' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Flashcards Focus
            </button>
            <button
              onClick={() => setFormat('brief')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                format === 'brief' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3-Min Brief
            </button>
          </div>

          <button
            onClick={() => handleSummarize()}
            disabled={!inputText.trim() || loading}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{loading ? 'Synthesizing with Gemini...' : 'Generate Smart Notes'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout: Active Note View & Notes Library */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Note Viewer */}
        <div className="lg:col-span-2 space-y-4">
          {activeNote ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              {/* Note Header & Subtabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{activeNote.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Saved on {new Date(activeNote.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyNotes}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium flex items-center gap-1.5 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Sub-tab Navigation */}
              <div className="flex border-b border-slate-100 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`pb-2.5 px-4 flex items-center gap-1.5 border-b-2 transition ${
                    activeTab === 'notes'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Structured Notes</span>
                </button>
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className={`pb-2.5 px-4 flex items-center gap-1.5 border-b-2 transition ${
                    activeTab === 'flashcards'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  <span>Interactive Flashcards ({activeNote.flashcards?.length || 0})</span>
                </button>
                <button
                  onClick={() => setActiveTab('glossary')}
                  className={`pb-2.5 px-4 flex items-center gap-1.5 border-b-2 transition ${
                    activeTab === 'glossary'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Key Terms Glossary ({activeNote.vocabularyGlossary?.length || 0})</span>
                </button>
              </div>

              {/* View 1: Structured Notes */}
              {activeTab === 'notes' && (
                <div className="space-y-6">
                  {/* Executive Summary Box */}
                  <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-4 text-emerald-950 text-xs leading-relaxed">
                    <span className="font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                      ⚡ Executive 3-Minute Distillation:
                    </span>
                    <p className="font-medium text-slate-700">{activeNote.executiveSummary}</p>
                  </div>

                  {/* Cornell Format Display */}
                  {activeNote.cornellCues && activeNote.cornellCues.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Cornell Notes (Cues & Working Notes)
                      </h4>
                      <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                        {activeNote.cornellCues.map((item, idx) => (
                          <div key={idx} className="grid grid-cols-1 md:grid-cols-3 hover:bg-slate-50/50 transition">
                            <div className="p-3.5 bg-slate-50/80 border-b md:border-b-0 md:border-r border-slate-100 font-bold text-xs text-indigo-900 flex items-start gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                              <span>{item.cue}</span>
                            </div>
                            <div className="p-3.5 md:col-span-2 text-xs text-slate-700 leading-relaxed font-normal">
                              {item.notes}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Takeaways Bullets */}
                  {activeNote.keyTakeaways && activeNote.keyTakeaways.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        High-Yield Takeaways
                      </h4>
                      <ul className="space-y-2">
                        {activeNote.keyTakeaways.map((point, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Potential Exam Questions */}
                  {activeNote.reviewExamQuestions && activeNote.reviewExamQuestions.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs space-y-2">
                      <span className="font-bold text-amber-900 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        Predicted Exam Questions from this material:
                      </span>
                      <ol className="list-decimal list-inside space-y-1 text-slate-700">
                        {activeNote.reviewExamQuestions.map((q, i) => (
                          <li key={i} className="font-medium">{q}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {/* View 2: Flashcards */}
              {activeTab === 'flashcards' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Click any card to flip between Question and Answer</span>
                    <button
                      onClick={() => setFlippedCards({})}
                      className="text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <RotateCw className="w-3 h-3" /> Reset all
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeNote.flashcards.map((card, idx) => {
                      const isFlipped = flippedCards[idx];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleFlip(idx)}
                          className={`min-h-[160px] p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between select-none shadow-2xs ${
                            isFlipped
                              ? 'bg-gradient-to-br from-indigo-900 to-indigo-950 text-white border-indigo-800'
                              : 'bg-white hover:border-emerald-300 border-slate-200 text-slate-800 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className={isFlipped ? 'text-indigo-300' : 'text-emerald-700'}>
                              {isFlipped ? 'ANSWER' : 'QUESTION'} #{idx + 1}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                                isFlipped
                                  ? 'bg-indigo-800 text-indigo-200'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {card.difficulty || 'Medium'}
                            </span>
                          </div>

                          <div className="my-3 text-xs sm:text-sm font-medium leading-relaxed">
                            {isFlipped ? card.back : card.front}
                          </div>

                          <div className={`text-[11px] flex items-center justify-between ${isFlipped ? 'text-indigo-400' : 'text-slate-400'}`}>
                            <span>Tap to flip</span>
                            <RotateCw className="w-3 h-3" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* View 3: Glossary */}
              {activeTab === 'glossary' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeNote.vocabularyGlossary.map((g, i) => (
                      <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                        <div className="font-bold text-xs text-indigo-950">{g.term}</div>
                        <div className="text-xs text-slate-600 leading-snug">{g.definition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <FileText className="w-12 h-12 text-emerald-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Notes Selected</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Paste study content into the box above to generate Cornell notes, flashcards, and definitions.
              </p>
            </div>
          )}
        </div>

        {/* Right 1 Col: Saved Notes Library */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-emerald-600" />
                Notes Library ({savedNotes.length})
              </span>
            </h3>

            <div className="space-y-2.5">
              {savedNotes.map((n) => {
                const isSelected = activeNote?.id === n.id;
                return (
                  <div
                    key={n.id}
                    onClick={() => {
                      setActiveNote(n);
                      setActiveTab('notes');
                    }}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{n.title}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteNote(n.id);
                          }}
                          className="text-slate-400 hover:text-rose-600 transition"
                          title="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{n.executiveSummary}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mt-3 pt-2 border-t border-slate-200/60">
                      <span className="capitalize">{n.format}</span>
                      <span>{n.flashcards?.length || 0} Flashcards</span>
                    </div>
                  </div>
                );
              })}

              {savedNotes.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400">
                  No saved notes yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
