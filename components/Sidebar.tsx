import React, { useState } from 'react';
import type { ResumeData } from '../types';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { PortfolioForm } from './forms/PortfolioForm';
import { ThemeCustomizer } from './ThemeCustomizer';
import { TailorForm } from './forms/TailorForm';
import { InterviewPrepForm } from './forms/InterviewPrepForm';

interface SidebarProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  setThemeColor: (color: string) => void;
}

type Section = 'appearance' | 'personal' | 'experience' | 'portfolio' | 'education' | 'skills' | 'tailor' | 'interview';

export const Sidebar: React.FC<SidebarProps> = ({ resumeData, setResumeData, setThemeColor }) => {
  const [openSection, setOpenSection] = useState<Section>('personal');

  const sections = {
    appearance: {
      title: 'Appearance',
      component: <ThemeCustomizer setThemeColor={setThemeColor} />,
    },
    personal: {
      title: 'Personal Information',
      component: <PersonalInfoForm personalInfo={resumeData.personalInfo} setResumeData={setResumeData} resumeData={resumeData} />,
    },
    experience: {
      title: 'Work Experience',
      component: <ExperienceForm experience={resumeData.experience} setResumeData={setResumeData} />,
    },
    portfolio: {
        title: 'Portfolio',
        component: <PortfolioForm portfolio={resumeData.portfolio} setResumeData={setResumeData} />
    },
    education: {
      title: 'Education',
      component: <EducationForm education={resumeData.education} setResumeData={setResumeData} />,
    },
    skills: {
      title: 'Skills',
      component: <SkillsForm skills={resumeData.skills} setResumeData={setResumeData} />,
    },
    tailor: {
        title: 'Tailor for Job',
        component: <TailorForm resumeData={resumeData} />
    },
    interview: {
        title: 'Interview Prep',
        component: <InterviewPrepForm resumeData={resumeData} />
    }
  };

  return (
    <div className="space-y-4">
      {Object.keys(sections).map((key) => (
        <Accordion
          key={key}
          title={sections[key as Section].title}
          isOpen={openSection === key}
          setIsOpen={() => setOpenSection(openSection === key ? '' as Section : key as Section)}
        >
          {sections[key as Section].component}
        </Accordion>
      ))}
    </div>
  );
};

interface AccordionProps {
  title: string;
  isOpen: boolean;
  setIsOpen: () => void;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, isOpen, setIsOpen, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md transition-all duration-300">
      <button
        onClick={setIsOpen}
        className="w-full p-4 text-left font-semibold text-lg flex justify-between items-center"
      >
        {title}
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="p-4 border-t border-slate-200">{children}</div>
      </div>
    </div>
  );
};