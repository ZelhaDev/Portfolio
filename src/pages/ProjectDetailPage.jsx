import { useParams, Link } from 'react-router-dom';
import { getProject, projects } from '../data/projects.js';
import NotFoundPage from './NotFoundPage.jsx';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';

function DetailBlock({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  useDocumentMeta(
    project ? `${project.name} — Saeed Ahmad` : 'Not found — Saeed Ahmad',
    project ? project.tagline : undefined
  );

  if (!project) return <NotFoundPage />;

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="detail">
      <div className="container">
        <Link className="detail-back" to="/#projects">← All projects</Link>
        <header className="detail-head">
          <p className="eyebrow">{project.team}</p>
          <h1 className="detail-title">{project.name}</h1>
          <p className="project-tagline">{project.tagline}</p>
          {project.visual.type === 'screenshot' && (
            <img
              className="project-shot detail-shot"
              src={project.visual.src}
              alt={project.visual.alt}
            />
          )}
        </header>

        <div className="detail-grid">
          <div className="detail-main">
            <DetailBlock title="Overview">
              <p>{project.summary}</p>
            </DetailBlock>
            <DetailBlock title="The problem">
              <p>{project.problem}</p>
            </DetailBlock>
            <DetailBlock title="What it does">
              <ul className="detail-list">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </DetailBlock>
            <DetailBlock title="What I built">
              <ul className="detail-list">
                {project.contributions.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </DetailBlock>
            {project.challenges && project.challenges.length > 0 && (
              <DetailBlock title="Hard parts">
                <ul className="detail-list">
                  {project.challenges.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </DetailBlock>
            )}
            {project.metrics && (
              <DetailBlock title="Results">
                <ul className="detail-list">
                  {project.metrics.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </DetailBlock>
            )}
          </div>

          <aside className="detail-side">
            <h2>Role</h2>
            <p>{project.role}</p>
            {project.timeline && (
              <>
                <h2>Timeline</h2>
                <p>{project.timeline}</p>
              </>
            )}
            <h2>Stack</h2>
            <ul className="project-stack">
              {project.stack.map((t) => (
                <li className="tag" key={t}>{t}</li>
              ))}
            </ul>
            <h2>Links</h2>
            <p>
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                GitHub repository
              </a>
            </p>
            {project.links.live && (
              <p>
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  Live site
                </a>
              </p>
            )}
          </aside>
        </div>

        {project.aiNote && <p className="detail-note">{project.aiNote}</p>}

        <nav className="detail-nav" aria-label="More projects">
          <Link to={`/projects/${prev.slug}`} rel="prev">← {prev.name}</Link>
          <Link to={`/projects/${next.slug}`} rel="next">{next.name} →</Link>
        </nav>
      </div>
    </article>
  );
}
