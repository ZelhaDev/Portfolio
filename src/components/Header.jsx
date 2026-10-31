import { Link } from 'react-router-dom';
import { profile } from '../data/profile.js';

const links = [
  { label: 'About', to: '/#about' },
  { label: 'Skills', to: '/#skills' },
  { label: 'Projects', to: '/#projects' },
  { label: 'Contact', to: '/#contact' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link to="/" className="brand">{profile.name}</Link>
        <nav aria-label="Main">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="nav-link">{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
