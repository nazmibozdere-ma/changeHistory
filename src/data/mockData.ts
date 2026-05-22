export type ChangeType =
  | 'Ad Group'
  | 'Campaign'
  | 'Keyword'
  | 'Negative Keyword'
  | 'Ad'
  | 'App';

export interface ChangeRecord {
  id: string;
  date: Date;
  dateTime: string;
  activity: string;
  type: ChangeType;
  agent: string;
  entityName?: string;
}

export const mockData: ChangeRecord[] = [
  // March 2026
  { id: '1',  date: new Date(2026, 2, 6, 10, 46), dateTime: 'Mon, Mar 6, 2026\n10:46 AM', activity: 'Ad Group Changed',           type: 'Ad Group',        agent: 'elisa.reyna@sciplay.com',                        entityName: 'casino_slots_adgroup' },
  { id: '2',  date: new Date(2026, 2, 6, 10, 44), dateTime: 'Mon, Mar 6, 2026\n10:44 AM', activity: 'Campaign Changed',           type: 'Campaign',        agent: 'elisa.reyna@sciplay.com',                        entityName: 'Casino_US_Brand' },
  { id: '3',  date: new Date(2026, 2, 4,  6, 27), dateTime: 'Sat, Mar 4, 2026\n6:27 AM',  activity: 'Ad Group Created',           type: 'Ad Group',        agent: 'MobileAction Account Manager',                   entityName: 'casino_new_adgroup' },
  { id: '4',  date: new Date(2026, 2, 3, 15, 40), dateTime: 'Fri, Mar 3, 2026\n3:40 PM',  activity: 'Campaign Created',           type: 'Campaign',        agent: 'MobileAction Account Manager',                   entityName: 'Casino_EU_Broad' },
  { id: '5',  date: new Date(2026, 2, 3, 15, 37), dateTime: 'Fri, Mar 3, 2026\n3:37 PM',  activity: 'Campaign Created',           type: 'Campaign',        agent: 'MobileAction Account Manager',                   entityName: 'Casino_UK_Exact' },
  // April 2026
  { id: '6',  date: new Date(2026, 3,  1,  8, 18), dateTime: 'Wed, Apr 1, 2026\n8:18 AM',  activity: 'Ad Groups Changed',         type: 'Ad Group',        agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'casino_slots_adgroup' },
  { id: '7',  date: new Date(2026, 3,  1, 13, 52), dateTime: 'Wed, Apr 1, 2026\n1:52 PM',  activity: 'Keyword Added',             type: 'Keyword',         agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'best casino app' },
  { id: '8',  date: new Date(2026, 3,  1, 13, 51), dateTime: 'Wed, Apr 1, 2026\n1:51 PM',  activity: 'Keyword Added',             type: 'Keyword',         agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'casino slots free' },
  { id: '9',  date: new Date(2026, 3,  2, 10, 15), dateTime: 'Thu, Apr 2, 2026\n10:15 AM', activity: 'Keyword Added',             type: 'Keyword',         agent: 'sapir.havshush@sciplay.com',                     entityName: 'casino online' },
  { id: '10', date: new Date(2026, 3,  2, 12, 23), dateTime: 'Thu, Apr 2, 2026\n12:23 PM', activity: 'Keyword Changed',           type: 'Keyword',         agent: 'sapir.havshush@sciplay.com',                     entityName: 'casino games' },
  { id: '11', date: new Date(2026, 3,  2, 12, 32), dateTime: 'Thu, Apr 2, 2026\n12:32 PM', activity: 'Ad Group Created',          type: 'Ad Group',        agent: 'elisa.reyna@sciplay.com',                        entityName: 'casino_jackpot' },
  { id: '12', date: new Date(2026, 3,  2, 13,  8), dateTime: 'Thu, Apr 2, 2026\n1:08 PM',  activity: 'Ad Group Changed',          type: 'Ad Group',        agent: 'elisa.reyna@sciplay.com',                        entityName: 'casino_slots_main' },
  { id: '13', date: new Date(2026, 3,  2, 22, 12), dateTime: 'Thu, Apr 2, 2026\n10:12 PM', activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Budget Allocation)',      entityName: 'Casino_US_Brand' },
  { id: '14', date: new Date(2026, 3,  4,  9, 30), dateTime: 'Sat, Apr 4, 2026\n9:30 AM',  activity: 'Negative Keyword Added',    type: 'Negative Keyword',agent: 'elisa.reyna@sciplay.com',                        entityName: 'free casino' },
  { id: '15', date: new Date(2026, 3,  4, 11, 45), dateTime: 'Sat, Apr 4, 2026\n11:45 AM', activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Budget Allocation)',      entityName: 'Casino_Slots_Retargeting' },
  { id: '16', date: new Date(2026, 3,  6, 14,  0), dateTime: 'Mon, Apr 6, 2026\n2:00 PM',  activity: 'Ad Group Changed',          type: 'Ad Group',        agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'casino_jackpot' },
  { id: '17', date: new Date(2026, 3,  7,  9, 10), dateTime: 'Tue, Apr 7, 2026\n9:10 AM',  activity: 'Keyword Added',             type: 'Keyword',         agent: 'MobileAction Account Manager',                   entityName: 'jackpot slots' },
  { id: '18', date: new Date(2026, 3,  7, 16, 20), dateTime: 'Tue, Apr 7, 2026\n4:20 PM',  activity: 'Campaign Created',          type: 'Campaign',        agent: 'elisa.reyna@sciplay.com',                        entityName: 'Casino_High_Value_Users' },
  { id: '19', date: new Date(2026, 3,  9,  8, 55), dateTime: 'Thu, Apr 9, 2026\n8:55 AM',  activity: 'Ad Deleted',                type: 'Ad',              agent: 'elisa.reyna@sciplay.com',                        entityName: 'promo_banner_v1' },
  { id: '20', date: new Date(2026, 3,  9, 11, 30), dateTime: 'Thu, Apr 9, 2026\n11:30 AM', activity: 'Keyword Deleted',           type: 'Keyword',         agent: 'sapir.havshush@sciplay.com',                     entityName: 'free slot machine' },
  { id: '21', date: new Date(2026, 3, 10, 10,  0), dateTime: 'Fri, Apr 10, 2026\n10:00 AM',activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Automation)',             entityName: 'Casino_EU_Broad' },
  { id: '22', date: new Date(2026, 3, 11, 15, 45), dateTime: 'Sat, Apr 11, 2026\n3:45 PM', activity: 'Ad Group Duplicated',       type: 'Ad Group',        agent: 'elisa.reyna@sciplay.com',                        entityName: 'casino_slots_main' },
  { id: '23', date: new Date(2026, 3, 14,  9, 20), dateTime: 'Tue, Apr 14, 2026\n9:20 AM', activity: 'Keyword Added',             type: 'Keyword',         agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'real money casino' },
  { id: '24', date: new Date(2026, 3, 14, 13,  5), dateTime: 'Tue, Apr 14, 2026\n1:05 PM', activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Budget Allocation)',      entityName: 'Casino_High_Value_Users' },
  { id: '25', date: new Date(2026, 3, 16,  8, 40), dateTime: 'Thu, Apr 16, 2026\n8:40 AM', activity: 'Negative Keyword Added',    type: 'Negative Keyword',agent: 'sapir.havshush@sciplay.com',                     entityName: 'casino cheat' },
  { id: '26', date: new Date(2026, 3, 17, 11,  0), dateTime: 'Fri, Apr 17, 2026\n11:00 AM',activity: 'Ad Created',                type: 'Ad',              agent: 'elisa.reyna@sciplay.com',                        entityName: 'spring_promo_banner' },
  { id: '27', date: new Date(2026, 3, 18, 14, 30), dateTime: 'Sat, Apr 18, 2026\n2:30 PM', activity: 'Campaign Duplicated',       type: 'Campaign',        agent: 'MobileAction Account Manager',                   entityName: 'Casino_US_Brand' },
  { id: '28', date: new Date(2026, 3, 21,  9,  0), dateTime: 'Tue, Apr 21, 2026\n9:00 AM', activity: 'Ad Group Changed',          type: 'Ad Group',        agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'vip_exact_match_core_terms' },
  { id: '29', date: new Date(2026, 3, 22, 16, 10), dateTime: 'Wed, Apr 22, 2026\n4:10 PM', activity: 'Keyword Changed',           type: 'Keyword',         agent: 'sapir.havshush@sciplay.com',                     entityName: 'slot machine games' },
  { id: '30', date: new Date(2026, 3, 23, 10, 25), dateTime: 'Thu, Apr 23, 2026\n10:25 AM',activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Automation)',             entityName: 'Casino_Slots_Retargeting' },
  { id: '31', date: new Date(2026, 3, 25,  8, 15), dateTime: 'Sat, Apr 25, 2026\n8:15 AM', activity: 'Ad Group Created',          type: 'Ad Group',        agent: 'elisa.reyna@sciplay.com',                        entityName: 'vip_lookalike_broad' },
  { id: '32', date: new Date(2026, 3, 28, 11, 50), dateTime: 'Tue, Apr 28, 2026\n11:50 AM',activity: 'Keyword Added',             type: 'Keyword',         agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'online casino bonus' },
  { id: '33', date: new Date(2026, 3, 29, 15, 35), dateTime: 'Wed, Apr 29, 2026\n3:35 PM', activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Budget Allocation)',      entityName: 'Casino_UK_Exact' },
  { id: '34', date: new Date(2026, 3, 30,  9, 45), dateTime: 'Thu, Apr 30, 2026\n9:45 AM', activity: 'Negative Keyword Added',    type: 'Negative Keyword',agent: 'elisa.reyna@sciplay.com',                        entityName: 'casino hack' },
  // May 2026
  { id: '35', date: new Date(2026, 4,  1, 10,  0), dateTime: 'Fri, May 1, 2026\n10:00 AM', activity: 'Campaign Created',          type: 'Campaign',        agent: 'MobileAction Account Manager',                   entityName: 'Casino_May_Promo' },
  { id: '36', date: new Date(2026, 4,  1, 14, 20), dateTime: 'Fri, May 1, 2026\n2:20 PM',  activity: 'Keyword Added',             type: 'Keyword',         agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'casino app download' },
  { id: '37', date: new Date(2026, 4,  2,  9, 30), dateTime: 'Sat, May 2, 2026\n9:30 AM',  activity: 'Ad Group Created',          type: 'Ad Group',        agent: 'elisa.reyna@sciplay.com',                        entityName: 'may_promo_main' },
  { id: '38', date: new Date(2026, 4,  4, 11, 15), dateTime: 'Mon, May 4, 2026\n11:15 AM', activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Budget Allocation)',      entityName: 'Casino_May_Promo' },
  { id: '39', date: new Date(2026, 4,  5, 16,  0), dateTime: 'Tue, May 5, 2026\n4:00 PM',  activity: 'Keyword Changed',           type: 'Keyword',         agent: 'sapir.havshush@sciplay.com',                     entityName: 'casino sign up bonus' },
  { id: '40', date: new Date(2026, 4,  6,  8, 45), dateTime: 'Wed, May 6, 2026\n8:45 AM',  activity: 'Ad Group Changed',          type: 'Ad Group',        agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'may_promo_main' },
  { id: '41', date: new Date(2026, 4,  7, 10, 30), dateTime: 'Thu, May 7, 2026\n10:30 AM', activity: 'Negative Keyword Added',    type: 'Negative Keyword',agent: 'sapir.havshush@sciplay.com',                     entityName: 'casino scam' },
  { id: '42', date: new Date(2026, 4,  8, 13,  0), dateTime: 'Fri, May 8, 2026\n1:00 PM',  activity: 'Ad Created',                type: 'Ad',              agent: 'elisa.reyna@sciplay.com',                        entityName: 'may_banner_v1' },
  { id: '43', date: new Date(2026, 4,  9,  9, 20), dateTime: 'Sat, May 9, 2026\n9:20 AM',  activity: 'Campaign Duplicated',       type: 'Campaign',        agent: 'MobileAction Account Manager',                   entityName: 'Casino_US_Brand' },
  { id: '44', date: new Date(2026, 4, 11, 15, 40), dateTime: 'Mon, May 11, 2026\n3:40 PM', activity: 'Keyword Added',             type: 'Keyword',         agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'slots casino games' },
  { id: '45', date: new Date(2026, 4, 12, 11, 10), dateTime: 'Tue, May 12, 2026\n11:10 AM',activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Automation)',             entityName: 'Casino_EU_Broad' },
  { id: '46', date: new Date(2026, 4, 13,  8, 55), dateTime: 'Wed, May 13, 2026\n8:55 AM', activity: 'Ad Group Duplicated',       type: 'Ad Group',        agent: 'elisa.reyna@sciplay.com',                        entityName: 'casino_jackpot' },
  { id: '47', date: new Date(2026, 4, 14, 10, 30), dateTime: 'Thu, May 14, 2026\n10:30 AM',activity: 'Keyword Deleted',           type: 'Keyword',         agent: 'sapir.havshush@sciplay.com',                     entityName: 'casino free play' },
  { id: '48', date: new Date(2026, 4, 15, 14, 45), dateTime: 'Fri, May 15, 2026\n2:45 PM', activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Budget Allocation)',      entityName: 'Casino_High_Value_Users' },
  { id: '49', date: new Date(2026, 4, 16, 16, 20), dateTime: 'Sat, May 16, 2026\n4:20 PM', activity: 'Ad Group Changed',          type: 'Ad Group',        agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'whale_audience_broad_targeting' },
  { id: '50', date: new Date(2026, 4, 18,  9,  5), dateTime: 'Mon, May 18, 2026\n9:05 AM', activity: 'Keyword Added',             type: 'Keyword',         agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'mobile casino app' },
  { id: '51', date: new Date(2026, 4, 19, 11, 30), dateTime: 'Tue, May 19, 2026\n11:30 AM',activity: 'Campaign Created',          type: 'Campaign',        agent: 'elisa.reyna@sciplay.com',                        entityName: 'Casino_Summer_Launch' },
  { id: '52', date: new Date(2026, 4, 20, 13, 15), dateTime: 'Wed, May 20, 2026\n1:15 PM', activity: 'Ad Deleted',                type: 'Ad',              agent: 'elisa.reyna@sciplay.com',                        entityName: 'may_banner_v1' },
  { id: '53', date: new Date(2026, 4, 21,  8, 40), dateTime: 'Thu, May 21, 2026\n8:40 AM', activity: 'Negative Keyword Added',    type: 'Negative Keyword',agent: 'sapir.havshush@sciplay.com',                     entityName: 'casino no deposit' },
  { id: '54', date: new Date(2026, 4, 22, 10, 55), dateTime: 'Fri, May 22, 2026\n10:55 AM',activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Automation)',             entityName: 'Casino_Summer_Launch' },
  { id: '55', date: new Date(2026, 4, 23, 15,  0), dateTime: 'Sat, May 23, 2026\n3:00 PM', activity: 'Keyword Added',             type: 'Keyword',         agent: 'MobileAction Account Manager',                   entityName: 'casino vip rewards' },
  { id: '56', date: new Date(2026, 4, 25,  9, 30), dateTime: 'Mon, May 25, 2026\n9:30 AM', activity: 'Ad Group Changed',          type: 'Ad Group',        agent: 'MobileAction Ad System (AI Smart Bidding)',       entityName: 'retargeting_lapsed_users_7days' },
  { id: '57', date: new Date(2026, 4, 26, 14,  0), dateTime: 'Tue, May 26, 2026\n2:00 PM', activity: 'Campaign Changed',          type: 'Campaign',        agent: 'MobileAction Ad System (Budget Allocation)',      entityName: 'Casino_EU_Broad' },
  { id: '58', date: new Date(2026, 4, 27, 11, 45), dateTime: 'Wed, May 27, 2026\n11:45 AM',activity: 'Ad Created',                type: 'Ad',              agent: 'elisa.reyna@sciplay.com',                        entityName: 'summer_promo_banner' },
  { id: '59', date: new Date(2026, 4, 28, 16, 30), dateTime: 'Thu, May 28, 2026\n4:30 PM', activity: 'Keyword Changed',           type: 'Keyword',         agent: 'sapir.havshush@sciplay.com',                     entityName: 'jackpot casino game' },
  { id: '60', date: new Date(2026, 4, 29,  8, 20), dateTime: 'Fri, May 29, 2026\n8:20 AM', activity: 'Ad Group Created',          type: 'Ad Group',        agent: 'MobileAction Account Manager',                   entityName: 'summer_high_value_users' },
  { id: '61', date: new Date(2026, 4, 30, 13, 10), dateTime: 'Sat, May 30, 2026\n1:10 PM', activity: 'Campaign Duplicated',       type: 'Campaign',        agent: 'MobileAction Account Manager',                   entityName: 'Casino_High_Value_Users' },
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

// ─── Expandable row detail types ───────────────────────────────────────────

export interface DetailRow {
  entityName?: string; // first column for 'change' table type
  action: string;
  oldValue?: string;   // 'change' type
  newValue?: string;   // 'change' type
  value?: string;      // 'create' type
}

export interface RecordDetails {
  tableType: 'change' | 'create';
  entityLabel?: string; // header for the first column in 'change' tables
  rows: DetailRow[];
}

function fmtDateShort(d: Date): string {
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function inferCampaign(adGroupName: string): string {
  const n = adGroupName.toLowerCase();
  if (n.includes('eu_'))                  return 'Casino_EU_Broad';
  if (n.includes('uk_'))                  return 'Casino_UK_Exact';
  if (n.includes('vip_') || n.includes('whale_')) return 'Casino_High_Value_Users';
  if (n.includes('retargeting_'))         return 'Casino_Slots_Retargeting';
  return 'Casino_US_Brand';
}

export function getRecordDetails(record: ChangeRecord): RecordDetails {
  const n   = parseInt(record.id, 10);
  const act = record.activity;
  const ent = record.entityName ?? '';

  const isCreated    = act.includes('Created');
  const isChanged    = act.includes('Changed');
  const isDeleted    = act.includes('Deleted');
  const isDuplicated = act.includes('Duplicated');
  const isAdded      = act.includes('Added');

  switch (record.type) {

    case 'Campaign': {
      if (isChanged) {
        const opts = [
          { action: 'Status Change',       oldValue: 'Active',  newValue: 'Paused'  },
          { action: 'Status Change',       oldValue: 'Paused',  newValue: 'Active'  },
          { action: 'Daily Budget Change', oldValue: '$50.00',  newValue: '$75.00'  },
          { action: 'Daily Budget Change', oldValue: '$100.00', newValue: '$80.00'  },
          { action: 'Max CPT Bid Change',  oldValue: '$0.80',   newValue: '$1.20'   },
        ];
        return { tableType: 'change', entityLabel: 'Campaign Name', rows: [{ entityName: ent, ...opts[n % opts.length] }] };
      }
      if (isCreated) {
        const regions = ['United States', 'European Union', 'United Kingdom'];
        return {
          tableType: 'create',
          rows: [
            { action: 'Campaign Name',       value: ent },
            { action: 'Status',              value: 'Active' },
            { action: 'Daily Budget',        value: `$${(50 + (n % 6) * 10).toFixed(2)}` },
            { action: 'Countries / Regions', value: regions[n % regions.length] },
            { action: 'Start Date',          value: fmtDateShort(record.date) },
            { action: 'Ad Type',             value: 'Search Ads' },
          ],
        };
      }
      if (isDuplicated) {
        return {
          tableType: 'create',
          rows: [
            { action: 'Original Campaign', value: ent },
            { action: 'New Campaign Name', value: `${ent} (copy)` },
            { action: 'Status',            value: 'Paused' },
            { action: 'Daily Budget',      value: `$${(50 + (n % 6) * 10).toFixed(2)}` },
            { action: 'Start Date',        value: fmtDateShort(record.date) },
          ],
        };
      }
      break;
    }

    case 'Ad Group': {
      if (isChanged) {
        const opts = [
          { action: 'Status Change',              oldValue: 'Active', newValue: 'Paused' },
          { action: 'Default Max CPT Bid Change', oldValue: '$0.50',  newValue: '$0.90'  },
          { action: 'Default Max CPT Bid Change', oldValue: '$1.20',  newValue: '$0.80'  },
          { action: 'Search Match Change',        oldValue: 'Off',    newValue: 'On'     },
          { action: 'Status Change',              oldValue: 'Paused', newValue: 'Active' },
          { action: 'Default Max CPT Bid Change', oldValue: '$0.70',  newValue: '$1.10'  },
        ];
        return { tableType: 'change', entityLabel: 'Ad Group Name', rows: [{ entityName: ent, ...opts[n % opts.length] }] };
      }
      if (isCreated) {
        return {
          tableType: 'create',
          rows: [
            { action: 'Ad Group ID',         value: `ag-${10000 + n}` },
            { action: 'Name',                value: ent },
            { action: 'Start Date',          value: fmtDateShort(record.date) },
            { action: 'Default Max CPT Bid', value: `$${(0.50 + (n % 8) * 0.10).toFixed(2)}` },
            { action: 'Search Match',        value: n % 2 === 0 ? 'On' : 'Off' },
            { action: 'Status',              value: 'Active' },
            { action: 'Campaign Name',       value: inferCampaign(ent) },
            { action: 'Ad Placement',        value: 'Search Results' },
          ],
        };
      }
      if (isDuplicated) {
        return {
          tableType: 'create',
          rows: [
            { action: 'Original Ad Group',   value: ent },
            { action: 'New Ad Group Name',   value: `${ent} copy` },
            { action: 'Status',              value: 'Paused' },
            { action: 'Default Max CPT Bid', value: `$${(0.50 + (n % 8) * 0.10).toFixed(2)}` },
            { action: 'Campaign Name',       value: inferCampaign(ent) },
          ],
        };
      }
      break;
    }

    case 'Keyword': {
      if (isAdded) {
        const matchTypes = ['Exact Match', 'Broad Match', 'Phrase Match'];
        const cams  = ['Casino_US_Brand', 'Casino_EU_Broad', 'Casino_Slots_Retargeting', 'Casino_High_Value_Users'];
        const agroups = ['casino_slots_adgroup', 'casino_jackpot', 'casino_slots_main', 'vip_exact_match_core_terms'];
        return {
          tableType: 'create',
          rows: [
            { action: 'Keyword',       value: ent },
            { action: 'Match Type',    value: matchTypes[n % matchTypes.length] },
            { action: 'Max CPT Bid',   value: `$${(0.30 + (n % 9) * 0.10).toFixed(2)}` },
            { action: 'Status',        value: 'Active' },
            { action: 'Campaign Name', value: cams[n % cams.length] },
            { action: 'Ad Group Name', value: agroups[n % agroups.length] },
          ],
        };
      }
      if (isChanged) {
        const opts = [
          { action: 'Max CPT Bid Change',  oldValue: '$0.50',       newValue: '$0.80'       },
          { action: 'Status Change',       oldValue: 'Active',      newValue: 'Paused'      },
          { action: 'Match Type Change',   oldValue: 'Broad Match', newValue: 'Exact Match' },
          { action: 'Max CPT Bid Change',  oldValue: '$1.00',       newValue: '$0.70'       },
        ];
        return { tableType: 'change', entityLabel: 'Keyword', rows: [{ entityName: ent, ...opts[n % opts.length] }] };
      }
      if (isDeleted) {
        const matchTypes = ['Exact Match', 'Broad Match'];
        return {
          tableType: 'create',
          rows: [
            { action: 'Keyword',       value: ent },
            { action: 'Match Type',    value: matchTypes[n % matchTypes.length] },
            { action: 'Status',        value: 'Paused' },
            { action: 'Campaign Name', value: 'Casino_US_Brand' },
            { action: 'Ad Group Name', value: 'casino_slots_adgroup' },
          ],
        };
      }
      break;
    }

    case 'Negative Keyword': {
      const matchTypes = ['Exact Match', 'Broad Match'];
      return {
        tableType: 'create',
        rows: [
          { action: 'Keyword',       value: ent },
          { action: 'Match Type',    value: matchTypes[n % matchTypes.length] },
          { action: 'Campaign Name', value: n % 2 === 0 ? 'Casino_US_Brand' : 'Casino_EU_Broad' },
          { action: 'Ad Group Name', value: 'casino_slots_adgroup' },
        ],
      };
    }

    case 'Ad': {
      const creative = n % 2 === 0 ? 'Product Page Ad' : 'Custom Product Page Ad';
      return {
        tableType: 'create',
        rows: [
          { action: 'Ad Name',        value: ent },
          { action: 'Creative Type',  value: creative },
          { action: 'Status',         value: isDeleted ? 'Paused' : 'Active' },
          { action: 'Campaign Name',  value: 'Casino_US_Brand' },
          { action: 'Ad Group Name',  value: 'casino_slots_adgroup' },
        ],
      };
    }
  }

  return { tableType: 'create', rows: [{ action: 'Activity', value: act }] };
}
