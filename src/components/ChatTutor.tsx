import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  User,
  RotateCcw,
  Copy,
  Check,
  Zap,
  BookOpen,
  GraduationCap,
  Lightbulb,
  FileQuestion,
  HelpCircle,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Pin,
  Key,
} from 'lucide-react';
import { marked } from 'marked';
import { ChatMessage, StudentLevel, LanguageCode, LearningHistoryItem } from '../types';

interface ChatTutorProps {
  studentLevel: StudentLevel;
  language: LanguageCode;
  initialQuery?: string;
  onClearInitialQuery?: () => void;
  onStudyLogged?: (minutes: number) => void;
  onSaveHistory?: (item: LearningHistoryItem) => void;
}

const TUTOR_STYLES = [
  {
    id: 'Socratic Tutor',
    label: 'Socratic Coach',
    desc: 'Guides you with questions to discover answers yourself',
  },
  {
    id: 'Simple Explainer',
    label: 'Simple Explainer',
    desc: 'Everyday analogies and clear, student-friendly clarity',
  },
  {
    id: 'Detailed Professor',
    label: 'Academic Depth',
    desc: 'Theoretical rigor, derivations, and comprehensive depth',
  },
  {
    id: 'Quick Exam Prep',
    label: 'Exam Cram',
    desc: 'High-yield summaries, formulas, and test pitfalls',
  },
];

const SUGGESTED_QUESTIONS = [
  'Explain Artificial Intelligence.',
  "What is Newton's Third Law?",
  'Explain photosynthesis.',
  'What is machine learning?',
];

