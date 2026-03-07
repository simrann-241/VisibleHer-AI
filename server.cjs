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
  
  console.log(`[${timestamp}] New analysis request received.`);

  if (!text || text.length < 15) {
    return res.status(400).json({ error: "Narrative too short for deep analysis." });
  }

  const lowercaseInput = text.toLowerCase();
  const detectedSkills = [];
  const careerPaths = new Set();
  let totalWeightedScore = 0;
  let activeWeights = 0;

  // 1. Skill Extraction
  skillLibrary.forEach(category => {
    const frequency = category.keywords.filter(kw => lowercaseInput.includes(kw)).length;
    if (frequency > 0) {
      const baseScore = Math.floor(Math.random() * 10) + 85; // Base high score for the demo
      detectedSkills.push({
        id: category.id,
        name: category.name,
        description: category.description,
        score: Math.min(baseScore + frequency, 99)
      });
      category.careers.forEach(c => careerPaths.add(c));
      totalWeightedScore += (category.weight * baseScore);
      activeWeights += category.weight;
    }
  });

  // 2. Resilience Calculation (Natural Language Logic)
  let resilienceBase = 70;
  powerWords.high.forEach(word => { if (lowercaseInput.includes(word)) resilienceBase += 4; });
  powerWords.mid.forEach(word => { if (lowercaseInput.includes(word)) resilienceBase += 2; });
  const finalResilience = Math.min(resilienceBase, 98);

  // 3. Market Readiness (Weighted Average)
  const averageSkillScore = activeWeights > 0 ? (totalWeightedScore / activeWeights) : 80;
  const marketReadiness = Math.round((averageSkillScore * 0.6) + (finalResilience * 0.4));

  // 4. Gap Discovery (Innovative identification)
  const masterSkillList = ["Data Literacy", "Digital Collaboration", "Technical Agility", "Stakeholder Management"];
  const currentSkillNames = detectedSkills.map(s => s.name);
  const gaps = masterSkillList
    .filter(skill => !currentSkillNames.includes(skill))
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  // 5. Response Output
  const analysisId = `VH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  console.log(`[${timestamp}] Analysis ${analysisId} completed. Readiness: ${marketReadiness}%`);

  res.json({
    analysisId,
    skills: detectedSkills.length > 0 ? detectedSkills : [{ name: "General Leadership", score: 85, description: "Broad-spectrum adaptability and core responsibility." }],
    readinessScore: marketReadiness,
    resilienceScore: finalResilience,
    careers: Array.from(careerPaths).length > 0 ? Array.from(careerPaths).slice(0, 3) : ["Project Lead", "Operations Coordinator"],
    gaps: gaps.length > 0 ? gaps : ["Advanced Technical Integration"],
    timestamp
  });
});

app.listen(PORT, () => {
  console.log(`
  ==============================================
    VisibleHer AI Backend Engine v2.0
    Running at: http://localhost:${PORT}
    Status: ONLINE (Waiting for Identity Mapping)
  ==============================================
  `);
});
