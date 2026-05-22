import { useState, useEffect } from 'react';
import { SearchIcon, CheckIcon, XIcon, ChevronUpIcon, ChevronDownIcon } from './icons';
import type { Campaign } from '../data/mockData';

interface CampaignSelectorProps {
  campaigns: Campaign[];
  selected: string[];
  onConfirm: (selected: string[]) => void;
  onCancel: () => void;
}

const statusOptions = ['All Status', 'Active', 'Paused'];

export default function CampaignSelectorModal({ campaigns, selected, onConfirm, onCancel }: CampaignSelectorProps) {
  const [draft, setDraft] = useState<string[]>(selected);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedExpanded, setSelectedExpanded] = useState(true);

  useEffect(() => { setDraft(selected); }, [selected]);

  const selectedCampaigns = campaigns.filter(c => draft.includes(c.id));

  const visibleCampaigns = campaigns.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'All Status' ||
      (statusFilter === 'Active' && c.status === 'active') ||
      (statusFilter === 'Paused' && c.status === 'paused');
    return matchesSearch && matchesStatus;
  });

  const toggle = (id: string) =>
    setDraft(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const remove = (id: string) => setDraft(prev => prev.filter(x => x !== id));

  const clearAll = () => setDraft([]);

  return (
    <div className="absolute left-0 top-full mt-1.5 z-50 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col" style={{ width: '360px', maxHeight: '480px' }}>

      {/* Search + Status */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <div className="flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
          <SearchIcon className="text-gray-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
              <XIcon />
            </button>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setStatusOpen(o => !o)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span>{statusFilter}</span>
            <ChevronDownIcon className="text-gray-400" />
          </button>
          {statusOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {statusOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => { setStatusFilter(opt); setStatusOpen(false); }}
                  className={`flex items-center justify-between w-full px-3 py-1.5 text-xs text-left hover:bg-gray-50 transition-colors ${statusFilter === opt ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  {opt}
                  {statusFilter === opt && <CheckIcon className="text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border-t border-gray-100">
        {/* Selected section */}
        {draft.length > 0 && (
          <div className="border-b border-gray-100">
            <div className="flex items-center justify-between px-3 py-2">
              <button
                onClick={() => setSelectedExpanded(e => !e)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span>Selected Campaigns ({draft.length})</span>
                {selectedExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
              <button onClick={clearAll} className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Clear campaigns
              </button>
            </div>

            {selectedExpanded && selectedCampaigns.map(c => (
              <div key={c.id} className="flex items-center justify-between px-3 py-1.5 hover:bg-gray-50 transition-colors border-t border-gray-50">
                <span className="text-xs text-gray-700 truncate flex-1 mr-2">{c.name}</span>
                <button
                  onClick={() => remove(c.id)}
                  className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <XIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* All campaigns */}
        <div>
          <div className="px-3 py-2">
            <span className="text-xs font-semibold text-gray-500">All Campaigns</span>
          </div>

          {visibleCampaigns.length === 0 ? (
            <div className="px-3 py-4 text-xs text-gray-400 text-center">No campaigns found</div>
          ) : (
            visibleCampaigns.map(c => {
              const checked = draft.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggle(c.id)}
                  className="flex items-center gap-2.5 w-full px-3 py-2 border-t border-gray-50 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                    {checked && <CheckIcon className="text-white" />}
                  </div>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${c.status === 'active' ? 'bg-green-500' : 'bg-orange-400'}`} />
                  <span className="text-sm text-gray-800 truncate">{c.name}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 px-3 py-2 border-t border-gray-100">
        <button
          onClick={onCancel}
          className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(draft)}
          className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
