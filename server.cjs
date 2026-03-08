const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

// Multi-language Skill Mapping (English & Hindi)
const skillLibrary = [
  {
    id: "finance",
    name: "Financial Stewardship",
    keywords: ["budget", "finance", "money", "expense", "bill", "saving", "accounting", "बजट", "पैसा", "खर्च", "बचत", "हिसाब"],
    description: "Holistic resource management and long-term economic planning.",
    careers: ["Financial Analyst", "Operations Manager", "Account Manager"],
    weight: 15,
    value: 85000 // Estimated annual market value
  },
  {
    id: "logistics",
    name: "Operational Logistics",
    keywords: ["schedule", "time", "calendar", "appointment", "routine", "deadline", "organize", "समय", "सूची", "प्रबंधन", "नियोजन"],
    description: "Complex multi-stakeholder scheduling and workflow harmonization.",
    careers: ["Project Coordinator", "Logistics Planner", "Office Manager"],
    weight: 12,
    value: 70000
  },
  {
    id: "mediation",
    name: "Conflict Mediation",
    keywords: ["conflict", "argue", "resolution", "negotiate", "harmony", "mediation", "talk", "विवाद", "सुलझाना", "बातचीत", "समझौता"],
    description: "Managing interpersonal dynamics and achieving win-win resolutions.",
    careers: ["HR specialist", "Mediator", "Social Worker"],
    weight: 10,
    value: 75000
  },
  {
    id: "mentorship",
    name: "Developmental Mentorship",
    keywords: ["teach", "homework", "lesson", "mentor", "guide", "tutor", "kids", "सिखाना", "शिक्षा", "मार्गदर्शन", "बच्चे"],
    description: "Empowering growth through knowledge transfer and patient guidance.",
    careers: ["Corporate Trainer", "Learning & Development", "Coach"],
    weight: 8,
    value: 65000
  },
  {
    id: "wellness",
    name: "Wellness Systems Management",
    keywords: ["medical", "doctor", "health", "diet", "nutrition", "care", "wellness", "स्वास्थ्य", "डॉक्टर", "देखभाल", "दवाई"],
    description: "Ensuring holistic health standards and managing provider relationships.",
    careers: ["Healthcare Admin", "Wellness Coach", "Patient Advocate"],
    weight: 10,
    value: 60000
  }
];

// Power words for Resilience & Tone Scoring
const powerWords = {
  high: ["led", "managed", "coordinated", "resolved", "pioneered", "strategized", "नेतृत्व", "संचालन", "नियोजित"],
  mid: ["planned", "organized", "handled", "worked", "performed", "योजना", "व्यवस्थित", "काम"],
};

