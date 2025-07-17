
import React, { useState } from 'react';
import type { Skill, ResumeData } from '../../types';

interface SkillsFormProps {
  skills: Skill[];
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, setResumeData }) => {
  const [currentSkill, setCurrentSkill] = useState('');

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSkill.trim() === '') return;
    const newId = `skill${Date.now()}`;
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { id: newId, name: currentSkill.trim() }]
    }));
    setCurrentSkill('');
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={addSkill} className="flex gap-2">
        <input
          type="text"
          value={currentSkill}
          onChange={(e) => setCurrentSkill(e.target.value)}
          placeholder="Add a new skill"
          className="flex-grow px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
        />
        <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors">
          Add
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span key={skill.id} className="flex items-center bg-sky-100 text-sky-800 text-sm font-medium pl-3 pr-1 py-1 rounded-full">
            {skill.name}
            <button onClick={() => removeSkill(skill.id)} className="ml-2 text-sky-600 hover:text-sky-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
