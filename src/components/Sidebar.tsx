interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navSections = [
  {
    label: null,
    items: [
      { label: 'Overview', icon: OverviewIcon },
      { label: 'Ads Manager', icon: AdsManagerIcon },
      { label: 'Automations', icon: AutomationsIcon },
      { label: 'CPP A/B Testing', icon: CppIcon },
    ],
  },
  {
    label: 'CO-PILOT',
    items: [
      { label: 'Keyword Advisor', icon: KeywordAdvisorIcon },
      { label: 'AI Smart Bidding', icon: SmartBiddingIcon },
      { label: 'Budget Allocation', icon: BudgetIcon },
    ],
  },
  {
    label: 'INSIGHTS CENTER',
    items: [
      { label: 'Benchmarks', icon: BenchmarksIcon },
    ],
  },
  {
    label: 'COMPETITION ANALYSIS',
    items: [
      { label: 'Keyword Auction Insights', icon: AuctionIcon },
      { label: 'CPP Intelligence', icon: CppIntelIcon },
      { label: 'Organic Keyword Hunt', icon: OrganicIcon },
    ],
  },
  {
    label: 'MOBILE MEASUREMENT PARTNER',
    items: [
      { label: 'Attributions', icon: AttributionsIcon },
      { label: 'Goals', icon: GoalsIcon },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className="flex flex-col shrink-0 transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? '56px' : '220px',
        background: '#0f1729',
        minHeight: '100vh',
      }}
    >
      {/* Logo + collapse toggle */}
      <div className="flex items-center justify-between px-3 pt-4 pb-3">
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="text-white font-bold text-base tracking-tight flex items-center gap-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="2" />
                <path d="M8 12l2.5 2.5L16 9" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              SearchAds.com
            </span>
            <span className="text-blue-400 text-xs ml-5">by MobileAction</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="2" />
              <path d="M8 12l2.5 2.5L16 9" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        <button
          onClick={onToggle}
          className="ml-auto p-1 rounded-md text-blue-300 hover:bg-white/10 transition-colors shrink-0"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {collapsed ? (
              <path d="M5 3l6 5-6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M11 3L5 8l6 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Switch to ASO */}
      <div className="px-3 pb-4">
        <button className="w-full rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-white text-xs font-semibold py-2 px-3 text-left overflow-hidden whitespace-nowrap">
          {collapsed ? (
            <span className="flex justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ) : (
            'Switch to ASO Intelligence'
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 pb-6 space-y-4">
        {navSections.map((section, si) => (
          <div key={si}>
            {section.label && !collapsed && (
              <p className="text-xs font-semibold text-blue-300/50 uppercase tracking-widest px-2 mb-1">
                {section.label}
              </p>
            )}
            {section.label && collapsed && (
              <div className="border-t border-white/10 my-2" />
            )}
            <div className="space-y-0.5">
              {section.items.map(item => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg text-blue-100/80 hover:bg-white/10 hover:text-white transition-colors cursor-default group"
                  title={collapsed ? item.label : undefined}
                >
                  <div className="w-5 h-5 shrink-0 flex items-center justify-center text-blue-300 group-hover:text-white transition-colors">
                    <item.icon />
                  </div>
                  {!collapsed && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

/* ── inline SVG icons ── */

function OverviewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function AdsManagerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="1" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1" y="7" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="1" y="13" width="14" height="2" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
function AutomationsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function CppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="6" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="9" y="3" width="6" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 8h3M9.5 8h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function KeywordAdvisorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6h8M4 9h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function SmartBiddingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="9" rx="5" ry="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 4V2M5.5 4.9L4 3.5M10.5 4.9L12 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8 7v2.5l1.5 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BudgetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 6h2M13 6h2M1 10h2M13 10h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function BenchmarksIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 13L6 8l3 3 5-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function AuctionIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 13l8-8M9 3l3 1-1 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function CppIntelIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="2" width="10" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 6h4M6 9h4M6 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function OrganicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 6.5h3M6.5 5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function AttributionsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="3" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="13" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="13" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 8h3l2.5-3.5M5 8h3l2.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GoalsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}
