import { useState } from 'react';
import { SearchIcon, XIcon, ChevronDownIcon, ChevronUpIcon } from './icons';

interface HelpDrawerProps {
  onClose: () => void;
}

interface HelpArticle {
  title: string;
  summary: string;
  url: string;
  inline?: boolean; // opens within the drawer instead of linking out
}

interface HelpWidget {
  title: string;
  articles: HelpArticle[];
}

type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: string[] };

const cppAbTestingContent: ArticleBlock[] = [
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
];

const widgets: HelpWidget[] = [
  {
    title: 'Apple Ads Integration',
    articles: [
      {
        title: 'Apple Ads Integration Overview',
        summary: 'MobileAction connects directly to Apple Ads accounts to provide a unified workspace for managing campaigns.',
        url: 'https://helpcenter.mobileaction.co/en/apple-ads-integration-overview',
      },
      {
        title: 'Requirements for Apple Ads Integration',
        summary: 'You need an active Apple Ads account with admin access and a MobileAction Apple Ads CMP account to begin.',
        url: 'http://helpcenter.mobileaction.co/en/requirements-for-apple-ads-integration',
      },
    ],
  },
  {
    title: 'Overview',
    articles: [
      {
        title: 'Overview',
        summary: 'A dashboard consolidating Apple Ads campaign performance and competitor activity in one place.',
        url: 'https://helpcenter.mobileaction.co/en/overview-apple-ads-cmp',
      },
      {
        title: 'Navigate to Overview',
        summary: 'How to access the Overview dashboard, select an app to review, and adjust the date range.',
        url: 'https://helpcenter.mobileaction.co/en/navigate-to-overview',
      },
    ],
  },
  {
    title: 'Ads Manager',
    articles: [
      {
        title: 'Ads Manager Overview',
        summary: 'Manage and monitor Apple Ads campaigns across multiple account levels, with campaign creation and bulk editing.',
        url: 'https://helpcenter.mobileaction.co/en/ads-manager-overview',
      },
      {
        title: 'What is Ads Manager',
        summary: 'A campaign management and reporting tool to monitor, analyze, and manage Apple Ads campaigns in one place.',
        url: 'https://helpcenter.mobileaction.co/en/what-is-ads-manager',
      },
    ],
  },
  {
    title: 'Automations',
    articles: [
      {
        title: 'Automations Overview',
        summary: 'Set up rules that automatically monitor Apple Ads performance and execute actions without manual intervention.',
        url: 'https://helpcenter.mobileaction.co/en/automations-overview',
      },
      {
        title: 'How to create an automation',
        summary: 'Use pre-built templates for common goals, or build custom rules with full control over conditions and actions.',
        url: 'https://helpcenter.mobileaction.co/en/how-to-create-an-automation',
      },
    ],
  },
  {
    title: 'CPP A/B Testing',
    articles: [
      {
        title: 'Introduction to CPP A/B Testing',
        summary: 'An overview of automated A/B experiments across custom product page variants with statistically reliable results.',
        url: 'https://helpcenter.mobileaction.co/en/introduction-to-cpp-a-b-testing',
      },
      {
        title: 'About CPP A/B Testing',
        summary: 'How CPP A/B Testing automates comparing Apple Ads custom product pages to identify top-performing variants.',
        url: 'https://helpcenter.mobileaction.co/en/about-cpp-a-b-testing',
        inline: true,
      },
    ],
  },
  {
    title: 'AI Keyword Planner',
    articles: [
      {
        title: 'AI Keyword Planner Overview',
        summary: 'Discover, evaluate, and integrate keywords into Apple Ads campaigns through a unified workflow.',
        url: 'https://helpcenter.mobileaction.co/en/ai-keyword-planner-overview',
      },
      {
        title: 'Requirements and limits for AI Keyword Planner',
        summary: 'Requires an active Apple Ads integration; discovery is limited to one storefront per session with up to 300 keyword recommendations.',
        url: 'https://helpcenter.mobileaction.co/en/requirements-and-limits-for-ai-keyword-planner',
      },
    ],
  },
  {
    title: 'AI Smart Bidding',
    articles: [
      {
        title: 'AI Smart Bidding Overview',
        summary: 'Automatically adjusts keyword bids to optimize toward CPI, CPA, cost per goal, ROAS, or impression share.',
        url: 'https://helpcenter.mobileaction.co/en/ai-smart-bidding-overview',
      },
      {
        title: 'About AI Smart Bidding',
        summary: 'Keeps keyword bids aligned with your campaign goals by automatically adjusting bids based on selected performance metrics.',
        url: 'https://helpcenter.mobileaction.co/en/about-ai-smart-bidding',
      },
    ],
  },
  {
    title: 'Budget Allocation',
    articles: [
      {
        title: 'Budget Allocation Overview',
        summary: 'Maximize budget usage without overspending through steady pacing and budget oversight.',
        url: 'https://helpcenter.mobileaction.co/en/budget-allocation-overview',
      },
      {
        title: 'Set up a budget allocation group',
        summary: 'How to create a budget allocation group to distribute campaign budgets using daily or monthly spending caps.',
        url: 'https://helpcenter.mobileaction.co/en/set-up-a-budget-allocation-group',
      },
    ],
  },
  {
    title: 'Benchmarks',
    articles: [
      {
        title: 'Benchmarks Overview',
        summary: 'Evaluate your Apple Ads performance against industry standards across countries, categories, and ad placements.',
        url: 'https://helpcenter.mobileaction.co/en/benchmarks-apple-ads',
      },
      {
        title: 'About Benchmarks',
        summary: 'Compare your campaign performance against aggregated industry data to identify optimization opportunities.',
        url: 'https://helpcenter.mobileaction.co/en/about-benchmarks',
      },
    ],
  },
  {
    title: 'MMP Integration',
    articles: [
      {
        title: 'MMP Integration',
        summary: 'A Mobile Measurement Partner acts as a neutral attribution layer for tracking post-install events alongside Apple Ads data.',
        url: 'https://helpcenter.mobileaction.co/en/mmp-integration',
      },
      {
        title: 'About MMP Integration',
        summary: 'An MMP independently verifies where your app installs come from and tracks in-app user behavior after install.',
        url: 'https://helpcenter.mobileaction.co/en/about-mmp-integration',
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

function ExternalLinkIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M4.5 1.5h6v6M10.5 1.5l-6 6M5 1.5H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HelpDrawer({ onClose }: HelpDrawerProps) {
  const [search, setSearch] = useState('');
  const [openWidgets, setOpenWidgets] = useState<Set<string>>(new Set());
  const [openArticle, setOpenArticle] = useState<HelpArticle | null>(null);

  const toggleWidget = (title: string) =>
    setOpenWidgets(prev => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });

  const term = search.trim().toLowerCase();
  const isSearching = term.length > 0;

  const visibleWidgets = widgets
    .map(widget => {
      if (!isSearching) {
        return { ...widget, displayArticles: widget.articles, expanded: openWidgets.has(widget.title), matched: true };
      }
      const matchingArticles = widget.articles.filter(
        a => a.title.toLowerCase().includes(term) || a.summary.toLowerCase().includes(term)
      );
      const titleMatches = widget.title.toLowerCase().includes(term);
      const matched = titleMatches || matchingArticles.length > 0;
      return {
        ...widget,
        displayArticles: matchingArticles.length > 0 ? matchingArticles : widget.articles,
        expanded: matched,
        matched,
      };
    })
    .filter(widget => widget.matched);

  return (
    <div className="w-96 shrink-0 bg-white border-l border-gray-200 flex flex-col">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        {openArticle && (
          <button
            onClick={() => setOpenArticle(null)}
            className="p-1.5 -ml-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors shrink-0"
          >
            <BackArrowIcon />
          </button>
        )}
        <h2 className="text-lg font-semibold text-gray-900 truncate flex-1">
          {openArticle ? openArticle.title : 'Quick Help'}
        </h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors shrink-0"
        >
          <XIcon />
        </button>
      </div>

      {openArticle ? (
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cppAbTestingContent.map((block, i) => {
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
      ) : (
        <>
          <div className="px-5 pt-4 pb-2">
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

          <p className="px-5 pb-3 text-sm text-gray-500">
            Welcome to MobileAction's Help Desk. Browse a topic below or search to find what you need.
          </p>

          <div className="flex-1 overflow-y-auto px-5 py-2">
            {visibleWidgets.length === 0 ? (
              <div className="px-1 py-6 text-sm text-gray-400 text-center">No articles found</div>
            ) : (
              <div className="space-y-2">
                {visibleWidgets.map(widget => (
                  <div key={widget.title} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => !isSearching && toggleWidget(widget.title)}
                      className="flex items-center justify-between w-full px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <span className="text-sm font-medium text-gray-800">{widget.title}</span>
                      {widget.expanded ? <ChevronUpIcon className="text-gray-400" /> : <ChevronDownIcon className="text-gray-400" />}
                    </button>

                    {widget.expanded && (
                      <div className="divide-y divide-gray-100">
                        {widget.displayArticles.map(article =>
                          article.inline ? (
                            <button
                              key={article.url}
                              onClick={() => setOpenArticle(article)}
                              className="block w-full px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                            >
                              <div className="text-sm font-medium text-blue-700">{article.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{article.summary}</div>
                            </button>
                          ) : (
                            <a
                              key={article.url}
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-3 py-2.5 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-1.5 text-sm font-medium text-blue-700">
                                <span>{article.title}</span>
                                <ExternalLinkIcon className="text-blue-400 shrink-0" />
                              </div>
                              <div className="text-xs text-gray-500 mt-0.5">{article.summary}</div>
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
