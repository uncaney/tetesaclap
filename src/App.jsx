import { useState, useEffect } from "react";

const IMG = {
  pourLeMeilleurCover: "https://le-pacte.com/img/04802f4e-8cfe-49fa-84b4-6e4ce8d7ee40/cover.jpg?fm=jpg&q=80&fit=max&w=1400",
  pourLeMeilleurPoster: "https://le-pacte.com/img/a0dda167-c837-4593-85a0-861ccbd112a2/120x160-pour-le-meilleur-fauteuil-15-01-bd.jpg?fm=jpg&q=80&fit=max&w=500",
  labonneetoile: "https://medias.unifrance.org/medias/155/146/299675/format_page/lucky-star.jpg",
  louiseviolet: "https://medias.unifrance.org/medias/23/38/271895/format_page/miss-violet.jpg",
  festivalEspagnol: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&q=80",
  cinemaSeats: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&q=85",
  cinemaAudience: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1400&q=85",
  filmProjector: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1400&q=85",
  kidsEducation: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
};

const EVENTS = [
  { id: 1, title: "Pour le Meilleur", director: "Marie-Castille Mention-Schaar", date: "Mardi 24 mars 2026", time: "19h30", venue: "CGR Nîmes", guests: ["Philippe Croizon", "Suzana Sabino", "Lilly-Fleur Pointeaux"], description: "En présence de la réalisatrice, de Philippe Croizon et son épouse Suzana Sabino, héros de cette histoire.", ticketUrl: "https://www.helloasso.com/associations/les-tetes-a-clap/evenements/avant-premiere-pour-le-meilleur-mardi-24-mars-2026-19h30-cgr-nimes", image: IMG.pourLeMeilleurPoster, upcoming: true },
  { id: 2, title: "La Bonne Étoile", director: "Pascal Elbé", date: "8 octobre 2025", time: "20h", venue: "CGR Nîmes", guests: ["Pascal Elbé", "Benoît Poelvoorde"], description: "Projection en présence du réalisateur et comédien, suivie d'un débat avec le SE-UNSA 30.", image: IMG.labonneetoile, upcoming: false },
  { id: 3, title: "Louise Violet", director: "Éric Besnard", date: "Novembre 2024", time: "20h", venue: "CGR Nîmes", guests: ["Alexandra Lamy"], description: "Énorme succès avec un public nîmois venu très nombreux pour rencontrer Alexandra Lamy.", image: IMG.louiseviolet, upcoming: false },
  { id: 4, title: "Festival du Film Espagnol", director: "Nîmes", date: "Avril 2025", time: "", venue: "CGR Nîmes", guests: ["Victoria Abril (2024)"], description: "Festival national dédié au cinéma espagnol. Projections, conférences et soirées avec les artistes.", image: IMG.festivalEspagnol, upcoming: false },
];

const STATS = [
  { number: "20", label: "ans de passion", suffix: "" },
  { number: "6000", label: "entrées / an", suffix: "+" },
  { number: "12", label: "artistes accueillis", suffix: "+" },
  { number: "929", label: "membres", suffix: "" },
];

const GrainOverlay = () => (<div style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", zIndex: 1, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: "128px 128px" }} />);

const SectionLabel = ({ children }) => (<div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#D4A853", marginBottom: 16, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}><span style={{ width: 40, height: 1, background: "#D4A853", display: "inline-block" }} />{children}<span style={{ width: 40, height: 1, background: "#D4A853", display: "inline-block" }} /></div>);

const SectionTitle = ({ children }) => (<h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#FAF3E0", textAlign: "center", lineHeight: 1.15, margin: "0 0 48px" }}>{children}</h2>);

const Countdown = ({ targetDate }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const update = () => { const diff = Math.max(0, new Date(targetDate) - new Date()); setTime({ days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), mins: Math.floor((diff % 3600000) / 60000), secs: Math.floor((diff % 60000) / 1000) }); };
    update(); const id = setInterval(update, 1000); return () => clearInterval(id);
  }, [targetDate]);
  return (<div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
    {[{ val: time.days, label: "jours" }, { val: time.hours, label: "heures" }, { val: time.mins, label: "min" }, { val: time.secs, label: "sec" }].map(({ val, label }) => (
      <div key={label} style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 700, color: "#D4A853", lineHeight: 1, minWidth: 60, textShadow: "0 2px 12px rgba(212,168,83,0.3)" }}>{String(val).padStart(2, "0")}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
      </div>))}
  </div>);
};

