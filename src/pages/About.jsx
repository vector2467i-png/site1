import { useRef } from 'react';
import { useScrollAnimations } from '../animations/scrollAnimations.js';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import '../styles/story.css';

const chapters = [
  { number: '01', label: 'THE CITY', title: 'Built from the noise.', text: 'Concrete, late trains, the last light in a side street. Our visual world takes its cues from the spaces that come alive when the rest of the city switches off.' },
  { number: '02', label: 'THE UNIFORM', title: 'Space to be yourself.', text: 'Generous silhouettes. Graphic tension. A restrained palette that lets a single detail speak. Clothing imagined as a form of self-expression, without a dress code.' },
  { number: '03', label: 'THE COLLECTIVE', title: 'Find your district.', text: 'A district is a place you make your own. This one is for the artists, the night walkers, and everyone who sees a little differently. There is room for you here.' },
];

export default function About() {
  const scope = useRef(null);
  useScrollAnimations(scope);
  return (
    <div ref={scope} className="story-page page-shell">
      <section className="story-about-heading" aria-labelledby="about-title">
        <div className="story-meta-line"><span className="eyebrow">THE WORLD OF KURO</span><span className="eyebrow">MANIFESTO / 001</span></div>
        <h1 id="about-title" className="story-display">NOT MADE TO<br />BLEND <span>IN.</span></h1>
        <div className="story-about-intro"><span className="story-japanese" lang="ja">黒</span><p>Kuro means black. District means belonging.<br />Together, a uniform for the hours you call your own.</p></div>
      </section>

      <section className="story-origin" aria-labelledby="origin-title">
        <div className="story-artwork" data-reveal>
          <img src="/images/editorial.svg" alt="Original illustrated midnight city with crimson light cutting through concrete architecture" loading="lazy" />
          <span className="story-artwork-caption">FIELD NOTES / THE CITY AFTER DARK</span>
          <span className="story-artwork-cross" aria-hidden="true">+</span>
        </div>
        <div className="story-origin-copy" data-reveal>
          <span className="eyebrow">AN INDEPENDENT POINT OF VIEW</span>
          <h2>THE CITY<br />IS OUR<br /><span>CANVAS.</span></h2>
          <p>KURO DISTRICT lives at the intersection of underground street culture, original graphic art, and the cinematic energy of Japanese animation.</p>
          <p>We’re drawn to the beautiful friction of it all: silence and static. Light and shadow. An oversized silhouette against a city that never stops moving.</p>
          <p>Our world is original. Our inspiration is a feeling. The result is streetwear that carries a story without asking you to become someone else.</p>
          <div className="story-origin-signoff"><span>WEAR THE AFTERHOURS.</span><span aria-hidden="true">KD—09</span></div>
        </div>
      </section>

      <section className="story-chapters" aria-label="Our philosophy">
        {chapters.map((chapter) => <article className="story-chapter" key={chapter.number} data-reveal>
          <div className="story-chapter-label"><span>{chapter.number}</span><span>{chapter.label}</span></div>
          <h3>{chapter.title}</h3>
          <p>{chapter.text}</p>
        </article>)}
      </section>

      <section className="story-manifesto" data-reveal>
        <span className="eyebrow">NO DRESS CODE. JUST A POINT OF VIEW.</span>
        <p>THE DARK ISN’T<br />EMPTY. IT’S <span>YOURS.</span></p>
        <Link className="button" to="/collections">FIND YOUR UNIFORM <ArrowUpRight size={19} /></Link>
        <span className="story-concept-note">An original concept label. Current garments are replaceable samples.</span>
      </section>
    </div>
  );
}
