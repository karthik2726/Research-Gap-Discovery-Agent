import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, BookOpen, Target, BrainCircuit, AlertTriangle, ShieldCheck } from 'lucide-react';

const mockData = {
  gaps: [
    { name: 'LLM Agents', value: 85 },
    { name: 'Healthcare AI', value: 65 },
    { name: 'Federated Learning', value: 45 },
    { name: 'CV Transformers', value: 30 },
  ],
  quality: [
    { name: 'High Reliability', value: 12 },
    { name: 'Medium Reliability', value: 5 },
    { name: 'Low Reliability', value: 3 },
  ],
  COLORS: ['#10b981', '#f59e0b', '#ef4444']
};

export default function DashboardHome() {
  const [stats, setStats] = useState({ papers: 20, gaps: 15, ideas: 32 });

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Papers Analyzed</p>
            <h3 className="text-3xl font-bold">{stats.papers}</h3>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Research Gaps Found</p>
            <h3 className="text-3xl font-bold">{stats.gaps}</h3>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-4">
          <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
            <BrainCircuit size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Ideas Generated</p>
            <h3 className="text-3xl font-bold">{stats.ideas}</h3>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="text-blue-500" />
            <h3 className="text-lg font-semibold">Top Research Gaps</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.gaps}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px'}} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="text-emerald-500" />
            <h3 className="text-lg font-semibold">Paper Reliability Audit</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.quality}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {mockData.quality.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={mockData.COLORS[index % mockData.COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