export const ChatTutor: React.FC<ChatTutorProps> = ({
  studentLevel,
  language,
  initialQuery = '',
  onClearInitialQuery,
  onStudyLogged,
  onSaveHistory,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      content: `### 👋 Welcome! I am EduGenie, your Google Gemini-Powered Learning Assistant.
I am personalized for **${studentLevel}** studies in **${language}**.

Ask me any academic topic or homework question, and I will guide you with clear explanations, key points, examples, and key terms.

*Example:* Type **"Explain photosynthesis"** or **"What is Newton's Third Law?"** below to get started!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [tutorStyle, setTutorStyle] = useState('Simple Explainer');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastUserPrompt, setLastUserPrompt] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSend(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    setErrorMessage(null);
    setLastUserPrompt(text);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages
            .filter((m) => m.id !== 'welcome-msg')
            .slice(-6)
            .map((m) => ({ role: m.role, content: m.content })),
          studentLevel,
          tutorStyle,
          language,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const reply = data.reply || "I couldn't generate an educational response right now. Please try asking again.";

      const aiMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Save to My Learning History
      if (onSaveHistory) {
        const topicTitle = text.length > 50 ? text.slice(0, 50) + '...' : text;
        onSaveHistory({
          id: `hist-${Date.now()}`,
          topic: topicTitle,
          question: text,
          timestamp: new Date().toISOString(),
          dateFormatted: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: inferCategory(text),
          summary: reply.slice(0, 160) + '...',
        });
      }

      if (onStudyLogged) onStudyLogged(5);
    } catch (err: any) {
      console.error('Error fetching Gemini response:', err);
      setErrorMessage(
        err.message || 'Unable to connect with Gemini AI right now. Please ensure your GEMINI_API_KEY is configured or try again in a few seconds.'
      );
      setMessages((prev) => [
        ...prev,
        {
          id: `model-err-${Date.now()}`,
          role: 'model',
          content: `⚠️ **Unable to connect with Google Gemini:** ${
            err.message || 'Network hitch'
          }\n\nPlease check your internet connection or verify your API key configuration in AI Studio.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const inferCategory = (q: string): string => {
    const lower = q.toLowerCase();
    if (lower.includes('photo') || lower.includes('cell') || lower.includes('bio') || lower.includes('dna') || lower.includes('gene')) return 'Biology';
    if (lower.includes('newton') || lower.includes('force') || lower.includes('motion') || lower.includes('physics') || lower.includes('quantum')) return 'Physics';
    if (lower.includes('ai') || lower.includes('intelligence') || lower.includes('machine') || lower.includes('code') || lower.includes('algorithm') || lower.includes('data')) return 'Computer Science';
    if (lower.includes('integral') || lower.includes('derivative') || lower.includes('calculus') || lower.includes('equation') || lower.includes('algebra')) return 'Mathematics';
    if (lower.includes('chem') || lower.includes('reaction') || lower.includes('acid') || lower.includes('atom')) return 'Chemistry';
    return 'Academic Concept';
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: `Chat session reset! What new academic topic or question would you like to explore for **${studentLevel}**?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorMessage(null);
  };

  // Custom educational styling parser for Explanation, Important Points, Example, Key Terms
  const formatEducationalResponse = (markdownContent: string) => {
    // Check if the response has standard educational sections
    const hasStructuredSections =
      markdownContent.includes('### 📖 Explanation') ||
      markdownContent.includes('### 📌 Important Points') ||
      markdownContent.includes('### 💡 Example') ||
      markdownContent.includes('### 🔑 Key Terms') ||
      markdownContent.includes('**Explanation:**') ||
      markdownContent.includes('**Important Points:**') ||
      markdownContent.includes('**Example:**') ||
      markdownContent.includes('**Key Terms:**');

    return (
      <div className="space-y-3">
        {hasStructuredSections && (
          <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-200/60 text-[11px] font-semibold text-slate-500">
            <span className="text-indigo-600 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Structured Educational Format:
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700">📖 Explanation</span>
            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700">📌 Important Points</span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">💡 Example</span>
            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700">🔑 Key Terms</span>
          </div>
        )}

        <div
          className="markdown-content prose prose-sm max-w-none text-slate-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: marked.parse(markdownContent) as string }}
        />
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 pb-16">
      {/* Header Controls Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                AI Learning Assistant
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Google Gemini 3.8 Flash</span>
                <span>•</span>
                <span className="font-semibold text-indigo-600">{studentLevel}</span>
                <span>•</span>
                <span className="font-semibold text-slate-700">{language}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tutor Style Selector & Action buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {TUTOR_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setTutorStyle(style.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                tutorStyle === style.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title={style.desc}
            >
              {style.label}
            </button>
          ))}

          <button
            onClick={clearChat}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition ml-1"
            title="Clear Chat Conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Questions Quick Bar (if few messages) */}
      {messages.length <= 2 && (
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-bold whitespace-nowrap pl-1 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Quick Ask:
          </span>
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 whitespace-nowrap font-medium transition"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Messages Feed */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md h-[560px] flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    isUser
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gradient-to-tr from-indigo-700 via-indigo-800 to-purple-700 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[88%] space-y-1.5 ${isUser ? 'items-end text-right' : 'items-start'}`}>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1">
                    <span className="font-bold text-slate-700">{isUser ? 'You' : 'EduGenie Assistant'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`rounded-3xl p-5 text-sm shadow-xs relative group ${
                      isUser
                        ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-tr-xs'
                        : 'bg-slate-50/90 text-slate-800 border border-slate-200/80 rounded-tl-xs'
                    }`}
                  >
                    {isUser ? (
                      <div className="whitespace-pre-wrap font-medium text-sm sm:text-base leading-relaxed">
                        {msg.content}
                      </div>
                    ) : (
                      formatEducationalResponse(msg.content)
                    )}

                    {/* Copy Button */}
                    {!isUser && (
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-800 shadow-2xs"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading indicator with educational animation */}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-700 to-purple-700 flex items-center justify-center shrink-0 text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div className="bg-slate-50 border border-indigo-100 rounded-3xl rounded-tl-xs p-4 flex items-center gap-3 text-slate-600 text-xs font-medium shadow-xs">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>EduGenie is consulting Google Gemini to prepare your explanation...</span>
              </div>
            </div>
          )}

          {/* Error Message with Retry */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              {lastUserPrompt && (
                <button
                  onClick={() => handleSend(lastUserPrompt)}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center gap-1.5 transition shrink-0"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retry</span>
                </button>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Follow-up Buttons (e.g. "Explain it more simply") */}
        {messages.length > 1 && !loading && (
          <div className="px-4 py-2.5 bg-slate-50/90 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
              Follow-ups:
            </span>
            <button
              onClick={() => handleSend('Explain it more simply with everyday analogies.')}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition whitespace-nowrap flex items-center gap-1.5 font-semibold shadow-2xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Explain it more simply
            </button>
            <button
              onClick={() => handleSend('Can you give another detailed real-world example?')}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition whitespace-nowrap flex items-center gap-1.5 font-semibold shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> Give another example
            </button>
            <button
              onClick={() => handleSend('What are 2 practice questions to test my understanding?')}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition whitespace-nowrap flex items-center gap-1.5 font-semibold shadow-2xs"
            >
              <FileQuestion className="w-3.5 h-3.5 text-emerald-500" /> Test my understanding
            </button>
            <button
              onClick={() => handleSend('What are common misconceptions or exam pitfalls for this?')}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition whitespace-nowrap flex items-center gap-1.5 font-semibold shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-rose-500" /> Common exam pitfalls
            </button>
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask an academic question or enter a topic to learn..."
            className="flex-1 py-3.5 px-5 rounded-2xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition shadow-md"
          >
            <span>Ask EduGenie</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
