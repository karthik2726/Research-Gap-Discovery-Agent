import React from 'react';
import { Map, Layers } from 'lucide-react';
import { ResponsiveContainer, Treemap } from 'recharts';

const mockClusters = [
  { name: 'Agentic AI Workflows', size: 400 },
  { name: 'Healthcare Predictive Modeling', size: 300 },
  { name: 'Federated Learning Privacy', size: 200 },
  { name: 'Vision Transformers', size: 150 }
];

export default function ResearchLandscape() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <Map className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-bold">Research Landscape</h2>
      </div>
      
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Topic Distribution (Treemap)</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={mockClusters}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="#fff"
              fill="#3b82f6"
            />
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="text-purple-500" />
          <h3 className="text-lg font-semibold">Landscape Summary</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          The uploaded papers predominantly cluster around Agentic AI systems and Healthcare Predictive Modeling. 
          There is a strong intersection between decentralized learning frameworks (Federated Learning) and 
          privacy-preserving clinical datasets.
        </p>
      </div>
    </div>
  );
}
