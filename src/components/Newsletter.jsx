import { useId, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import '../styles/story.css';

export default function Newsletter({ idPrefix }) {
  const generatedId = useId();
  const inputId = `${idPrefix || generatedId}-newsletter-email`;
  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function subscribe(event) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setFeedback(null);
    try {
      const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim() }),
        });
        if (!response.ok) throw new Error('Subscription service unavailable');
        setFeedback({ type: 'success', text: 'You’re on the list. Watch your inbox for the next transmission.' });
        setEmail('');
      } else {
        localStorage.setItem('kuro-newsletter-interest', JSON.stringify({ email: email.trim(), savedAt: new Date().toISOString() }));
        setFeedback({ type: 'success', text: 'Interest saved on this device. This demo has not subscribed you to a mailing list.' });
      }
    } catch {
      setFeedback({ type: 'error', text: 'We couldn’t save your request. Please try again.' });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="story-newsletter" onSubmit={subscribe}>
      <label htmlFor={inputId} className="story-newsletter-label">Your email. Our next transmission.</label>
      <div className="story-newsletter-input">
        <input id={inputId} name="email" type="email" autoComplete="email" placeholder="EMAIL ADDRESS" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} disabled={pending} aria-describedby={`${inputId}-note`} />
        <button type="submit" aria-label={pending ? 'Submitting email' : 'Join the newsletter'} disabled={pending}>
          {pending ? <span>…</span> : <ArrowUpRight size={25} strokeWidth={1.5} />}
        </button>
      </div>
      <p id={`${inputId}-note`} className="story-newsletter-note">{import.meta.env.VITE_NEWSLETTER_ENDPOINT ? 'Drop updates and dispatches. No daily noise.' : 'Demo mode · email interest is saved locally only.'}</p>
      {feedback && <p className={`story-form-feedback ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.text}</p>}
    </form>
  );
}
