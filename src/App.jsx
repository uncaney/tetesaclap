import { useState, useEffect } from "react";

const EVENTS = [
  {
    id: 1,
    title: "Pour le Meilleur",
    director: "Marie-Castille Mention-Schaar",
    date: "Mardi 24 mars 2026",
    time: "19h30",
    venue: "CGR Nîmes",
    guests: ["Philippe Croizon", "Suzana Sabino", "Lilly-Fleur Pointeaux"],
    description: "Projection en présence de la réalisatrice, de Philippe Croizon et son épouse Suzana Sabino, héros de cette histoire, ainsi que de Lilly-Fleur Pointeaux.",
    ticketUrl: "https://www.helloasso.com/associations/les-tetes-a-clap/evenements/avant-premiere-pour-le-meilleur-mardi-24-mars-2026-19h30-cgr-nimes",
    upcoming: true,
  },
  {
    id: 2,
    title: "La Bonne Étoile",
    director: "Pascal Elbé",
    date: "8 octobre 2025",
    time: "20h",
    venue: "CGR Nîmes",
    guests: ["Pascal Elbé"],
    description: "Projection en présence du réalisateur et comédien, suivie d'un débat en collaboration avec le SE-UNSA 30.",
    upcoming: false,
  },
  {
    id: 3,
    title: "Louise Violet",
    director: "Éric Besnard",
    date: "Novembre 2024",
    time: "20h",
    venue: "CGR Nîmes",
    guests: ["Alexandra Lamy"],
    description: "Projection exceptionnelle en présence d'Alexandra Lamy. Énorme succès avec un public nîmois venu très nombreux.",
    upcoming: false,
  },
  {
    id: 4,
    title: "Festival du Film Espagnol",
    director: "Nîmes",
    date: "Avril 2025",
    time: "",
    venue: "CGR Nîmes",
    guests: ["Victoria Abril (2024)"],
    description: "Festival national dédié au cinéma espagnol, au cœur de la ville de Nîmes. Projections, conférences, cocktails et soirées avec les artistes.",
    upcoming: false,
  },
];

const ARTISTS = [
  "Omar Sy", "Leïla Bekhti", "Jamel Debbouze", "Alexandra Lamy",
  "Elie Semoun", "Jacques Perrin", "Jean-Pierre Jeunet", "Philippe Croizon",
  "Pascal Elbé", "Victoria Abril", "Corinne Masiero", "Youssef Hajdi",
];

const STATS = [
  { number: "20", label: "ans de passion", suffix: "" },
  { number: "6000", label: "entrées / an", suffix: "+" },
  { number: "12", label: "artistes accueillis", suffix: "+" },
  { number: "929", label: "membres", suffix: "" },
];

// Grain overlay SVG
const GrainOverlay = () => (
  <div style={{
    position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none", zIndex: 1,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundSize: "128px 128px",
  }} />
);

// Film strip decorative element
const FilmStrip = ({ side = "left" }) => (
  <div style={{
    position: "absolute",
    [side]: 0, top: 0, bottom: 0, width: 32,
    background: "rgba(0,0,0,0.15)",
    zIndex: 0,
    display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center",
  }}>
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} style={{
        width: 16, height: 10, borderRadius: 2,
        background: "rgba(255,255,255,0.08)",
      }} />
    ))}
  </div>
);

// Countdown component
const Countdown = ({ targetDate }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = Math.max(0, target - now);
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { val: time.days, label: "jours" },
    { val: time.hours, label: "heures" },
    { val: time.mins, label: "min" },
    { val: time.secs, label: "sec" },
  ];

  return (
    <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
      {units.map(({ val, label }) => (
        <div key={label} style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 40, fontWeight: 700, color: "#D4A853",
            lineHeight: 1, minWidth: 60,
            textShadow: "0 2px 12px rgba(212,168,83,0.3)",
          }}>{String(val).padStart(2, "0")}</div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11, color: "rgba(255,255,255,0.5)",
            letterSpacing: 2, textTransform: "uppercase", marginTop: 4,
          }}>{label}</div>
        </div>
      ))}
    </div>
  );
};

