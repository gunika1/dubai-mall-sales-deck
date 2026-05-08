import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Building2, CalendarDays, Crown, Gem, MapPin, Play, Sparkles, Store, Ticket, Utensils, Waves } from 'lucide-react';
import './styles.css';

const sections = [
  { id: 'opening', label: 'Opening' },
  { id: 'why', label: 'Why Dubai Mall' },
  { id: 'retail', label: 'Retail' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'dining', label: 'Dining' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'events', label: 'Events' },
  { id: 'sponsorship', label: 'Sponsorship' },
  { id: 'cta', label: 'Act Now' }
];

const stats = [
  { value: '100M+', label: 'annual visitors', note: 'Global retail reach at destination scale' },
  { value: '1,200+', label: 'stores', note: 'From luxury maisons to global flagships' },
  { value: '200+', label: 'dining outlets', note: 'Lifestyle dwell-time beyond shopping' },
  { value: '105M', label: '2023 visits', note: 'Reported record attendance by Emaar' }
];

const chapters = [
  {
    id: 'retail',
    eyebrow: 'Leasing engine',
    title: 'A retail ecosystem built for conversion.',
    copy: 'Dubai Mall is not a collection of stores. It is a demand engine where tourists, residents, luxury shoppers, families, and event audiences intersect across the day.',
    icon: Store,
    bullets: ['Flagship-ready visibility', 'High dwell-time shopper journeys', 'Luxury + mass retail adjacency'],
    visual: 'linear-gradient(135deg, rgba(219,174,92,.25), rgba(10,10,12,.45)), url("/public%5Cvideos/images/retail.png")'
  },
  {
    id: 'luxury',
    eyebrow: 'Fashion Avenue',
    title: 'Luxury positioning with destination gravity.',
    copy: 'A high-end environment for maisons, jewelry, watches, beauty, and elevated retail experiences where brand theatre matters as much as square footage.',
    icon: Gem,
    bullets: ['Premium brand neighborhood', 'High-intent tourism traffic', 'Launch moments that feel global'],
    visual: 'linear-gradient(135deg, rgba(245,237,221,.18), rgba(13,13,14,.62)), url(https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1600&auto=format&fit=crop)'
  },
  {
    id: 'dining',
    eyebrow: 'Dining & lifestyle',
    title: 'Food becomes a reason to stay longer.',
    copy: 'Dining is positioned as lifestyle programming: pre-event dinners, influencer-friendly spaces, family stops, terrace moments, and late-evening energy.',
    icon: Utensils,
    bullets: ['All-day traffic capture', 'Premium casual to fine dining', 'Natural sponsorship inventory'],
    visual: 'linear-gradient(135deg, rgba(126,74,45,.7), rgba(10,10,12,.85)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop)'
  },
  {
    id: 'entertainment',
    eyebrow: 'Experience platform',
    title: 'The attractions turn retail into a full-day destination.',
    copy: 'Aquarium, ice rink, cinema and family attractions make the property feel closer to a city-scale entertainment platform than a conventional mall.',
    icon: Waves,
    bullets: ['Dubai Aquarium & Underwater Zoo', 'Olympic-sized Dubai Ice Rink', 'Family and cinematic experiences'],
    visual: 'linear-gradient(135deg, rgba(0,109,143,.38), rgba(7,9,16,.62)), url(https://images.unsplash.com/photo-1520637836862-4d197d17c90a?q=80&w=1600&auto=format&fit=crop)'
  }
];

const opportunities = [
  { title: 'Retail leasing', text: 'Luxury flagships, global brands, pop-ups and category leaders use the mall as a regional stage.', icon: Building2 },
  { title: 'Sponsorships', text: 'High-footfall experiences create partnerable moments across atriums, attractions, seasonal events and launch zones.', icon: Crown },
  { title: 'Event bookings', text: 'From product launches to celebrity appearances, the property can behave like a live media platform.', icon: CalendarDays }
];

