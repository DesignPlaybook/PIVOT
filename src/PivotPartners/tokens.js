// ─── Design Tokens ───────────────────────────────────────────────
export const T = {
  cream: "#F5F0E8",
  creamAlt: "#EDE8DE",
  teal: "#0D3D4E",
  tealLight: "#1a5570",
  gold: "#B8962E",
  goldLight: "#C9A23F",
  white: "#FFFFFF",
  textDark: "#1A1A1A",
  textMid: "#4A5568",
  textMuted: "#7A8694",
};

export const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream: #F5F0E8;
    --cream-alt: #EDE8DE;
    --teal: #0D3D4E;
    --teal-light: #1a5570;
    --gold: #B8962E;
    --white: #FFFFFF;
  }

  body {
    font-family: 'Jost', sans-serif;
    background: var(--cream);
    color: var(--teal);
    cursor: none;
    overflow-x: hidden;
  }

  .cursor-dot {
    width: 8px; height: 8px;
    background: var(--gold);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    transform: translate(-50%, -50%);
  }
  .cursor-ring {
    width: 32px; height: 32px;
    border: 1px solid var(--gold);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.08s ease;
    opacity: 0.5;
    transform: translate(-50%, -50%);
  }

  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-d1 { transition-delay: 0.1s; }
  .reveal-d2 { transition-delay: 0.2s; }
  .reveal-d3 { transition-delay: 0.3s; }
  .reveal-d4 { transition-delay: 0.4s; }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 5px 64px;
    display: flex; align-items: center; justify-content: space-between;
    background: var(--cream);
    border-bottom: 1px solid rgba(184,150,46,0.2);
    transition: all 0.4s ease;
  }
  nav.scrolled {
    padding: 14px 64px;
    background: rgba(245,240,232,0.97);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 20px rgba(13,61,78,0.06);
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 600;
    color: var(--teal); text-decoration: none;
    display: flex; align-items: center; gap: 10px;
    cursor: pointer;
  }
  .nav-logo span { font-size: 11px; display: block; letter-spacing: 0.2em; font-weight: 400; font-family: 'Jost', sans-serif; color: var(--gold); text-transform: uppercase; }
  .nav-links { display: flex; gap: 36px; align-items: center; }
  .nav-link {
    font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--teal); text-decoration: none;
    position: relative; cursor: pointer; background: none; border: none;
    padding: 0; font-weight: 400;
    transition: color 0.3s ease;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1px; background: var(--gold);
    transition: width 0.3s ease;
  }
  .nav-link:hover::after, .nav-link.active::after { width: 100%; }
  .nav-link.active { color: var(--gold); }
  .nav-cta {
    font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--teal); border: 1px solid var(--teal);
    padding: 10px 24px; cursor: pointer; background: transparent;
    position: relative; overflow: hidden; transition: color 0.4s ease;
  }
  .nav-cta::before {
    content: ''; position: absolute; inset: 0;
    background: var(--teal); transform: translateX(-101%);
    transition: transform 0.4s ease; z-index: -1;
  }
  .nav-cta:hover { color: var(--cream); }
  .nav-cta:hover::before { transform: translateX(0); }

  .section-label {
    display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
  }
  .rule { width: 32px; height: 1px; background: var(--gold); flex-shrink: 0; }
  .label-text {
    font-family: 'Jost', sans-serif; font-size: 11px;
    letter-spacing: 0.22em; color: var(--gold); text-transform: uppercase; font-weight: 400;
  }
  .gold-rule { width: 48px; height: 1px; background: var(--gold); margin: 24px 0; }
  .gold-rule-wide { width: 100%; height: 1px; background: linear-gradient(to right, var(--gold), transparent); margin: 32px 0; }

  .btn {
    font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 0.15em;
    text-transform: uppercase; padding: 14px 36px; cursor: pointer;
    position: relative; overflow: hidden; transition: color 0.4s ease;
    display: inline-block;
  }
  .btn-teal { color: var(--cream); border: 1px solid var(--teal); background: var(--teal); }
  .btn-teal::before { content: ''; position: absolute; inset: 0; background: var(--gold); transform: translateX(-101%); transition: transform 0.4s ease; z-index: 0; }
  .btn-teal:hover::before { transform: translateX(0); }
  .btn-teal span { position: relative; z-index: 1; }
  .btn-outline { color: var(--teal); border: 1px solid var(--teal); background: transparent; }
  .btn-outline::before { content: ''; position: absolute; inset: 0; background: var(--teal); transform: translateX(-101%); transition: transform 0.4s ease; z-index: 0; }
  .btn-outline:hover { color: var(--cream); }
  .btn-outline:hover::before { transform: translateX(0); }
  .btn-outline span { position: relative; z-index: 1; }
  .btn-outline-light { color: var(--cream); border: 1px solid rgba(245,240,232,0.5); background: transparent; }
  .btn-outline-light::before { content: ''; position: absolute; inset: 0; background: var(--cream); transform: translateX(-101%); transition: transform 0.4s ease; z-index: 0; }
  .btn-outline-light:hover { color: var(--teal); }
  .btn-outline-light:hover::before { transform: translateX(0); }
  .btn-outline-light span { position: relative; z-index: 1; }

  .pull-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 4vw, 52px);
    font-weight: 300; font-style: italic;
    color: var(--teal); line-height: 1.2;
    border: none; padding: 0; margin: 0;
    max-width: 800px;
  }
  .pull-quote-light { color: var(--cream); }

  .stat-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(56px, 7vw, 96px);
    font-weight: 600; color: var(--gold); line-height: 1;
  }
  .stat-label {
    font-family: 'Jost', sans-serif; font-size: 11px;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(245,240,232,0.7); margin-top: 8px; display: block;
  }

  .bg-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 200px; font-weight: 300;
    color: var(--teal); opacity: 0.04;
    position: absolute; line-height: 1;
    pointer-events: none; user-select: none;
  }

  footer {
    background: var(--teal); color: var(--cream); padding: 80px 64px 40px;
  }
  .footer-brand {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 400; color: var(--cream);
  }
  .footer-tagline {
    font-family: 'Jost', sans-serif; font-size: 10px;
    letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase;
    display: block; margin-top: 4px;
  }
  .footer-link {
    font-family: 'Jost', sans-serif; font-size: 13px;
    color: rgba(245,240,232,0.6); text-decoration: none;
    cursor: pointer; display: block; margin-bottom: 12px;
    transition: color 0.3s ease; background: none; border: none; text-align: left;
  }
  .footer-link:hover { color: var(--gold); }
  .footer-label {
    font-family: 'Jost', sans-serif; font-size: 10px;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 20px; display: block;
  }

  .img-block {
    background: linear-gradient(135deg, #0D3D4E 0%, #1a5a70 50%, #0a2e3a 100%);
    position: relative; overflow: hidden;
  }
  .img-block::after {
    content: ''; position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
    opacity: 0.3;
  }

  .texture { position: relative; }
  .texture::after {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at 30% 50%, transparent 60%, rgba(13,61,78,0.04) 100%);
  }

  .timeline-line { width: 1px; background: linear-gradient(to bottom, var(--gold), transparent); }

  input, textarea, select {
    font-family: 'Jost', sans-serif; font-size: 14px;
    background: rgba(245,240,232,0.5); border: 1px solid rgba(13,61,78,0.2);
    padding: 14px 18px; color: var(--teal); width: 100%;
    outline: none; transition: border-color 0.3s ease;
  }
  input:focus, textarea:focus, select:focus { border-color: var(--gold); }
  input::placeholder, textarea::placeholder { color: rgba(13,61,78,0.4); }
  label {
    font-family: 'Jost', sans-serif; font-size: 10px;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--gold); display: block; margin-bottom: 8px;
  }

  .service-card { transition: transform 0.4s ease, border-color 0.4s ease; cursor: pointer; }
  .service-card:hover { transform: translateY(-4px); }

  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-track { animation: marquee 28s linear infinite; display: flex; white-space: nowrap; }

  .divider { height: 1px; background: rgba(13,61,78,0.1); }

  .hero-bg {
    background-image: 
      linear-gradient(to right, rgba(13,61,78,0.75) 0%, rgba(13,61,78,0.3) 60%, transparent 100%),
      url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80');
    background-size: cover; background-position: center;
  }
  .about-hero-bg {
    background-image:
      linear-gradient(to right, rgba(13,61,78,0.8) 0%, rgba(13,61,78,0.4) 70%, transparent 100%),
      url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80');
    background-size: cover; background-position: center;
  }
  .services-hero-bg {
    background-image:
      linear-gradient(to right, rgba(13,61,78,0.85) 0%, rgba(13,61,78,0.5) 60%, transparent 100%),
      url('https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&q=80');
    background-size: cover; background-position: center;
  }
  .contact-hero-bg {
    background-image:
      linear-gradient(to bottom, rgba(13,61,78,0.7) 0%, rgba(13,61,78,0.5) 100%),
      url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80');
    background-size: cover; background-position: center;
  }
  .insights-hero-bg {
    background-image:
      linear-gradient(to right, rgba(13,61,78,0.85) 0%, rgba(13,61,78,0.5) 60%, transparent 100%),
      url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80');
    background-size: cover; background-position: center;
  }
  .domains-hero-bg {
    background-image:
      linear-gradient(to right, rgba(13,61,78,0.85) 0%, rgba(13,61,78,0.5) 60%, transparent 100%),
      url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80');
    background-size: cover; background-position: center;
  }

  @media (max-width: 768px) {
    nav { padding: 16px 24px; }
    nav.scrolled { padding: 12px 24px; }
    .nav-links { display: none; }
    footer { padding: 60px 24px 32px; }
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--gold); }

  .underline-draw { position: relative; display: inline-block; }
  .underline-draw::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.4s ease; }
  .underline-draw:hover::after { width: 100%; }
`;
