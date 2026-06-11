import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from './icons';
import type { AppInfo, Campaign } from '../data/mockData';
import AppSelectorDropdown from './AppSelectorDropdown';
import CampaignSelectorModal from './CampaignSelectorModal';
import AdGroupSelectorDropdown from './AdGroupSelectorDropdown';

interface LinkedEntityFiltersProps {
  apps: AppInfo[];
  campaigns: Campaign[];
  selectedApps: string[];
  onAppsChange: (ids: string[]) => void;
  selectedCampaigns: string[];
  onCampaignsChange: (ids: string[]) => void;
  selectedAdGroups: string[];
  onAdGroupsChange: (ids: string[]) => void;
}

export default function LinkedEntityFilters({
  apps,
  campaigns,
  selectedApps,
  onAppsChange,
  selectedCampaigns,
  onCampaignsChange,
  selectedAdGroups,
  onAdGroupsChange,
}: LinkedEntityFiltersProps) {
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [adGroupOpen, setAdGroupOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setCampaignOpen(false);
        setAdGroupOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Campaign options narrow down to the selected app(s)
  const campaignsForApps = selectedApps.length > 0
    ? campaigns.filter(c => selectedApps.includes(c.appId))
    : campaigns;

  // Ad group options narrow down further to the selected campaign(s)
  const campaignsForAdGroups = selectedCampaigns.length > 0
    ? campaignsForApps.filter(c => selectedCampaigns.includes(c.id))
    : campaignsForApps;

  return (
    <div className="flex items-center gap-1 relative" ref={ref}>
      <AppSelectorDropdown apps={apps} selected={selectedApps} onChange={onAppsChange} />

      {/* Campaign */}
      <div className="relative">
        <button
          onClick={() => { setCampaignOpen(o => !o); setAdGroupOpen(false); }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
            campaignOpen
              ? 'bg-white border-blue-400 text-blue-700 shadow-sm'
              : selectedCampaigns.length > 0
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>Campaign</span>
          {selectedCampaigns.length > 0 && (
            <span className="text-xs px-1 rounded font-semibold text-blue-600">({selectedCampaigns.length})</span>
          )}
          {campaignOpen
            ? <ChevronUpIcon className="text-blue-500" />
            : <ChevronDownIcon className={selectedCampaigns.length > 0 ? 'text-blue-500' : 'text-gray-400'} />}
        </button>

        {campaignOpen && (
          <CampaignSelectorModal
            campaigns={campaignsForApps}
            selected={selectedCampaigns}
            onConfirm={ids => { onCampaignsChange(ids); setCampaignOpen(false); }}
            onCancel={() => setCampaignOpen(false)}
          />
        )}
      </div>

      {/* Ad Group */}
      <div className="relative">
        <button
          onClick={() => { setAdGroupOpen(o => !o); setCampaignOpen(false); }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
            adGroupOpen
              ? 'bg-white border-blue-400 text-blue-700 shadow-sm'
              : selectedAdGroups.length > 0
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <span>Ad Group</span>
          {selectedAdGroups.length > 0 && (
            <span className="text-xs px-1 rounded font-semibold text-blue-600">({selectedAdGroups.length})</span>
          )}
          {adGroupOpen
            ? <ChevronUpIcon className="text-blue-500" />
            : <ChevronDownIcon className={selectedAdGroups.length > 0 ? 'text-blue-500' : 'text-gray-400'} />}
        </button>

        {adGroupOpen && (
          <AdGroupSelectorDropdown
            campaigns={campaignsForAdGroups}
            selected={selectedAdGroups}
            onConfirm={ids => { onAdGroupsChange(ids); setAdGroupOpen(false); }}
            onCancel={() => setAdGroupOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
