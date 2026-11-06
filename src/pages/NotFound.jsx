import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function NotFound() { return <section className="not-found page-shell"><span className="eyebrow">SIGNAL LOST / 404</span><h1>OUTSIDE<br/>THE DISTRICT.</h1><p>This page doesn’t exist. Let’s get you back to familiar streets.</p><Link className="button" to="/collections">Find your way back <ArrowUpRight size={18}/></Link></section>; }
