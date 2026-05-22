export type ChangeType =
  | 'Ad Group'
  | 'Campaign'
  | 'Keyword'
  | 'Negative Keyword'
  | 'Ad'
  | 'App';

export interface ChangeRecord {
  id: string;
  dateTime: string;
  activity: string;
  type: ChangeType;
  agent: string;
  entityName?: string;
}

export const mockData: ChangeRecord[] = [
  { id: '1',  dateTime: 'Mon, Mar 6, 2026\n10:46 AM', activity: 'Ad Group Changed',    type: 'Ad Group',  agent: 'elisa.reyna@sciplay.com',                        entityName: 'casino_slots_adgroup' },
  { id: '2',  dateTime: 'Mon, Mar 6, 2026\n10:44 AM', activity: 'Campaign Changed',    type: 'Campaign',  agent: 'elisa.reyna@sciplay.com',                        entityName: 'Casino_US_Brand' },
  { id: '3',  dateTime: 'Sat, Mar 4, 2026\n6:27 AM',  activity: 'Ad Group Created',    type: 'Ad Group',  agent: 'MobileAction Account Manager',                   entityName: 'casino_new_adgroup' },
  { id: '4',  dateTime: 'Fri, Mar 3, 2026\n3:40 PM',  activity: 'Campaign Created',    type: 'Campaign',  agent: 'MobileAction Account Manager',                   entityName: 'Casino_EU_Broad' },
  { id: '5',  dateTime: 'Fri, Mar 3, 2026\n3:37 PM',  activity: 'Campaign Created',    type: 'Campaign',  agent: 'MobileAction Account Manager',                   entityName: 'Casino_UK_Exact' },
  { id: '6',  dateTime: 'Thu, Apr 2, 2026\n13:08 AM', activity: 'Ad Group Changed',    type: 'Ad Group',  agent: 'elisa.reyna@sciplay.com',                        entityName: 'casino_slots_main' },
  { id: '7',  dateTime: 'Thu, Apr 2, 2026\n12:32 PM', activity: 'Ad Group Created',    type: 'Ad Group',  agent: 'elisa.reyna@sciplay.com',                        entityName: 'casino_jackpot' },
  { id: '8',  dateTime: 'Thu, Apr 2, 2026\n12:23 PM', activity: 'Keyword Changed',     type: 'Keyword',   agent: 'sapir.havshush@sciplay.com',                     entityName: 'casino games' },
  { id: '9',  dateTime: 'Thu, Apr 2, 2026\n10:15 AM', activity: 'Keyword Added',       type: 'Keyword',   agent: 'sapir.havshush@sciplay.com',                     entityName: 'casino online' },
  { id: '10', dateTime: 'Thu, Apr 2, 2026\n10:12 PM', activity: 'Campaign Changed',    type: 'Campaign',  agent: 'MobileAction Ad System (Budget Allocation)',      entityName: 'Casino_US_Brand' },
  { id: '11', dateTime: 'Wed, Apr 1, 2026\n8:18 PM',  activity: 'Ad Groups Changed',   type: 'Ad Group',  agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'casino_slots_adgroup' },
  { id: '12', dateTime: 'Wed, Apr 1, 2026\n1:52 PM',  activity: 'Keyword Added',       type: 'Keyword',   agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'best casino app' },
  { id: '13', dateTime: 'Wed, Apr 1, 2026\n1:51 PM',  activity: 'Keyword Added',       type: 'Keyword',   agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'casino slots free' },
];

export interface AgentItem {
  label: string;
  value: string;
  comingSoon?: boolean;
}

export interface AgentGroup {
  label: string;
  items: AgentItem[];
}

export const agentGroups: AgentGroup[] = [
  {
    label: 'Manual',
    items: [
      { label: 'User', value: 'User' },
      { label: 'MobileAction Account Manager', value: 'MobileAction Account Manager' },
    ],
  },
  {
    label: 'MobileAction Ads System',
    items: [
      { label: 'AI Smart Bidding', value: 'MobileAction Ad System (AI Smart Bidding)' },
      { label: 'Automation', value: 'MobileAction Ad System (Automation)' },
      { label: 'CPP A/B Testing', value: 'MobileAction Ad System (CPP A/B Testing)' },
      { label: 'Budget Allocation', value: 'MobileAction Ad System (Budget Allocation)' },
      { label: 'Keyword Planner', value: 'MobileAction Ad System (Keyword Planner)', comingSoon: true },
    ],
  },
];

export const allAgentValues = agentGroups.flatMap(g => g.items.map(i => i.value));

export const agentMatchesFilter = (agent: string, filterValue: string): boolean => {
  if (filterValue === 'User') return agent.includes('@');
  return agent === filterValue;
};

export interface AdGroup {
  id: string;
  name: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused';
  adGroups: AdGroup[];
}

export interface AppInfo {
  id: string;
  name: string;
  platform: 'iOS' | 'Android' | 'iOS & Android';
  iconGradient: string;
  iconLetter: string;
}

export interface CampaignGroupInfo {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
  initial: string;
  apps: AppInfo[];
  campaigns: Campaign[];
}

