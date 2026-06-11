import { useState, useMemo, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import AgentFilterDropdown from './components/AgentFilterDropdown';
import ActivityFilterDropdown from './components/ActivityFilterDropdown';
import EntityTypeFilter from './components/EntityTypeFilter';
import LinkedEntityFilters from './components/LinkedEntityFilters';
import ChangeHistoryTable from './components/ChangeHistoryTable';
import DateRangePicker from './components/DateRangePicker';
import { mockData, agentMatchesFilter, campaignGroups } from './data/mockData';
import type { ChangeType, ChangeRecord, CampaignGroupInfo } from './data/mockData';

type EntityFilterMap = Partial<Record<ChangeType, string>>;

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CampaignGroupInfo>(campaignGroups[0]);

  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [entityFilters, setEntityFilters] = useState<EntityFilterMap>({});
  const [activeEntityType, setActiveEntityType] = useState<ChangeType | null>(null);
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [selectedAdGroupIds, setSelectedAdGroupIds] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: new Date(2026, 3, 1),  // Apr 1 2026
    end:   new Date(2026, 3, 6),  // Apr 6 2026
  });

  const [activeTab, setActiveTab] = useState<'history' | 'linked'>('history');
  const [linkedAppIds, setLinkedAppIds] = useState<string[]>([]);
  const [linkedCampaignIds, setLinkedCampaignIds] = useState<string[]>([]);
  const [linkedAdGroupIds, setLinkedAdGroupIds] = useState<string[]>([]);

  const handleGroupChange = (group: CampaignGroupInfo) => {
    setSelectedGroup(group);
    setSelectedCampaignIds([]);
    setSelectedAppIds([]);
    setSelectedAdGroupIds([]);
    setLinkedAppIds([]);
    setLinkedCampaignIds([]);
    setLinkedAdGroupIds([]);
  };

  // When campaign selection changes, clear ad group selection
  const handleCampaignsChange = (ids: string[]) => {
    setSelectedCampaignIds(ids);
    setSelectedAdGroupIds([]);
  };

  // App -> Campaign -> Ad Group cascade for the linked filters tab
  const handleLinkedAppsChange = (ids: string[]) => {
    setLinkedAppIds(ids);
    setLinkedCampaignIds([]);
    setLinkedAdGroupIds([]);
  };

  const handleLinkedCampaignsChange = (ids: string[]) => {
    setLinkedCampaignIds(ids);
    setLinkedAdGroupIds([]);
  };

  const handleEntityFilterChange = (type: ChangeType, value: string) => {
    setEntityFilters(prev => ({ ...prev, [type]: value }));
  };

  const matchesCommonFilters = useCallback((row: ChangeRecord) => {
    if (dateRange.start && row.date < dateRange.start) return false;
    if (dateRange.end) {
      const endOfDay = new Date(dateRange.end.getFullYear(), dateRange.end.getMonth(), dateRange.end.getDate(), 23, 59, 59, 999);
      if (row.date > endOfDay) return false;
    }

    if (selectedAgents.length > 0 && !selectedAgents.some(f => agentMatchesFilter(row.agent, f))) return false;

    if (selectedActivities.length > 0) {
      const activityKeywords: Record<string, string[]> = {
        Create: ['created'],
        Duplicate: ['duplicated', 'duplicate'],
        Update: ['changed', 'added', 'updated'],
        Delete: ['deleted', 'removed'],
      };
      const matches = selectedActivities.some(act => {
        const keywords = activityKeywords[act] ?? [act.toLowerCase()];
        return keywords.some(kw => row.activity.toLowerCase().includes(kw));
      });
      if (!matches) return false;
    }

    return true;
  }, [dateRange, selectedAgents, selectedActivities]);

  const filtered = useMemo(() => {
    return mockData.filter(row => {
      if (!matchesCommonFilters(row)) return false;

      if (selectedCampaignIds.length > 0 && row.type === 'Campaign') {
        const selectedNames = selectedGroup.campaigns
          .filter(c => selectedCampaignIds.includes(c.id))
          .map(c => c.name.toLowerCase());
        const entityLower = row.entityName?.toLowerCase() ?? '';
        if (!selectedNames.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
      }

      for (const [type, search] of Object.entries(entityFilters)) {
        if (!search) continue;
        if (row.type === type) {
          const term = search.toLowerCase();
          const inActivity = row.activity.toLowerCase().includes(term);
          const inEntity = row.entityName?.toLowerCase().includes(term) ?? false;
          if (!inActivity && !inEntity) return false;
        }
      }
      return true;
    });
  }, [matchesCommonFilters, entityFilters, selectedCampaignIds, selectedGroup]);

  // App -> Campaign -> Ad Group cascading filters for the linked filters tab
  const linkedFiltered = useMemo(() => {
    const effectiveCampaigns = linkedCampaignIds.length > 0
      ? selectedGroup.campaigns.filter(c => linkedCampaignIds.includes(c.id))
      : linkedAppIds.length > 0
      ? selectedGroup.campaigns.filter(c => linkedAppIds.includes(c.appId))
      : selectedGroup.campaigns;

    const effectiveAdGroups = linkedAdGroupIds.length > 0
      ? effectiveCampaigns.flatMap(c => c.adGroups).filter(ag => linkedAdGroupIds.includes(ag.id))
      : effectiveCampaigns.flatMap(c => c.adGroups);

    return mockData.filter(row => {
      if (!matchesCommonFilters(row)) return false;

      const entityLower = row.entityName?.toLowerCase() ?? '';

      if (row.type === 'Campaign' && (linkedAppIds.length > 0 || linkedCampaignIds.length > 0)) {
        const names = effectiveCampaigns.map(c => c.name.toLowerCase());
        if (!names.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
      }

      if (row.type === 'Ad Group' && (linkedAppIds.length > 0 || linkedCampaignIds.length > 0 || linkedAdGroupIds.length > 0)) {
        const names = effectiveAdGroups.map(ag => ag.name.toLowerCase());
        if (!names.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
      }

      return true;
    });
  }, [matchesCommonFilters, selectedGroup, linkedAppIds, linkedCampaignIds, linkedAdGroupIds]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach(r => {
      counts[r.type] = (counts[r.type] ?? 0) + 1;
    });
    return counts;
  }, [filtered]);

  const hasActiveFilters =
    selectedAgents.length > 0 ||
    selectedActivities.length > 0 ||
    selectedCampaignIds.length > 0 ||
    selectedAppIds.length > 0 ||
    selectedAdGroupIds.length > 0 ||
    linkedAppIds.length > 0 ||
    linkedCampaignIds.length > 0 ||
    linkedAdGroupIds.length > 0 ||
    Object.values(entityFilters).some(Boolean);

  const clearAll = () => {
    setSelectedAgents([]);
    setSelectedActivities([]);
    setEntityFilters({});
    setSelectedCampaignIds([]);
    setSelectedAppIds([]);
    setSelectedAdGroupIds([]);
    setLinkedAppIds([]);
    setLinkedCampaignIds([]);
    setLinkedAdGroupIds([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(c => !c)} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          selectedGroup={selectedGroup}
          onGroupChange={handleGroupChange}
        />

        <div className="px-6 py-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-1 px-4 pt-2 border-b border-gray-100">
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Change History
              </button>
              <button
                onClick={() => setActiveTab('linked')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'linked'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                App / Campaign / Ad Group
              </button>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
              <AgentFilterDropdown selected={selectedAgents} onChange={setSelectedAgents} />
              <ActivityFilterDropdown selected={selectedActivities} onChange={setSelectedActivities} />
              <div className="ml-auto flex items-center gap-2">
                {hasActiveFilters && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-gray-500 hover:text-red-500 transition-colors font-medium px-2 py-1 rounded hover:bg-red-50"
                  >
                    Clear all filters
                  </button>
                )}
                <DateRangePicker value={dateRange} onChange={setDateRange} />
              </div>
            </div>

            {activeTab === 'history' ? (
              <>
                <div className="flex items-center gap-1 px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                  <EntityTypeFilter
                    entityFilters={entityFilters as Record<string, string>}
                    onEntityFilterChange={handleEntityFilterChange}
                    activeType={activeEntityType}
                    onActiveTypeChange={setActiveEntityType}
                    counts={typeCounts}
                    selectedCampaigns={selectedCampaignIds}
                    onCampaignsChange={handleCampaignsChange}
                    groupApps={selectedGroup.apps}
                    selectedApps={selectedAppIds}
                    onAppsChange={setSelectedAppIds}
                    groupCampaigns={selectedGroup.campaigns}
                    selectedAdGroups={selectedAdGroupIds}
                    onAdGroupsChange={setSelectedAdGroupIds}
                  />
                </div>

                <ChangeHistoryTable data={filtered} />
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                  <LinkedEntityFilters
                    apps={selectedGroup.apps}
                    campaigns={selectedGroup.campaigns}
                    selectedApps={linkedAppIds}
                    onAppsChange={handleLinkedAppsChange}
                    selectedCampaigns={linkedCampaignIds}
                    onCampaignsChange={handleLinkedCampaignsChange}
                    selectedAdGroups={linkedAdGroupIds}
                    onAdGroupsChange={setLinkedAdGroupIds}
                  />
                </div>

                <ChangeHistoryTable data={linkedFiltered} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
