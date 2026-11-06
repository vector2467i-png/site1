import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { Brand } from './Header.jsx';

const videoSource = import.meta.env.VITE_INTRO_VIDEO_URL;
export default function Preloader({ replay = false }) {
  const [visible, setVisible] = useState(() => {
    try { return replay || !sessionStorage.getItem('kuro-intro-seen'); } catch { return true; }
  });
  const [sound, setSound] = useState(false);
  const container = useRef(null);
  const counter = useRef(null);
  const progress = useRef(null);
  const video = useRef(null);
  const timeline = useRef(null);
  const skipButton = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const site = document.getElementById('site-content');
    const previousFocus = document.activeElement;
    if (site) site.inert = true;
    skipButton.current?.focus();
    const finish = () => {
      try { sessionStorage.setItem('kuro-intro-seen', '1'); } catch { /* Private browsing may block storage. */ }
      setVisible(false);
      if (replay) navigate('/', {replace:true});
    };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let removeKeys = () => {};
    const ctx = gsap.context(() => {
      const count = { value: 0 };
      const duration = reduced ? .05 : 2.5;
      const tl = gsap.timeline({onComplete:finish});
      timeline.current = tl;
      tl.to(count, {value:100,duration,ease:'power1.inOut',onUpdate:()=>{if(counter.current)counter.current.textContent=String(Math.round(count.value)).padStart(3,'0');}},0)
        .to(progress.current,{scaleX:1,duration,ease:'power1.inOut'},0)
        .to('.intro-scene',{scale:reduced?1:1.22,filter:'brightness(1.3)',duration,ease:'power2.in'},0)
        .to('.intro-copy',{y:reduced?0:-25,opacity:0,duration:.25},duration-.1)
        .addLabel('curtains',duration)
        .to('.intro-panel',{yPercent:(i)=>i%2===0?-105:105,duration:reduced?.08:1.12,stagger:reduced?0:.075,ease:'power4.inOut'},'curtains');
      const escape = e=>{
        if(e.key==='Escape')tl.seek('curtains').play();
        if(e.key==='Tab') {
          const controls = [...container.current.querySelectorAll('button')];
          const first=controls[0],last=controls.at(-1);
          if(e.shiftKey && document.activeElement===first){e.preventDefault();last?.focus();}
          if(!e.shiftKey && document.activeElement===last){e.preventDefault();first?.focus();}
        }
      };
      document.addEventListener('keydown',escape);
      removeKeys = () => document.removeEventListener('keydown',escape);
    },container);
    return () => {removeKeys();ctx.revert();document.body.style.overflow=previous;if(site)site.inert=false;if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});};
  }, [visible,replay,navigate]);
  if (!visible) return null;
  return <div ref={container} className="intro" role="dialog" aria-modal="true" aria-label="Kuro District cinematic introduction">
    <div className="intro-panels" aria-hidden="true">{[0,1,2,3].map(i=><div className="intro-panel" key={i}><div className="intro-scene" style={{left:`${-100*i}%`}}><img src="/images/city-night.svg" alt=""/>{videoSource && <video ref={i===0?video:undefined} src={videoSource} muted={i!==0||!sound} autoPlay playsInline loop preload="metadata" onLoadedMetadata={e=>{if(i===0&&Number.isFinite(e.currentTarget.duration)&&e.currentTarget.duration>3){const tl=timeline.current; if(tl) tl.timeScale(tl.duration()/Math.min(e.currentTarget.duration,10));}}}/>}<div className="intro-scene-shade"/></div></div>)}</div>
    <div className="intro-copy"><div className="intro-top"><Brand/><span className="eyebrow">ORIGINAL WORLD / SEQUENCE 001</span></div><div className="intro-center"><span className="eyebrow">YOU ARE NOW ENTERING</span><h2>THE<br/>DISTRICT.</h2><p>NO DAYLIGHT REQUIRED.</p></div><div className="intro-bottom"><span className="eyebrow">ESTABLISHING CONNECTION <b ref={counter}>000</b>%</span><button ref={skipButton} className="intro-skip" onClick={()=>timeline.current?.seek('curtains').play()}>Skip intro <ArrowRight size={16}/></button>{videoSource&&<button aria-label={sound?'Mute intro':'Enable intro sound'} onClick={()=>setSound(v=>!v)}>{sound?<Volume2 size={18}/>:<VolumeX size={18}/>}</button>}<div className="intro-progress"><span ref={progress}/></div></div></div>
  </div>;
}
