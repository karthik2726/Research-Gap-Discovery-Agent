import React, { useState } from 'react';
import { Search as SearchIcon, FileText, ArrowRight } from 'lucide-react';

export default function SearchPapers() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      // data.results usually comes in chroma format: { ids: [[]], documents: [[]], metadatas: [[]] }
      
      let formattedResults: any[] = [];
      if (data.results && data.results.documents && data.results.documents.length > 0) {
        const docs = data.results.documents[0];
        const metas = data.results.metadatas[0];
        formattedResults = docs.map((doc: str, i: number) => ({
          text: doc,
          metadata: metas[i]
        }));
      }
      setResults(formattedResults);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold">Semantic Search (RAG)</h2>
        <p className="text-gray-500 dark:text-gray-400">Search through the content of all uploaded research papers using AI-powered semantic similarity.</p>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="text-gray-400" size={20} />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Which paper discusses federated learning?"
          className="w-full pl-12 pr-32 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
        />
        <button 
          type="submit"
          className="absolute inset-y-2 right-2 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="space-y-4">
        {results.map((res, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-blue-500/50 transition-colors cursor-pointer group">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-blue-500">
                <FileText size={18} />
                <span className="font-semibold text-sm">{res.metadata?.source || 'Unknown Source'}</span>
              </div>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              {res.text.length > 300 ? res.text.substring(0, 300) + '...' : res.text}
            </p>
          </div>
        ))}
        {results.length === 0 && !loading && query && (
          <div className="text-center py-12 text-gray-500">
            No results found for your query. Try rephrasing it!
          </div>
        )}
      </div>
    </div>
  );
}
