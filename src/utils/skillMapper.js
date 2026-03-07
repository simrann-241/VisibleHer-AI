export const skillMap = [
  {
    keywords: ["budget", "finance", "money", "expense", "bill", "saving"],
    skill: "Financial Management",
    description: "Allocating resources, tracking expenses, and long-term financial planning."
  },
  {
    keywords: ["schedule", "time", "calendar", "appointment", "routine", "deadline"],
    skill: "Operations Coordination",
    description: "Complex scheduling, multitasking, and workflow optimization."
  },
  {
    keywords: ["conflict", "argue", "resolution", "negotiate", "harmony", "mediation"],
    skill: "Conflict Resolution",
    description: "Managing interpersonal dynamics and mediating disputes effectively."
  },
  {
    keywords: ["event", "party", "trip", "vacation", "planning", "organize"],
    skill: "Project Management",
    description: "End-to-end planning, logistics, and execution of complex initiatives."
  },
  {
    keywords: ["teach", "homework", "lesson", "mentor", "guide", "tutor"],
    skill: "Educational Leadership",
    description: "Knowledge transfer, curriculum support, and developmental mentoring."
  },
  {
    keywords: ["medical", "doctor", "health", "diet", "nutrition", "care"],
    skill: "Stakeholder Care & Compliance",
    description: "Ensuring health standards, managing relationships with providers, and compliance."
  },
  {
    keywords: ["emergency", "crisis", "accident", "quick thinking", "problem"],
    skill: "Crisis Management",
    description: "High-pressure decision making and rapid response to unexpected challenges."
  },
  {
    keywords: ["volunteer", "community", "school", "ngo", "church", "lead"],
    skill: "Community Leadership",
    description: "Coordinating groups, advocacy, and social responsibility initiatives."
  }
];

export function translateSkills(input) {
  const lowercaseInput = input.toLowerCase();
  const matchedSkills = [];
  
  skillMap.forEach(item => {
    const hasMatch = item.keywords.some(keyword => lowercaseInput.includes(keyword));
    if (hasMatch) {
      matchedSkills.push({
        name: item.skill,
        description: item.description,
        score: Math.floor(Math.random() * (95 - 75 + 1)) + 75 // Random score between 75-95 for demo
      });
    }
  });

  // If no matches, provide some general transferable skills
  if (matchedSkills.length === 0 && input.length > 10) {
    matchedSkills.push(
      { name: "Strategic Adaptability", description: "Quickly adjusting to new roles and responsibilities.", score: 82 },
      { name: "Resourcefulness", description: "Solving complex problems with available tools and time.", score: 88 }
    );
  }

  return matchedSkills;
}

export function calculateReintegrationScore(skills) {
  if (skills.length === 0) return 0;
  const avg = skills.reduce((acc, curr) => acc + curr.score, 0) / skills.length;
  // Weight it slightly by number of skills to show "readiness"
  const weighted = avg * (0.8 + (skills.length * 0.05));
  return Math.min(Math.round(weighted), 98);
}
