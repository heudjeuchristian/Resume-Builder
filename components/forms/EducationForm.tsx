
import React from 'react';
import type { Education, ResumeData } from '../../types';
import { Input } from '../common/Input';

interface EducationFormProps {
  education: Education[];
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const EducationForm: React.FC<EducationFormProps> = ({ education, setResumeData }) => {

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu),
    }));
  };

  const addEducation = () => {
    const newId = `edu${Date.now()}`;
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        id: newId,
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: ''
      }]
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      {education.map(edu => (
        <div key={edu.id} className="p-4 border border-slate-200 rounded-lg space-y-4 relative">
          <button
                onClick={() => removeEducation(edu.id)}
                className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Remove Education"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
          </button>
          <Input label="Institution" value={edu.institution} onChange={e => handleEducationChange(edu.id, 'institution', e.target.value)} />
          <Input label="Degree" value={edu.degree} onChange={e => handleEducationChange(edu.id, 'degree', e.target.value)} />
          <Input label="Field of Study" value={edu.fieldOfStudy} onChange={e => handleEducationChange(edu.id, 'fieldOfStudy', e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={edu.startDate} onChange={e => handleEducationChange(edu.id, 'startDate', e.target.value)} />
            <Input label="End Date" type="date" value={edu.endDate} onChange={e => handleEducationChange(edu.id, 'endDate', e.target.value)} />
          </div>
        </div>
      ))}
      <button
        onClick={addEducation}
        className="w-full text-center bg-sky-100 text-sky-700 font-semibold py-2 px-4 rounded-lg hover:bg-sky-200 transition-colors"
      >
        + Add Education
      </button>
    </div>
  );
};
