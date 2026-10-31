import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>{profile.name} · {profile.education}</p>
        <p className="footer-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">{profile.githubLabel}</a>
          <span aria-hidden="true"> · </span>
          <a href={profile.email}>joshsaeed45.official@gmail.com</a>
        </p>
        <p className="footer-meta">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
