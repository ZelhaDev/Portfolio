const BASE = import.meta.env.BASE_URL; // '/Portfolio/' — public assets must be prefixed with it

export const projects = [
  {
    slug: 'game-over-it',
    name: 'Game Over It',
    tagline: 'A personal video-game backlog tracker with a one-button Steam import.',
    role: 'Solo project — design, front end, API, database, accessibility',
    team: 'Solo',
    timeline: 'Fall 2026',
    stack: ['React 18', 'Vite', 'Express 4', 'PostgreSQL 16', 'Steam Web API', 'CSS design tokens'],
    summary:
      'One list for every game you mean to play, are playing, finished, or gave up on — seeded from your Steam library instead of typed in by hand.',
    problem:
      'A spreadsheet cannot tell "bought it" apart from "playing it", and a store wishlist disappears the moment you buy the game. Steam tracks what you own, but it has no concept of "I bounced off this at hour six", and it cannot hold the Switch game or the emulated one. Game Over It is one list that does both jobs.',
    features: [
      'Four play states (Want to play, Playing, Completed, Abandoned) with live counts, search by title, and sort',
      'Add, edit, and delete games with field-level validation and a confirmation dialog on delete',
      'Steam import by profile URL, vanity name, or 64-bit ID',
      'A sync that matches on Steam app id and never overwrites your status, rating, notes, or cover art',
      'Private Steam libraries are explained instead of reported as a successful import of zero games',
      'A demo mode so the deployed site runs with no server or database behind it',
    ],
    contributions: [
      'Built the entire stack: React 18 + Vite front end, Express 4 REST API with ten endpoints, and the PostgreSQL schema and seed',
      'Designed the plain-CSS design system with custom-property tokens and an atomic component structure',
      'Wrote the Steam Web API client with typed errors for private profiles, missing keys, and upstream failures',
      'Verified accessibility against the running app: a contrast-check script reading tokens.css reports 0 failures, plus semantic landmarks, labels on every input, visible focus rings, and a trap-free confirm dialog',
    ],
    challenges: [
      'The Steam API returns a successful empty list for a private profile, indistinguishable from "this account owns no games". The fix was an explicit private state in the UI instead of a fake zero import — the proposal flagged this as the one place a silent failure would destroy trust.',
      'Re-syncing a library could have wiped user data. Matching on Steam app id and updating playtime only means nothing the user set is ever lost.',
    ],
    metrics: [
      '10 REST endpoints; every failure response is one sentence',
      'Accessibility checklist verified item by item against the running app',
    ],
    links: {
      repo: 'https://github.com/ZelhaDev/GameOverIt',
      live: 'https://zelhadev.github.io/GameOverIt/',
    },
    visual: {
      type: 'screenshot',
      src: `${BASE}images/game-over-it.png`,
      alt: 'The Game Over It backlog screen: game cards with cover art, status filter chips, search, sort control and rating stars',
    },
    aiNote:
      'Development is documented in AI-USAGE.md, which names each file with the commit that touched it.',
  },
  {
    slug: 'tsc-model',
    name: 'TSC-Model',
    tagline: 'Traffic sign classification on GTSRB: a from-scratch CNN, NLP sign descriptions, and RL navigation.',
    role: 'Code contributions across the model pipeline; Data Ethics lead',
    team: 'Team of 4 — Half_Exception (CS-304, Holy Angel University)',
    timeline: 'Spring 2026',
    stack: ['Python', 'PyTorch', 'scikit-learn', 'OpenCV', 'gymnasium', 'matplotlib'],
    summary:
      'A research prototype that classifies 43 German traffic sign classes, explains predictions in plain language through an NLP component, and feeds the classifier into a reinforcement-learning grid world.',
    problem:
      'Road-safety-critical perception: identify traffic signs from images under varying lighting, angle, and resolution, then say what a prediction means in plain language, and let an RL agent navigate a grid world where signs modify the reward signal.',
    features: [
      'A custom residual CNN built from scratch — residual skip connections, BatchNorm, global average pooling, configurable depth',
      'A TextCNN that maps class IDs to human-readable sign descriptions',
      'A tabular Q-learning grid-world agent with a CNN-to-RL bridge, trained across 3 seeds with variance reporting',
      'A HOG + RBF SVM baseline as the traditional-ML comparison point',
      'A full evaluation suite: confusion matrices, ROC/PR curves, three-axis ablations (augmentation, learning rate, depth), error analysis, and Grad-CAM',
      'One-command reproduction of the whole pipeline via run.sh',
    ],
    contributions: [
      'Contributed code across the model pipeline: CNN, NLP, RL, and SVM components',
      'Served as Data Ethics lead: authored the ethics statement covering geographic bias in the German-only dataset, the 12.5:1 class imbalance, distribution shift, and prototype-only deployment limits',
      'Wrote the responsible-use guidelines and the risk/mitigation table covering safety-critical misuse',
    ],
    challenges: [
      'The from-scratch CNN (41.72% test accuracy) trailed the HOG+SVM baseline (81.97% test). Reporting that honestly was a deliberate choice: the value of the project is the full pipeline, the evaluation suite, and the ethics work — not a headline number.',
      'GTSRB contains only German signs photographed in Central Europe. The ethics statement documents that deployment outside that domain requires revalidation, and that a misclassified stop sign in a live system is unacceptable without certification.',
    ],
    metrics: [
      'SVM (HOG + RBF): 81.97% test accuracy, 0.75 macro-F1',
      'TextCNN (NLP descriptions): 75.36% validation accuracy, 0.74 macro-F1',
      'Custom CNN: 41.72% test accuracy',
      'RL agent: converged across 3 seeds with confidence-band learning curves',
    ],
    links: {
      repo: 'https://github.com/ZelhaDev/TSC-Model',
    },
    visual: { type: 'none' },
  },
  {
    slug: 'marketmate',
    name: 'MarketMate',
    tagline: 'A Flutter grocery app for tracking your groceries and checking your spending.',
    role: 'Search/filter and digital cart & checkout; docs, comments, theme and storage',
    team: 'Team of 3',
    stack: ['Flutter', 'Dart', 'Local storage'],
    summary:
      'A mobile app that lets shoppers search items, rebuild a cart from past trips, and keep an eye on spending.',
    problem:
      'Grocery shoppers lose track of what they already buy and what it costs. MarketMate keeps the item list searchable, the cart quick to rebuild from history, and the budget visible.',
    features: [
      'Search and filter across the item list',
      'Digital cart and checkout, with items added from past trips',
      'A budget card and history page across the app',
      'Local storage so the app works without a backend',
    ],
    contributions: [
      'Implemented search and filtering and the digital cart & checkout flow',
      'Wrote the technical documentation and code comments',
      'Built and maintained the theme and the local storage layer',
    ],
    links: {
      repo: 'https://github.com/vnctdg/MarketMate',
    },
    visual: { type: 'none' },
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
