
import React, { useState, useCallback } from 'react';
import type { Experience, ResumeData } from '../../types';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { AIAssistButton } from '../common/AIAssistButton';
import { improveDescriptionWithAI } from '../../services/geminiService';

interface ExperienceFormProps {
  experience: Experience[];
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ experience, setResumeData }) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp),
    }));
  };
  
  const addExperience = () => {
    const newId = `exp${Date.now()}`;
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: newId,
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  };

  const handleImproveDescription = useCallback(async (id: string, currentDescription: string) => {
    if (!currentDescription) return;
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    try {
      const improvedDescription = await improveDescriptionWithAI(currentDescription);
      handleExperienceChange(id, 'description', improvedDescription);
    } catch (error) {
      console.error("Failed to improve description:", error);
      alert("Failed to improve description. Please check the console for details.");
    } finally {
      setLoadingStates(prev => ({ ...prev, [id]: false }));
    }
  }, [setResumeData]);

  return (
    <div className="space-y-6">
      {experience.map(exp => (
        <div key={exp.id} className="p-4 border border-slate-200 rounded-lg space-y-4 relative">
            <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Remove Experience"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
            <Input label="Job Title" value={exp.jobTitle} onChange={e => handleExperienceChange(exp.id, 'jobTitle', e.target.value)} />
            <Input label="Company" value={exp.company} onChange={e => handleExperienceChange(exp.id, 'company', e.target.value)} />
            <Input label="Location" value={exp.location} onChange={e => handleExperienceChange(exp.id, 'location', e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Date" type="date" value={exp.startDate} onChange={e => handleExperienceChange(exp.id, 'startDate', e.target.value)} />
              <Input label="End Date" type="date" value={exp.endDate} onChange={e => handleExperienceChange(exp.id, 'endDate', e.target.value)} />
            </div>
            <Textarea 
                label="Description"
                rows={6}
                value={exp.description}
                onChange={e => handleExperienceChange(exp.id, 'description', e.target.value)}
                placeholder="• Start each line with a bullet point."
                aiButton={<AIAssistButton isLoading={loadingStates[exp.id] || false} onClick={() => handleImproveDescription(exp.id, exp.description)} label="Improve with AI"/>}
            />
        </div>
      ))}
      <button
        onClick={addExperience}
        className="w-full text-center bg-sky-100 text-sky-700 font-semibold py-2 px-4 rounded-lg hover:bg-sky-200 transition-colors"
      >
        + Add Experience
      </button>
    </div>
  );
};
