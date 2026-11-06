import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import '../styles/story.css';

const emptyForm = { name: '', email: '', subject: 'General enquiry', message: '' };

function getDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem('kuro-contact-draft') || 'null');
    if (!draft || typeof draft !== 'object') return emptyForm;
    return Object.fromEntries(Object.entries(emptyForm).map(([key, fallback]) => [key, typeof draft[key] === 'string' ? draft[key] : fallback]));
  } catch { return emptyForm; }
}

export default function Contact() {
  const [form, setForm] = useState(getDraft);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setFeedback(null);
  }

  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setFeedback(null);
    try {
      const payload = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()]));
      if (endpoint) {
        const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error('Contact service unavailable');
        try { localStorage.removeItem('kuro-contact-draft'); } catch { /* Delivery succeeded even if local storage is unavailable. */ }
        setForm(emptyForm);
        setFeedback({ type: 'success', text: 'Message delivered. Thanks for getting in touch.' });
      } else {
        localStorage.setItem('kuro-contact-draft', JSON.stringify(payload));
        setFeedback({ type: 'success', text: 'Draft saved on this device. This demo has not sent your message.' });
      }
    } catch {
      setFeedback({ type: 'error', text: 'Your message couldn’t be saved or sent. Please try again; your text is still here.' });
    } finally { setPending(false); }
  }

  return (
    <div className="story-page page-shell">
      <section className="story-contact-heading">
        <div className="story-meta-line"><span className="eyebrow">CONTACT / CHANNEL 09</span><span className="eyebrow">SIGNAL OPEN</span></div>
        <h1 className="story-display">LET’S MAKE<br /><span>SOME NOISE.</span></h1>
      </section>
      <section className="story-contact-grid">
        <div className="story-contact-aside">
          <span className="story-contact-glyph" aria-hidden="true"><Plus size={70} strokeWidth={0.7} /></span>
          <h2>A GOOD CONVERSATION<br />STARTS SOMETHING.</h2>
          <p>A question about the collection. A collaboration. An idea that won’t leave you alone. We’re listening.</p>
          <div className="story-contact-detail"><span className="eyebrow">THE NEXT CHAPTER</span><p>Business details arriving with the first drop.</p></div>
          <div className="story-contact-detail"><span className="eyebrow">FIND US AFTER DARK</span><p>Official social profiles will be announced here.<br />Stay in the loop through the newsletter below.</p></div>
          <span className="story-contact-coordinate">KURO DISTRICT / INDEPENDENT BY DESIGN</span>
        </div>
        <form className="story-contact-form" onSubmit={submit}>
          <div className="story-contact-form-heading"><span className="eyebrow">YOUR TRANSMISSION</span><span>01 — 04</span></div>
          <div className="story-contact-field-pair">
            <label htmlFor="contact-name">NAME <span>*</span><input id="contact-name" name="name" autoComplete="name" placeholder="Your name" value={form.name} onChange={update} required pattern=".*\S.*" maxLength={100} disabled={pending} /></label>
            <label htmlFor="contact-email">EMAIL <span>*</span><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={update} required maxLength={254} disabled={pending} /></label>
          </div>
          <label htmlFor="contact-subject">SUBJECT <span>*</span><select id="contact-subject" name="subject" value={form.subject} onChange={update} required disabled={pending}><option>General enquiry</option><option>Product question</option><option>Collaboration</option><option>Press &amp; editorial</option></select></label>
          <label htmlFor="contact-message">MESSAGE <span>*</span><textarea id="contact-message" name="message" rows={6} placeholder="What’s on your mind?" value={form.message} onChange={update} required minLength={10} maxLength={5000} disabled={pending} /></label>
          <div className="story-contact-submit"><p>{endpoint ? 'Your details are used to respond to this enquiry.' : 'Demo mode. Your draft stays on this device and is not delivered.'}</p><button className="button" type="submit" disabled={pending}>{pending ? 'SAVING…' : endpoint ? 'SEND MESSAGE' : 'SAVE MESSAGE DRAFT'} <ArrowUpRight size={19} /></button></div>
          {feedback && <p className={`story-form-feedback ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.text}</p>}
        </form>
      </section>
    </div>
  );
}
