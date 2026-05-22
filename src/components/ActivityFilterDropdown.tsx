import { useState, useRef, useEffect } from 'react';
import { ActivityIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from './icons';
import { activityOptions } from '../data/mockData';

interface ActivityFilterDropdownProps {
  selected: string[];
  onChange: (activities: string[]) => void;
}

export default function ActivityFilterDropdown({ selected, onChange }: ActivityFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (act: string) => {
    onChange(selected.includes(act) ? selected.filter(a => a !== act) : [...selected, act]);
  };

  const label = selected.length === 0 ? 'Filter by activity' : `Filter by activity (${selected.length})`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
          selected.length > 0
            ? 'bg-blue-50 border-blue-300 text-blue-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <ActivityIcon className={selected.length > 0 ? 'text-blue-500' : 'text-gray-500'} />
        <span>{label}</span>
        {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="p-1.5">
            {activityOptions.map(act => {
              const checked = selected.includes(act);
              return (
                <button
                  key={act}
                  onClick={() => toggle(act)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                  }`}>
                    {checked && <CheckIcon className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">{act}</span>
                </button>
              );
            })}
          </div>
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={() => setOpen(false)}
              className="w-full py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