// Navigation
const Nav = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Événements", href: "#events" },
    { label: "L'association", href: "#about" },
    { label: "Galerie", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(12,10,8,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.5s ease",
      borderBottom: scrolled ? "1px solid rgba(212,168,83,0.15)" : "1px solid transparent",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #D4A853, #B8860B)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 700, color: "#0C0A08",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>🎬</div>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 18, fontWeight: 700, color: "#FAF3E0",
              letterSpacing: 1,
            }}>LES TÊTES À CLAP</div>
            <div style={{
              fontSize: 9, color: "rgba(212,168,83,0.7)",
              letterSpacing: 3, textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}>Cinéma · Culture · Partage</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              color: "rgba(250,243,224,0.7)", textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              letterSpacing: 1.5, textTransform: "uppercase",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => e.target.style.color = "#D4A853"}
            onMouseLeave={e => e.target.style.color = "rgba(250,243,224,0.7)"}
            >{l.label}</a>
          ))}
          <a href="https://www.helloasso.com/associations/les-tetes-a-clap" target="_blank" rel="noopener" style={{
            background: "linear-gradient(135deg, #D4A853, #B8860B)",
            color: "#0C0A08", padding: "8px 20px", borderRadius: 4,
            textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
            fontSize: 12, fontWeight: 700, letterSpacing: 1.5,
            textTransform: "uppercase",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 4px 20px rgba(212,168,83,0.4)"; }}
          onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
          >Réserver</a>
        </div>
      </div>
    </nav>
  );
};

