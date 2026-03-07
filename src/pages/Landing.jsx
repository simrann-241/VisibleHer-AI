import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Shield, Compass, Zap, ArrowUpRight } from 'lucide-react';

const Landing = ({ onStart, lang }) => {
  const content = {
    en: {
      badge: "Honoring Every Journey • She Innovates 2026",
      title: "Reclaim Your Economic Identity",
      subtitle: "VisibleHer AI transforms years of caregiving, domestic leadership, and life transitions into a structured professional profile.",
      btnStart: "Analyze My Story",
      btnMethod: "The Methodology",
      featuresTitle: "The Power of Invisible Experience",
      featuresDesc: "We bridge the gap between domestic leadership and professional recruitment.",
      f1T: "Bias-Aware AI",
      f1D: "Recognizing value where traditional systems see gaps.",
      f2T: "Empowerment First",
      f2D: "Communicate your unique strength with confidence.",
      f3T: "Skill Alchemy",
      f3D: "Converting domestic work into operational excellence."
    },
    hi: {
      badge: "हर यात्रा का सम्मान • शी इनोवेट्स 2026",
      title: "अपनी आर्थिक पहचान वापस पाएं",
      subtitle: "विज़िबलहर एआई देखभाल, घरेलू नेतृत्व और जीवन के बदलावों के वर्षों को एक व्यवस्थित पेशेवर प्रोफ़ाइल में बदल देता है।",
      btnStart: "अपनी कहानी साझा करें",
      btnMethod: "हमारी कार्यप्रणाली",
      featuresTitle: "अदृश्य अनुभव की शक्ति",
      featuresDesc: "हम घरेलू नेतृत्व और व्यावसायिक भर्ती के बीच की दूरी को मिटाते हैं।",
      f1T: "पूर्वाग्रह-मुक्त एआई",
      f1D: "वहाँ मूल्य पहचानना जहाँ पारंपरिक सिस्टम कमियाँ देखते हैं।",
      f2T: "सशक्तिकरण पहले",
      f2D: "आत्मविश्वास के साथ अपनी अनूठी ताकत साझा करें।",
      f3T: "कौशल परिवर्तन",
      f3D: "घरेलू काम को परिचालन उत्कृष्टता में बदलना।"
    }
  }[lang];

  return (
    <div style={styles.landing}>
      <header className="container" style={styles.hero}>
        <div style={styles.heroContent}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="wellness-badge"
            style={styles.wellnessBadge}
          >
            <Heart size={14} fill="var(--secondary)" color="var(--secondary)" />
            <span>{content.badge}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.title}
          >
            <span className={lang === 'hi' ? '' : 'gradient-text'}>{content.title}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.subtitle}
          >
            {content.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.btnGroup}
          >
            <button className="primary-btn" onClick={onStart}>
              {content.btnStart} <Sparkles size={18} />
            </button>
            <button className="secondary-btn hide-mobile">
              {content.btnMethod}
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hero-visual float hide-mobile"
          style={styles.heroVisual}
        >
          <div className="glass-card" style={styles.visualCard}>
            <div style={styles.cardHeader}>
              <Compass size={24} color="var(--primary-soft)" />
              <span style={styles.cardTitle}>Identity Mapping</span>
            </div>
            <div style={styles.cardBody}>
              {[
                { w: 85, c: 'var(--primary)', l: 'Strategic Planning' },
                { w: 92, c: 'var(--secondary)', l: 'Resilience Index' },
                { w: 78, c: 'var(--accent)', l: 'Operational Agility' }
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '700' }}>
                    <span>{item.l}</span>
                    <span>{item.w}%</span>
                  </div>
                  <div style={styles.skillBar}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.w}%` }}
                      transition={{ delay: 1 + i * 0.2, duration: 1 }}
                      style={{...styles.skillFill, background: item.c}}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative element */}
          <div style={styles.visualAura}></div>
        </motion.div>
      </header>

      <section className="container" style={styles.featuresSection}>
        <div style={styles.featureHeader}>
          <h2 style={styles.sectionTitle}>{content.featuresTitle}</h2>
          <p style={styles.sectionDesc}>{content.featuresDesc}</p>
        </div>
        
        <div className="grid grid-3">
          {[
            { 
              icon: <Shield size={32} color="var(--primary)" />, 
              title: content.f1T, 
              desc: content.f1D,
              gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent)'
            },
            { 
              icon: <Heart size={32} color="var(--secondary)" />, 
              title: content.f2T, 
              desc: content.f2D,
              gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), transparent)'
            },
            { 
              icon: <Zap size={32} color="var(--accent)" />, 
              title: content.f3T, 
              desc: content.f3D,
              gradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), transparent)'
            }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              className="glass-card feature-card" 
              style={{...styles.featureCard, background: item.gradient}}
              whileHover={{ y: -12, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={styles.iconBox}>{item.icon}</div>
              <h3 style={styles.featureTitle}>{item.title}</h3>
              <p style={styles.featureDesc}>{item.desc}</p>
              <div className="feature-link" style={styles.featureLink}>
                Learn More <ArrowUpRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  landing: { paddingBottom: '100px' },
  hero: { display: 'flex', alignItems: 'center', gap: '60px', minHeight: '80vh', paddingTop: '40px' },
  heroContent: { flex: 1.2 },
  wellnessBadge: { display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(236, 72, 153, 0.08)', padding: '8px 20px', borderRadius: '100px', color: 'var(--secondary)', fontSize: '13px', fontWeight: '600', marginBottom: '24px', border: '1px solid rgba(236, 72, 153, 0.2)' },
  title: { fontSize: '72px', lineHeight: '1.1', marginBottom: '24px', fontWeight: '800' },
  subtitle: { fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '540px', lineHeight: '1.6' },
  btnGroup: { display: 'flex', gap: '16px' },
  heroVisual: { flex: 0.8, display: 'flex', justifyContent: 'center', position: 'relative' },
  visualCard: { width: '340px', padding: '40px', position: 'relative', zIndex: 2 },
  visualAura: { position: 'absolute', width: '250px', height: '250px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.15, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' },
  cardTitle: { fontSize: '12px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-muted)' },
  skillBar: { height: '8px', background: 'var(--glass-border)', borderRadius: '10px', overflow: 'hidden' },
  skillFill: { height: '100%', borderRadius: '10px' },
  featuresSection: { marginTop: '120px' },
  featureHeader: { textAlign: 'center', marginBottom: '80px' },
  sectionTitle: { fontSize: '48px', marginBottom: '16px' },
  sectionDesc: { color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' },
  featureCard: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    textAlign: 'left', 
    padding: '48px',
    border: '1px solid var(--glass-border)',
    position: 'relative',
    overflow: 'hidden'
  },
  iconBox: { 
    marginBottom: '32px', 
    padding: '20px', 
    borderRadius: '24px', 
    background: 'var(--bg-primary)',
    border: '1px solid var(--glass-border)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
  },
  featureTitle: { fontSize: '24px', marginBottom: '16px', fontWeight: '700' },
  featureDesc: { fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' },
  featureLink: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '6px', 
    fontSize: '14px', 
    fontWeight: '700', 
    color: 'var(--primary)',
    cursor: 'pointer'
  }
};

export default Landing;
