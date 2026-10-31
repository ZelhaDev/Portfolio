import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { profile } from '../data/profile.js';

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <Reveal className="contact-wrap">
        <p className="contact-line">Open to OJT / internship roles for 2026.</p>
        <p className="contact-line">
          The fastest way to reach me is email; GitHub is where everything I build lives.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={profile.email}>Email me</a>
          <a
            className="btn btn-ghost"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
