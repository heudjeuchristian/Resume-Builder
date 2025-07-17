
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  aiButton?: React.ReactNode;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, aiButton, ...props }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-slate-600">
          {label}
        </label>
        {aiButton}
      </div>
      <textarea
        id={id}
        {...props}
        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
      />
    </div>
  );
};
