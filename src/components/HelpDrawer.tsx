import { useState } from 'react';
import { SearchIcon, XIcon } from './icons';

interface HelpDrawerProps {
  onClose: () => void;
}

interface HelpArticle {
  title: string;
  summary: string;
  url: string;
}

const articles: HelpArticle[] = [
  {
    title: 'About CPP A/B Testing',
    summary: 'How MobileAction\'s CPP A/B Testing feature automates comparing Apple Ads custom product pages to identify top-performing variants.',
    url: 'https://helpcenter.mobileaction.co/en/about-cpp-a-b-testing',
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

export default function HelpDrawer({ onClose }: HelpDrawerProps) {
  const [search, setSearch] = useState('');

  const filtered = articles.filter(a => {
    const term = search.toLowerCase();
    return a.title.toLowerCase().includes(term) || a.summary.toLowerCase().includes(term);
  });

  return (
    <div className="w-96 shrink-0 bg-white border-l border-gray-200 flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Quick Help</h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <XIcon />
        </button>
      </div>

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
            {filtered.map(article => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 hover:bg-gray-50 -mx-1 px-1 rounded-lg transition-colors"
              >
                <div className="text-sm font-medium text-blue-700">{article.title}</div>
                <div className="text-sm text-gray-500 mt-1">{article.summary}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
