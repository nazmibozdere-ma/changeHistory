import { useState, useRef, useEffect } from 'react';
import { BellIcon, QuestionIcon, SparkleIcon, CheckIcon, SearchIcon } from './icons';
import type { CampaignGroupInfo } from '../data/mockData';
import { campaignGroups } from '../data/mockData';

interface TopBarProps {
  selectedGroup: CampaignGroupInfo;
  onGroupChange: (group: CampaignGroupInfo) => void;
  onHelpClick: () => void;
}

export default function TopBar({ selectedGroup, onGroupChange, onHelpClick }: TopBarProps) {
  const selected = selectedGroup;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = campaignGroups.filter(
    g =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      <h1 className="text-xl font-semibold text-gray-900">Change History v2</h1>
      <div className="flex items-center gap-3">
        {/* Ask AI */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-100 to-blue-100 border border-violet-200 text-violet-700 text-sm font-medium hover:from-violet-200 hover:to-blue-200 transition-all">
          <SparkleIcon className="text-violet-500" />
          <span>Ask AI</span>
        </button>

        {/* Help */}
        <button
          onClick={onHelpClick}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <QuestionIcon />
          <span className="text-sm font-medium">Help</span>
        </button>

        {/* Notifications */}
        <button className="relative p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <BellIcon />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>

        <div className="w-px h-6 bg-gray-200" />

        {/* Campaign group selector */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
          >
            <div className="text-right">
              <div className="text-xs font-medium text-gray-800">{selected.email}</div>
              <div className="text-xs text-gray-500">{selected.name}</div>
            </div>
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selected.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
              {selected.initial}
            </div>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>
              <path d="M2 3.5L5 6.5l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-1.5 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              {/* Search */}
              <div className="p-2.5 border-b border-gray-100">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
                  <SearchIcon className="text-gray-400 shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search campaign groups..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
                  />
                </div>
              </div>

              {/* List */}
              <div className="py-1.5 max-h-64 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="px-3 py-4 text-sm text-gray-400 text-center">No results</div>
                ) : (
                  filtered.map(group => {
                    const isSelected = selected.id === group.id;
                    return (
                      <button
                        key={group.id}
                        onClick={() => { onGroupChange(group); setOpen(false); setSearch(''); }}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 text-left transition-colors ${
                          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${group.avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                          {group.initial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium truncate ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                            {group.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{group.email}</div>
                        </div>
                        {isSelected && <CheckIcon className="text-blue-600 shrink-0" />}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
