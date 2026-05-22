import { useState, useEffect } from 'react';
import { SearchIcon, CheckIcon, XIcon, ChevronUpIcon, ChevronDownIcon } from './icons';
import type { Campaign } from '../data/mockData';

interface AdGroupSelectorDropdownProps {
  campaigns: Campaign[];          // already filtered to selected campaigns (or all if none selected)
  selected: string[];             // selected ad group ids
  onConfirm: (ids: string[]) => void;
  onCancel: () => void;
}

export default function AdGroupSelectorDropdown({
  campaigns,
  selected,
  onConfirm,
  onCancel,
}: AdGroupSelectorDropdownProps) {
  const [draft, setDraft] = useState<string[]>(selected);
  const [search, setSearch] = useState('');
  const [selectedExpanded, setSelectedExpanded] = useState(true);
  const [collapsedCampaigns, setCollapsedCampaigns] = useState<Record<string, boolean>>({});

  useEffect(() => { setDraft(selected); }, [selected]);

  const allAdGroups = campaigns.flatMap(c => c.adGroups.map(ag => ({ ...ag, campaignId: c.id, campaignName: c.name })));

  const selectedAdGroups = allAdGroups.filter(ag => draft.includes(ag.id));

  const filteredCampaigns = campaigns.map(c => ({
    ...c,
    adGroups: c.adGroups.filter(ag => ag.name.toLowerCase().includes(search.toLowerCase())),
  })).filter(c => c.adGroups.length > 0 || !search);

  const toggle = (id: string) =>
    setDraft(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const remove = (id: string) => setDraft(prev => prev.filter(x => x !== id));

  const clearAll = () => setDraft([]);

  const toggleCampaignCollapse = (campaignId: string) =>
    setCollapsedCampaigns(prev => ({ ...prev, [campaignId]: !prev[campaignId] }));

  const isCampaignCollapsed = (campaignId: string) => !!collapsedCampaigns[campaignId];

  return (
    <div className="absolute left-0 top-full mt-1.5 z-50 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col" style={{ width: '400px', maxHeight: '500px' }}>

      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
          <SearchIcon className="text-gray-400 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search ad groups..."
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
                <span>Selected Ad Groups ({draft.length})</span>
                {selectedExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
              <button onClick={clearAll} className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Clear ad groups
              </button>
            </div>

            {selectedExpanded && selectedAdGroups.map(ag => (
              <div key={ag.id} className="flex items-center justify-between px-3 py-1.5 hover:bg-gray-50 transition-colors border-t border-gray-50">
                <span className="text-xs text-gray-700 truncate flex-1 mr-2">{ag.name}</span>
                <button
                  onClick={() => remove(ag.id)}
                  className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <XIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Campaigns + ad groups */}
        {filteredCampaigns.length === 0 ? (
          <div className="px-3 py-6 text-xs text-gray-400 text-center">No ad groups found</div>
        ) : (
          filteredCampaigns.map(campaign => {
            const collapsed = isCampaignCollapsed(campaign.id);
            return (
              <div key={campaign.id} className="border-b border-gray-50 last:border-0">
                {/* Campaign header */}
                <button
                  onClick={() => toggleCampaignCollapse(campaign.id)}
                  className="flex items-center gap-2 w-full px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                >
                  {collapsed ? <ChevronDownIcon className="text-gray-400 shrink-0" /> : <ChevronUpIcon className="text-gray-400 shrink-0" />}
                  <span className="text-sm font-medium text-blue-600 underline underline-offset-2 truncate">
                    {campaign.name}
                  </span>
                </button>

                {/* Ad groups */}
                {!collapsed && campaign.adGroups.map(ag => {
                  const checked = draft.includes(ag.id);
                  return (
                    <button
                      key={ag.id}
                      onClick={() => toggle(ag.id)}
                      className="flex items-center gap-3 w-full pl-8 pr-3 py-2 border-t border-gray-50 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                        {checked && <CheckIcon className="text-white" />}
                      </div>
                      <span className="text-sm text-gray-700 truncate">{ag.name}</span>
                    </button>
                  );
                })}
              </div>
            );
          })
        )}
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
