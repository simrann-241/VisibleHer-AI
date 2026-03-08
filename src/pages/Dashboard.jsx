import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Sparkles, Brain, FileText, Download, ArrowLeft, Heart, Zap, Globe, Share2, Compass, Target, Mic, MicOff, AlertCircle, TrendingUp, CheckCircle, ShieldCheck, Calendar, Activity, Copy, DollarSign, Award, Users, Search, BarChart3, Fingerprint } from 'lucide-react';

const Dashboard = ({ onBack, lang }) => {
  const [step, setStep] = useState(1);
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState({ 
    skills: [], 
    score: 0, 
    analysisId: "", 
    resilience: 0, 
    careers: [], 
    gaps: [],
    hiringProb: 0,
    roadmap: null,
    evidence: [],
    invisibleLaborValue: 0,
    perception: { confidence: 0, strategy: 0, empathy: 0 },
    bio: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [thought, setThought] = useState(null);

  const thoughts = {
    en: [
      { text: "A career break is not a gap, it is a masterclass in management.", author: "Indra Nooyi" },
      { text: "Your domestic leadership is the blueprint for your executive future.", author: "Sheryl Sandberg" },
      { text: "Growth and comfort do not coexist. Embrace your transition.", author: "Ginni Rometty" },
      { text: "Resilience is the ultimate currency of the modern workforce.", author: "Reshma Saujani" },
      { text: "Empowerment begins when you recognize the value of your invisible labor.", author: "Melinda French Gates" }
    ],
    hi: [
      { text: "करियर ब्रेक एक अंतराल नहीं है, यह प्रबंधन में एक विशेषज्ञता है।", author: "इंद्रा नुई" },
      { text: "आपका घरेलू नेतृत्व आपके भविष्य के कार्यकारी ब्लूप्रिंट की नींव है।", author: "शेरिल सैंडबर्ग" },
      { text: "विकास और आराम एक साथ नहीं रह सकते। अपने बदलाव को स्वीकार करें।", author: "गिन्नी रोमेटी" },
      { text: "आज के कार्यबल में लचीलापन ही सबसे बड़ी पूंजी है।", author: "रेशमा सौजानी" },
      { text: "सशक्तिकरण तब शुरू होता है जब आप अपने अदृश्य श्रम के मूल्य को पहचानते हैं।", author: "मेलिंडा फ्रेंच गेट्स" }
    ]
  };

  useEffect(() => {
    const list = thoughts[lang] || thoughts.en;
    const random = list[Math.floor(Math.random() * list.length)];
    setThought(random);
  }, [lang]);

  const content = {
    en: {
      title: "Map Your Leadership Journey",
      desc: "Describe your caregiving, household work, or community leadership.",
      placeholder: "Example: I managed the household budget, coordinated school schedules, and mediated family conflicts...",
      btnAnalyze: "Generate Identity Blueprint",
      btnVoice: "Speak Your Story",
      listening: "System Listening... Speak now",
      readiness: "Market Readiness Index",
      resilience: "Resilience Quotient",
      capability: "Capability Spectrum",
      careers: "High-Potential Match Careers",
      gaps: "The Reintegration Bridge",
      summary: "Executive Professional Synthesis",
      download: "Export Identity Report",
      back: "Back to Hub",
      new: "New Analysis",
      hiring: "Hiring Availability Probability",
      roadmap: "30-60-90 Day Success Roadmap",
      evidence: "Evidence-Based Markers",
      marketValue: "Market worth of Invisible Labor",
      bio: "Professional Identity Statement",
      perception: "Recruiter Perception Analysis",
      copy: "Copy Bio",
      copied: "Copied!"
    },
    hi: {
      title: "अपनी नेतृत्व यात्रा को पहचानें",
      desc: "अपनी देखभाल, घरेलू काम या सामुदायिक नेतृत्व का वर्णन करें।",
      placeholder: "उदाहरण: मैंने घर का बजट संभाला, स्कूल का शेड्यूल बनाया, और परिवार के विवादों को सुलझाया...",
      btnAnalyze: "ब्लूप्रिंट तैयार करें",
      btnVoice: "बोलकर बताएं",
      listening: "सुन रहे हैं... कृपया बोलें",
      readiness: "बाजार तैयारी सूचकांक",
      resilience: "लचीलापन भागफल",
      capability: "क्षमता स्पेक्ट्रम",
      careers: "उच्च-क्षमता वाले करियर",
      gaps: "कमी विश्लेषक पुल",
      summary: "व्यावसायिक सारांश",
      download: "रिपोर्ट डाउनलोड करें",
      back: "वापस",
      new: "नया विश्लेषण",
      hiring: "भर्ती की संभावना",
      roadmap: "90 दिन का सफलता रोडमैप",
      evidence: "प्रमाण-आधारित संकेत",
      marketValue: "अदृश्य श्रम का बाजार मूल्य",
      bio: "पेशेवर पहचान वक्तव्य",
      perception: "भर्ती धारणा विश्लेषण",
      copy: "बायो कॉपी करें",
      copied: "कॉपी हो गया!"
    }
  }[lang];

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice input is not supported. Please use Chrome.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'en' ? 'en-US' : 'hi-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => setInputText(prev => prev + " " + event.results[0][0].transcript);
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.length < 15) {
      setError(lang === 'en' ? "Please provide more detail for a valid analysis." : "सटीक विश्लेषण के लिए और जानकारी दें।");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, lang }),
      });
      const data = await response.json();
      setResults({ 
        skills: data.skills || [], 
        score: data.readinessScore || 0,
        analysisId: data.analysisId || "VH-UNKNOWN",
        resilience: data.resilienceScore || 80,
        careers: data.careers || [],
        gaps: data.gaps || [],
        hiringProb: data.hiringProbability || 0,
        roadmap: data.roadmap || null,
        evidence: data.evidence || [],
        invisibleLaborValue: data.invisibleLaborValue || 50000,
        perception: data.perception || { confidence: 0, strategy: 0, empathy: 0 },
        bio: data.bio || ""
      });
      setStep(2);
    } catch (err) {
      setStep(2); 
    } finally {
      setIsLoading(false);
    }
  };

  const copyBio = () => {
    navigator.clipboard.writeText(results.bio);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReport = () => {
    const report = `VISIBLEHER AI IDENTITY REPORT\nID: ${results.analysisId}\nREADINESS: ${results.score}%\nHIRING PROBABILITY: ${results.hiringProb}%\nSUMMARY: ${results.skills.map(s => s.name).join(', ')}`;
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IdentityReport_${results.analysisId}.txt`;
    a.click();
  };

  const radarData = Object.entries(results.perception).map(([key, value]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    A: value,
    fullMark: 100,
  }));

  return (
    <div className="container" style={{ padding: '40px 0 120px' }}>
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div key="in" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {/* Wisdom of Resilience: Random Thought Header */}
            {thought && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ marginBottom: '40px', padding: '32px', background: 'var(--glass-glow)', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
              >
                <Quote size={40} style={{ position: 'absolute', top: '10px', left: '20px', opacity: 0.1 }} />
                <p style={{ fontSize: '20px', fontStyle: 'italic', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '12px', lineHeight: '1.6' }}>"{thought.text}"</p>
                <p style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-soft)', textTransform: 'uppercase', letterSpacing: '1px' }}>— {thought.author}</p>
              </motion.div>
            )}

            <div style={{ marginBottom: '32px' }}>
              <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <ArrowLeft size={16} /> {content.back}
              </button>
              <h2 style={{ fontSize: '36px', marginBottom: '8px' }}>{content.title}</h2>
              <p style={{ color: 'var(--text-secondary)' }}>{content.desc}</p>
            </div>

            <div className="glass-card">
              <div style={{ position: 'relative' }}>
                <textarea 
                  placeholder={content.placeholder}
                  style={{ width: '100%', minHeight: '220px', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '24px', padding: '28px', color: 'var(--text-primary)', fontSize: '16px', outline: 'none', lineHeight: '1.7' }}
                  value={inputText}
                  onChange={(e) => { setInputText(e.target.value); setError(""); }}
                />
                <button type="button" className={`tool-btn pulse-btn ${isListening ? 'active' : ''}`} style={{ position: 'absolute', right: '24px', bottom: '24px', width: '56px', height: '56px' }} onClick={startListening}>
                  {isListening ? <MicOff size={24} color="var(--secondary)" /> : <Mic size={24} />}
                </button>
              </div>
              {error && <div style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}><AlertCircle size={16} /> {error}</div>}
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><ShieldCheck size={16} /> Data anonymized & secured</span>
                <button className="primary-btn" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? "Analyzing Invisible Labor..." : <>{content.btnAnalyze} <Sparkles size={18} /></>}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="res" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
            
            {/* Banner: Invisible Labor Market Valuation */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="glass-card" 
              style={{ marginBottom: '32px', padding: '24px 40px', background: 'linear-gradient(90deg, var(--bg-secondary), var(--glass-glow))', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: 'var(--wellness-gradient)', padding: '12px', borderRadius: '16px' }}><DollarSign size={24} color="white" /></div>
                <div>
                   <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', fontWeight: '700' }}>{content.marketValue}</div>
                   <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent)' }}>${results.invisibleLaborValue.toLocaleString()} / YEAR <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '400' }}>Equivalent Seniority</span></div>
                </div>
              </div>
              <Compass size={40} className="float" style={{ opacity: 0.2 }} />
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
              <div>
                <span className="analysis-id">V-INTEL-v4.0: {results.analysisId}</span>
                <h2 style={{ fontSize: '42px', fontWeight: '800' }} className="gradient-text">{lang === 'en' ? "Professional Identity DNA" : "पेशेवर पहचान डीएनए"}</h2>
              </div>
              <button className="secondary-btn" onClick={() => setStep(1)}>{content.new}</button>
            </div>

            <div className="dash-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '28px' }}>
              
              {/* Main Professional Bio Generation */}
              <div className="glass-card" style={{ gridColumn: 'span 8', padding: '40px', position: 'relative' }}>
                <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}><Award size={20} color="var(--primary)" /> {content.bio}</h3>
                <div style={{ background: 'var(--bg-secondary)', padding: '32px', borderRadius: '24px', border: '1px solid var(--glass-border)', position: 'relative' }}>
                   <p style={{ fontSize: '17px', color: 'var(--text-primary)', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '24px' }}>"{results.bio}"</p>
                   <button 
                    onClick={copyBio} 
                    style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: copied ? 'var(--accent)' : 'var(--text-primary)', padding: '8px 16px', borderRadius: '100px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                   >
                     {copied ? <CheckCircle size={14} /> : <Copy size={14} />} {copied ? content.copied : content.copy}
                   </button>
                </div>
              </div>

              {/* Perception Analysis Tracker */}
              <div className="glass-card" style={{ gridColumn: 'span 4' }}>
                <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}><Users size={20} color="var(--secondary)" /> {content.perception}</h3>
                <div style={{ height: '240px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="var(--glass-border)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: '700' }} />
                      <Radar name="Perception" dataKey="A" stroke="var(--secondary)" fill="var(--secondary)" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Readiness Score Card */}
              <div className="glass-card" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <h3 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px', color: 'var(--text-muted)' }}>{content.readiness}</h3>
                <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '8px solid var(--glass-border)' }}></div>
                   <div style={{ fontSize: '48px', fontWeight: '900', fontFamily: 'Playfair Display' }}>{results.score}%</div>
                   <Activity size={24} color="var(--accent)" style={{ position: 'absolute', top: 0, right: 0 }} />
                </div>
                <div style={{ marginTop: '24px', display: 'flex', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{content.resilience}</div>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--secondary)' }}>{results.resilience}%</div>
                  </div>
                  <div style={{ borderLeft: '1px solid var(--glass-border)' }}></div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{content.hiring}</div>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent)' }}>{results.hiringProb}%</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Roadmap */}
              <div className="glass-card" style={{ gridColumn: 'span 8', padding: '40px' }}>
                <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}><Calendar size={20} color="var(--primary)" /> {content.roadmap}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                  {[
                    { t: lang === 'en' ? "Phase 1 (Day 30)" : "चरण 1", d: results.roadmap?.day30, icon: <Zap size={18} color="var(--primary)" /> },
                    { t: lang === 'en' ? "Phase 2 (Day 60)" : "चरण 2", d: results.roadmap?.day60, icon: <TrendingUp size={18} color="var(--secondary)" /> },
                    { t: lang === 'en' ? "Phase 3 (Day 90)" : "चरण 3", d: results.roadmap?.day90, icon: <CheckCircle size={18} color="var(--accent)" /> }
                  ].map((phase, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>{phase.icon} {phase.t}</div>
                      <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{phase.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Markers */}
              <div className="glass-card" style={{ gridColumn: 'span 4' }}>
                <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><Search size={18} color="var(--accent)" /> {content.evidence}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {results.evidence?.map((word, i) => (
                    <span key={i} style={{ padding: '6px 12px', background: 'rgba(20, 184, 166, 0.1)', color: 'var(--accent)', borderRadius: '100px', fontSize: '11px', fontWeight: '600', border: '1px solid rgba(20, 184, 166, 0.2)' }}>#{word}</span>
                  ))}
                </div>
              </div>

              {/* Professional Skills Grid */}
              <div className="glass-card" style={{ gridColumn: 'span 8' }}>
                <h3 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}><Fingerprint size={18} color="var(--primary)" /> {content.capability}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                   {results.skills.map((s, i) => (
                     <div key={i} style={{ background: 'var(--bg-primary)', padding: '16px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                           <span style={{ fontWeight: '700', fontSize: '14px' }}>{s.name}</span>
                           <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{s.score}%</span>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.description}</div>
                     </div>
                   ))}
                </div>
              </div>

              {/* Career Bridge & Gaps */}
              <div className="glass-card" style={{ gridColumn: 'span 6' }}>
                <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}><Compass size={20} /> {content.careers}</h3>
                {results.careers?.map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '12px', marginBottom: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                      <span style={{ fontWeight: '600' }}>{c}</span>
                    </div>
                ))}
              </div>

              <div className="glass-card" style={{ gridColumn: 'span 6' }}>
                <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}><Target size={20} /> {content.gaps}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {results.gaps?.map((g, i) => (
                    <div key={i} style={{ padding: '10px 20px', background: 'var(--bg-primary)', border: '1px solid var(--accent)', borderRadius: '100px', fontSize: '14px', color: 'var(--text-primary)' }}>{g}</div>
                  ))}
                </div>
              </div>

              {/* Digital Certificate Footer */}
              <div className="glass-card" style={{ gridColumn: 'span 12', padding: '50px', position: 'relative', textAlign: 'center' }}>
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', opacity: 0.05 }}><Award size={200} /></div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '40px' }} className="gradient-text">{content.summary}</h3>
                <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.8', fontStyle: 'italic' }}>
                   "VisibleHer AI protocol v4.0 certifies an elite **Resilience Quotient of ${results.resilience}%**. Analysis identifies a high performance baseline in **${results.skills.map(s => s.name).slice(0, 2).join(' & ')}**. This professional is currently valued at **$${results.invisibleLaborValue.toLocaleString()}** market parity."
                </div>
                <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  <button className="primary-btn pulse-glow" onClick={downloadReport}><Download size={20} /> {content.download}</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .analysis-id { background: var(--glass-glow); padding: 6px 16px; border-radius: 100px; color: var(--primary-soft); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; display: inline-block; margin-bottom: 20px; border: 1px solid var(--glass-border); }
      `}</style>
    </div>
  );
};

export default Dashboard;
