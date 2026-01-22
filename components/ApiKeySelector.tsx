
import React from 'react';

interface ApiKeySelectorProps {
  onKeySelected: () => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onKeySelected }) => {
  const handleSelectKey = async () => {
    // Using cast for aistudio to avoid duplicate identifier errors in global namespace
    const aistudio = (window as any).aistudio;
    if (aistudio && typeof aistudio.openSelectKey === 'function') {
      await aistudio.openSelectKey();
      // Assume success as per instructions to avoid race conditions
      onKeySelected();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-purple-500 rounded-2xl max-w-md w-full p-8 shadow-2xl shadow-purple-500/30">
        <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 mystical-font text-purple-200 text-center">Ritual Required</h2>
        <p className="text-slate-300 mb-6 text-center text-sm leading-relaxed">
          The Grimoire is currently locked. To conjure visions, you must provide your own paid API key from a project with billing enabled.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleSelectKey}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-purple-500/20"
          >
            <span>Select API Key</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block text-center text-xs text-purple-400 hover:text-purple-300 underline"
          >
            Learn about billing rituals & costs
          </a>
        </div>
      </div>
    </div>
  );
};
