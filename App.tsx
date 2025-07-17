
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Preview } from './components/Preview';
import { type ResumeData, initialResumeData } from './types';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [themeColor, setThemeColor] = useState('sky'); // 'sky', 'slate', 'emerald', etc.

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header />
      <main className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 p-4 md:p-8">
        <div className="md:col-span-1 lg:col-span-2 no-print">
          <Sidebar
            resumeData={resumeData}
            setResumeData={setResumeData}
            setThemeColor={setThemeColor}
          />
        </div>
        <div className="md:col-span-2 lg:col-span-3 print-container">
          <Preview resumeData={resumeData} themeColor={themeColor} />
        </div>
      </main>
    </div>
  );
}

const Header = () => (
  <header className="bg-white shadow-md no-print">
    <div className="max-w-screen-2xl mx-auto p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="bg-sky-500 p-2 rounded-lg">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800">AI Resume Builder</h1>
      </div>
       <button 
        onClick={() => window.print()}
        className="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6 18.25m0 0a2.25 2.25 0 0 0 2.25 2.25h1.5a2.25 2.25 0 0 0 2.25-2.25m-5.25 0v-2.28a2.25 2.25 0 0 1 2.25-2.25h1.5a2.25 2.25 0 0 1 2.25 2.25v2.28m-5.25 0h5.25m-5.25 0h-1.5a2.25 2.25 0 0 1-2.25-2.25V7.5a2.25 2.25 0 0 1 2.25-2.25h7.5a2.25 2.25 0 0 1 2.25 2.25v3.75a2.25 2.25 0 0 1-2.25 2.25h-1.5m-5.25 0h5.25" />
        </svg>
        <span>Print / PDF</span>
      </button>
    </div>
  </header>
);

export default App;
