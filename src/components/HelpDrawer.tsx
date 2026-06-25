import { useState } from 'react';
import { SearchIcon, XIcon } from './icons';

interface HelpDrawerProps {
  onClose: () => void;
}

interface HelpArticle {
  title: string;
  summary: string;
  url: string;
  inline?: boolean; // opens within the drawer instead of linking out
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

const articles: HelpArticle[] = [
  {
    title: 'About CPP A/B Testing',
    summary: 'How MobileAction\'s CPP A/B Testing feature automates comparing Apple Ads custom product pages to identify top-performing variants.',
    url: 'https://helpcenter.mobileaction.co/en/about-cpp-a-b-testing',
    inline: true,
  },
  {
    title: 'What are the requirements and limits for CPP A/B Testing',
    summary: 'Prerequisites for running CPP A/B tests, including 28 days of performance data, supported test configurations, precision ranges, confidence levels, and traffic thresholds.',
    url: 'https://helpcenter.mobileaction.co/en/what-are-the-requirements-and-limits-for-cpp-a-b-testing?hsLang=en',
  },
  {
    title: 'Test setup options in CPP A/B Testing',
    summary: 'Comparing the four test setup methods — Parallel (single or multiple ad groups) and Switch (ad group or ad level) — to help you choose the right one.',
    url: 'https://helpcenter.mobileaction.co/en/test-setup-options-in-cpp-a-b-testing?hsLang=en',
  },
  {
    title: 'Test creation in CPP A/B Testing',
    summary: 'How to set up product page tests using Parallel tests (multiple or single ad group) and Switch tests (ad group or ad-based rotation).',
    url: 'https://helpcenter.mobileaction.co/en/test-creation-in-cpp-a-b-testing?hsLang=en',
  },
  {
    title: 'How do you monitor and interpret tests in CPP A/B Testing',
    summary: 'Viewing test performance metrics in table and chart formats, interpreting confidence level badges, and accessing test event logs from the dashboard.',
    url: 'https://helpcenter.mobileaction.co/en/how-to-monitor-cpp-a-b-tests-in-the-dashboard?hsLang=en',
  },
  {
    title: 'Test health and issue management in CPP A/B Testing',
    summary: 'How to keep CPP A/B tests healthy by avoiding bid or budget changes, managing traffic fluctuations, and shortening test duration when needed.',
    url: 'https://helpcenter.mobileaction.co/en/keep-cpp-a-b-tests-healthy-and-fix-issues?hsLang=en',
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
  const [openArticle, setOpenArticle] = useState<HelpArticle | null>(null);

  const filtered = articles.filter(a => {
    const term = search.toLowerCase();
    return a.title.toLowerCase().includes(term) || a.summary.toLowerCase().includes(term);
  });

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

          <div className="flex-1 overflow-y-auto px-5 py-2">
            {filtered.length === 0 ? (
              <div className="px-1 py-6 text-sm text-gray-400 text-center">No articles found</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filtered.map(article =>
                  article.inline ? (
                    <button
                      key={article.url}
                      onClick={() => setOpenArticle(article)}
                      className="block w-full py-3 hover:bg-gray-50 -mx-1 px-1 rounded-lg transition-colors text-left"
                    >
                      <div className="text-sm font-medium text-blue-700">{article.title}</div>
                      <div className="text-sm text-gray-500 mt-1">{article.summary}</div>
                    </button>
                  ) : (
                    <a
                      key={article.url}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-3 hover:bg-gray-50 -mx-1 px-1 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-1.5 text-sm font-medium text-blue-700">
                        <span>{article.title}</span>
                        <ExternalLinkIcon className="text-blue-400 shrink-0" />
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{article.summary}</div>
                    </a>
                  )
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
