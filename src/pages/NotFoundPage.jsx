import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';

export default function NotFoundPage() {
  useDocumentMeta('Page not found — Saeed Ahmad');
  return (
    <div className="container notfound">
      <h1>404</h1>
      <p className="hero-subline">This page doesn't exist.</p>
      <Link className="btn btn-primary" to="/">Back to the portfolio</Link>
    </div>
  );
}
