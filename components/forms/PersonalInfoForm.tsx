
import React, { useState, useCallback } from 'react';
import type { PersonalInfo, ResumeData } from '../../types';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { AIAssistButton } from '../common/AIAssistButton';
import { generateSummaryWithAI } from '../../services/geminiService';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ personalInfo, resumeData, setResumeData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  const handleGenerateSummary = useCallback(async () => {
    setIsLoading(true);
    try {
      const summary = await generateSummaryWithAI(resumeData);
      setResumeData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, summary },
      }));
    } catch (error) {
      console.error("Failed to generate summary:", error);
      alert("Failed to generate summary. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }, [resumeData, setResumeData]);

  return (
    <div className="space-y-4">
      <Input label="Full Name" id="fullName" name="fullName" value={personalInfo.fullName} onChange={handleChange} />
      <Input label="Email" id="email" name="email" type="email" value={personalInfo.email} onChange={handleChange} />
      <Input label="Phone Number" id="phoneNumber" name="phoneNumber" type="tel" value={personalInfo.phoneNumber} onChange={handleChange} />
      <Input label="Address" id="address" name="address" value={personalInfo.address} onChange={handleChange} />
      <Input label="LinkedIn Profile URL" id="linkedIn" name="linkedIn" value={personalInfo.linkedIn} onChange={handleChange} placeholder="linkedin.com/in/yourprofile"/>
      <Input label="Personal Website/Portfolio" id="website" name="website" value={personalInfo.website} onChange={handleChange} placeholder="yourportfolio.com" />
      <Textarea
        label="Professional Summary"
        id="summary"
        name="summary"
        rows={5}
        value={personalInfo.summary}
        onChange={handleChange}
        aiButton={<AIAssistButton isLoading={isLoading} onClick={handleGenerateSummary} label="Generate Summary with AI" />}
      />
    </div>
  );
};
