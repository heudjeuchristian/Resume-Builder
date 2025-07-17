import React, { useState, useCallback } from 'react';
import type { ResumeData } from '../../types';
import { Textarea } from '../common/Textarea';
import { AIAssistButton } from '../common/AIAssistButton';
import { getTailoringSuggestions } from '../../services/geminiService';

interface TailorFormProps {
    resumeData: ResumeData;
}

export const TailorForm: React.FC<TailorFormProps> = ({ resumeData }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState('');

    const handleGetSuggestions = useCallback(async () => {
        if (!jobDescription.trim()) {
            alert("Please paste a job description first.");
            return;
        }
        setIsLoading(true);
        setSuggestions('');
        try {
            const result = await getTailoringSuggestions(resumeData, jobDescription);
            setSuggestions(result);
        } catch (error) {
            console.error("Failed to get tailoring suggestions:", error);
            alert("Failed to get AI suggestions. Please check the console for details.");
        } finally {
            setIsLoading(false);
        }
    }, [resumeData, jobDescription]);

    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-600">
                Paste a job description below, and our AI will provide suggestions on how to tailor your resume to better match the position.
            </p>
            <Textarea
                label="Job Description"
                id="jobDescription"
                name="jobDescription"
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here..."
            />
            <button
                onClick={handleGetSuggestions}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors disabled:bg-sky-300"
            >
                {isLoading ? (
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                    </svg>
                )}
                <span>Get AI Suggestions</span>
            </button>
            
            {suggestions && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="text-md font-semibold text-slate-800 mb-2">AI Suggestions</h4>
                    <div className="text-sm text-slate-700 whitespace-pre-wrap prose prose-sm max-w-none">{suggestions}</div>
                </div>
            )}
        </div>
    );
};