import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import ProjectCard from './ProjectCard.jsx';
import { projects } from '../data/projects.js';

export default function Projects() {
  const [featured, ...rest] = projects;
  return (
    <Section id="projects" title="Projects">
      <Reveal>
        <ProjectCard project={featured} featured />
      </Reveal>
      <Reveal className="projects-rest">
        {rest.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </Reveal>
    </Section>
  );
}