const Nav = ({ scrolled }) => (
  <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(12,10,8,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.5s ease", borderBottom: scrolled ? "1px solid rgba(212,168,83,0.15)" : "1px solid transparent" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #D4A853, #B8860B)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎬</div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#FAF3E0", letterSpacing: 1 }}>LES TÊTES À CLAP</div>
          <div style={{ fontSize: 9, color: "rgba(212,168,83,0.7)", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Cinéma · Culture · Partage</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {["Événements","L'association","Galerie","Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace("é","e").replace("'","")}`} style={{ color: "rgba(250,243,224,0.7)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = "#D4A853"} onMouseLeave={e => e.target.style.color = "rgba(250,243,224,0.7)"}>{l}</a>
        ))}
        <a href="https://www.helloasso.com/associations/les-tetes-a-clap" target="_blank" rel="noopener" style={{ background: "linear-gradient(135deg, #D4A853, #B8860B)", color: "#0C0A08", padding: "8px 20px", borderRadius: 4, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Réserver</a>
      </div>
    </div>
  </nav>
);

const Hero = () => {
  const ev = EVENTS[0];
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "120px 24px 80px" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${IMG.pourLeMeilleurCover})`, backgroundSize: "cover", backgroundPosition: "center 30%", filter: "brightness(0.3) saturate(0.7)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(180deg, rgba(12,10,8,0.6) 0%, rgba(12,10,8,0.3) 40%, rgba(12,10,8,0.85) 100%)" }} />
      <GrainOverlay />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 900, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionLabel>Prochain événement</SectionLabel>
        <div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap", justifyContent: "center", marginTop: 24 }}>
          <div style={{ width: 220, flexShrink: 0, borderRadius: 8, overflow: "hidden", boxShadow: "0 16px 60px rgba(0,0,0,0.6), 0 0 40px rgba(212,168,83,0.15)", border: "2px solid rgba(212,168,83,0.2)" }}>
            <img src={ev.image} alt={ev.title} style={{ width: "100%", display: "block" }} />
          </div>
          <div style={{ flex: 1, minWidth: 280, textAlign: "left" }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, color: "#FAF3E0", lineHeight: 1.05, margin: "0 0 8px", textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}>{ev.title}</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "rgba(250,243,224,0.6)", fontStyle: "italic", margin: "0 0 24px" }}>de {ev.director}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
              {[{ icon: "📅", text: ev.date }, { icon: "🕐", text: ev.time }, { icon: "📍", text: ev.venue }].map(d => (
                <div key={d.text} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(250,243,224,0.8)" }}><span>{d.icon}</span>{d.text}</div>
              ))}
            </div>
            <div style={{ background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.25)", borderRadius: 8, padding: "12px 20px", marginBottom: 28 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#D4A853", marginBottom: 6 }}>En présence de</div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, color: "#FAF3E0", lineHeight: 1.5 }}>{ev.guests.join(" · ")}</div>
            </div>
            <Countdown targetDate="2026-03-24T19:30:00+01:00" />
            <a href={ev.ticketUrl} target="_blank" rel="noopener" style={{ display: "inline-block", marginTop: 24, background: "linear-gradient(135deg, #D4A853, #B8860B)", color: "#0C0A08", padding: "14px 40px", borderRadius: 6, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", boxShadow: "0 4px 30px rgba(212,168,83,0.3)" }}>Réserver mes places</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsBar = () => (
  <section style={{ background: "#D4A853", padding: "40px 24px" }}>
    <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 24 }}>
      {STATS.map(s => (<div key={s.label} style={{ textAlign: "center" }}><div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 44, fontWeight: 700, color: "#0C0A08", lineHeight: 1 }}>{s.number}{s.suffix}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: "rgba(12,10,8,0.6)", marginTop: 4 }}>{s.label}</div></div>))}
    </div>
  </section>
);

const About = () => (
  <section id="lassociation" style={{ position: "relative", padding: "100px 24px", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${IMG.filmProjector})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.12) saturate(0.4)" }} />
    <GrainOverlay />
    <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
      <SectionLabel>Notre histoire</SectionLabel>
      <SectionTitle>Passeurs d'images depuis 2006</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(250,243,224,0.75)", lineHeight: 1.8, margin: "0 0 20px" }}>Née de la passion d'enseignants beaucairois, l'association <strong style={{ color: "#D4A853" }}>Les Têtes à Clap</strong> a été créée pour amener le cinéma là où il n'existait pas : à Beaucaire, ville sans salle de cinéma.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(250,243,224,0.75)", lineHeight: 1.8, margin: 0 }}>Ce qui a commencé comme un festival scolaire pour 3 écoles est devenu un dispositif touchant 100% des écoliers beaucairois, avec 5 000 à 6 000 entrées par an.</p>
        </div>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(250,243,224,0.75)", lineHeight: 1.8, margin: "0 0 20px" }}>Sous la présidence de <strong style={{ color: "#FAF3E0" }}>Ludovic Duplissy</strong>, directeur d'école et passionné de cinéma, l'association organise aujourd'hui des festivals, des projections-rencontres et des avant-premières à Beaucaire, Tarascon et Nîmes.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(250,243,224,0.75)", lineHeight: 1.8, margin: 0 }}>Notre parrain : le comédien <strong style={{ color: "#FAF3E0" }}>Youssef Hajdi</strong>, natif de Tarascon, qui porte avec nous cette mission de culture accessible à tous.</p>
        </div>
      </div>
      <blockquote style={{ marginTop: 60, padding: "32px 40px", borderLeft: "3px solid #D4A853", background: "rgba(212,168,83,0.04)", borderRadius: "0 8px 8px 0" }}>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontStyle: "italic", color: "rgba(250,243,224,0.85)", lineHeight: 1.6, margin: "0 0 12px" }}>« Je me positionne en tant que passeur d'images. J'aime bien ce terme… »</p>
        <cite style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#D4A853", fontStyle: "normal", letterSpacing: 1 }}>— Ludovic Duplissy, Président</cite>
      </blockquote>
    </div>
  </section>
);

const Activities = () => {
  const pillars = [
    { icon: "🎓", title: "Festival Scolaire", desc: "Chaque année, 5 000 à 6 000 enfants de Beaucaire, Tarascon et alentours découvrent le cinéma grâce à notre dispositif en partenariat avec l'Éducation nationale.", image: IMG.kidsEducation },
    { icon: "🎬", title: "Projections-Rencontres", desc: "Avant-premières et projections exceptionnelles au CGR Nîmes, toujours suivies d'échanges avec les équipes des films.", image: IMG.cinemaAudience },
    { icon: "🇪🇸", title: "Festival du Film Espagnol", desc: "Un festival national au cœur de Nîmes célébrant le cinéma espagnol avec projections, conférences et rencontres avec les artistes.", image: IMG.festivalEspagnol },
  ];
  return (
    <section style={{ background: "linear-gradient(180deg, #14110D, #0C0A08)", padding: "100px 24px", position: "relative" }}>
      <GrainOverlay />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SectionLabel>Ce que nous faisons</SectionLabel>
        <SectionTitle>Trois piliers, une passion</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {pillars.map(p => (
            <div key={p.title} style={{ borderRadius: 12, overflow: "hidden", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.4s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.2)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}>
              <div style={{ height: 180, position: "relative", backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(12,10,8,0.2), rgba(12,10,8,0.85))" }} />
                <div style={{ position: "absolute", bottom: 14, left: 18, fontSize: 32 }}>{p.icon}</div>
              </div>
              <div style={{ padding: "18px 22px 24px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: "#FAF3E0", margin: "0 0 10px" }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(250,243,224,0.6)", lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Events = () => (
  <section id="evenements" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${IMG.cinemaSeats})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.08) saturate(0.3)" }} />
    <GrainOverlay />
    <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
      <SectionLabel>Programmation</SectionLabel>
      <SectionTitle>Nos événements</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {EVENTS.map(ev => (
          <div key={ev.id} style={{ display: "grid", gridTemplateColumns: ev.upcoming ? "120px 1fr auto" : "80px 1fr auto", gap: ev.upcoming ? 28 : 20, alignItems: "center", padding: ev.upcoming ? "20px 24px" : "14px 20px", borderRadius: 10, background: ev.upcoming ? "linear-gradient(135deg, rgba(212,168,83,0.12), rgba(212,168,83,0.04))" : "rgba(255,255,255,0.02)", border: ev.upcoming ? "1px solid rgba(212,168,83,0.3)" : "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: ev.upcoming ? 120 : 80, borderRadius: 6, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.4)", flexShrink: 0 }}>
              <img src={ev.image} alt={ev.title} style={{ width: "100%", display: "block", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: ev.upcoming ? "#D4A853" : "rgba(250,243,224,0.4)", fontWeight: 600, marginBottom: 4 }}>{ev.upcoming && "⭐ "}{ev.date}{ev.time && ` · ${ev.time}`} · {ev.venue}</div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: ev.upcoming ? 24 : 20, fontWeight: 700, color: "#FAF3E0", margin: "0 0 4px" }}>{ev.title}</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(250,243,224,0.5)", margin: 0 }}>{ev.description}</p>
            </div>
            {ev.upcoming && ev.ticketUrl && (
              <a href={ev.ticketUrl} target="_blank" rel="noopener" style={{ background: "linear-gradient(135deg, #D4A853, #B8860B)", color: "#0C0A08", padding: "10px 24px", borderRadius: 4, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>Réserver</a>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Artists with real portrait photos (Unifrance press photos, stored locally)
const PORTRAITS = {
  "Omar Sy": `${import.meta.env.BASE_URL}portraits/omar-sy.jpg`,
  "Alexandra Lamy": `${import.meta.env.BASE_URL}portraits/alexandra-lamy.jpg`,
  "Pascal Elbé": `${import.meta.env.BASE_URL}portraits/pascal-elbe.jpg`,
};

// All artists who visited, with optional portrait or film poster
const STAR_WALL = [
  { name: "Omar Sy", role: "Acteur", note: "Intouchables, Lupin" },
  { name: "Alexandra Lamy", role: "Actrice", note: "Louise Violet, 2024" },
  { name: "Jamel Debbouze", role: "Acteur & Humoriste", note: "Indigènes, Amélie" },
  { name: "Leïla Bekhti", role: "Actrice", note: "Tout ce qui brille" },
  { name: "Philippe Croizon", role: "Héros & Aventurier", note: "Pour le Meilleur, 2026" },
  { name: "Pascal Elbé", role: "Réalisateur & Acteur", note: "La Bonne Étoile, 2025" },
  { name: "Jean-Pierre Jeunet", role: "Réalisateur", note: "Amélie, Le Fabuleux Destin" },
  { name: "Elie Semoun", role: "Acteur & Humoriste", note: "" },
  { name: "Victoria Abril", role: "Actrice", note: "Festival Espagnol, 2024" },
  { name: "Jacques Perrin", role: "Acteur & Producteur", note: "Les Choristes, Océans" },
  { name: "Corinne Masiero", role: "Actrice", note: "Les Invisibles" },
  { name: "Youssef Hajdi", role: "Comédien · Parrain", note: "Parrain de l'association" },
];

const StarCard = ({ star }) => {
  const portrait = PORTRAITS[star.name];
  const initials = star.name.split(" ").map(w => w[0]).join("");
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(212,168,83,0.12)", transition: "all 0.4s", cursor: "default" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.4)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,168,83,0.1)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.12)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      {/* Image area */}
      <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
        {portrait ? (
          <>
            <img src={portrait} alt={star.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 40%, rgba(12,10,8,0.9))" }} />
          </>
        ) : (
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, rgba(212,168,83,0.15), rgba(212,168,83,0.05))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48, fontWeight: 700, color: "rgba(212,168,83,0.3)" }}>{initials}</div>
          </div>
        )}
        {/* Name overlay at bottom of image */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 14px" }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#FAF3E0", textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>{star.name}</div>
        </div>
      </div>
      {/* Info area */}
      <div style={{ padding: "10px 14px 14px" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#D4A853", fontWeight: 600 }}>{star.role}</div>
        {star.note && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(250,243,224,0.4)", marginTop: 3 }}>{star.note}</div>}
      </div>
    </div>
  );
};

const WallOfFame = () => (
  <section id="galerie" style={{ padding: "100px 24px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${IMG.cinemaAudience})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.07) saturate(0.3)" }} />
    <GrainOverlay />
    <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
      <SectionLabel>Ils nous ont fait l'honneur de leur présence</SectionLabel>
      <SectionTitle>Mur des étoiles</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
        {STAR_WALL.map(star => <StarCard key={star.name} star={star} />)}
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(250,243,224,0.4)", textAlign: "center", marginTop: 32, fontStyle: "italic" }}>…et beaucoup d'autres depuis 2006</p>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" style={{ position: "relative", padding: "100px 24px", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${IMG.cinemaSeats})`, backgroundSize: "cover", backgroundPosition: "center bottom", filter: "brightness(0.1) saturate(0.3) blur(2px)" }} />
    <GrainOverlay />
    <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
      <SectionLabel>Rejoignez-nous</SectionLabel>
      <SectionTitle>Le cinéma, c'est mieux ensemble</SectionTitle>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(250,243,224,0.6)", lineHeight: 1.7, margin: "0 0 40px" }}>Bénévole, partenaire, spectateur passionné — il y a mille façons de soutenir notre mission de rendre le cinéma accessible à tous.</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 40 }}>
        {[{ label: "Facebook", url: "https://www.facebook.com/groups/115819288441382/", icon: "f" }, { label: "Instagram", url: "https://www.instagram.com/lestetesaclap.fr/", icon: "ig" }, { label: "HelloAsso", url: "https://www.helloasso.com/associations/les-tetes-a-clap", icon: "♡" }].map(s => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener" style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(212,168,83,0.3)", background: "rgba(212,168,83,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: "#D4A853", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, transition: "all 0.3s" }} onMouseEnter={e => { e.target.style.background = "#D4A853"; e.target.style.color = "#0C0A08"; }} onMouseLeave={e => { e.target.style.background = "rgba(212,168,83,0.06)"; e.target.style.color = "#D4A853"; }} title={s.label}>{s.icon}</a>
        ))}
      </div>
      <div style={{ padding: "28px 36px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(250,243,224,0.7)", lineHeight: 2 }}>
          <strong style={{ color: "#FAF3E0" }}>Les Têtes à Clap</strong><br />4C Chemin des Romains, 30300 Beaucaire<br />
          <a href="mailto:contact@lestetesaclap.fr" style={{ color: "#D4A853", textDecoration: "none" }}>contact@lestetesaclap.fr</a>{" · "}<a href="tel:+33609030641" style={{ color: "#D4A853", textDecoration: "none" }}>06 09 03 06 41</a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ background: "#0C0A08", borderTop: "1px solid rgba(212,168,83,0.1)", padding: "32px 24px" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(250,243,224,0.3)" }}>© 2006–2026 Les Têtes à Clap · Association loi 1901</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(250,243,224,0.3)" }}>Beaucaire · Tarascon · Nîmes</div>
    </div>
  </footer>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  return (
    <div style={{ background: "#0C0A08", minHeight: "100vh" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0C0A08; }
        ::selection { background: rgba(212,168,83,0.3); color: #FAF3E0; }
        @media (max-width: 768px) {
          nav > div > div:last-child a:not(:last-child) { display: none !important; }
          section > div > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
          section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="grid-template-columns: 120px"] { grid-template-columns: 80px 1fr !important; }
          section > div > div[style*="grid-template-columns: 80px"] { grid-template-columns: 60px 1fr !important; }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Nav scrolled={scrolled} />
      <Hero />
      <StatsBar />
      <About />
      <Activities />
      <Events />
      <WallOfFame />
      <Contact />
      <Footer />
    </div>
  );
}
