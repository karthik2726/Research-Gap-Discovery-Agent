import React from 'react';
import { PenTool, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const mockWriting = [
  {
    filename: "agent_paper.pdf",
    readabilityScore: 65,
    clarityScore: 70,
    academicQualityScore: 85,
    humanizationScore: 92,
    problems: ["Inconsistent citation formats", "Contradictory sentence in introduction"],
    suggestions: ["Use active voice", "Unify citation style"]
  }
];

export default function WritingQuality() {
  const chartData = [
    { subject: 'Readability', A: mockWriting[0].readabilityScore, fullMark: 100 },
    { subject: 'Clarity', A: mockWriting[0].clarityScore, fullMark: 100 },
    { subject: 'Academic Quality', A: mockWriting[0].academicQualityScore, fullMark: 100 },
    { subject: 'Humanization', A: mockWriting[0].humanizationScore, fullMark: 100 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <PenTool className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-bold">Academic Writing Evaluator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-4 w-full text-left">Quality Metrics (Radar)</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#9ca3af', fontSize: 12}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Humanization Score</h3>
                <span className="text-3xl font-bold text-blue-500">{mockWriting[0].humanizationScore}/100</span>
             </div>
             <p className="text-sm text-gray-500">Measures how natural, varied, and academically polished the writing appears.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
             <h3 className="text-lg font-semibold mb-4 text-emerald-500 flex items-center gap-2"><CheckCircle size={20}/> Improvement Suggestions</h3>
             <ul className="space-y-2">
               {mockWriting[0].suggestions.map((s, i) => (
                 <li key={i} className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                   {s}
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
