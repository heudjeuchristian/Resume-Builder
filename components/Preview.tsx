
import React from 'react';
import type { ResumeData } from '../types';

interface PreviewProps {
  resumeData: ResumeData;
  themeColor: string;
}

export const Preview: React.FC<PreviewProps> = ({ resumeData, themeColor }) => {
  const { personalInfo, experience, education, skills, portfolio } = resumeData;

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.toLowerCase() === 'present') return 'Present';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch (e) {
      return dateStr;
    }
  };

  const safeUrl = (url: string) => !url.startsWith('http') ? `https://${url}` : url;

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 resume-preview sticky top-8 transition-transform duration-300 ease-in-out md:transform md:scale-95 lg:scale-100 origin-top">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-800">{personalInfo.fullName}</h1>
        <div className="mt-3 text-sm text-slate-600 flex justify-center items-center space-x-4 flex-wrap">
          <span>{personalInfo.email}</span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span>{personalInfo.phoneNumber}</span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span>{personalInfo.address}</span>
        </div>
         <div className={`mt-2 text-sm text-${themeColor}-600 flex justify-center items-center space-x-4 flex-wrap`}>
          {personalInfo.linkedIn && <a href={safeUrl(personalInfo.linkedIn)} target="_blank" rel="noreferrer" className="hover:underline">{personalInfo.linkedIn}</a>}
          {personalInfo.linkedIn && personalInfo.website && <span className="text-slate-300 hidden sm:inline">|</span>}
          {personalInfo.website && <a href={safeUrl(personalInfo.website)} target="_blank" rel="noreferrer" className="hover:underline">{personalInfo.website}</a>}
        </div>
      </header>
      
      <section>
        <h2 className={`text-xl font-bold border-b-2 border-slate-200 pb-2 mb-4 text-${themeColor}-700 uppercase tracking-wider`}>Summary</h2>
        <p className="text-slate-700 text-sm leading-relaxed">{personalInfo.summary}</p>
      </section>

      <section className="mt-8">
        <h2 className={`text-xl font-bold border-b-2 border-slate-200 pb-2 mb-4 text-${themeColor}-700 uppercase tracking-wider`}>Experience</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold text-slate-800">{exp.jobTitle}</h3>
              <p className="text-sm text-slate-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="text-md font-medium text-slate-600">{exp.company}</p>
              <p className="text-sm text-slate-500">{exp.location}</p>
            </div>
            <ul className="mt-2 text-sm text-slate-700 list-disc list-inside space-y-1">
              {exp.description.split('\n').map((line, index) => line.trim() && <li key={index}>{line.replace(/^•\s*/, '')}</li>)}
            </ul>
          </div>
        ))}
      </section>

      {portfolio && portfolio.length > 0 && (
        <section className="mt-8">
          <h2 className={`text-xl font-bold border-b-2 border-slate-200 pb-2 mb-4 text-${themeColor}-700 uppercase tracking-wider`}>Portfolio</h2>
          {portfolio.map(proj => (
            <div key={proj.id} className="mb-6">
              <div className="flex justify-between items-baseline gap-4">
                 <h3 className="text-lg font-semibold text-slate-800">{proj.projectName}</h3>
                 {proj.url && (
                  <a href={safeUrl(proj.url)} target="_blank" rel="noreferrer" className={`text-sm text-${themeColor}-600 hover:underline whitespace-nowrap`}>
                    {proj.url.replace(/^https?:\/\//, '')}
                  </a>
                 )}
              </div>
              <ul className="mt-2 text-sm text-slate-700 list-disc list-inside space-y-1">
                {proj.description.split('\n').map((line, index) => line.trim() && <li key={index}>{line.replace(/^•\s*/, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      <section className="mt-8">
        <h2 className={`text-xl font-bold border-b-2 border-slate-200 pb-2 mb-4 text-${themeColor}-700 uppercase tracking-wider`}>Education</h2>
        {education.map(edu => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold text-slate-800">{edu.institution}</h3>
               <p className="text-sm text-slate-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
            </div>
            <p className="text-md text-slate-600">{edu.degree} in {edu.fieldOfStudy}</p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className={`text-xl font-bold border-b-2 border-slate-200 pb-2 mb-4 text-${themeColor}-700 uppercase tracking-wider`}>Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill.id} className={`bg-${themeColor}-100 text-${themeColor}-800 text-sm font-medium px-3 py-1 rounded-full`}>{skill.name}</span>
          ))}
        </div>
      </section>
    </div>
  );
};