export const campaignGroups: CampaignGroupInfo[] = [
  {
    id: '1',
    name: 'Sciplay – Global iOS Advertising',
    email: 'elisa.reyna@sciplay.com',
    avatarColor: 'from-red-400 to-red-600',
    initial: 'E',
    apps: [
      { id: 'a1', name: 'Jackpot Party Casino Slots', platform: 'iOS',     iconGradient: 'from-amber-400 to-orange-500',  iconLetter: 'J' },
      { id: 'a2', name: 'Gold Fish Casino Slots',     platform: 'iOS',     iconGradient: 'from-teal-400 to-cyan-500',     iconLetter: 'G' },
      { id: 'a3', name: 'Quick Hit Slots Casino',     platform: 'iOS',     iconGradient: 'from-rose-500 to-pink-600',     iconLetter: 'Q' },
    ],
    campaigns: [
      { id: 'c1', name: 'Casino_US_Brand', status: 'active', adGroups: [
        { id: 'ag1',  name: 'us_slots_exact_match_brand_terms' },
        { id: 'ag2',  name: 'us_casino_competitor_broad_match' },
        { id: 'ag3',  name: 'us_jackpot_high_intent_search_queries' },
        { id: 'ag4',  name: 'us_casino_phrase_match_general_terms' },
      ]},
      { id: 'c2', name: 'Casino_EU_Broad', status: 'paused', adGroups: [
        { id: 'ag5',  name: 'eu_casino_broad_keywords_general' },
        { id: 'ag6',  name: 'eu_slots_phrase_match_international' },
      ]},
      { id: 'c3', name: 'Casino_Slots_Retargeting', status: 'active', adGroups: [
        { id: 'ag7',  name: 'retargeting_lapsed_users_7days' },
        { id: 'ag8',  name: 'retargeting_high_value_lookalike' },
      ]},
      { id: 'c4', name: 'Casino_High_Value_Users', status: 'active', adGroups: [
        { id: 'ag9',  name: 'vip_exact_match_core_terms' },
        { id: 'ag10', name: 'whale_audience_broad_targeting' },
      ]},
      { id: 'c5', name: 'Casino_UK_Exact', status: 'paused', adGroups: [
        { id: 'ag11', name: 'uk_brand_exact_core_casino_terms' },
        { id: 'ag12', name: 'uk_slots_exact_competitor_keywords' },
      ]},
    ],
  },
  {
    id: '2',
    name: 'Sciplay – North America Android',
    email: 'marcus.cole@sciplay.com',
    avatarColor: 'from-emerald-400 to-teal-600',
    initial: 'M',
    apps: [
      { id: 'a4', name: 'Jackpot Party Casino Android', platform: 'Android', iconGradient: 'from-violet-500 to-purple-600', iconLetter: 'J' },
      { id: 'a5', name: 'Hot Shot Casino Slots',        platform: 'Android', iconGradient: 'from-yellow-400 to-amber-500',  iconLetter: 'H' },
      { id: 'a6', name: '88 Fortunes Slots',            platform: 'Android', iconGradient: 'from-red-500 to-rose-600',      iconLetter: '8' },
    ],
    campaigns: [
      { id: 'c6', name: 'Android_US_Brand', status: 'active', adGroups: [
        { id: 'ag13', name: 'android_us_brand_exact_match' },
        { id: 'ag14', name: 'android_us_competitor_broad_match' },
        { id: 'ag15', name: 'android_us_slots_high_intent' },
      ]},
      { id: 'c7', name: 'Android_Broad_Match', status: 'paused', adGroups: [
        { id: 'ag16', name: 'android_broad_casino_general_terms' },
        { id: 'ag17', name: 'android_broad_slots_phrase_match' },
      ]},
      { id: 'c8', name: 'Android_Remarketing', status: 'active', adGroups: [
        { id: 'ag18', name: 'android_retargeting_lapsed_30days' },
        { id: 'ag19', name: 'android_retargeting_vip_users_exact' },
      ]},
      { id: 'c9', name: 'Android_Competitor_KW', status: 'active', adGroups: [
        { id: 'ag20', name: 'android_competitor_brand_exact' },
        { id: 'ag21', name: 'android_competitor_generic_broad' },
      ]},
    ],
  },
  {
    id: '3',
    name: 'Sciplay – Europe Brand Campaigns',
    email: 'anna.becker@sciplay.com',
    avatarColor: 'from-violet-400 to-purple-600',
    initial: 'A',
    apps: [
      { id: 'a7', name: 'Bingo Showdown',   platform: 'iOS & Android', iconGradient: 'from-emerald-400 to-green-500', iconLetter: 'B' },
      { id: 'a8', name: 'Monopoly Slots',   platform: 'iOS & Android', iconGradient: 'from-blue-500 to-indigo-600',   iconLetter: 'M' },
      { id: 'a9', name: 'Jackpot Party EU', platform: 'iOS & Android', iconGradient: 'from-orange-400 to-amber-500',  iconLetter: 'J' },
    ],
    campaigns: [
      { id: 'c10', name: 'EU_Brand_iOS', status: 'active', adGroups: [
        { id: 'ag22', name: 'eu_ios_brand_exact_match_terms' },
        { id: 'ag23', name: 'eu_ios_slots_phrase_match_broad' },
      ]},
      { id: 'c11', name: 'EU_Retargeting', status: 'active', adGroups: [
        { id: 'ag24', name: 'eu_retargeting_lapsed_users_14days' },
        { id: 'ag25', name: 'eu_retargeting_high_value_exact' },
      ]},
      { id: 'c12', name: 'UK_Exact_Match', status: 'paused', adGroups: [
        { id: 'ag26', name: 'uk_brand_exact_core_terms' },
        { id: 'ag27', name: 'uk_casino_exact_competitor_kw' },
      ]},
      { id: 'c13', name: 'DE_Broad_Search', status: 'active', adGroups: [
        { id: 'ag28', name: 'de_broad_casino_german_keywords' },
        { id: 'ag29', name: 'de_broad_slots_general_terms' },
      ]},
    ],
  },
];

// Keep a flat list for backward-compat references
export const campaigns: Campaign[] = campaignGroups.flatMap(g => g.campaigns);

export const entityTypes: ChangeType[] = ['App', 'Campaign', 'Ad Group', 'Keyword', 'Negative Keyword', 'Ad'];

export const activityOptions = [
  'Create', 'Duplicate', 'Update', 'Delete',
];
