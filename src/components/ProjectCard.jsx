import { Link } from 'react-router-dom';

export default function ProjectCard({ project, featured = false }) {
  return (
    <article className={featured ? 'card project-card featured' : 'card project-card'}>
      {project.visual.type === 'screenshot' ? (
        <img
          className="project-shot"
          src={project.visual.src}
          alt={project.visual.alt}
          loading="lazy"
        />
      ) : (
        <div className="project-mono" aria-hidden="true">
          {project.name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div className="project-body">
        <h3 className="project-name">{project.name}</h3>
        <p className="project-role">{project.role}</p>
        <p className="project-tagline">{project.tagline}</p>
        <ul className="project-stack" aria-label="Technologies used">
          {project.stack.map((t) => (
            <li className="tag" key={t}>{t}</li>
          ))}
        </ul>
        <div className="project-actions">
          <Link className="btn btn-primary btn-small" to={`/projects/${project.slug}`}>
            Details
          </Link>
          <a
            className="btn btn-ghost btn-small"
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {project.links.live && (
            <a
              className="btn btn-ghost btn-small"
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live site
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
