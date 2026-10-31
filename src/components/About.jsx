import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { profile } from '../data/profile.js';

export default function About() {
  return (
    <Section id="about" title="About">
      <Reveal className="about-grid">
        <p className="about-text">{profile.about}</p>
        <ul className="about-facts">
          <li>
            <span className="fact-label">Studying</span>
            {profile.education}
          </li>
          <li>
            <span className="fact-label">Focus</span>
            React on the web, Flutter on mobile, applied ML in Python
          </li>
          <li>
            <span className="fact-label">Looking for</span>
            OJT / internship roles for 2026
          </li>
        </ul>
      </Reveal>
    </Section>
  );
}
