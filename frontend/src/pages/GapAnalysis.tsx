import React from 'react';
import { Target, AlertCircle } from 'lucide-react';

const mockGaps = [
  {
    title: "Agentic Healthcare Monitoring",
    description: "Lack of research on using multi-agent systems for continuous patient monitoring instead of single-model approaches.",
    impact: "High",
    difficulty: 8.5
  },
  {
    title: "Federated Learning on Edge Devices",
    description: "Missing experiments regarding power consumption and latency when training transformers on mobile edge devices.",
    impact: "Medium",
    difficulty: 9.0
  }
];

export default function GapAnalysis() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-8 h-8 text-purple-500" />
        <h2 className="text-2xl font-bold">Research Gap Analysis</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {mockGaps.map((gap, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-2 h-full ${gap.impact === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold">{gap.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${gap.impact === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                {gap.impact} Impact
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{gap.description}</p>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <AlertCircle size={16} />
              Difficulty Score: {gap.difficulty} / 10
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
