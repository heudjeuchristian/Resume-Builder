import React, { useState, useCallback } from 'react';
import type { ResumeData } from '../../types';
import { generateInterviewQuestions } from '../../services/geminiService';

interface InterviewPrepFormProps {
    resumeData: ResumeData;
}

export const InterviewPrepForm: React.FC<InterviewPrepFormProps> = ({ resumeData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [questions, setQuestions] = useState('');

    const handleGenerateQuestions = useCallback(async () => {
        setIsLoading(true);
        setQuestions('');
        try {
            const result = await generateInterviewQuestions(resumeData);
            setQuestions(result);
        } catch (error) {
            console.error("Failed to generate interview questions:", error);
            alert("Failed to generate AI questions. Please check the console for details.");
        } finally {
            setIsLoading(false);
        }
    }, [resumeData]);

    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-600">
                Generate potential interview questions based on your resume to help you prepare.
            </p>
            <button
                onClick={handleGenerateQuestions}
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
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h8.25M8.25 12h5.25M8.25 17.25h8.25" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.966 8.966 0 0 1-5.982-2.275 1.956 1.956 0 0 0-1.58-1.58A8.966 8.966 0 0 1 2.25 12c0-4.948 4.02-8.966 8.966-8.966A8.966 8.966 0 0 1 21.75 12c0 .24-.012.478-.034.712a1.956 1.956 0 0 0-1.58 1.58A8.966 8.966 0 0 1 12 21Z" />
                    </svg>
                )}
                <span>Generate Interview Questions</span>
            </button>
            
            {questions && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="text-md font-semibold text-slate-800 mb-2">Practice Questions</h4>
                    <div className="text-sm text-slate-700 whitespace-pre-wrap prose prose-sm max-w-none">{questions}</div>
                </div>
            )}
        </div>
    );
};