function useActiveSection() {
  const [active, setActive] = useState('opening');
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { threshold: 0.42 });
    sections.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function App() {
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const [sound, setSound] = useState(false);

  return (
    <main>
      <CursorGlow />
      <Nav active={active} />
      <Progress />
      <section id="opening" className="hero section">
        <motion.div
  className="hero-media"
  style={{ scale: heroScale }}
>
  <video
    autoPlay
    muted
    loop
    playsInline
    className="hero-video"
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>

  <div className="hero-overlay" />
</motion.div>
        <div className="grain" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="kicker"><Sparkles size={16}/> Interactive Sales Deck / Dubai Mall</span>
          <h1>Where retail becomes a global destination.</h1>
          <p>A cinematic, non-linear sales experience for tenants, sponsors and event partners evaluating the world’s most visited retail and lifestyle stage.</p>
          <div className="hero-actions">
            <a href="#why" className="btn primary">Explore the Opportunity <ArrowRight size={18}/></a>
            <a href="#events" className="btn secondary"><Play size={17}/> View Event Platform</a>
          </div>
        </motion.div>
        <button className="sound" onClick={() => setSound(!sound)}>{sound ? 'Ambient on' : 'Ambient off'}</button>
      </section>

      <section id="why" className="section why">
        <div className="section-head">
          <span className="eyebrow"><MapPin size={15}/> Downtown Dubai</span>
          <h2>Within seconds, prospects should understand the scale.</h2>
          <p>Dubai Mall sits at the heart of Downtown Dubai, next to Burj Khalifa, and functions as a retail, dining, tourism and entertainment magnet.</p>
        </div>
        <div className="stats-grid">
          {stats.map((stat, i) => <StatCard key={stat.label} {...stat} delay={i * 0.08} />)}
        </div>
      </section>

      {chapters.map((chapter, i) => <Chapter key={chapter.id} index={i} {...chapter} />)}

      <section id="events" className="section events">
        <div className="split">
          <div>
            <span className="eyebrow"><Ticket size={15}/> Events & venue platform</span>
            <h2>Not just a building. A launch stage for brands.</h2>
            <p>Use the property as a programmable environment: seasonal festivals, atrium installations, creator moments, product launches, fashion previews, family programming and premium corporate events.</p>
            <a href="#sponsorship" className="btn primary">See Sponsorship Paths <ArrowRight size={18}/></a>
          </div>
          <div className="event-stack">
            {['Global product launch', 'Luxury atrium takeover', 'Concert-week retail activation', 'Family festival programming'].map((item, i) => (
              <motion.div className="event-card" key={item} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                <span>0{i + 1}</span>{item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="sponsorship" className="section sponsorship">
        <div className="section-head narrow">
          <span className="eyebrow"><Crown size={15}/> Expandable modules</span>
          <h2>Three business paths. One destination story.</h2>
          <p>This deck is built so sales teams can branch into leasing, sponsorship or events without rebuilding the whole experience.</p>
        </div>
        <div className="opportunity-grid">
          {opportunities.map((item, i) => <Opportunity key={item.title} {...item} index={i}/>) }
        </div>
      </section>

      <section id="cta" className="section cta">
        <div className="cta-box">
          <span className="eyebrow">Final pitch</span>
          <h2>Be where the world already goes.</h2>
          <p>Dubai Mall gives brands more than space. It gives them audience, theatre, memory, and a commercial moment big enough to matter.</p>
          <div className="hero-actions center">
            <a className="btn primary" href="mailto:partnerships@example.com">Start Partnership Conversation</a>
            <a className="btn secondary" href="#opening">Replay Deck</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Nav({ active }) {
  return <nav className="nav">
    <a className="brand" href="#opening">DUBAI MALL<span>SALES DECK</span></a>
    <div className="nav-links">{sections.map(s => <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''}>{s.label}</a>)}</div>
  </nav>
}
function Progress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
}
function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />
}
function StatCard({ value, label, note, delay }) {
  return <motion.div className="stat-card" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay }}>
    <strong>{value}</strong><span>{label}</span><p>{note}</p>
  </motion.div>
}
function Chapter({ id, eyebrow, title, copy, icon: Icon, bullets, visual, index }) {
  return <section id={id} className="section chapter">
    <div className={`chapter-grid ${index % 2 ? 'reverse' : ''}`}>
      <motion.div className="chapter-copy" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="eyebrow"><Icon size={15}/>{eyebrow}</span>
        <h2>{title}</h2><p>{copy}</p>
        <ul>{bullets.map(b => <li key={b}>{b}</li>)}</ul>
      </motion.div>
      <motion.div className="chapter-visual" style={{ backgroundImage: visual }} initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div className="play-pill"><Play size={15}/> Video-first story module</div>
      </motion.div>
    </div>
  </section>
}
function Opportunity({ title, text, icon: Icon, index }) {
  return <motion.div className="opp-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }}>
    <Icon size={28}/><h3>{title}</h3><p>{text}</p><button>Open module <ArrowRight size={16}/></button>
  </motion.div>
}

createRoot(document.getElementById('root')).render(<App />);
