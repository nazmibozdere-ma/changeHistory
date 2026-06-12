import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from './icons';
import type { ChangeType } from '../data/mockData';

const options: ChangeType[] = ['Ad', 'Keyword', 'Negative Keyword'];

interface EntityFilterDropdownProps {
  selected: ChangeType[];
  onChange: (types: ChangeType[]) => void;
}

export default function EntityFilterDropdown({ selected, onChange }: EntityFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (type: ChangeType) =>
    onChange(selected.includes(type) ? selected.filter(t => t !== type) : [...selected, type]);

  const selectAll = () => onChange(options);

  const hasFilter = selected.length > 0;
  const label = hasFilter ? `Entity (${selected.length})` : 'Entity';

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
          open
            ? 'bg-white border-blue-400 text-blue-700 shadow-sm'
            : hasFilter
            ? 'bg-blue-50 border-blue-300 text-blue-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span>{label}</span>
        {open
          ? <ChevronUpIcon className="text-blue-500" />
          : <ChevronDownIcon className={hasFilter ? 'text-blue-500' : 'text-gray-400'} />}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="flex items-center justify-end px-3 pt-2.5 pb-1">
            <button onClick={selectAll} className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Select all
            </button>
          </div>

          <div className="p-1.5 pt-0">
            {options.map(type => {
              const checked = selected.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => toggle(type)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                    checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                  }`}>
                    {checked && <CheckIcon className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">{type}</span>
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
