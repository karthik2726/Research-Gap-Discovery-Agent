import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle } from 'lucide-react';

const mockAudits = [
  {
    filename: "agent_paper.pdf",
    reliabilityScore: 45.5,
    methodologyProblems: ["Small sample size (n=10)"],
    statisticalProblems: ["Missing significance testing"],
    reproducibilityProblems: ["No code repository linked"]
  }
];

export default function QualityAudit() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold">Paper Quality Audit</h2>
      </div>

      <div className="space-y-6">
        {mockAudits.map((audit, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-semibold">{audit.filename}</h3>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500">Reliability Score</span>
                <span className={`text-2xl font-bold ${audit.reliabilityScore > 70 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {audit.reliabilityScore} / 100
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-sm flex items-center gap-2 text-orange-500">
                  <AlertTriangle size={16} /> Methodology
                </h4>
                <ul className="space-y-2">
                  {audit.methodologyProblems.map((p, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 bg-orange-50 dark:bg-orange-900/10 p-2 rounded">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-sm flex items-center gap-2 text-purple-500">
                  <AlertTriangle size={16} /> Statistics
                </h4>
                <ul className="space-y-2">
                  {audit.statisticalProblems.map((p, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/10 p-2 rounded">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm flex items-center gap-2 text-blue-500">
                  <AlertTriangle size={16} /> Reproducibility
                </h4>
                <ul className="space-y-2">
                  {audit.reproducibilityProblems.map((p, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/10 p-2 rounded">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
