import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { certificateGroups } from '../data/certificates.js';

function CertificateRow({ item }) {
  return (
    <li className="cert-row">
      <div className="cert-main">
        <h3 className="cert-name">{item.name}</h3>
        <p className="cert-issuer">
          {item.issuer} · {item.year}
          {item.hours ? ` · ${item.hours}` : ''}
          {item.note ? ` · ${item.note}` : ''}
        </p>
      </div>
      {item.verify && (
        <a
          className="cert-verify"
          href={item.verify}
          target="_blank"
          rel="noopener noreferrer"
        >
          Verify ↗
        </a>
      )}
    </li>
  );
}

export default function Certificates() {
  return (
    <Section id="certificates" title="Certificates & Badges">
      <Reveal className="certs-grid">
        {certificateGroups.map((group) => (
          <div className="card cert-card" key={group.category}>
            <h3 className="skill-category">{group.category}</h3>
            <ul className="cert-list">
              {group.items.map((item) => (
                <CertificateRow key={item.name} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
