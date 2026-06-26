import { useState } from 'react';
import { SearchIcon, XIcon, QuestionIcon } from './icons';

interface HelpDrawerProps {
  onClose: () => void;
}

type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: string[] };

interface HelpArticle {
  title: string;
  summary: string;
  content: ArticleBlock[];
}

interface HelpWidget {
  title: string;
  articles: HelpArticle[];
}

const widgets: HelpWidget[] = [
  {
    title: 'Apple Ads Integration',
    articles: [
      {
        title: 'Apple Ads Integration Overview',
        summary: 'MobileAction connects directly to Apple Ads accounts to provide a unified workspace for managing campaigns.',
        content: [
          { type: 'paragraph', text: 'MobileAction\'s Apple Ads campaign management platform connects directly to your Apple Ads account to provide a single workspace for managing, optimizing, and scaling your campaigns. Instead of toggling between the native Apple Ads dashboard and separate reporting tools, you get one integrated platform combining Apple Ads data with Mobile Measurement Partner data, advanced bidding strategies, rule-based automations, and detailed performance monitoring.' },
          { type: 'subheading', text: 'Get started' },
          { type: 'list', items: [
            'About Apple Ads Integration: explains what the integration accomplishes and the workflow changes after connecting your account.',
            'Requirements for Apple Ads Integration: details the prerequisites before beginning the integration process.',
          ] },
          { type: 'subheading', text: 'Connect your account' },
          { type: 'list', items: [
            'Permission Types in Apple Ads Integration: clarifies permission level differences before you integrate.',
            'Integrate Your Apple Ads Account with Apple Ads CMP: step-by-step connection instructions.',
          ] },
          { type: 'subheading', text: 'Manage your integrations' },
          { type: 'paragraph', text: 'Manage Your Apple Ads Integrations covers adding new accounts, removing integrations you no longer need, and refreshing integrations for newly added campaign groups.' },
          { type: 'subheading', text: 'After you connect' },
          { type: 'list', items: [
            'Data Availability After Apple Ads Integration: covers the initial data sync, available metrics, and what to expect early on.',
            'Best Practices for a Smooth Apple Ads Integration: checks to confirm correct permissions, active sessions, and accurate data syncing.',
          ] },
        ],
      },
      {
        title: 'Requirements for Apple Ads Integration',
        summary: 'You need an active Apple Ads account with admin access and a MobileAction Apple Ads CMP account to begin.',
        content: [
          { type: 'paragraph', text: 'Before starting the integration process, make sure all requirements are met — missing any one of them can cause setup issues.' },
          { type: 'subheading', text: 'Requirement details' },
          { type: 'list', items: [
            'Apple Ads account: you must have an active Apple Ads account with at least one campaign created.',
            'Admin role in Apple Ads: you must be an admin of the Apple Ads account you want to integrate. Non-admin connections may cause issues on Apple\'s side.',
            'Apple Ads CMP account: you must have a MobileAction Apple Ads CMP account — sign up via the SearchAds.com product and activate your account through the confirmation email.',
          ] },
          { type: 'paragraph', text: 'If you have multiple Apple Ads accounts, each one must be integrated separately.' },
        ],
      },
    ],
  },
  {
    title: 'Overview',
    articles: [
      {
        title: 'Overview',
        summary: 'A dashboard consolidating Apple Ads campaign performance and competitor activity in one place.',
        content: [
          { type: 'paragraph', text: 'Overview is a dashboard in MobileAction\'s Apple Ads Campaign Management Platform that consolidates your Apple Ads campaign performance and competitor activity in one place, surfacing the most important metrics, audience breakdowns, geographic data, and competitive signals at a glance.' },
          { type: 'subheading', text: 'Get started' },
          { type: 'paragraph', text: 'Navigate to Overview — find Overview in the sidebar, select your app, and set a date range to start reviewing your performance data.' },
          { type: 'subheading', text: 'Performance data' },
          { type: 'list', items: [
            'Performance metrics in Overview: what each metric means and how percentage changes are calculated.',
            'Demographic and device breakdown in Overview: how your selected metric is distributed across gender and device segments.',
            'Geographic breakdown in Overview: how performance is distributed across countries and regions.',
          ] },
          { type: 'subheading', text: 'Competitor data' },
          { type: 'paragraph', text: 'Competitor insights in Overview let you compare your Search Ads Performance Grade against competitors\' visibility scores and keyword activity.' },
          { type: 'subheading', text: 'Keywords and ad groups' },
          { type: 'paragraph', text: 'Top keywords and ad groups in Overview shows your ten highest-performing keywords and ad groups by spend, taps, or impressions.' },
        ],
      },
      {
        title: 'Navigate to Overview',
        summary: 'How to access the Overview dashboard, select an app to review, and adjust the date range.',
        content: [
          { type: 'subheading', text: 'Before you begin' },
          { type: 'list', items: [
            'An integrated Apple Ads account with MobileAction Campaign Management Platform is required.',
            'At least one campaign must exist in your Apple Ads account for the app to display in MobileAction CMP.',
          ] },
          { type: 'subheading', text: 'Open Overview' },
          { type: 'paragraph', text: 'Access your SearchAds.com account and locate Overview in the left sidebar, then click it to open the page.' },
          { type: 'subheading', text: 'Select your app' },
          { type: 'paragraph', text: 'Use the app selector at the top to pick which app you want to examine. Each app has its own separate Overview with its own performance data, grade, and competitor insights.' },
          { type: 'subheading', text: 'Set the date range' },
          { type: 'list', items: [
            'Last day: the most recent 24 hours of performance information.',
            'Last 7 days: the past week of performance information.',
            'Last 30 days: the past month of performance information.',
          ] },
          { type: 'paragraph', text: 'All sections on the Overview page update to reflect the selected date range, and percentage changes compare your chosen period against the equivalent previous period.' },
        ],
      },
    ],
  },
  {
    title: 'Ads Manager',
    articles: [
      {
        title: 'Ads Manager Overview',
        summary: 'Manage and monitor Apple Ads campaigns across multiple account levels, with campaign creation and bulk editing.',
        content: [
          { type: 'paragraph', text: 'Ads Manager is a campaign management and reporting tool that gives you a single place to monitor performance, analyze results, and manage your Apple Ads campaigns across every level of your account.' },
          { type: 'subheading', text: 'Get started' },
          { type: 'list', items: [
            'What is Ads Manager: what it is, how it\'s organized, and what you can do with it.',
            'How to view campaign layers in Ads Manager: how Campaign Groups, Apps, Campaigns, Ad Groups, Keywords, Search Terms, Ads, Custom Product Pages, and Negative Keywords are structured.',
            'Understand metrics in Ads Manager: definitions for every metric available, including ad performance, in-app conversion, cohort, and custom metrics.',
          ] },
          { type: 'subheading', text: 'Create campaigns and assets' },
          { type: 'list', items: [
            'Create a campaign in Ads Manager: set up a new campaign by selecting your app, ad placements, storefront, budget, and ad group settings.',
            'Create an ad group in Ads Manager: add a standalone ad group and configure targeting, bidding, audience, and creative settings.',
            'Add keywords to an ad group: select keywords from organic, paid, and ASO-tracked suggestions, or enter them manually.',
            'Add an ad in Ads Manager: create an ad from a custom product page and preview it across devices.',
            'Add negative keywords in Ads Manager: exclude search terms at the campaign or ad group level.',
          ] },
          { type: 'subheading', text: 'View and report' },
          { type: 'list', items: [
            'Customize and create custom table columns, save presets, and build calculated metrics with the formula builder.',
            'Understand the graph, use time selection, compare periods, and segment data with Group By.',
            'Build advanced and trend filters, save and reuse them, and check their eligibility and limitations.',
            'Build scheduled reports delivered by email or Slack, and track platform-level actions with Change History.',
          ] },
          { type: 'subheading', text: 'Edit and manage' },
          { type: 'list', items: [
            'Edit campaigns directly in Ads Manager, including inline budget updates.',
            'Use Quick Edit for fast updates across multiple rows, and bulk actions to apply changes at once.',
            'Manage AI Smart Bidding keyword settings, including freezing keywords and setting bid limits.',
          ] },
        ],
      },
      {
        title: 'What is Ads Manager',
        summary: 'A campaign management and reporting tool to monitor, analyze, and manage Apple Ads campaigns in one place.',
        content: [
          { type: 'paragraph', text: 'Ads Manager is the campaign management and reporting tool within the MobileAction platform. It lets you monitor, analyze, and manage Apple Ads campaigns across every level of your account, from campaign groups down to individual keywords, without switching between tools or tabs.' },
          { type: 'subheading', text: 'How Ads Manager is organized' },
          { type: 'paragraph', text: 'The Apple Ads account follows a layered structure reflected directly in Ads Manager — Campaign Groups, Apps, Campaigns, Ad Groups, Keywords, Search Terms, Ads, Custom Product Pages, and Negative Keywords. Each layer displays relevant metrics in table format, and performance graphs track metric trends with daily, weekly, or monthly views and side-by-side period comparisons.' },
          { type: 'subheading', text: 'What you can do in Ads Manager' },
          { type: 'paragraph', text: 'Monitor and report on performance — default displays include Spend, Impressions, Taps, Tap-through Rate, Installs, Conversion Rate, and Average CPA, with customizable and calculated columns, data segmentation, and scheduled reports.' },
          { type: 'paragraph', text: 'Edit and manage campaigns — any Apple Ads modification can happen directly in Ads Manager, using the edit wizard, inline updates, or bulk operations like Quick Edit and the Actions menu.' },
          { type: 'subheading', text: 'A note on automation and bidding' },
          { type: 'paragraph', text: 'Ads Manager integrates with Smart Bidding, Automations, and AI optimization tools elsewhere in the platform, giving you full visibility into what is running and what is not.' },
          { type: 'subheading', text: 'Who Ads Manager is for' },
          { type: 'paragraph', text: 'UA managers, app growth teams, and anyone managing Apple Ads campaigns at scale, whether handling small portfolios or hundreds across multiple storefronts.' },
        ],
      },
    ],
  },
  {
    title: 'Automations',
    articles: [
      {
        title: 'Automations Overview',
        summary: 'Set up rules that automatically monitor Apple Ads performance and execute actions without manual intervention.',
        content: [
          { type: 'paragraph', text: 'Automations lets you set up rules that monitor Apple Ads performance and execute actions automatically — an automation evaluates your conditions on schedule and acts when those conditions are met, instead of you tracking metrics manually.' },
          { type: 'subheading', text: 'Get started' },
          { type: 'paragraph', text: 'Learn the fundamental concepts of Automations, how they work, and what you need before building your first one.' },
          { type: 'subheading', text: 'Set up' },
          { type: 'list', items: [
            'Start with pre-built setups aligned with common Apple Ads objectives.',
            'Build custom rules by selecting the level, conditions, actions, and schedule.',
            'Define monitoring parameters through metrics, comparisons, and lookback windows.',
            'Select automation actions and set evaluation timing and action frequency.',
          ] },
          { type: 'subheading', text: 'Manage' },
          { type: 'paragraph', text: 'Modify automation status, assign labels, edit, duplicate, or remove automations — including batch operations for handling multiple automations at once. Review log entries to understand activity, skipped actions, or errors.' },
          { type: 'subheading', text: 'Understand' },
          { type: 'paragraph', text: 'Explore how automations assess conditions, use current data, handle paused entities, and integrate with Smart Bidding and Budget Allocation.' },
          { type: 'subheading', text: 'Fix issues' },
          { type: 'paragraph', text: 'Guidance for common problems like automations failing to trigger, data inconsistencies, or Warning and Error log entries.' },
        ],
      },
      {
        title: 'How to create an automation',
        summary: 'Use pre-built templates for common goals, or build custom rules with full control over conditions and actions.',
        content: [
          { type: 'paragraph', text: 'The platform offers two approaches for setting up automations, depending on the level of control you need.' },
          { type: 'subheading', text: '1. Create an automation using templates' },
          { type: 'paragraph', text: 'Start with a pre-built setup designed for common Apple Ads goals — templates accelerate setup by offering a pre-configured rule structure.' },
          { type: 'subheading', text: '2. Create an automation from scratch' },
          { type: 'paragraph', text: 'Build custom rules with complete control by configuring each component individually:' },
          { type: 'list', items: [
            'Set conditions for an automation — define what gets monitored by selecting metrics, comparisons, and lookback windows.',
            'Add actions to an automation — specify what happens when conditions are met.',
            'Set the schedule for an automation — determine when the rule is evaluated and how often actions run.',
          ] },
        ],
      },
    ],
  },
  {
    title: 'CPP A/B Testing',
    articles: [
      {
        title: 'Introduction to CPP A/B Testing',
        summary: 'An overview of automated A/B experiments across custom product page variants with statistically reliable results.',
        content: [
          { type: 'paragraph', text: 'CPP A/B Testing is a feature that lets you run experiments across multiple Apple Ads custom product page variants and ad groups with minimal manual effort — the platform automates experiment setup and monitoring, reducing time spent and errors from manual testing.' },
          { type: 'subheading', text: 'Get started' },
          { type: 'paragraph', text: 'The foundational articles cover what CPP A/B Testing does and the system\'s automated functions, plus the requirements and constraints that affect how you configure a test.' },
          { type: 'subheading', text: 'Choose a test setup' },
          { type: 'paragraph', text: 'Two methodologies are available — Parallel tests run variants simultaneously with optional traffic stabilization, and Switch tests rotate between variants at scheduled intervals, with Ad Switch and Ad Group Switch options.' },
          { type: 'subheading', text: 'Create and run tests' },
          { type: 'paragraph', text: 'You can set up four test types — multiple ad group Parallel tests, single ad group Parallel tests, Ad Group Switch tests, and Ad Switch tests — each supporting up to four variants depending on the structure.' },
          { type: 'subheading', text: 'Test duration and switching logic' },
          { type: 'paragraph', text: 'The system calculates test duration from conversion rates, confidence levels, desired precision, and expected taps. Switch periods (hourly, daily, or weekly) are determined by minimum traffic thresholds and fluctuation analysis.' },
          { type: 'subheading', text: 'Monitor and interpret results' },
          { type: 'paragraph', text: 'The CPP A/B Testing dashboard gives visibility into experiment performance through tables, charts, and activity logs.' },
          { type: 'subheading', text: 'Keep tests healthy and fix issues' },
          { type: 'paragraph', text: 'Guidance to help maintain experiment stability and statistical validity throughout the testing period.' },
        ],
      },
      {
        title: 'About CPP A/B Testing',
        summary: 'How CPP A/B Testing automates comparing Apple Ads custom product pages to identify top-performing variants.',
        content: [
          { type: 'paragraph', text: 'CPP A/B Testing helps you compare Apple Ads custom product pages and see which variant performs best.' },
          { type: 'paragraph', text: 'This article explains what CPP A/B Testing does and what the system automates from setup to monitoring. If you want to set up a test now, see your test setup options. If you\'d rather check what you can test and the key constraints first, see the requirements and limits.' },
          { type: 'subheading', text: 'How CPP A/B Testing works' },
          { type: 'paragraph', text: 'A typical test includes these steps:' },
          { type: 'list', items: [
            'Choose the test setup you need (for example, testing multiple custom product pages within one ad group or testing multiple ad groups with a single product page).',
            'You choose a test setup (Parallel or Switch).',
            'You select your desired precision (margin of error, 1%–10%). The system uses a 90% confidence standard.',
            'The system calculates the test duration (and, for Switch tests, the switching schedule) based on the original ad group\'s recent traffic and fluctuations.',
            'You monitor performance and confidence signals in the dashboard.',
          ] },
          { type: 'subheading', text: 'What CPP A/B Testing does' },
          { type: 'paragraph', text: 'CPP A/B Testing automates the main parts of the workflow:' },
          { type: 'subheading', text: 'Setup automation' },
          { type: 'list', items: [
            'The platform duplicates the selected ad group or ad automatically based on the chosen test method.',
            'You can run tests with 2–4 custom product pages (including the default product page if desired).',
            'Test duration and switch intervals (hourly, daily, weekly) are automatically calculated according to your selected desired precision (1%–10%).',
          ] },
          { type: 'subheading', text: 'Traffic handling' },
          { type: 'list', items: [
            'Parallel method: keeps variants live simultaneously in the same timeframe.',
            'Stabilize Traffic (Parallel tests): if one variant starts receiving disproportionately high traffic, it can be temporarily paused so others can catch up.',
            'Switch method: shows only one variant at a time, using switching periods designed to neutralize seasonality effects.',
          ] },
          { type: 'subheading', text: 'Duration estimation' },
          { type: 'list', items: [
            'Uses the selected ad group\'s last 28-day traffic as a benchmark.',
            'Uses your selected desired precision (1%–10%) and the fixed 90% confidence standard to calculate test duration.',
          ] },
          { type: 'subheading', text: 'Safe test environment and reversibility' },
          { type: 'list', items: [
            'During the test, the original ad group is paused, ensuring no outside influence affects the experiment.',
            'Automations, Smart Bidding, and Budget Allocation actions are automatically disabled for test entities to preserve data accuracy.',
            'If the users do not want their strategies to be inactivated during the test, they can select a different method that covers that case.',
          ] },
          { type: 'subheading', text: 'What CPP A/B Testing helps you decide' },
          { type: 'paragraph', text: 'CPP A/B Testing is designed to help you compare variants and decide which product page or ad group performs best, based on metrics and confidence signals in a controlled environment.' },
          { type: 'paragraph', text: 'If no variant clearly outperforms the others, you can still review metrics such as impressions, conversion rate, and tap-through rate to choose the most promising option. A "no significant difference" result means the tested variants are likely to perform similarly over time.' },
        ],
      },
    ],
  },
  {
    title: 'AI Keyword Planner',
    articles: [
      {
        title: 'AI Keyword Planner Overview',
        summary: 'Discover, evaluate, and integrate keywords into Apple Ads campaigns through a unified workflow.',
        content: [
          { type: 'paragraph', text: 'AI Keyword Planner helps you find, evaluate, and add keywords to your Apple Ads campaigns, bringing keyword discovery and campaign management into a single workflow.' },
          { type: 'subheading', text: 'Get started' },
          { type: 'list', items: [
            'About AI Keyword Planner: what it does and how the discovery process works.',
            'Requirements and limits for AI Keyword Planner: what you need before you start and the key limits that affect the tool.',
          ] },
          { type: 'subheading', text: 'Discover keywords' },
          { type: 'list', items: [
            'Discover keywords by app: generate recommendations based on a specific app and country.',
            'Discover keywords by keyword: enter seed keywords to find related opportunities.',
          ] },
          { type: 'subheading', text: 'Save and manage keywords' },
          { type: 'list', items: [
            'Save keywords from your recommendation results to a keyword list.',
            'Manage your saved keyword lists — edit names, delete lists, and switch between them.',
          ] },
          { type: 'subheading', text: 'Add keywords to campaigns' },
          { type: 'list', items: [
            'Add keywords to an ad group as targeted keywords for search results.',
            'Add keywords as negative keywords at the campaign or ad group level.',
          ] },
          { type: 'subheading', text: 'Download keywords' },
          { type: 'paragraph', text: 'Export selected keywords and their metrics as a CSV file.' },
        ],
      },
      {
        title: 'Requirements and limits for AI Keyword Planner',
        summary: 'Requires an active Apple Ads integration; discovery is limited to one storefront per session with up to 300 keyword recommendations.',
        content: [
          { type: 'subheading', text: 'Apple Ads integration' },
          { type: 'paragraph', text: 'The tool requires an active Apple Ads integration — if your account lacks this connection, you\'ll be prompted to complete it first.' },
          { type: 'subheading', text: 'Access levels' },
          { type: 'list', items: [
            'Read-only access: discover, view, save, and download keywords, but cannot add them to campaigns or ad groups.',
            'Read & Write access: full functionality, including adding keywords and negative keywords to campaigns.',
          ] },
          { type: 'subheading', text: 'Discovery limits' },
          { type: 'paragraph', text: 'Storefront selection is limited to one storefront per discovery, app-focused discovery is restricted to your own apps, and you can enter up to 10 seed keywords per session for up to 300 recommendations.' },
          { type: 'subheading', text: 'Keyword action limits' },
          { type: 'paragraph', text: 'You can select up to 30 keywords at a time for Add to Ad Group and Add as Negative Keyword. Keywords go to a single ad group per operation; negative keywords can be added to up to 5 campaigns or 5 ad groups per operation. Only search results campaigns are supported.' },
          { type: 'subheading', text: 'Saved keyword limits' },
          { type: 'paragraph', text: 'Each saved keyword list can hold up to 1,000 keywords. Lists are tied to specific input pairs and cannot be merged, and duplicates are automatically skipped.' },
          { type: 'subheading', text: 'Session behavior' },
          { type: 'paragraph', text: 'Leaving the page, refreshing, navigating away, closing the tab, or logging out resets the current session — unsaved inputs and results clear, though previously saved keywords remain unaffected.' },
          { type: 'subheading', text: 'Campaign Group context' },
          { type: 'paragraph', text: 'Keyword actions stay scoped to the selected Campaign Group. Switching groups during an active session resets the workflow.' },
        ],
      },
    ],
  },
  {
    title: 'AI Smart Bidding',
    articles: [
      {
        title: 'AI Smart Bidding Overview',
        summary: 'Automatically adjusts keyword bids to optimize toward CPI, CPA, cost per goal, ROAS, or impression share.',
        content: [
          { type: 'paragraph', text: 'AI Smart Bidding helps you keep keyword bids aligned with the targets that matter for your Apple Ads campaigns — optimize toward CPI, CPA, cost per goal, ROAS, or impression share from a single page.' },
          { type: 'subheading', text: 'Choose what you want to do' },
          { type: 'list', items: [
            'Learn: understand what AI Smart Bidding does, where it applies, and which strategy fits your goal.',
            'Set up: create a setup, choose a target strategy, select the applied level, and enter your target value.',
            'Manage: filter, edit, export, update target values, and control setup status from the table.',
            'Monitor: open a setup\'s performance view and logs to see how results are trending.',
            'Fix or optimize: review best practices and optimization tips for your setups.',
          ] },
        ],
      },
      {
        title: 'About AI Smart Bidding',
        summary: 'Keeps keyword bids aligned with your campaign goals by automatically adjusting bids based on selected performance metrics.',
        content: [
          { type: 'paragraph', text: 'AI Smart Bidding helps Apple Ads campaign managers keep keyword bids aligned with their campaign goals. You select a target strategy, enter target values, and manage settings from a single page.' },
          { type: 'subheading', text: 'What AI Smart Bidding can optimize for' },
          { type: 'list', items: [
            'Target CPI: keeps cost per install aligned using MMP-attributed data.',
            'Target CPA: keeps cost per acquisition aligned using Apple Ads download data, no MMP required.',
            'Target CPG: optimizes toward post-install goals like registrations or purchases.',
            'Target ROAS: optimizes revenue return across supported windows (D1, D7, D14, D30, D60).',
            'Target Impression Share: protects brand visibility with daily impression share targets.',
          ] },
          { type: 'subheading', text: 'Where AI Smart Bidding applies' },
          { type: 'paragraph', text: 'Works on single or multiple campaigns and ad groups across multiple countries, but only on campaigns and ad groups running search results ads.' },
          { type: 'subheading', text: 'How AI Smart Bidding works' },
          { type: 'paragraph', text: 'Create a setup by entering a name, selecting a strategy, choosing the application level, selecting campaigns or ad groups, entering target values, and saving. Optional minimum and maximum bid limits constrain optimization within a set range.' },
          { type: 'subheading', text: 'Before you begin' },
          { type: 'paragraph', text: 'You need access to AI Smart Bidding through your MobileAction CMP plan, must use search results ads exclusively, and selected campaigns need sufficient recent performance data.' },
        ],
      },
    ],
  },
  {
    title: 'Budget Allocation',
    articles: [
      {
        title: 'Budget Allocation Overview',
        summary: 'Maximize budget usage without overspending through steady pacing and budget oversight.',
        content: [
          { type: 'paragraph', text: 'Budget Allocation helps you maximize budget usage without overspending. It\'s available once your account is connected to the Apple Ads API, and it\'s designed for steady pacing and budget oversight.' },
          { type: 'subheading', text: 'Get started' },
          { type: 'list', items: [
            'Set up a budget allocation group: create a new group, select campaigns, and choose a cap type.',
            'Monitor and manage budget allocation groups: review groups, check key metrics, and follow performance trends.',
            'Plan budgets with Budget Scheduler: set different daily budgets for specific days or date ranges.',
          ] },
        ],
      },
      {
        title: 'Set up a budget allocation group',
        summary: 'How to create a budget allocation group to distribute campaign budgets using daily or monthly spending caps.',
        content: [
          { type: 'paragraph', text: 'Budget Allocation distributes budget across selected campaigns based on performance. It\'s available once your account is connected to the Apple Ads API.' },
          { type: 'subheading', text: 'Create a budget allocation group' },
          { type: 'list', items: [
            'Go to Co-pilot > Budget Allocation in the left menu, then click Create.',
            'Choose the campaign group you want to work with, then click Apply.',
            'Choose the campaigns you want to include, then click Apply.',
            'Enter the daily budget.',
            'Choose a cap type — daily cap or monthly cap.',
            'Click Create.',
          ] },
          { type: 'subheading', text: 'Choose a cap type' },
          { type: 'paragraph', text: 'Daily Cap matches the daily spend to your daily budget — the algorithm may pause some campaigns and reactivate them the next day to manage the budget without exceeding daily limits.' },
          { type: 'paragraph', text: 'Monthly Cap lets daily spend average out to approximately the daily budget over a calendar month, maintaining consistent expenditure without exceeding monthly limits.' },
          { type: 'subheading', text: 'After you create it' },
          { type: 'paragraph', text: 'The tool begins distributing your budget based on campaign performance. Campaigns typically start producing results close to their set capacity within the first 7 days. Check the dashboard to review last day\'s spend, installs, and average CPA for each group.' },
        ],
      },
    ],
  },
  {
    title: 'Benchmarks',
    articles: [
      {
        title: 'Benchmarks Overview',
        summary: 'Evaluate your Apple Ads performance against industry standards across countries, categories, and ad placements.',
        content: [
          { type: 'paragraph', text: 'Benchmarks lets you compare your Apple Ads performance against industry standards across countries, categories, and ad placements — understand where your campaigns stand, identify areas that need attention, and set realistic targets.' },
          { type: 'subheading', text: 'Understand benchmarks' },
          { type: 'paragraph', text: 'About Benchmarks explains what the tool is, what the four core metrics mean, and why industry benchmarks matter for optimization.' },
          { type: 'subheading', text: 'Use the tool' },
          { type: 'list', items: [
            'Navigate to Benchmarks and apply filters by country, category, ad placement, and date range.',
            'Read the dashboard — the world map, AI-generated metrics summary, trend chart, and category tables.',
          ] },
          { type: 'subheading', text: 'Apply the data' },
          { type: 'paragraph', text: 'Best practices cover ongoing performance monitoring, detecting underperforming areas for experimentation, and competitive comparison.' },
        ],
      },
      {
        title: 'About Benchmarks',
        summary: 'Compare your campaign performance against aggregated industry data to identify optimization opportunities.',
        content: [
          { type: 'paragraph', text: 'Benchmarks shows how Apple Ads performance metrics function across the broader industry, letting you measure your results against aggregated data from various categories, countries, and ad placements to identify genuine improvement opportunities.' },
          { type: 'subheading', text: 'Why benchmarks matter' },
          { type: 'paragraph', text: 'Apple Ads performance differs substantially by category, country, and ad placement — without external context, it\'s hard to know if a campaign is genuinely underperforming or operating within expected market conditions.' },
          { type: 'list', items: [
            'Create achievable campaign targets based on category performance standards.',
            'Identify performance gaps versus market averages to direct optimization.',
            'Track market-level trends over time instead of reacting after the fact.',
            'Assess your performance relative to the competitive landscape without needing individual competitor data.',
          ] },
          { type: 'subheading', text: 'The four core metrics' },
          { type: 'list', items: [
            'Cost Per Acquisition (CPA): the average cost to acquire an install, reflecting overall campaign efficiency.',
            'Cost Per Tap (CPT): the average cost per ad tap, showing auction competitiveness.',
            'Conversion Rate (CR): the percentage of ad tappers who install, showing ad-to-product alignment.',
            'Tap-Through Rate (TTR): the percentage of impressions that result in a tap.',
          ] },
          { type: 'subheading', text: 'What Benchmarks does not show' },
          { type: 'paragraph', text: 'Benchmarks shows aggregated industry data, not individual competitor metrics, and covers upper-funnel metrics only — post-install events, retention, and ROAS require MMP integration and appear elsewhere in the platform.' },
        ],
      },
    ],
  },
  {
    title: 'MMP Integration',
    articles: [
      {
        title: 'MMP Integration',
        summary: 'A Mobile Measurement Partner acts as a neutral attribution layer for tracking post-install events alongside Apple Ads data.',
        content: [
          { type: 'paragraph', text: 'A Mobile Measurement Partner (MMP) is a third-party platform that acts as a neutral attribution layer for marketing data. Connecting an MMP lets you track post-install events like purchases, sign-ups, and subscriptions alongside Apple Ads campaign data for unified visibility into user quality and profitability.' },
          { type: 'subheading', text: 'Understand MMPs' },
          { type: 'list', items: [
            'About MMP Integration: what an MMP is and what becomes possible once connected.',
            'How MMP attribution works: the full journey from ad exposure to post-install event linkage.',
            'Attribution methods — SANs and platform frameworks: how ad networks share attribution data.',
          ] },
          { type: 'subheading', text: 'Connect your MMP' },
          { type: 'paragraph', text: 'Start integration from the Goals page and follow setup instructions for your specific MMP — Adjust, AppsFlyer, Kochava, Tenjin, Singular, or Airbridge.' },
          { type: 'subheading', text: 'After you connect' },
          { type: 'list', items: [
            'Create and monitor your Goals — define the in-app events that matter most for your app.',
            'MMP integration statuses: Pending First Event, No Recent Event, Create First Goal, and Integrated.',
            'Why you can\'t see previous attribution data before your integration date.',
          ] },
          { type: 'subheading', text: 'Manage your MMP' },
          { type: 'paragraph', text: 'Change your MMP using a three-step process to switch providers while keeping your Apple Ads campaign data intact.' },
          { type: 'subheading', text: 'Understand discrepancies' },
          { type: 'list', items: [
            'Why MMP and Apple Ads numbers can differ — attribution windows, attribution models, and ATT.',
            'Monitor Apple vs. MMP install gaps with the MMP Discrepancy Dashboard.',
          ] },
        ],
      },
      {
        title: 'About MMP Integration',
        summary: 'An MMP independently verifies where your app installs come from and tracks in-app user behavior after install.',
        content: [
          { type: 'paragraph', text: 'A Mobile Measurement Partner independently verifies where your app installs come from and tracks what users do inside your app after install. Connecting one unifies your Apple Ads data with post-install event data, so you can measure the true quality and return of your campaigns, not just install volume.' },
          { type: 'subheading', text: 'The problem MMPs solve' },
          { type: 'paragraph', text: 'As mobile advertising grew to include many networks, every network could claim credit for the same install, making it hard to know where spend was actually working — and without in-app event data, optimization is limited to install volume alone. MMPs solve both problems with a centralized, independent attribution layer.' },
          { type: 'subheading', text: 'What MMPs help you answer' },
          { type: 'list', items: [
            'Where did the install come from — which channel, campaign, ad group, keyword, or creative drove it.',
            'What did the user do after installing — purchases, sign-ups, subscriptions, or level completions.',
          ] },
          { type: 'subheading', text: 'Core MMP functions' },
          { type: 'list', items: [
            'Segmenting event sources by ad source in a single dashboard.',
            'Handling duplications so only one network gets credit for an install.',
            'Post-install event tracking attributed back to the original ad source.',
            'Quality measurement to calculate true ROAS, not just install counts.',
            'Fraud prevention by verifying attribution claims before they\'re included in reports.',
          ] },
          { type: 'subheading', text: 'Supported MMPs' },
          { type: 'paragraph', text: 'Adjust, AppsFlyer, Kochava, Tenjin, Singular, and Airbridge.' },
        ],
      },
    ],
  },
];

function BackArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M8.5 2.5L3.5 7l5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArticleContent({ content }: { content: ArticleBlock[] }) {
  return (
    <div className="space-y-4">
      {content.map((block, i) => {
        if (block.type === 'subheading') {
          return <h3 key={i} className="text-sm font-semibold text-gray-900 pt-1">{block.text}</h3>;
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5">
              {block.items.map((item, j) => (
                <li key={j} className="text-sm text-gray-600">{item}</li>
              ))}
            </ul>
          );
        }
        return <p key={i} className="text-sm text-gray-600">{block.text}</p>;
      })}
    </div>
  );
}

function ArticleRow({ article, onOpen }: { article: HelpArticle; onOpen: (a: HelpArticle) => void }) {
  return (
    <button
      onClick={() => onOpen(article)}
      className="block w-full px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
    >
      <div className="text-sm font-medium text-blue-700">{article.title}</div>
      <div className="text-xs text-gray-500 mt-0.5">{article.summary}</div>
    </button>
  );
}

export default function HelpDrawer({ onClose }: HelpDrawerProps) {
  const [search, setSearch] = useState('');
  const [activeWidget, setActiveWidget] = useState<HelpWidget | null>(null);
  const [openArticle, setOpenArticle] = useState<HelpArticle | null>(null);

  const term = search.trim().toLowerCase();
  const isSearching = term.length > 0;

  const searchResults = isSearching
    ? widgets.flatMap(widget =>
        widget.articles
          .filter(a => a.title.toLowerCase().includes(term) || a.summary.toLowerCase().includes(term) || widget.title.toLowerCase().includes(term))
          .map(article => ({ article, widget }))
      )
    : [];

  const openFromSearch = (article: HelpArticle, widget: HelpWidget) => {
    setActiveWidget(widget);
    setOpenArticle(article);
  };

  const handleBack = () => {
    if (openArticle) setOpenArticle(null);
    else if (activeWidget) setActiveWidget(null);
  };

  return (
    <div className="w-96 h-screen shrink-0 sticky top-0 overflow-hidden bg-white border-l border-gray-200 flex flex-col">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100 shrink-0">
        {(openArticle || activeWidget) && (
          <button
            onClick={handleBack}
            className="p-1.5 -ml-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors shrink-0"
          >
            <BackArrowIcon />
          </button>
        )}
        <h2 className="text-lg font-semibold text-gray-900 truncate flex-1">
          {openArticle ? openArticle.title : activeWidget ? activeWidget.title : 'Quick Help'}
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors shrink-0"
        >
          <XIcon />
        </button>
      </div>

      {openArticle ? (
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <ArticleContent content={openArticle.content} />
        </div>
      ) : activeWidget ? (
        <div className="flex-1 overflow-y-auto px-5 py-2">
          <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
            {activeWidget.articles.map(article => (
              <ArticleRow key={article.title} article={article} onOpen={setOpenArticle} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="px-5 pt-4 pb-2 shrink-0">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
              <SearchIcon className="text-gray-400 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search help articles..."
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

          {isSearching ? (
            <div className="flex-1 overflow-y-auto px-5 py-2">
              {searchResults.length === 0 ? (
                <div className="px-1 py-6 text-sm text-gray-400 text-center">No articles found</div>
              ) : (
                <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                  {searchResults.map(({ article, widget }) => (
                    <ArticleRow key={article.title} article={article} onOpen={a => openFromSearch(a, widget)} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center text-center px-5 pt-2 pb-4 shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center mb-3">
                  <QuestionIcon className="w-6 h-6 text-violet-600" />
                </div>
                <p className="text-sm text-gray-500 max-w-[260px]">
                  Welcome to MobileAction's Help Desk. Browse a topic below or search to find what you need.
                </p>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-2">
                <div className="grid grid-cols-2 gap-3">
                  {widgets.map(widget => (
                    <button
                      key={widget.title}
                      onClick={() => setActiveWidget(widget)}
                      className="aspect-square rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-center text-center p-3"
                    >
                      <span className="text-sm font-medium text-gray-800">{widget.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
