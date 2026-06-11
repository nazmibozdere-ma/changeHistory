import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon, XIcon } from './icons';
import type { ChangeType, AppInfo, Campaign } from '../data/mockData';
import { entityTypes } from '../data/mockData';
import CampaignSelectorModal from './CampaignSelectorModal';
import AppSelectorDropdown from './AppSelectorDropdown';
import AdGroupSelectorDropdown from './AdGroupSelectorDropdown';

interface EntityFilterState {
  [key: string]: string;
}

interface EntityTypeFilterProps {
  entityFilters: EntityFilterState;
  onEntityFilterChange: (type: ChangeType, value: string) => void;
  activeType: ChangeType | null;
  onActiveTypeChange: (type: ChangeType | null) => void;
  counts: Record<string, number>;
  selectedCampaigns: string[];
  onCampaignsChange: (ids: string[]) => void;
  groupApps: AppInfo[];
  selectedApps: string[];
  onAppsChange: (ids: string[]) => void;
  groupCampaigns: Campaign[];
  selectedAdGroups: string[];
  onAdGroupsChange: (ids: string[]) => void;
}

export default function EntityTypeFilter({
  entityFilters,
  onEntityFilterChange,
  activeType,
  onActiveTypeChange,
  counts,
  selectedCampaigns,
  onCampaignsChange,
  groupApps,
  selectedApps,
  onAppsChange,
  groupCampaigns,
  selectedAdGroups,
  onAdGroupsChange,
}: EntityTypeFilterProps) {
  const [draftValue, setDraftValue] = useState('');
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [adGroupOpen, setAdGroupOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeType && activeType !== 'Campaign') {
      setDraftValue(entityFilters[activeType] || '');
    }
  }, [activeType, entityFilters]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onActiveTypeChange(null);
        setCampaignOpen(false);
        setAdGroupOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onActiveTypeChange]);

  const handleApply = () => {
    if (activeType) onEntityFilterChange(activeType, draftValue);
    onActiveTypeChange(null);
  };

  const handleClear = () => {
    setDraftValue('');
    if (activeType) onEntityFilterChange(activeType, '');
  };

  return (
    <div className="flex items-center gap-1 relative" ref={dropdownRef}>
      {/* App selector — replaces the simple "App" tab */}
      <AppSelectorDropdown
        apps={groupApps}
        selected={selectedApps}
        onChange={onAppsChange}
      />

      {/* Campaign + other entity type tabs */}
      {entityTypes.filter(t => t !== 'App').map(type => {
        const isCampaign  = type === 'Campaign';
        const isAdGroup   = type === 'Ad Group';
        const isSpecial   = isCampaign || isAdGroup;

        const count = isCampaign
          ? selectedCampaigns.length || (counts[type] ?? 0)
          : isAdGroup
          ? selectedAdGroups.length || (counts[type] ?? 0)
          : 0; // no count badge for simple text-search tabs

        const isActive  = activeType === type;
        const hasFilter = isCampaign ? selectedCampaigns.length > 0
                        : isAdGroup  ? selectedAdGroups.length > 0
                        : !!entityFilters[type];
        const isOpen    = isActive && !isSpecial;
        const isDropdownOpen = (isCampaign && campaignOpen) || (isAdGroup && adGroupOpen);

        return (
          <div key={type} className="relative">
            <button
              onClick={() => {
                if (isCampaign) {
                  setCampaignOpen(o => !o);
                  setAdGroupOpen(false);
                  onActiveTypeChange(null);
                } else if (isAdGroup) {
                  setAdGroupOpen(o => !o);
                  setCampaignOpen(false);
                  onActiveTypeChange(null);
                } else {
                  onActiveTypeChange(isActive ? null : type);
                }
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                isDropdownOpen || (isActive && !isSpecial)
                  ? 'bg-white border-blue-400 text-blue-700 shadow-sm'
                  : hasFilter
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{type}</span>
              {count > 0 && (
                <span className={`text-xs px-1 rounded font-semibold ${hasFilter || isActive || isDropdownOpen ? 'text-blue-600' : 'text-gray-500'}`}>
                  ({count})
                </span>
              )}
              {isOpen || isDropdownOpen
                ? <ChevronUpIcon className="text-blue-500" />
                : <ChevronDownIcon className={hasFilter ? 'text-blue-500' : 'text-gray-400'} />}
            </button>

            {isOpen && (
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

            {isCampaign && campaignOpen && (
              <CampaignSelectorModal
                campaigns={groupCampaigns}
                selected={selectedCampaigns}
                onConfirm={ids => { onCampaignsChange(ids); setCampaignOpen(false); }}
                onCancel={() => setCampaignOpen(false)}
              />
            )}

            {isAdGroup && adGroupOpen && (
              <AdGroupSelectorDropdown
                campaigns={groupCampaigns}
                selected={selectedAdGroups}
                onConfirm={ids => { onAdGroupsChange(ids); setAdGroupOpen(false); }}
                onCancel={() => setAdGroupOpen(false)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
