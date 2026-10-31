import { profile } from '../data/profile.js';
import Reveal from './Reveal.jsx';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">{profile.name} · {profile.education.split(',')[0]}</p>
          <h1 id="hero-title" className="hero-title">
            {profile.headlineLead} <span className="accent">{profile.headlineAccent}</span>
          </h1>
          <p className="hero-subline">{profile.subline}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">View my projects</a>
            <a className="btn btn-ghost" href="#contact">Contact me</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
