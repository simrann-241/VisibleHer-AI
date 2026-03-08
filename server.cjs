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
    weight: 15
  },
  {
    id: "logistics",
    name: "Operational Logistics",
    keywords: ["schedule", "time", "calendar", "appointment", "routine", "deadline", "organize", "समय", "सूची", "प्रबंधन", "नियोजन"],
    description: "Complex multi-stakeholder scheduling and workflow harmonization.",
    careers: ["Project Coordinator", "Logistics Planner", "Office Manager"],
    weight: 12
  },
  {
    id: "mediation",
    name: "Conflict Mediation",
    keywords: ["conflict", "argue", "resolution", "negotiate", "harmony", "mediation", "talk", "विवाद", "सुलझाना", "बातचीत", "समझौता"],
    description: "Managing interpersonal dynamics and achieving win-win resolutions.",
    careers: ["HR specialist", "Mediator", "Social Worker"],
    weight: 10
  },
  {
    id: "mentorship",
    name: "Developmental Mentorship",
    keywords: ["teach", "homework", "lesson", "mentor", "guide", "tutor", "kids", "सिखाना", "शिक्षा", "मार्गदर्शन", "बच्चे"],
    description: "Empowering growth through knowledge transfer and patient guidance.",
    careers: ["Corporate Trainer", "Learning & Development", "Coach"],
    weight: 8
  },
  {
    id: "wellness",
    name: "Wellness Systems Management",
    keywords: ["medical", "doctor", "health", "diet", "nutrition", "care", "wellness", "स्वास्थ्य", "डॉक्टर", "देखभाल", "दवाई"],
    description: "Ensuring holistic health standards and managing provider relationships.",
    careers: ["Healthcare Admin", "Wellness Coach", "Patient Advocate"],
    weight: 10
  }
];

// Power words for Resilience Scoring
const powerWords = {
  high: ["led", "managed", "coordinated", "resolved", "pioneered", "strategized", "नेतृत्व", "संचालन", "नियोजित"],
  mid: ["planned", "organized", "handled", "worked", "performed", "योजना", "व्यवस्थित", "काम"],
};

app.post('/api/translate', (req, res) => {
  const { text } = req.body;
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
    }
  });

  // 2. Resilience Calculation
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

  // 3. Market Readiness & Hiring Probability
  const averageSkillScore = activeWeights > 0 ? (totalWeightedScore / activeWeights) : 80;
  const marketReadiness = Math.round((averageSkillScore * 0.6) + (finalResilience * 0.4));
  const hiringProbability = Math.round(marketReadiness * 0.85 + (Math.random() * 10));

  // 4. Gap Discovery
  const masterSkillList = ["Data Literacy", "Digital Collaboration", "Technical Agility", "Stakeholder Management"];
  const currentSkillNames = detectedSkills.map(s => s.name);
  const gaps = masterSkillList.filter(skill => !currentSkillNames.includes(skill)).slice(0, 2);

  // 5. ROADMAP GENERATION (The new innovative part)
  const roadmap = {
    day30: "Identity Re-establishment: Update LinkedIn with extracted competencies and connect with 5 industry mentors.",
    day60: "Skill Bridging: Complete a certified course in " + (gaps[0] || "Digital Leadership") + " and build a portfolio project.",
    day90: "Market Re-entry: Begin strategic outreach to companies valuing resilience and multi-dimensional leadership."
  };

  const analysisId = `VH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  res.json({
    analysisId,
    skills: detectedSkills.length > 0 ? detectedSkills : [{ name: "General Leadership", score: 85, description: "Broad-spectrum adaptability and core responsibility." }],
    readinessScore: marketReadiness,
    resilienceScore: finalResilience,
    hiringProbability: Math.min(hiringProbability, 99),
    careers: Array.from(careerPaths).length > 0 ? Array.from(careerPaths).slice(0, 3) : ["Project Lead", "Operations Coordinator"],
    gaps: gaps.length > 0 ? gaps : ["Advanced Technical Integration"],
    roadmap,
    evidence: foundPowerWords.concat(highlightedKeywords),
    timestamp
  });
});

app.listen(PORT, () => {
  console.log(`VisibleHer Backend Engine v3.0 running at http://localhost:${PORT}`);
});
