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
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [selectedAdGroupIds, setSelectedAdGroupIds] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return { start, end };
  });

  const [activeTab, setActiveTab] = useState<'history' | 'linked'>('history');
  const [linkedAppIds, setLinkedAppIds] = useState<string[]>([]);
  const [linkedCampaignIds, setLinkedCampaignIds] = useState<string[]>([]);
  const [linkedAdGroupIds, setLinkedAdGroupIds] = useState<string[]>([]);
  const [linkedDateRange, setLinkedDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [linkedEntityFilters, setLinkedEntityFilters] = useState<EntityFilterMap>({});

  const handleGroupChange = (group: CampaignGroupInfo) => {
    setSelectedGroup(group);
    setSelectedCampaignIds([]);
    setSelectedAppIds([]);
    setSelectedAdGroupIds([]);
    setLinkedAppIds([]);
    setLinkedCampaignIds([]);
    setLinkedAdGroupIds([]);
  };

  const handleEntityFilterChange = (type: ChangeType, value: string) => {
    setEntityFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleLinkedEntityFilterChange = (type: ChangeType, value: string) => {
    setLinkedEntityFilters(prev => ({ ...prev, [type]: value }));
  };

  const matchesDateRange = (row: ChangeRecord, range: { start: Date | null; end: Date | null }) => {
    if (range.start && row.date < range.start) return false;
    if (range.end) {
      const endOfDay = new Date(range.end.getFullYear(), range.end.getMonth(), range.end.getDate(), 23, 59, 59, 999);
      if (row.date > endOfDay) return false;
    }
    return true;
  };

  const matchesCommonFilters = useCallback((row: ChangeRecord) => {
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
  }, [selectedAgents, selectedActivities]);

  const filtered = useMemo(() => {
    const appCampaignNames = selectedAppIds.length > 0
      ? selectedGroup.campaigns.filter(c => selectedAppIds.includes(c.appId)).map(c => c.name.toLowerCase())
      : null;

    const appAdGroupNames = selectedAppIds.length > 0
      ? selectedGroup.campaigns.filter(c => selectedAppIds.includes(c.appId)).flatMap(c => c.adGroups).map(ag => ag.name.toLowerCase())
      : null;

    return mockData.filter(row => {
      if (!matchesCommonFilters(row)) return false;
      if (!matchesDateRange(row, dateRange)) return false;

      const entityLower = row.entityName?.toLowerCase() ?? '';

      if (row.type === 'Campaign') {
        if (appCampaignNames && !appCampaignNames.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
        if (selectedCampaignIds.length > 0) {
          const selectedNames = selectedGroup.campaigns
            .filter(c => selectedCampaignIds.includes(c.id))
            .map(c => c.name.toLowerCase());
          if (!selectedNames.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
        }
      }

      if (row.type === 'Ad Group') {
        if (appAdGroupNames && !appAdGroupNames.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
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
  }, [matchesCommonFilters, dateRange, entityFilters, selectedCampaignIds, selectedAppIds, selectedGroup]);

  // App, Campaign and Ad Group filters act independently of each other
  const linkedFiltered = useMemo(() => {
    const allAdGroups = selectedGroup.campaigns.flatMap(c => c.adGroups);

    const appCampaignNames = linkedAppIds.length > 0
      ? selectedGroup.campaigns.filter(c => linkedAppIds.includes(c.appId)).map(c => c.name.toLowerCase())
      : null;

    const appAdGroupNames = linkedAppIds.length > 0
      ? selectedGroup.campaigns.filter(c => linkedAppIds.includes(c.appId)).flatMap(c => c.adGroups).map(ag => ag.name.toLowerCase())
      : null;

    const campaignNames = linkedCampaignIds.length > 0
      ? selectedGroup.campaigns.filter(c => linkedCampaignIds.includes(c.id)).map(c => c.name.toLowerCase())
      : null;

    const adGroupNames = linkedAdGroupIds.length > 0
      ? allAdGroups.filter(ag => linkedAdGroupIds.includes(ag.id)).map(ag => ag.name.toLowerCase())
      : null;

    return mockData.filter(row => {
      if (!matchesCommonFilters(row)) return false;
      if (!matchesDateRange(row, linkedDateRange)) return false;

      const entityLower = row.entityName?.toLowerCase() ?? '';

      if (row.type === 'Campaign') {
        if (appCampaignNames && !appCampaignNames.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
        if (campaignNames && !campaignNames.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
      }

      if (row.type === 'Ad Group') {
        if (appAdGroupNames && !appAdGroupNames.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
        if (adGroupNames && !adGroupNames.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
      }

      for (const [type, search] of Object.entries(linkedEntityFilters)) {
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
  }, [matchesCommonFilters, linkedDateRange, linkedEntityFilters, selectedGroup, linkedAppIds, linkedCampaignIds, linkedAdGroupIds]);

  const hasActiveFilters =
    selectedAgents.length > 0 ||
    selectedActivities.length > 0 ||
    selectedCampaignIds.length > 0 ||
    selectedAppIds.length > 0 ||
    selectedAdGroupIds.length > 0 ||
    linkedAppIds.length > 0 ||
    linkedCampaignIds.length > 0 ||
    linkedAdGroupIds.length > 0 ||
    linkedDateRange.start !== null ||
    linkedDateRange.end !== null ||
    Object.values(entityFilters).some(Boolean) ||
    Object.values(linkedEntityFilters).some(Boolean);

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
    setLinkedDateRange({ start: null, end: null });
    setLinkedEntityFilters({});
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
                Independent filters
              </button>
              <button
                onClick={() => setActiveTab('linked')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'linked'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Dependent filters
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
                {activeTab === 'history' ? (
                  <DateRangePicker value={dateRange} onChange={setDateRange} />
                ) : (
                  <DateRangePicker value={linkedDateRange} onChange={setLinkedDateRange} />
                )}
              </div>
            </div>

            {activeTab === 'history' ? (
              <>
                <div className="flex items-center gap-1 px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                  <EntityTypeFilter
                    entityFilters={entityFilters as Record<string, string>}
                    onEntityFilterChange={handleEntityFilterChange}
                    selectedCampaigns={selectedCampaignIds}
                    onCampaignsChange={setSelectedCampaignIds}
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
                    onAppsChange={setLinkedAppIds}
                    selectedCampaigns={linkedCampaignIds}
                    onCampaignsChange={setLinkedCampaignIds}
                    selectedAdGroups={linkedAdGroupIds}
                    onAdGroupsChange={setLinkedAdGroupIds}
                    entityFilters={linkedEntityFilters as Record<string, string>}
                    onEntityFilterChange={handleLinkedEntityFilterChange}
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
