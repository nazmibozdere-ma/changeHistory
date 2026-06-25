import { useState, useEffect } from 'react';
import { SearchIcon, CheckIcon, XIcon, ChevronUpIcon, ChevronDownIcon } from './icons';
import type { Campaign } from '../data/mockData';
import CampaignSelectorModal from './CampaignSelectorModal';

const statusOptions = ['All Status', 'Active', 'Paused'];

interface AdGroupSelectorDropdownProps {
  campaigns: Campaign[];          // already filtered to selected campaigns (or all if none selected)
  selected: string[];             // selected ad group ids
  onConfirm: (ids: string[]) => void;
  onCancel: () => void;
  enableCampaignFilter?: boolean; // shows an embedded Campaign filter that narrows the ad groups listed below
}

export default function AdGroupSelectorDropdown({
  campaigns,
  selected,
  onConfirm,
  onCancel,
  enableCampaignFilter = false,
}: AdGroupSelectorDropdownProps) {
  const [draft, setDraft] = useState<string[]>(selected);
  const [search, setSearch] = useState('');
  const [selectedExpanded, setSelectedExpanded] = useState(true);
  const [collapsedCampaigns, setCollapsedCampaigns] = useState<Record<string, boolean>>({});
  const [campaignFilterIds, setCampaignFilterIds] = useState<string[]>([]);
  const [campaignFilterOpen, setCampaignFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => { setDraft(selected); }, [selected]);

  const allAdGroups = campaigns.flatMap(c => c.adGroups.map(ag => ({ ...ag, campaignId: c.id, campaignName: c.name })));

  const selectedAdGroups = allAdGroups.filter(ag => draft.includes(ag.id));

  const campaignsInScope = campaignFilterIds.length > 0
    ? campaigns.filter(c => campaignFilterIds.includes(c.id))
    : campaigns;

  const matchesStatus = (status: 'active' | 'paused') =>
    statusFilter === 'All Status' ||
    (statusFilter === 'Active' && status === 'active') ||
    (statusFilter === 'Paused' && status === 'paused');

  const filteredCampaigns = campaignsInScope.map(c => ({
    ...c,
    adGroups: c.adGroups.filter(ag => ag.name.toLowerCase().includes(search.toLowerCase()) && matchesStatus(ag.status)),
  })).filter(c => c.adGroups.length > 0 || (!search && statusFilter === 'All Status'));

  const toggle = (id: string) =>
    setDraft(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const remove = (id: string) => setDraft(prev => prev.filter(x => x !== id));

  const clearAll = () => setDraft([]);

  const selectAll = () => {
    const visibleIds = filteredCampaigns.flatMap(c => c.adGroups.map(ag => ag.id));
    setDraft(prev => Array.from(new Set([...prev, ...visibleIds])));
  };

  const toggleCampaignCollapse = (campaignId: string) =>
    setCollapsedCampaigns(prev => ({ ...prev, [campaignId]: !prev[campaignId] }));

  const isCampaignCollapsed = (campaignId: string) => !!collapsedCampaigns[campaignId];

  const panel = (
    <div
      className="bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col"
      style={enableCampaignFilter ? { width: '460px', height: '560px' } : { width: '400px', maxHeight: '560px' }}
    >

      {/* Embedded Campaign filter */}
      {enableCampaignFilter && (
        <div className="px-3 pt-3">
          <button
            onClick={() => setCampaignFilterOpen(o => !o)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
              campaignFilterOpen
                ? 'bg-white border-blue-400 text-blue-700 shadow-sm'
                : campaignFilterIds.length > 0
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>Campaign</span>
            {campaignFilterIds.length > 0 && (
              <span className="text-xs px-1 rounded font-semibold text-blue-600">
                ({campaignFilterIds.length})
              </span>
            )}
            {campaignFilterOpen
              ? <ChevronUpIcon className="text-blue-500" />
              : <ChevronDownIcon className={campaignFilterIds.length > 0 ? 'text-blue-500' : 'text-gray-400'} />}
          </button>

          {campaignFilterOpen && (
            <CampaignSelectorModal
              campaigns={campaigns}
              selected={campaignFilterIds}
              onConfirm={ids => { setCampaignFilterIds(ids); setCampaignFilterOpen(false); }}
              onCancel={() => setCampaignFilterOpen(false)}
              asModal
              width="460px"
              maxHeight="560px"
            />
          )}
        </div>
      )}

      {/* Search + Status */}
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <div className="flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
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

      {filteredCampaigns.length > 0 && (
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-gray-100">
          <span className="text-xs font-semibold text-gray-500">All Ad Groups</span>
          <button onClick={selectAll} className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
            Select all
          </button>
        </div>
      )}

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
                <div className="flex items-center gap-2 flex-1 mr-2 min-w-0">
                  {enableCampaignFilter && (
                    <div className={`w-2 h-2 rounded-full shrink-0 ${ag.status === 'active' ? 'bg-green-500' : 'bg-orange-400'}`} />
                  )}
                  <span className="text-xs text-gray-700 truncate">{ag.name}</span>
                </div>
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
            const collapsed = !enableCampaignFilter && isCampaignCollapsed(campaign.id);
            return (
              <div key={campaign.id} className="border-b border-gray-50 last:border-0">
                {/* Campaign header */}
                {enableCampaignFilter ? (
                  <div className="px-3 py-2.5">
                    <span className="text-sm font-medium text-blue-600 underline underline-offset-2 truncate">
                      {campaign.name}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleCampaignCollapse(campaign.id)}
                    className="flex items-center gap-2 w-full px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    {collapsed ? <ChevronDownIcon className="text-gray-400 shrink-0" /> : <ChevronUpIcon className="text-gray-400 shrink-0" />}
                    <span className="text-sm font-medium text-blue-600 underline underline-offset-2 truncate">
                      {campaign.name}
                    </span>
                  </button>
                )}

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
                      {enableCampaignFilter && (
                        <div className={`w-2 h-2 rounded-full shrink-0 ${ag.status === 'active' ? 'bg-green-500' : 'bg-orange-400'}`} />
                      )}
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

  return enableCampaignFilter ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onCancel}>
      <div onClick={e => e.stopPropagation()}>{panel}</div>
    </div>
  ) : (
    <div className="absolute left-0 top-full mt-1.5 z-50">{panel}</div>
  );
}