app.post('/api/translate', (req, res) => {
  const { text, lang = 'en' } = req.body;
  const timestamp = new Date().toISOString();
  
  if (!text || text.length < 15) {
    return res.status(400).json({ error: "Narrative too short for deep analysis." });
  }

  const lowercaseInput = text.toLowerCase();
  const detectedSkills = [];
  const careerPaths = new Set();
  const highlightedKeywords = [];
  let totalWeightedScore = 0;
  let activeWeights = 0;
  let invisibleLaborValue = 0;

  // 1. Skill Extraction & Keyword Tracking
  skillLibrary.forEach(category => {
    const matched = category.keywords.filter(kw => lowercaseInput.includes(kw));
    if (matched.length > 0) {
      highlightedKeywords.push(...matched);
      const baseScore = Math.floor(Math.random() * 10) + 85; 
      detectedSkills.push({
        id: category.id,
        name: category.name,
        description: category.description,
        score: Math.min(baseScore + matched.length, 99),
        evidence: matched
      });
      category.careers.forEach(c => careerPaths.add(c));
      totalWeightedScore += (category.weight * baseScore);
      activeWeights += category.weight;
      invisibleLaborValue += category.value;
    }
  });

  // 2. Resilience & Recruiter Sentiment Perception
  let resilienceBase = 70;
  let foundPowerWords = [];
  powerWords.high.forEach(word => { 
    if (lowercaseInput.includes(word)) {
      resilienceBase += 4;
      foundPowerWords.push(word);
    }
  });
  powerWords.mid.forEach(word => { 
    if (lowercaseInput.includes(word)) {
      resilienceBase += 2;
      foundPowerWords.push(word);
    }
  });
  const finalResilience = Math.min(resilienceBase, 98);

  const perception = {
    confidence: Math.min(80 + (foundPowerWords.length * 5), 99),
    strategy: Math.min(75 + (detectedSkills.length * 5), 99),
    empathy: Math.min(85 + (lowercaseInput.includes('care') || lowercaseInput.includes('resolved') ? 10 : 0), 99)
  };

  // 3. Market Readiness & Hiring Probability
  const averageSkillScore = activeWeights > 0 ? (totalWeightedScore / activeWeights) : 80;
  const marketReadiness = Math.round((averageSkillScore * 0.6) + (finalResilience * 0.4));
  const hiringProbability = Math.round(marketReadiness * 0.85 + (Math.random() * 10));

  // 4. Gap Discovery
  const masterSkillList = ["Data Literacy", "Digital Collaboration", "Technical Agility", "Stakeholder Management"];
  const currentSkillNames = detectedSkills.map(s => s.name);
  const gaps = masterSkillList.filter(skill => !currentSkillNames.includes(skill)).slice(0, 2);

  // 5. ROADMAP GENERATION
  const roadmap = {
    day30: "Identity Re-establishment: Update LinkedIn with extracted competencies and connect with 5 industry mentors.",
    day60: "Skill Bridging: Complete a certified course in " + (gaps[0] || "Digital Leadership") + " and build a portfolio project.",
    day90: "Market Re-entry: Begin strategic outreach to companies valuing resilience and multi-dimensional leadership."
  };

  // 6. PROFESSIONAL BIO GENERATOR (v4.0 Unique Feature)
  const skillsList = detectedSkills.map(s => s.name).join(', ');
  const topCareer = Array.from(careerPaths)[0] || "Strategic Leader";
  
  const bio = lang === 'en' 
    ? `A high-resilience professional and ${topCareer} with a proven track record in ${skillsList}. I specialize in multi-dimensional problem-solving and operational excellence, demonstrated through intensive leadership experience. I am now leveraging my background in resource stewardship and domestic logistics to drive organizational growth.`
    : `एक उच्च-लचीला पेशेवर और ${topCareer} जो ${skillsList} में प्रमाणित अनुभव रखती हैं। मैं बहुआयामी समस्या-समाधान और परिचालन उत्कृष्टता में विशेषज्ञता रखती हूँ। अब मैं संगठनात्मक विकास के लिए संसाधन प्रबंधन और घरेलू लॉजिस्टिक्स में अपनी पृष्ठभूमि का उपयोग कर रही हूँ।`;

  const analysisId = `VH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  res.json({
    analysisId,
    skills: detectedSkills.length > 0 ? detectedSkills : [{ name: "General Leadership", score: 85, description: "Broad-spectrum adaptability and core responsibility." }],
    readinessScore: marketReadiness,
    resilienceScore: finalResilience,
    hiringProbability: Math.min(hiringProbability, 99),
    invisibleLaborValue: invisibleLaborValue || 55000,
    perception,
    bio,
    careers: Array.from(careerPaths).length > 0 ? Array.from(careerPaths).slice(0, 3) : ["Project Lead", "Operations Coordinator"],
    gaps: gaps.length > 0 ? gaps : ["Advanced Technical Integration"],
    roadmap,
    evidence: foundPowerWords.concat(highlightedKeywords),
    timestamp
  });
});

app.listen(PORT, () => {
  console.log(`VisibleHer Backend Engine v4.0 running at http://localhost:${PORT}`);
});
