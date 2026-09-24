import { StudyPlan, SmartNote, QuizResult, UserStats, StudentLevel, LanguageCode, LearningHistoryItem } from '../types';

const STATS_KEY = 'edugenie_user_stats';
const PLANS_KEY = 'edugenie_saved_plans';
const NOTES_KEY = 'edugenie_saved_notes';
const QUIZ_RESULTS_KEY = 'edugenie_quiz_results';
const SETTINGS_KEY = 'edugenie_user_settings';
const HISTORY_KEY = 'edugenie_learning_history';

export interface UserSettings {
  studentLevel: StudentLevel;
  language: LanguageCode;
}

const DEFAULT_SETTINGS: UserSettings = {
  studentLevel: 'Undergraduate / College',
  language: 'English',
};

const DEFAULT_STATS: UserStats = {
  studyMinutes: 145,
  quizzesTaken: 4,
  averageScore: 88,
  streakDays: 5,
  problemsSolved: 12,
  notesSaved: 3,
  completedTasks: {},
};

export function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error(e);
  }
}

export function loadStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

export function updateStats(updater: (prev: UserStats) => UserStats): UserStats {
  const current = loadStats();
  const next = updater(current);
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(next));
  } catch (e) {
    console.error(e);
  }
  return next;
}

export function loadSavedPlans(): StudyPlan[] {
  try {
    const raw = localStorage.getItem(PLANS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    {
      id: 'default-plan-1',
      title: 'Calculus II & Differential Equations Sprint',
      topic: 'Calculus II (Integrals & Series)',
      overview: 'A high-impact 7-day milestone curriculum to master integration techniques, convergence tests, and power series.',
      studentLevel: 'Undergraduate / College',
      totalEstimatedHours: 14,
      createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 2).toISOString(),
      highYieldTips: [
        'Recognize trigonometric substitution patterns early (sin/tan/sec)',
        'Check ratio test first for series with factorials or nth powers',
        'Draw the cross-sectional disk or washer for solids of revolution',
      ],
      recommendedResources: ['Stewart Calculus Ch. 7-11', "Paul's Online Math Notes", '3Blue1Brown Essence of Calculus'],
      dailyMilestones: [
        {
          day: 1,
          title: 'Advanced Integration Techniques',
          focus: 'Integration by Parts & Partial Fraction Decomposition',
          keyConcepts: ['LIATE rule prioritization', 'Heaviside cover-up method', 'Improper integrals evaluation'],
          actionTasks: [
            'Solve 4 integration by parts problems involving polynomials and exponentials',
            'Derive the partial fraction decomposition for quadratic irreducible terms',
            'Take a 5-minute active recall quiz on integration shortcuts',
          ],
          estimatedMinutes: 120,
          reviewCheck: 'Can you write the integration by parts formula from memory without pausing?',
        },
        {
          day: 2,
          title: 'Trigonometric Integrals & Substitutions',
          focus: 'Powers of sin/cos/tan and triangle substitutions',
          keyConcepts: ['Half-angle identities', 'x = a sin(θ) substitutions', 'Hyperbolic substitutes'],
          actionTasks: [
            'Work through 3 definite integrals with square root radicals',
            'Memorize the Weierstrass substitution for tough rational trig functions',
          ],
          estimatedMinutes: 120,
          reviewCheck: 'When do you substitute x = a tan(θ) vs x = a sin(θ)?',
        },
        {
          day: 3,
          title: 'Infinite Sequences and Series Convergence',
          focus: 'Divergence Test, Integral Test & Comparison Tests',
          keyConcepts: ['p-series criterion', 'Direct comparison vs limit comparison', 'Alternating Series remainder theorem'],
          actionTasks: [
            'Classify 10 series using the quickest convergence test',
            'Prove whether harmonic series converges or diverges',
          ],
          estimatedMinutes: 120,
          reviewCheck: 'Does a sequence an -> 0 guarantee the series converges?',
        },
      ],
    },
  ];
}

