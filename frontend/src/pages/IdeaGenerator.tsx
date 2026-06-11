import React from 'react';
import { Lightbulb, Code } from 'lucide-react';

const mockIdeas = [
  {
    title: "MedAgent: AI Nurse System",
    description: "A multi-agent system orchestrating specialized LLMs for continuous vitals monitoring and alert triage.",
    innovationScore: 9.5,
    difficulty: "Expert",
    techStack: ["LangGraph", "FastAPI", "React", "Kafka"]
  }
];

export default function IdeaGenerator() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-8 h-8 text-yellow-500" />
        <h2 className="text-2xl font-bold">Generated Project Ideas</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockIdeas.map((idea, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{idea.title}</h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {idea.difficulty}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 h-20">{idea.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Innovation Score</span>
                <span className="font-bold text-yellow-500">{idea.innovationScore} / 10</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: `${idea.innovationScore * 10}%`}}></div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-500">
                <Code size={16} /> Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {idea.techStack.map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