// Hero section
const Hero = () => {
  const event = EVENTS[0];

  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      background: "#0C0A08",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden", padding: "120px 24px 80px",
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-cinema.jpg)`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.25) saturate(0.6)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "linear-gradient(180deg, rgba(12,10,8,0.7) 0%, rgba(12,10,8,0.4) 40%, rgba(12,10,8,0.9) 100%)",
      }} />
      <GrainOverlay />
      <FilmStrip side="left" />
      <FilmStrip side="right" />

      {/* Spotlight effect */}
      <div style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: 800, height: 800,
        background: "radial-gradient(ellipse, rgba(212,168,83,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Tag */}
      <div style={{
        position: "relative", zIndex: 2,
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        letterSpacing: 4, textTransform: "uppercase",
        color: "#D4A853", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <span style={{ width: 40, height: 1, background: "#D4A853", display: "inline-block" }} />
        Prochain événement
        <span style={{ width: 40, height: 1, background: "#D4A853", display: "inline-block" }} />
      </div>

      {/* Title */}
      <h1 style={{
        position: "relative", zIndex: 2,
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(42px, 7vw, 88px)",
        fontWeight: 700, color: "#FAF3E0",
        textAlign: "center", lineHeight: 1.05,
        margin: "0 0 8px",
        textShadow: "0 4px 30px rgba(0,0,0,0.5)",
      }}>
        {event.title}
      </h1>

      {/* Director */}
      <p style={{
        position: "relative", zIndex: 2,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 18, color: "rgba(250,243,224,0.6)",
        fontStyle: "italic", margin: "0 0 32px",
      }}>
        de {event.director}
      </p>

      {/* Event details */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center",
        marginBottom: 32,
      }}>
        {[
          { icon: "📅", text: event.date },
          { icon: "🕐", text: event.time },
          { icon: "📍", text: event.venue },
        ].map(d => (
          <div key={d.text} style={{
            display: "flex", alignItems: "center", gap: 8,
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: "rgba(250,243,224,0.8)",
          }}>
            <span>{d.icon}</span>{d.text}
          </div>
        ))}
      </div>

      {/* Guests */}
      <div style={{
        position: "relative", zIndex: 2,
        background: "rgba(212,168,83,0.08)",
        border: "1px solid rgba(212,168,83,0.2)",
        borderRadius: 8, padding: "16px 28px",
        marginBottom: 40, maxWidth: 600, textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          letterSpacing: 3, textTransform: "uppercase",
          color: "#D4A853", marginBottom: 8,
        }}>En présence de</div>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 18, color: "#FAF3E0", lineHeight: 1.6,
        }}>
          {event.guests.join(" · ")}
        </div>
      </div>

      {/* Countdown */}
      <div style={{ position: "relative", zIndex: 2, marginBottom: 40 }}>
        <Countdown targetDate="2026-03-24T19:30:00+01:00" />
      </div>

      {/* CTA */}
      <a href={event.ticketUrl} target="_blank" rel="noopener" style={{
        position: "relative", zIndex: 2,
        background: "linear-gradient(135deg, #D4A853, #B8860B)",
        color: "#0C0A08", padding: "16px 48px", borderRadius: 6,
        textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
        fontSize: 15, fontWeight: 700, letterSpacing: 2,
        textTransform: "uppercase",
        boxShadow: "0 4px 30px rgba(212,168,83,0.3)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 40px rgba(212,168,83,0.5)"; }}
      onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 30px rgba(212,168,83,0.3)"; }}
      >
        Réserver mes places
      </a>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10,
          letterSpacing: 3, textTransform: "uppercase",
          color: "rgba(250,243,224,0.3)",
        }}>Découvrir</div>
        <div style={{
          width: 1, height: 40,
          background: "linear-gradient(to bottom, rgba(212,168,83,0.5), transparent)",
          animation: "pulse 2s infinite",
        }} />
      </div>
    </section>
  );
};

// Stats bar
const StatsBar = () => (
  <section style={{
    background: "#D4A853",
    padding: "40px 24px",
    position: "relative",
  }}>
    <div style={{
      maxWidth: 1000, margin: "0 auto",
      display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 24,
    }}>
      {STATS.map(s => (
        <div key={s.label} style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 44, fontWeight: 700, color: "#0C0A08",
            lineHeight: 1,
          }}>{s.number}{s.suffix}</div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 12,
            letterSpacing: 2, textTransform: "uppercase",
            color: "rgba(12,10,8,0.6)", marginTop: 4,
          }}>{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

// About section
const About = () => (
  <section id="about" style={{
    position: "relative",
    background: "#0C0A08",
    padding: "100px 24px", overflow: "hidden",
  }}>
    <div style={{
      position: "absolute", inset: 0, zIndex: 0,
      backgroundImage: `url(${import.meta.env.BASE_URL}images/about-cinema.jpg)`,
      backgroundSize: "cover", backgroundPosition: "center",
      filter: "brightness(0.12) saturate(0.4)",
    }} />
    <GrainOverlay />
    <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
      {/* Section label */}
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        letterSpacing: 4, textTransform: "uppercase",
        color: "#D4A853", marginBottom: 16, textAlign: "center",
      }}>Notre histoire</div>

      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(32px, 5vw, 52px)",
        fontWeight: 700, color: "#FAF3E0",
        textAlign: "center", lineHeight: 1.15,
        margin: "0 0 48px",
      }}>
        Passeurs d'images<br />depuis 2006
      </h2>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
        alignItems: "start",
      }}>
        <div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
            color: "rgba(250,243,224,0.75)", lineHeight: 1.8,
            margin: "0 0 20px",
          }}>
            Née de la passion d'enseignants beaucairois, l'association <strong style={{ color: "#D4A853" }}>Les Têtes à Clap</strong> a
            été créée pour amener le cinéma là où il n'existait pas : à Beaucaire, ville sans salle de cinéma.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
            color: "rgba(250,243,224,0.75)", lineHeight: 1.8, margin: 0,
          }}>
            Ce qui a commencé comme un festival scolaire pour 3 écoles est devenu un dispositif
            touchant 100% des écoliers beaucairois, avec 5 000 à 6 000 entrées par an.
          </p>
        </div>

        <div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
            color: "rgba(250,243,224,0.75)", lineHeight: 1.8,
            margin: "0 0 20px",
          }}>
            Sous la présidence de <strong style={{ color: "#FAF3E0" }}>Ludovic Duplissy</strong>, directeur d'école
            et passionné de cinéma, l'association organise aujourd'hui des festivals, des projections-rencontres
            et des avant-premières à Beaucaire, Tarascon et Nîmes.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
            color: "rgba(250,243,224,0.75)", lineHeight: 1.8, margin: 0,
          }}>
            Notre parrain : le comédien <strong style={{ color: "#FAF3E0" }}>Youssef Hajdi</strong>, natif
            de Tarascon, qui porte avec nous cette mission de culture accessible à tous.
          </p>
        </div>
      </div>

      {/* Quote */}
      <blockquote style={{
        marginTop: 60, padding: "32px 40px",
        borderLeft: "3px solid #D4A853",
        background: "rgba(212,168,83,0.04)",
        borderRadius: "0 8px 8px 0",
      }}>
        <p style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 22, fontStyle: "italic",
          color: "rgba(250,243,224,0.85)", lineHeight: 1.6,
          margin: "0 0 12px",
        }}>
          « Je me positionne en tant que passeur d'images. J'aime bien ce terme… »
        </p>
        <cite style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: "#D4A853", fontStyle: "normal",
          letterSpacing: 1,
        }}>— Ludovic Duplissy, Président</cite>
      </blockquote>
    </div>
  </section>
);

// Events section
const Events = () => (
  <section id="events" style={{
    background: "#14110D",
    padding: "100px 24px",
    position: "relative", overflow: "hidden",
  }}>
    <div style={{
      position: "absolute", inset: 0, zIndex: 0,
      backgroundImage: `url(${import.meta.env.BASE_URL}images/events-bg.jpg)`,
      backgroundSize: "cover", backgroundPosition: "center top",
      filter: "brightness(0.08) saturate(0.3)",
    }} />
    <GrainOverlay />
    <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        letterSpacing: 4, textTransform: "uppercase",
        color: "#D4A853", marginBottom: 16, textAlign: "center",
      }}>Programmation</div>

      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(32px, 5vw, 48px)",
        fontWeight: 700, color: "#FAF3E0",
        textAlign: "center", lineHeight: 1.15,
        margin: "0 0 60px",
      }}>
        Nos événements
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {EVENTS.map((ev, i) => (
          <div key={ev.id} style={{
            display: "grid", gridTemplateColumns: "200px 1fr auto",
            gap: 32, alignItems: "center",
            padding: "28px 32px", borderRadius: 8,
            background: ev.upcoming
              ? "linear-gradient(135deg, rgba(212,168,83,0.12), rgba(212,168,83,0.04))"
              : "rgba(255,255,255,0.02)",
            border: ev.upcoming
              ? "1px solid rgba(212,168,83,0.3)"
              : "1px solid rgba(255,255,255,0.06)",
            transition: "all 0.3s",
          }}>
            <div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                color: ev.upcoming ? "#D4A853" : "rgba(250,243,224,0.5)",
                fontWeight: 600, marginBottom: 4,
              }}>
                {ev.upcoming && "⭐ "}{ev.date}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                color: "rgba(250,243,224,0.4)",
              }}>
                {ev.time} · {ev.venue}
              </div>
            </div>

            <div>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22, fontWeight: 700,
                color: "#FAF3E0", margin: "0 0 4px",
              }}>{ev.title}</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                color: "rgba(250,243,224,0.5)", margin: 0,
              }}>
                {ev.director} · Invités : {ev.guests.join(", ")}
              </p>
            </div>

            {ev.upcoming && ev.ticketUrl && (
              <a href={ev.ticketUrl} target="_blank" rel="noopener" style={{
                background: "linear-gradient(135deg, #D4A853, #B8860B)",
                color: "#0C0A08", padding: "10px 24px", borderRadius: 4,
                textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, fontWeight: 700, letterSpacing: 1.5,
                textTransform: "uppercase", whiteSpace: "nowrap",
              }}>Réserver</a>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Wall of fame (artists)
const WallOfFame = () => (
  <section id="gallery" style={{
    background: "#0C0A08",
    padding: "80px 24px",
    position: "relative", overflow: "hidden",
  }}>
    <div style={{
      position: "absolute", inset: 0, zIndex: 0,
      backgroundImage: `url(${import.meta.env.BASE_URL}images/gallery-bg.jpg)`,
      backgroundSize: "cover", backgroundPosition: "center",
      filter: "brightness(0.1) saturate(0.3) sepia(0.3)",
    }} />
    <GrainOverlay />
    <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        letterSpacing: 4, textTransform: "uppercase",
        color: "#D4A853", marginBottom: 16, textAlign: "center",
      }}>Ils nous ont fait l'honneur de leur présence</div>

      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 700, color: "#FAF3E0",
        textAlign: "center", lineHeight: 1.15,
        margin: "0 0 48px",
      }}>
        Mur des étoiles
      </h2>

      <div style={{
        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12,
      }}>
        {ARTISTS.map(name => (
          <div key={name} style={{
            padding: "12px 24px", borderRadius: 40,
            border: "1px solid rgba(212,168,83,0.25)",
            background: "rgba(212,168,83,0.05)",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 16, color: "rgba(250,243,224,0.8)",
            transition: "all 0.3s",
            cursor: "default",
          }}
          onMouseEnter={e => {
            e.target.style.background = "rgba(212,168,83,0.15)";
            e.target.style.borderColor = "#D4A853";
            e.target.style.color = "#D4A853";
          }}
          onMouseLeave={e => {
            e.target.style.background = "rgba(212,168,83,0.05)";
            e.target.style.borderColor = "rgba(212,168,83,0.25)";
            e.target.style.color = "rgba(250,243,224,0.8)";
          }}
          >{name}</div>
        ))}
      </div>

      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 14,
        color: "rgba(250,243,224,0.4)", textAlign: "center",
        marginTop: 24, fontStyle: "italic",
      }}>
        …et beaucoup d'autres depuis 2006
      </p>
    </div>
  </section>
);

// Activities (3 pillars)
const Activities = () => {
  const pillars = [
    {
      icon: "🎓",
      title: "Festival Scolaire",
      desc: "Chaque année, 5 000 à 6 000 enfants de Beaucaire, Tarascon et alentours découvrent le cinéma grâce à notre dispositif en partenariat avec l'Éducation nationale.",
      image: `${import.meta.env.BASE_URL}images/scolaire.jpg`,
    },
    {
      icon: "🎬",
      title: "Projections-Rencontres",
      desc: "Avant-premières et projections exceptionnelles au CGR Nîmes, toujours suivies d'échanges avec les équipes des films : réalisateurs, comédiens, scénaristes.",
      image: `${import.meta.env.BASE_URL}images/events-bg.jpg`,
    },
    {
      icon: "🇪🇸",
      title: "Festival du Film Espagnol",
      desc: "Un festival national au cœur de Nîmes célébrant le cinéma espagnol avec projections, conférences et rencontres avec les artistes.",
      image: `${import.meta.env.BASE_URL}images/gallery-bg.jpg`,
    },
  ];

  return (
    <section style={{
      background: "linear-gradient(180deg, #14110D, #0C0A08)",
      padding: "100px 24px",
      position: "relative",
    }}>
      <GrainOverlay />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          letterSpacing: 4, textTransform: "uppercase",
          color: "#D4A853", marginBottom: 16, textAlign: "center",
        }}>Ce que nous faisons</div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 700, color: "#FAF3E0",
          textAlign: "center", margin: "0 0 60px",
        }}>
          Trois piliers, une passion
        </h2>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32,
        }}>
          {pillars.map(p => (
            <div key={p.title} style={{
              borderRadius: 12,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              transition: "all 0.4s",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(212,168,83,0.06)";
              e.currentTarget.style.borderColor = "rgba(212,168,83,0.2)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            >
              {/* Card image */}
              <div style={{
                height: 160, position: "relative",
                backgroundImage: `url(${p.image})`,
                backgroundSize: "cover", backgroundPosition: "center",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, rgba(12,10,8,0.3), rgba(12,10,8,0.85))",
                }} />
                <div style={{
                  position: "absolute", bottom: 16, left: 20,
                  fontSize: 36,
                }}>{p.icon}</div>
              </div>
              <div style={{ padding: "20px 24px 28px" }}>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 22, fontWeight: 700, color: "#FAF3E0",
                margin: "0 0 12px",
              }}>{p.title}</h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                color: "rgba(250,243,224,0.6)", lineHeight: 1.7, margin: 0,
              }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact / CTA section
const Contact = () => (
  <section id="contact" style={{
    background: "linear-gradient(180deg, #0C0A08, #1A1510, #0C0A08)",
    padding: "100px 24px",
    position: "relative",
  }}>
    <GrainOverlay />
    <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        letterSpacing: 4, textTransform: "uppercase",
        color: "#D4A853", marginBottom: 16,
      }}>Rejoignez-nous</div>

      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(32px, 5vw, 48px)",
        fontWeight: 700, color: "#FAF3E0",
        margin: "0 0 20px",
      }}>
        Le cinéma, c'est mieux ensemble
      </h2>

      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 16,
        color: "rgba(250,243,224,0.6)", lineHeight: 1.7,
        margin: "0 0 40px",
      }}>
        Bénévole, partenaire, spectateur passionné — il y a mille façons de soutenir
        notre mission de rendre le cinéma accessible à tous.
      </p>

      {/* Social links */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 16, marginBottom: 40,
      }}>
        {[
          { label: "Facebook", url: "https://www.facebook.com/groups/115819288441382/", icon: "f" },
          { label: "Instagram", url: "https://www.instagram.com/lestetesaclap.fr/", icon: "ig" },
          { label: "HelloAsso", url: "https://www.helloasso.com/associations/les-tetes-a-clap", icon: "♡" },
        ].map(s => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener" style={{
            width: 48, height: 48, borderRadius: "50%",
            border: "1px solid rgba(212,168,83,0.3)",
            background: "rgba(212,168,83,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#D4A853", textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700,
            transition: "all 0.3s",
          }}
          onMouseEnter={e => {
            e.target.style.background = "#D4A853";
            e.target.style.color = "#0C0A08";
          }}
          onMouseLeave={e => {
            e.target.style.background = "rgba(212,168,83,0.06)";
            e.target.style.color = "#D4A853";
          }}
          title={s.label}
          >{s.icon}</a>
        ))}
      </div>

      {/* Contact info */}
      <div style={{
        padding: "28px 36px", borderRadius: 12,
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          color: "rgba(250,243,224,0.7)", lineHeight: 2,
        }}>
          <strong style={{ color: "#FAF3E0" }}>Les Têtes à Clap</strong><br />
          4C Chemin des Romains, 30300 Beaucaire<br />
          <a href="mailto:contact@lestetesaclap.fr" style={{ color: "#D4A853", textDecoration: "none" }}>
            contact@lestetesaclap.fr
          </a>
          {" · "}
          <a href="tel:+33609030641" style={{ color: "#D4A853", textDecoration: "none" }}>
            06 09 03 06 41
          </a>
        </div>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer style={{
    background: "#0C0A08",
    borderTop: "1px solid rgba(212,168,83,0.1)",
    padding: "32px 24px",
  }}>
    <div style={{
      maxWidth: 1100, margin: "0 auto",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 16,
    }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 12,
        color: "rgba(250,243,224,0.3)",
      }}>
        © 2006–2026 Les Têtes à Clap · Association loi 1901
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 12,
        color: "rgba(250,243,224,0.3)",
      }}>
        Beaucaire · Tarascon · Nîmes
      </div>
    </div>
  </footer>
);

// Main App
export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#0C0A08", minHeight: "100vh" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0C0A08; }
        ::selection { background: rgba(212,168,83,0.3); color: #FAF3E0; }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @media (max-width: 768px) {
          nav > div > div:last-child a:not(:last-child) { display: none !important; }
          section > div > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="grid-template-columns: 200px"] { grid-template-columns: 1fr !important; }
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
