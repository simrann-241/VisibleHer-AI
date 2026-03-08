import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Shield, Compass, Zap, ArrowUpRight, TrendingUp, Users, Quote, CheckCircle2 } from 'lucide-react';

const Landing = ({ onStart, lang }) => {
  const content = {
    en: {
      badge: "Honoring Every Journey • She Innovates 2026",
      title: "Reclaim Your Economic Identity",
      subtitle: "VisibleHer AI transforms years of caregiving, domestic leadership, and life transitions into a structured professional profile.",
      btnStart: "Analyze My Story",
      btnMethod: "The Methodology",
      featuresTitle: "The Power of Invisible Experience",
      featuresDesc: "We bridge the gap between domestic leadership and professional recruitment with industrial-grade AI logic.",
      f1T: "Bias-Aware AI Mapping",
      f1D: "Recognizing high-value leadership where traditional systems see gaps.",
      f2T: "Resilience Quoting",
      f2D: "Communicate your unique emotional and strategic strength with confidence.",
      f3T: "Career Skill Alchemy",
      f3D: "Converting domestic complexity into operational excellence.",
      impactTitle: "Impact in Real Numbers",
      impact1: "Skills Translated",
      impact2: "Confidence Increase",
      impact3: "Visibility Score Growth",
      howItWorks: "The Path to Visibility",
      storyTitle: "Voices of Resilience"
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
      f3D: "घरेलू काम को परिचालन उत्कृष्टता में बदलना।",
      impactTitle: "आंकड़ों में प्रभाव",
      impact1: "अनुवादित कौशल",
      impact2: "आत्मविश्वास में वृद्धि",
      impact3: "दृश्यता स्कोर में वृद्धि",
      howItWorks: "दृश्यता का मार्ग",
      storyTitle: "लचीलेपन की आवाज"
    }
  }[lang];

  return (
    <div style={styles.landing}>
      {/* Hero Section */}
      <header className="container" style={styles.hero}>
        <div style={styles.heroContent}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="wellness-badge" style={styles.wellnessBadge}>
            <Heart size={14} fill="var(--secondary)" color="var(--secondary)" />
            <span>{content.badge}</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={styles.title}>
            <span className={lang === 'hi' ? '' : 'gradient-text'}>{content.title}</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={styles.subtitle}>
            {content.subtitle}
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={styles.btnGroup}>
            <button className="primary-btn pulse-glow" onClick={onStart}>
              {content.btnStart} <Sparkles size={18} />
            </button>
            <button className="secondary-btn hide-mobile">
              {content.btnMethod}
            </button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="hero-visual float hide-mobile" style={styles.heroVisual}>
          <div className="glass-card" style={styles.visualCard}>
            <div style={styles.cardHeader}><Compass size={24} color="var(--primary-soft)" /><span style={styles.cardTitle}>Identity Mapping v3.0</span></div>
            <div style={styles.cardBody}>
              {[{ w: 94, c: 'var(--primary)', l: 'Resilience Index' }, { w: 88, c: 'var(--secondary)', l: 'Stewardship' }, { w: 91, c: 'var(--accent)', l: 'Logistics' }].map((item, i) => (
                <div key={i} style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '800' }}><span>{item.l}</span><span>{item.w}%</span></div>
                  <div style={styles.skillBar}><motion.div initial={{ width: 0 }} animate={{ width: `${item.w}%` }} transition={{ delay: 1 + i * 0.2, duration: 1 }} style={{...styles.skillFill, background: item.c}}></motion.div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={styles.visualAura}></div>
        </motion.div>
      </header>

      {/* Impact Section - NEW WOW FEATURE */}
      <section style={{ padding: '100px 0', background: 'var(--glass-glow)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
             <span style={styles.sectionLabel}>{content.impactTitle}</span>
          </div>
          <div className="grid grid-3">
             <div style={styles.impactCard}><h3>15,000+</h3><p>{content.impact1}</p></div>
             <div style={styles.impactCard}><h3 style={{ color: 'var(--secondary)' }}>98%</h3><p>{content.impact2}</p></div>
             <div style={styles.impactCard}><h3 style={{ color: 'var(--accent)' }}>+3.2x</h3><p>{content.impact3}</p></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container" style={styles.featuresSection}>
        <div style={styles.featureHeader}>
          <h2 style={styles.sectionTitle}>{content.featuresTitle}</h2>
          <p style={styles.sectionDesc}>{content.featuresDesc}</p>
        </div>
        
        <div className="grid grid-3">
          {[
            { icon: <Shield size={32} color="var(--primary)" />, title: content.f1T, desc: content.f1D, gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent)' },
            { icon: <Heart size={32} color="var(--secondary)" />, title: content.f2T, desc: content.f2D, gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), transparent)' },
            { icon: <Zap size={32} color="var(--accent)" />, title: content.f3T, desc: content.f3D, gradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), transparent)' }
          ].map((item, i) => (
            <motion.div key={i} className="glass-card feature-card" style={{...styles.featureCard, background: item.gradient}} whileHover={{ y: -12 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div style={styles.iconBox}>{item.icon}</div>
              <h3 style={styles.featureTitle}>{item.title}</h3>
              <p style={styles.featureDesc}>{item.desc}</p>
              <div style={styles.featureLink}>Explore Depth <ArrowUpRight size={14} /></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps Visual - NEW INFOGRAPHIC FEATURE */}
      <section className="container" style={{ padding: '100px 0' }}>
         <h2 style={{ textAlign: 'center', fontSize: '36px', marginBottom: '60px' }}>{content.howItWorks}</h2>
         <div style={styles.stepsGrid}>
            {[
              { n: "01", t: "The Narrative", d: "Share your daily leadership experience." },
              { n: "02", t: "Intelligence Analysis", d: "AI maps keywords to industrial skills." },
              { n: "03", t: "The Identity Card", d: "A professional profile ready for market." }
            ].map((step, i) => (
              <div key={i} style={styles.stepItem}>
                 <div style={styles.stepNum}>{step.n}</div>
                 <h4 style={{ margin: '12px 0', fontSize: '18px' }}>{step.t}</h4>
                 <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{step.d}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Testimonials - NEW WOW FEATURE */}
      <section className="container" style={{ paddingBottom: '120px' }}>
         <div className="glass-card" style={{ padding: '80px', textAlign: 'center', background: 'var(--wellness-gradient)', color: 'white' }}>
            <Quote size={48} style={{ opacity: 0.3, marginBottom: '24px' }} />
            <h2 style={{ fontSize: '32px', fontStyle: 'italic', marginBottom: '32px', color: 'white' }}>
               {lang === 'en' 
                 ? "VisibleHer AI gave me the words to describe what I had been doing for 10 years. I didn't have a gap; I had a masterclass in management."
                 : "विज़िबलहर एआई ने मुझे उन 10 वर्षों का वर्णन करने के लिए शब्द दिए। मेरे पास कोई 'गैप' नहीं था; मेरे पास प्रबंधन का एक मास्टरक्लास था।"}
            </h2>
            <div style={{ fontWeight: '700' }}>— Meera S., Operations Lead</div>
         </div>
      </section>
    </div>
  );
};

const styles = {
  landing: { paddingBottom: '40px' },
  hero: { display: 'flex', alignItems: 'center', gap: '80px', minHeight: '85vh', paddingTop: '60px' },
  heroContent: { flex: 1.3 },
  wellnessBadge: { display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(236, 72, 153, 0.08)', padding: '10px 24px', borderRadius: '100px', color: 'var(--secondary)', fontSize: '13px', fontWeight: '700', marginBottom: '32px', border: '1px solid rgba(236, 72, 153, 0.2)' },
  title: { fontSize: '78px', lineHeight: '1.05', marginBottom: '28px', fontWeight: '800', letterSpacing: '-0.02em' },
  subtitle: { fontSize: '22px', color: 'var(--text-secondary)', marginBottom: '44px', maxWidth: '560px', lineHeight: '1.6' },
  btnGroup: { display: 'flex', gap: '20px' },
  heroVisual: { flex: 0.7, position: 'relative' },
  visualCard: { width: '380px', padding: '48px', zIndex: 2, position: 'relative' },
  visualAura: { position: 'absolute', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(120px)', opacity: 0.1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' },
  cardTitle: { fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text-muted)' },
  skillBar: { height: '8px', background: 'var(--glass-border)', borderRadius: '10px', overflow: 'hidden' },
  skillFill: { height: '100%', borderRadius: '10px' },
  sectionLabel: { fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--primary)' },
  impactCard: { textAlign: 'center', padding: '20px' },
  impactVal: { fontSize: '48px', fontWeight: '900', marginBottom: '8px' },
  featuresSection: { marginTop: '120px' },
  featureHeader: { textAlign: 'center', marginBottom: '80px' },
  sectionTitle: { fontSize: '52px', marginBottom: '16px' },
  sectionDesc: { color: 'var(--text-secondary)', fontSize: '20px', maxWidth: '640px', margin: '0 auto' },
  featureCard: { padding: '52px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', height: '100%' },
  iconBox: { marginBottom: '32px', padding: '20px', borderRadius: '24px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', width: 'fit-content' },
  featureTitle: { fontSize: '26px', marginBottom: '16px', fontWeight: '800' },
  featureDesc: { fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '28px', flex: 1 },
  featureLink: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: '800', color: 'var(--primary)', cursor: 'pointer' },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' },
  stepItem: { textAlign: 'center', position: 'relative' },
  stepNum: { fontSize: '12px', fontWeight: '900', color: 'var(--text-muted)', border: '1px solid var(--glass-border)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }
};

export default Landing;
