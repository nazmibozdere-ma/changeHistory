import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon, XIcon } from './icons';
import type { ChangeType } from '../data/mockData';

interface EntitySearchFilterProps {
  type: ChangeType;
  value: string;
  onChange: (value: string) => void;
}

export default function EntitySearchFilter({ type, value, onChange }: EntitySearchFilterProps) {
  const [open, setOpen] = useState(false);
  const [draftValue, setDraftValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setDraftValue(value);
  }, [open, value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleApply = () => {
    onChange(draftValue);
    setOpen(false);
  };

  const handleClear = () => {
    setDraftValue('');
    onChange('');
  };

  const hasFilter = !!value;

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
        <span>{type}</span>
        {open
          ? <ChevronUpIcon className="text-blue-500" />
          : <ChevronDownIcon className={hasFilter ? 'text-blue-500' : 'text-gray-400'} />}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="px-3 pt-2.5 pb-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{type.toUpperCase()}</p>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
              <SearchIcon className="text-gray-400 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder={`Search by ${type.toLowerCase()}...`}
                value={draftValue}
                onChange={e => setDraftValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleApply()}
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
              />
              {draftValue && (
                <button onClick={handleClear} className="text-gray-400 hover:text-gray-600">
                  <XIcon />
                </button>
              )}
            </div>
          </div>
          <div className="p-2 pt-1.5">
            <button onClick={handleApply} className="w-full py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
