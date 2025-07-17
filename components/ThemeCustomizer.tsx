
import React from 'react';

interface ThemeCustomizerProps {
  setThemeColor: (color: string) => void;
}

const colors = [
  { name: 'sky', a11y: 'Sky Blue', className: 'bg-sky-500' },
  { name: 'slate', a11y: 'Slate Gray', className: 'bg-slate-500' },
  { name: 'emerald', a11y: 'Emerald Green', className: 'bg-emerald-500' },
  { name: 'rose', a11y: 'Rose Red', className: 'bg-rose-500' },
  { name: 'violet', a11y: 'Violet Purple', className: 'bg-violet-500' },
];

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ setThemeColor }) => {
  return (
    <div>
      <p className="text-sm font-medium text-slate-600 mb-2">Accent Color</p>
      <div className="flex gap-3">
        {colors.map(color => (
          <button
            key={color.name}
            title={color.a11y}
            aria-label={`Set theme color to ${color.a11y}`}
            onClick={() => setThemeColor(color.name)}
            className={`w-8 h-8 rounded-full ${color.className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color.name}-500 transition-transform hover:scale-110`}
          />
        ))}
      </div>
    </div>
  );
};
