import React, { useState, useCallback } from 'react';
import { UploadCloud, File, X, CheckCircle, Loader2 } from 'lucide-react';

export default function UploadPapers() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [taskId, setTaskId] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) {
          clearInterval(interval);
          return 90;
        }
        return p + 10;
      });
    }, 500);

    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    try {
      const res = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setTaskId(data.task_id);
      setProgress(100);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      clearInterval(interval);
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold">Upload Research Papers</h2>
        <p className="text-gray-500 dark:text-gray-400">Upload up to 20 PDF files. Our AI agents will analyze them to find gaps, audit quality, and generate novel ideas.</p>
      </div>

      <div 
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-12 text-center bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <UploadCloud className="w-16 h-16 mx-auto text-blue-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Drag & Drop PDFs here</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">or click to browse from your computer</p>
        <input 
          type="file" 
          multiple 
          accept="application/pdf"
          className="hidden" 
          id="file-upload"
          onChange={(e) => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])}
        />
        <label htmlFor="file-upload" className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors cursor-pointer">
          Select Files
        </label>
      </div>

      {files.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
          <h4 className="font-semibold mb-4">Selected Files ({files.length})</h4>
          <ul className="space-y-3 mb-6">
            {files.map((f, i) => (
              <li key={i} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  <File className="text-blue-500" size={20} />
                  <span className="text-sm font-medium truncate max-w-md">{f.name}</span>
                </div>
                <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500">
                  <X size={20} />
                </button>
              </li>
            ))}
          </ul>
          
          {uploading ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Processing...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all" style={{width: `${progress}%`}}></div>
              </div>
            </div>
          ) : taskId ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-3">
              <CheckCircle />
              <div>
                <p className="font-semibold">Upload Complete!</p>
                <p className="text-sm">Task ID: {taskId}. The autonomous agents are now analyzing your papers.</p>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleUpload}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <UploadCloud size={20} />
              Launch AI Analysis
            </button>
          )}
        </div>
      )}
    </div>
  );
}
