import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { skills } from '../data/skills.js';

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <Reveal className="skills-grid">
        {skills.map((group) => (
          <div className="card skill-card" key={group.category}>
            <h3 className="skill-category">{group.category}</h3>
            <ul className="skill-list">
              {group.items.map((item) => (
                <li className="tag" key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
