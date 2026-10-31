import { useEffect } from 'react';

const DEFAULT_TITLE = 'Saeed Ahmad — Frontend Developer';
const DEFAULT_DESC =
  'Portfolio of Saeed Ahmad — frontend developer building React apps, with Express + PostgreSQL, Flutter, and PyTorch ML work behind them.';

export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description || DEFAULT_DESC);
  }, [title, description]);
}