export function savePlan(plan: StudyPlan): void {
  const current = loadSavedPlans().filter((p) => p.id !== plan.id);
  const updated = [plan, ...current];
  try {
    localStorage.setItem(PLANS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function deletePlan(id: string): void {
  const updated = loadSavedPlans().filter((p) => p.id !== id);
  try {
    localStorage.setItem(PLANS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function loadSavedNotes(): SmartNote[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    {
      id: 'default-note-1',
      title: 'Neural Networks & Gradient Descent',
      format: 'cornell',
      createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      executiveSummary: 'Neural networks are parameterized non-linear function approximators optimized by propagating loss gradients backwards through computational graphs via the chain rule.',
      cornellCues: [
        {
          cue: 'What is the role of the activation function?',
          notes: 'Introduces non-linearity. Without activations, multiple matrix multiplications collapse into a single linear transformation regardless of network depth.',
        },
        {
          cue: 'How does Backpropagation compute gradients?',
          notes: 'Applies multivariate chain rule starting from loss function backwards to layer weights: ∂L/∂W = (∂L/∂y) * (∂y/∂z) * (∂z/∂W).',
        },
        {
          cue: 'Why does Adam optimizer outperform vanilla SGD?',
          notes: 'Combines momentum (exponential moving average of past gradients) with adaptive learning rates (RMSProp-style scaling by historical variance).',
        },
      ],
      keyTakeaways: [
        'Loss function measures disparity between predicted logits and ground truth',
        'Vanishing gradients happen when activation derivatives < 1 across deep chains (e.g. sigmoid)',
        'ReLU mitigates vanishing gradients for positive inputs',
        'Batch normalization stabilizes hidden unit distribution shifts',
      ],
      vocabularyGlossary: [
        { term: 'Epoch', definition: 'One complete forward and backward pass of all training examples.' },
        { term: 'Overfitting', definition: 'High training accuracy with poor validation generalization.' },
        { term: 'Dropout', definition: 'Randomly zeroing activations during training with probability p.' },
      ],
      flashcards: [
        { front: 'Why do we need non-linear activation functions in deep networks?', back: 'Without them, any multi-layer perceptron collapses into a single linear regression model.', difficulty: 'Medium' },
        { front: 'What is the vanishing gradient problem?', back: 'Gradients shrink exponentially when propagating backward through layers with small derivative activations like sigmoid.', difficulty: 'Hard' },
      ],
      reviewExamQuestions: [
        'Explain how momentum helps gradient descent escape saddle points.',
        'Derive the gradient of cross-entropy loss with respect to softmax output.',
      ],
    },
  ];
}

export function saveSmartNote(note: SmartNote): void {
  const current = loadSavedNotes().filter((n) => n.id !== note.id);
  const updated = [note, ...current];
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function deleteSmartNote(id: string): void {
  const updated = loadSavedNotes().filter((n) => n.id !== id);
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function loadQuizResults(): QuizResult[] {
  try {
    const raw = localStorage.getItem(QUIZ_RESULTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    {
      id: 'result-1',
      quizTitle: 'Organic Chemistry Reactions',
      topic: 'Electrophilic Aromatic Substitution',
      difficulty: 'Medium',
      score: 4,
      totalQuestions: 5,
      percentage: 80,
      date: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
      userAnswers: [0, 1, 2, 0, 1],
    },
    {
      id: 'result-2',
      quizTitle: 'Data Structures & Algorithms',
      topic: 'Binary Trees & Graphs',
      difficulty: 'Hard',
      score: 5,
      totalQuestions: 5,
      percentage: 100,
      date: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
      userAnswers: [0, 2, 1, 3, 0],
    },
  ];
}

export function recordQuizResult(result: QuizResult): void {
  const current = loadQuizResults();
  const updated = [result, ...current];
  try {
    localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }

  // Update cumulative stats
  updateStats((prev) => {
    const newCount = prev.quizzesTaken + 1;
    const newAverage = Math.round((prev.averageScore * prev.quizzesTaken + result.percentage) / newCount);
    return {
      ...prev,
      quizzesTaken: newCount,
      averageScore: newAverage,
      studyMinutes: prev.studyMinutes + 15,
    };
  });
}

export function loadLearningHistory(): LearningHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    {
      id: 'demo-hist-1',
      topic: 'Photosynthesis & Chloroplast Reactions',
      question: 'Explain photosynthesis.',
      timestamp: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
      dateFormatted: 'Today at ' + new Date(Date.now() - 3600 * 1000 * 3).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Biology',
      summary: 'Explanation of light-dependent and Calvin cycle reactions converting solar photon energy into chemical glucose.',
    },
    {
      id: 'demo-hist-2',
      topic: "Newton's Laws of Motion",
      question: "What is Newton's Third Law?",
      timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      dateFormatted: 'Yesterday at ' + new Date(Date.now() - 3600 * 1000 * 24).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Physics',
      summary: 'Action and reaction force pairs with common real-world examples and common student misconceptions.',
    },
    {
      id: 'demo-hist-3',
      topic: 'Artificial Intelligence & Neural Networks',
      question: 'Explain Artificial Intelligence.',
      timestamp: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
      dateFormatted: '2 days ago',
      category: 'Computer Science',
      summary: 'Distinction between rule-based systems, machine learning, and generative foundational models like Gemini.',
    },
    {
      id: 'demo-hist-4',
      topic: 'Machine Learning Fundamentals',
      question: 'What is machine learning?',
      timestamp: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
      dateFormatted: '3 days ago',
      category: 'Data Science',
      summary: 'Overview of supervised, unsupervised, and reinforcement paradigms with loss function optimization.',
    },
  ];
}

export function saveLearningHistoryItem(item: LearningHistoryItem): void {
  const current = loadLearningHistory().filter((h) => h.id !== item.id && h.question !== item.question);
  const updated = [item, ...current].slice(0, 50); // keep last 50
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function deleteLearningHistoryItem(id: string): void {
  const updated = loadLearningHistory().filter((h) => h.id !== id);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
}

export function clearLearningHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error(e);
  }
}

