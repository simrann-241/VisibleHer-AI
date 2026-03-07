import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Sparkles, Brain, FileText, Download, ArrowLeft, Heart, Zap, Globe, Share2, Compass, Target, Mic, MicOff, AlertCircle } from 'lucide-react';
import { translateSkills, calculateReintegrationScore } from '../utils/skillMapper';

const Dashboard = ({ onBack, lang }) => {
  const [step, setStep] = useState(1);
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState({ 
    skills: [], 
    score: 0, 
    analysisId: "", 
    resilience: 0, 
    careers: [], 
    gaps: [] 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");

  const content = {
    en: {
      title: "Map Your Leadership Journey",
      desc: "Describe your caregiving, household work, or community leadership.",
      placeholder: "Example: I managed the household budget, coordinated school schedules, and mediated family conflicts...",
      btnAnalyze: "Analyze & Engineer Profile",
      btnVoice: "Speak Your Story",
      listening: "Listening... Speak now",
      readiness: "Economic Readiness",
      resilience: "Resilience Index",
      capability: "Capability Spectrum",
      careers: "Suggested Careers",
      gaps: "Reintegration Bridge",
      summary: "Professional Synthesis",
      download: "Download Identity Card",
      back: "Back",
      new: "New Mapping"
    },
    hi: {
      title: "अपनी नेतृत्व यात्रा को पहचानें",
      desc: "अपनी देखभाल, घरेलू काम या सामुदायिक नेतृत्व का वर्णन करें।",
      placeholder: "उदाहरण: मैंने घर का बजट संभाला, स्कूल का शेड्यूल बनाया, और परिवार के विवादों को सुलझाया...",
      btnAnalyze: "प्रोफ़ाइल का विश्लेषण करें",
      btnVoice: "बोलकर बताएं",
      listening: "सुन रहे हैं... कृपया बोलें",
      readiness: "आर्थिक तैयारी",
      resilience: "लचीलापन सूचकांक",
      capability: "क्षमता स्पेक्ट्रम",
      careers: "सुझाए गए करियर",
      gaps: "कमी विश्लेषक",
      summary: "व्यावसायिक सारांश",
      download: "पहचान पत्र डाउनलोड करें",
      back: "वापस",
      new: "नया विश्लेषण"
    }
  }[lang];

  // Voice Input Logic
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please try Chrome.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = lang === 'en' ? 'en-US' : 'hi-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev + " " + transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.length < 10) {
      setError(lang === 'en' ? "Please share more detail." : "कृपया और विस्तार से बताएं।");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      const backendResponse = await fetch('http://localhost:5001/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await backendResponse.json();
      setResults({ 
        skills: data.skills || [], 
        score: data.readinessScore || 0,
        analysisId: data.analysisId || "VH-UNKNOWN",
        resilience: data.resilienceScore || 80,
        careers: data.careers || [],
        gaps: data.gaps || []
      });
      setStep(2);
    } catch (err) {
      // Fallback
      const localSkills = translateSkills(inputText);
      const localScore = calculateReintegrationScore(localSkills);
      setResults({
        skills: localSkills,
        score: localScore,
        analysisId: `LOCAL-${Date.now().toString(36).toUpperCase()}`,
        resilience: 85,
        careers: lang === 'en' ? ["Operations Lead", "Coordinator"] : ["ऑपरेशंस लीड", "समन्वयक"],
        gaps: lang === 'en' ? ["Technical Agility"] : ["तकनीकी चपलता"]
      });
      setStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadIdentityCard = () => {
    const cardContent = `
========================================
       VISIBLEHER AI IDENTITY CARD
========================================
ID: ${results.analysisId}
DATE: ${new Date().toLocaleDateString()}
LANGUAGE: ${lang.toUpperCase()}

ECONOMIC READINESS: ${results.score}%
RESILIENCE INDEX: ${results.resilience}%

CORE COMPETENCIES:
${results.skills?.map(s => `- ${s.name}: ${s.score}% (${s.description})`).join('\n')}

SUGGESTED CAREER PATHS:
${results.careers?.map(c => `- ${c}`).join('\n')}

REINTEGRATION BRIDGE (GAPS):
${results.gaps?.map(g => `- ${g}`).join('\n')}

SUMMARY:
"${lang === 'en' 
  ? `A strategic professional with high resilience (${results.resilience}%). Expertly managed complexity in household leadership and ready for ${results.careers[0] || 'leadership'} roles.`
  : `उच्च लचीलेपन (${results.resilience}%) वाली एक रणनीतिक पेशेवर। घरेलू नेतृत्व में जटिलता को कुशलतापूर्वक संभाला और ${results.careers[0] || 'नेतृत्व'} भूमिकाओं के लिए तैयार हैं।`}"

----------------------------------------
ENGINEERED BY VISIBLEHER AI
SHE INNOVATES IDEATHON 2026
----------------------------------------
    `;

    const blob = new Blob([cardContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VisibleHer_Identity_${results.analysisId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const radarData = (results.skills || []).map(s => ({
    subject: s.name,
    A: s.score,
    fullMark: 100,
  }));

  return (
    <div className="container" style={styles.dashboard}>
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
          >
            <div style={styles.header}>
              <button onClick={onBack} style={styles.backBtn}><ArrowLeft size={18} /> {content.back}</button>
              <h2 style={styles.title}>{content.title}</h2>
              <p style={styles.desc}>{content.desc}</p>
            </div>

            <div className="glass-card">
              <form onSubmit={handleSubmit}>
                <div style={styles.inputWrapper}>
                  <textarea 
                    placeholder={content.placeholder}
                    style={styles.textarea}
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (error) setError("");
                    }}
                  />
                  <button 
                    type="button" 
                    className={`tool-btn pulse-btn ${isListening ? 'active' : ''}`}
                    style={styles.voiceBtn}
                    onClick={startListening}
                    disabled={isListening}
                  >
                    {isListening ? <MicOff size={24} color="var(--secondary)" /> : <Mic size={24} />}
                  </button>
                  {isListening && <div style={styles.listeningText}>{content.listening}</div>}
                </div>
                
                {error && <div style={styles.error}><AlertCircle size={16} /> {error}</div>}

                <div className="flex-stack" style={styles.formFooter}>
                  <div style={styles.metaInfo}>
                    <Heart size={16} color="var(--secondary)" />
                    <span>{lang === 'en' ? "Your effort is visible here." : "आपका प्रयास यहाँ दिखाई दे रहा है।"}</span>
                  </div>
                  <button className="primary-btn" type="submit" disabled={isLoading}>
                    {isLoading ? "..." : <>{content.btnAnalyze} <Sparkles size={18} /></>}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex-stack" style={styles.resultsHeader}>
              <div>
                <div className="analysis-id">ID: {results.analysisId}</div>
                <h2 style={styles.resultsTitle} className="gradient-text">{lang === 'en' ? "Visible Identity" : "दृश्य पहचान"}</h2>
              </div>
              <button className="secondary-btn" onClick={() => setStep(1)}>{content.new}</button>
            </div>

            <div className="dash-grid" style={styles.grid}>
              <div className="glass-card" style={{...styles.card, gridColumn: 'span 4'}}>
                <h3 style={styles.cardTitle}>{content.readiness}</h3>
                <div style={styles.scoreBox}>
                  <div style={styles.scoreVal}>{results.score}%</div>
                  <div className="progress-bar"><div style={{...styles.progressFill, width: `${results.score}%`}}></div></div>
                </div>
                <div style={styles.metrics}>
                  <div style={styles.metric}>
                    <div style={styles.mLabel}>{content.resilience}</div>
                    <div style={styles.mVal}>{results.resilience}%</div>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{...styles.card, gridColumn: 'span 8'}}>
                <h3 style={styles.cardTitle}>{content.capability}</h3>
                <div style={{ height: '240px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="var(--glass-border)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} />
                      <Radar name="Skills" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card" style={{...styles.card, gridColumn: 'span 4'}}>
                <h3 style={styles.cardTitle}><Compass size={18} /> {content.careers}</h3>
                <div style={styles.list}>
                  {results.careers?.map((c, i) => (
                    <div key={i} style={styles.listItem}>
                      <div className="dot" style={{ background: 'var(--accent)' }}></div>
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{...styles.card, gridColumn: 'span 4'}}>
                <h3 style={styles.cardTitle}><Target size={18} /> {content.gaps}</h3>
                <div style={styles.gapList}>
                  {results.gaps?.map((g, i) => (
                    <span key={i} className="gap-tag" style={styles.tag}>{g}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ ...styles.card, gridColumn: 'span 4' }}>
                <h3 style={styles.cardTitle}><Brain size={18} /> {content.skillsTitle || (lang === 'en' ? "Key Skills" : "मुख्य कौशल")}</h3>
                <div style={styles.skillTable}>
                  {results.skills?.slice(0, 3).map((skill, i) => (
                    <div key={i} style={{ marginBottom: '12px', fontSize: '14px' }}>
                      <div style={{ fontWeight: '700', marginBottom: '4px' }}>{skill.name}</div>
                      <div style={{ height: '4px', background: 'var(--glass-border)', borderRadius: '2px' }}>
                        <div style={{ width: `${skill.score}%`, height: '100%', background: 'var(--primary)', borderRadius: '2px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ ...styles.card, gridColumn: 'span 12' }}>
                <h3 style={styles.cardTitle}><FileText size={18} /> {content.summary}</h3>
                <p style={styles.summaryText}>
                  {lang === 'en' 
                    ? `A strategic professional with high resilience (${results.resilience}%). Expertly managed complexity in household leadership and ready for ${results.careers[0] || 'leadership'} roles.`
                    : `उच्च लचीलेपन (${results.resilience}%) वाली एक रणनीतिक पेशेवर। घरेलू नेतृत्व में जटिलता को कुशलतापूर्वक संभाला और ${results.careers[0] || 'नेतृत्व'} भूमिकाओं के लिए तैयार हैं।`}
                </p>
                <div style={styles.actions}>
                  <button className="primary-btn" onClick={downloadIdentityCard}><Download size={18} /> {content.download}</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  dashboard: { padding: '40px 0 100px' },
  header: { marginBottom: '32px' },
  backBtn: { background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  title: { fontSize: '32px', marginBottom: '8px' },
  desc: { color: 'var(--text-secondary)' },
  inputWrapper: { position: 'relative' },
  textarea: { width: '100%', minHeight: '180px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '24px', color: 'var(--text-primary)', fontSize: '16px', outline: 'none', fontFamily: 'inherit' },
  voiceBtn: { position: 'absolute', right: '20px', bottom: '20px', width: '50px', height: '50px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  listeningText: { color: 'var(--secondary)', fontWeight: 600, marginTop: '8px', fontSize: '14px', textAlign: 'center' },
  formFooter: { marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  metaInfo: { display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' },
  error: { color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '14px' },
  
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(12, 1fr)', 
    gap: '32px', 
    marginTop: '40px' 
  },
  card: { padding: '40px', display: 'flex', flexDirection: 'column', height: '100%' },
  cardTitle: { fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' },
  resultsTitle: { fontSize: '42px', marginBottom: '12px' },
  scoreBox: { textAlign: 'center', marginBottom: '24px' },
  scoreVal: { fontSize: '48px', fontWeight: '800', fontFamily: 'Playfair Display' },
  progressFill: { height: '8px', background: 'var(--wellness-gradient)', borderRadius: '10px' },
  metrics: { borderTop: '1px solid var(--glass-border)', paddingTop: '16px', display: 'flex', justifyContent: 'center' },
  metric: { textAlign: 'center' },
  mLabel: { fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' },
  mVal: { fontSize: '20px', fontWeight: '800', color: 'var(--accent)' },
  
  list: { display: 'flex', flexDirection: 'column', gap: '12px' },
  listItem: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px' },
  gapList: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  tag: { padding: '6px 14px', background: 'var(--bg-secondary)', borderRadius: '100px', border: '1px solid var(--glass-border)', fontSize: '13px' },
  summaryText: { fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.8' },
  actions: { display: 'flex', gap: '12px' }
};

export default Dashboard;
