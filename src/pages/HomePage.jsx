import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Certificates from '../components/Certificates.jsx';
import Contact from '../components/Contact.jsx';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';

export default function HomePage() {
  useDocumentMeta();
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contact />
    </>
  );
}
