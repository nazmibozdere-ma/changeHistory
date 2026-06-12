import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons';
import type { AppInfo, Campaign, ChangeType } from '../data/mockData';
import { entityTypes } from '../data/mockData';
import CampaignSelectorModal from './CampaignSelectorModal';
import AdGroupSelectorDropdown from './AdGroupSelectorDropdown';
import EntityFilterDropdown from './EntityFilterDropdown';

interface EntityTypeFilterProps {
  previewApp: AppInfo;
  selectedCampaigns: string[];
  onCampaignsChange: (ids: string[]) => void;
  groupCampaigns: Campaign[];
  selectedAdGroups: string[];
  onAdGroupsChange: (ids: string[]) => void;
  selectedEntityTypes: ChangeType[];
  onEntityTypesChange: (types: ChangeType[]) => void;
}

export default function EntityTypeFilter({
  previewApp,
  selectedCampaigns,
  onCampaignsChange,
  groupCampaigns,
  selectedAdGroups,
  onAdGroupsChange,
  selectedEntityTypes,
  onEntityTypesChange,
}: EntityTypeFilterProps) {
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [adGroupOpen, setAdGroupOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCampaignOpen(false);
        setAdGroupOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex items-center gap-1 relative" ref={dropdownRef}>
      {/* App preview — read-only display of the app in scope */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
        <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${previewApp.iconGradient} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
          {previewApp.iconLetter}
        </div>
        <span>{previewApp.name}</span>
      </div>

      {/* Campaign + Ad Group tabs */}
      {entityTypes.filter(t => t === 'Campaign' || t === 'Ad Group').map(type => {
        const isCampaign = type === 'Campaign';
        const isAdGroup  = type === 'Ad Group';

        const count = isCampaign ? selectedCampaigns.length : selectedAdGroups.length;

        const hasFilter = isCampaign ? selectedCampaigns.length > 0 : selectedAdGroups.length > 0;
        const isDropdownOpen = (isCampaign && campaignOpen) || (isAdGroup && adGroupOpen);

        return (
          <div key={type} className="relative">
            <button
              onClick={() => {
                if (isCampaign) {
                  setCampaignOpen(o => !o);
                  setAdGroupOpen(false);
                } else {
                  setAdGroupOpen(o => !o);
                  setCampaignOpen(false);
                }
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                isDropdownOpen
                  ? 'bg-white border-blue-400 text-blue-700 shadow-sm'
                  : hasFilter
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{type}</span>
              {count > 0 && (
                <span className={`text-xs px-1 rounded font-semibold ${hasFilter || isDropdownOpen ? 'text-blue-600' : 'text-gray-500'}`}>
                  ({count})
                </span>
              )}
              {isDropdownOpen
                ? <ChevronUpIcon className="text-blue-500" />
                : <ChevronDownIcon className={hasFilter ? 'text-blue-500' : 'text-gray-400'} />}
            </button>

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

      <EntityFilterDropdown selected={selectedEntityTypes} onChange={onEntityTypesChange} />
    </div>
  );
}
