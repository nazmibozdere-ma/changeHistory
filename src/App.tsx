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
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);
  const [selectedAdGroupIds, setSelectedAdGroupIds] = useState<string[]>([]);
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<ChangeType[]>([]);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return { start, end };
  });

  const [activeTab, setActiveTab] = useState<'history' | 'linked' | 'newLevel'>('history');
  const [linkedAppIds, setLinkedAppIds] = useState<string[]>([]);
  const [linkedCampaignIds, setLinkedCampaignIds] = useState<string[]>([]);
  const [linkedAdGroupIds, setLinkedAdGroupIds] = useState<string[]>([]);
  const [linkedDateRange, setLinkedDateRange] = useState<{ start: Date | null; end: Date | null }>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return { start, end };
  });
  const [linkedEntityFilters, setLinkedEntityFilters] = useState<EntityFilterMap>({});

  const [selectedNewLevelCampaignIds, setSelectedNewLevelCampaignIds] = useState<string[]>([]);
  const [selectedNewLevelAdGroupIds, setSelectedNewLevelAdGroupIds] = useState<string[]>([]);
  const [selectedNewLevelEntityTypes, setSelectedNewLevelEntityTypes] = useState<ChangeType[]>([]);
  const [newLevelDateRange, setNewLevelDateRange] = useState<{ start: Date | null; end: Date | null }>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return { start, end };
  });

  const handleGroupChange = (group: CampaignGroupInfo) => {
    setSelectedGroup(group);
    setSelectedCampaignIds([]);
    setSelectedAdGroupIds([]);
    setLinkedAppIds([]);
    setLinkedCampaignIds([]);
    setLinkedAdGroupIds([]);
    setSelectedNewLevelCampaignIds([]);
    setSelectedNewLevelAdGroupIds([]);
  };

  // App -> Campaign -> Ad Group cascade for the dependent filters tab
  const handleLinkedAppsChange = (ids: string[]) => {
    setLinkedAppIds(ids);
    setLinkedCampaignIds([]);
    setLinkedAdGroupIds([]);
  };

  const handleLinkedCampaignsChange = (ids: string[]) => {
    setLinkedCampaignIds(ids);
    setLinkedAdGroupIds([]);
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
    return mockData.filter(row => {
      if (!matchesCommonFilters(row)) return false;
      if (!matchesDateRange(row, dateRange)) return false;

      if (selectedEntityTypes.length > 0 && !selectedEntityTypes.includes(row.type)) return false;

      const entityLower = row.entityName?.toLowerCase() ?? '';

      if (row.type === 'Campaign' && selectedCampaignIds.length > 0) {
        const selectedNames = selectedGroup.campaigns
          .filter(c => selectedCampaignIds.includes(c.id))
          .map(c => c.name.toLowerCase());
        if (!selectedNames.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
      }

      return true;
    });
  }, [matchesCommonFilters, dateRange, selectedEntityTypes, selectedCampaignIds, selectedGroup]);

  const newLevelFiltered = useMemo(() => {
    return mockData.filter(row => {
      if (!matchesCommonFilters(row)) return false;
      if (!matchesDateRange(row, newLevelDateRange)) return false;

      if (selectedNewLevelEntityTypes.length > 0 && !selectedNewLevelEntityTypes.includes(row.type)) return false;

      const entityLower = row.entityName?.toLowerCase() ?? '';

      if (row.type === 'Campaign' && selectedNewLevelCampaignIds.length > 0) {
        const selectedNames = selectedGroup.campaigns
          .filter(c => selectedNewLevelCampaignIds.includes(c.id))
          .map(c => c.name.toLowerCase());
        if (!selectedNames.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
      }

      return true;
    });
  }, [matchesCommonFilters, newLevelDateRange, selectedNewLevelEntityTypes, selectedNewLevelCampaignIds, selectedGroup]);

  // App -> Campaign -> Ad Group cascading filters for the dependent filters tab
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
      if (!matchesDateRange(row, linkedDateRange)) return false;

      const entityLower = row.entityName?.toLowerCase() ?? '';

      if (row.type === 'Campaign' && (linkedAppIds.length > 0 || linkedCampaignIds.length > 0)) {
        const names = effectiveCampaigns.map(c => c.name.toLowerCase());
        if (!names.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
      }

      if (row.type === 'Ad Group' && (linkedAppIds.length > 0 || linkedCampaignIds.length > 0 || linkedAdGroupIds.length > 0)) {
        const names = effectiveAdGroups.map(ag => ag.name.toLowerCase());
        if (!names.some(n => entityLower.includes(n) || n.includes(entityLower))) return false;
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
    selectedAdGroupIds.length > 0 ||
    selectedEntityTypes.length > 0 ||
    linkedAppIds.length > 0 ||
    linkedCampaignIds.length > 0 ||
    linkedAdGroupIds.length > 0 ||
    Object.values(linkedEntityFilters).some(Boolean) ||
    selectedNewLevelCampaignIds.length > 0 ||
    selectedNewLevelAdGroupIds.length > 0 ||
    selectedNewLevelEntityTypes.length > 0;

  const clearAll = () => {
    setSelectedAgents([]);
    setSelectedActivities([]);
    setSelectedCampaignIds([]);
    setSelectedAdGroupIds([]);
    setSelectedEntityTypes([]);
    setLinkedAppIds([]);
    setLinkedCampaignIds([]);
    setLinkedAdGroupIds([]);
    setLinkedEntityFilters({});
    setSelectedNewLevelCampaignIds([]);
    setSelectedNewLevelAdGroupIds([]);
    setSelectedNewLevelEntityTypes([]);
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
              <button
                onClick={() => setActiveTab('newLevel')}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'newLevel'
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                New level filters
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
                ) : activeTab === 'linked' ? (
                  <DateRangePicker value={linkedDateRange} onChange={setLinkedDateRange} />
                ) : (
                  <DateRangePicker value={newLevelDateRange} onChange={setNewLevelDateRange} />
                )}
              </div>
            </div>

            {activeTab === 'history' ? (
              <>
                <div className="flex items-center gap-1 px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                  <EntityTypeFilter
                    previewApp={selectedGroup.apps[0]}
                    selectedCampaigns={selectedCampaignIds}
                    onCampaignsChange={setSelectedCampaignIds}
                    groupCampaigns={selectedGroup.campaigns}
                    selectedAdGroups={selectedAdGroupIds}
                    onAdGroupsChange={setSelectedAdGroupIds}
                    selectedEntityTypes={selectedEntityTypes}
                    onEntityTypesChange={setSelectedEntityTypes}
                  />
                </div>

                <ChangeHistoryTable data={filtered} />
              </>
            ) : activeTab === 'linked' ? (
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
                    entityFilters={linkedEntityFilters as Record<string, string>}
                    onEntityFilterChange={handleLinkedEntityFilterChange}
                  />
                </div>

                <ChangeHistoryTable data={linkedFiltered} />
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                  <EntityTypeFilter
                    previewApp={selectedGroup.apps[0]}
                    selectedCampaigns={selectedNewLevelCampaignIds}
                    onCampaignsChange={setSelectedNewLevelCampaignIds}
                    groupCampaigns={selectedGroup.campaigns}
                    selectedAdGroups={selectedNewLevelAdGroupIds}
                    onAdGroupsChange={setSelectedNewLevelAdGroupIds}
                    selectedEntityTypes={selectedNewLevelEntityTypes}
                    onEntityTypesChange={setSelectedNewLevelEntityTypes}
                  />
                </div>

                <ChangeHistoryTable data={newLevelFiltered} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
