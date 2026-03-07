const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

const skillMap = [
  {
    keywords: ["budget", "finance", "money", "expense", "bill", "saving", "accounting"],
    skill: "Financial Stewardship",
    description: "Holistic resource management and long-term economic planning.",
    careers: ["Financial Analyst", "Operations Manager", "Account Manager"]
  },
  {
    keywords: ["schedule", "time", "calendar", "appointment", "routine", "deadline", "organize"],
    skill: "Operational Logistics",
    description: "Complex multi-stakeholder scheduling and workflow harmonization.",
    careers: ["Project Coordinator", "Logistics Planner", "Executive Assistant"]
  },
  {
    keywords: ["conflict", "argue", "resolution", "negotiate", "harmony", "mediation", "talk"],
    skill: "Interpersonal Mediation",
    description: "Managing interpersonal dynamics and achieving win-win resolutions.",
    careers: ["HR Specialist", "Customer Success Lead", "Public Relations"]
  },
  {
    keywords: ["event", "party", "trip", "vacation", "planning", "organize", "birthday"],
    skill: "Strategic Event Design",
    description: "End-to-end visioning and execution of high-impact initiatives.",
    careers: ["Event Strategist", "Marketing Coordinator", "Program Manager"]
  },
  {
    keywords: ["teach", "homework", "lesson", "mentor", "guide", "tutor", "kids"],
    skill: "Developmental Mentorship",
    description: "Empowering growth through knowledge transfer and patient guidance.",
    careers: ["Corporate Trainer", "Learning & Development", "Coach"]
  },
  {
    keywords: ["medical", "doctor", "health", "diet", "nutrition", "care", "wellness"],
    skill: "Wellness Systems Management",
    description: "Ensuring holistic health standards and managing provider relationships.",
    careers: ["Health Administrator", "Wellness Consultant", "Care Coordinator"]
  }
];

app.post('/api/translate', (req, res) => {
  const { text } = req.body;
  
  if (!text || text.length < 10) {
    return res.status(400).json({ error: "Input text is too short." });
  }

  const lowercaseInput = text.toLowerCase();
  const matchedSkills = [];
  const careerPotentials = new Set();
  
  skillMap.forEach(item => {
    const hasMatch = item.keywords.some(keyword => lowercaseInput.includes(keyword));
    if (hasMatch) {
      matchedSkills.push({
        name: item.skill,
        description: item.description,
        score: Math.floor(Math.random() * (98 - 85 + 1)) + 85
      });
      item.careers.forEach(c => careerPotentials.add(c));
    }
  });

  // Innovative feature: Sentiment/Resilience Analysis (Simulated)
  const powerWords = ["led", "managed", "coordinated", "resolved", "planned", "budgeted", "mentored"];
  let resilienceScore = 60; // Base
  powerWords.forEach(word => {
    if (lowercaseInput.includes(word)) resilienceScore += 5;
  });
  resilienceScore = Math.min(resilienceScore, 98);

  // Innovative feature: Skill Gap detection
  const allCoreSkills = ["Strategic Thinking", "Data Literarcy", "Technical Agility"];
  const gaps = allCoreSkills.filter(() => Math.random() > 0.6); // Randomly suggest 1-2 gaps for innovation

  res.json({
    skills: matchedSkills,
    readinessScore: Math.round((resilienceScore + matchedSkills.reduce((a, b) => a + b.score, 0) / matchedSkills.length) / 2),
    resilienceScore,
    careers: Array.from(careerPotentials).slice(0, 3),
    gaps,
    analysisId: `VH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  });
});

app.listen(PORT, () => {
  console.log(`VisibleHer Backend running at http://localhost:${PORT}`);
});
