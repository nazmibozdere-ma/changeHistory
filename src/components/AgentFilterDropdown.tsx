import { useState, useRef, useEffect } from 'react';
import { PersonIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from './icons';
import { agentGroups } from '../data/mockData';

interface AgentFilterDropdownProps {
  selected: string[];
  onChange: (agents: string[]) => void;
}

function Checkbox({ checked, indeterminate }: { checked: boolean; indeterminate?: boolean }) {
  return (
    <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
      checked || indeterminate ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
    }`}>
      {indeterminate && !checked
        ? <div className="w-2 h-0.5 bg-white rounded" />
        : checked
        ? <CheckIcon className="text-white" />
        : null}
    </div>
  );
}

export default function AgentFilterDropdown({ selected, onChange }: AgentFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Manual: true,
    'MobileAction Ads System': true,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleItem = (value: string) => {
    onChange(selected.includes(value) ? selected.filter(v => v !== value) : [...selected, value]);
  };

  const toggleGroup = (groupLabel: string) => {
    const group = agentGroups.find(g => g.label === groupLabel)!;
    const selectableValues = group.items.filter(i => !i.comingSoon).map(i => i.value);
    const allChecked = selectableValues.every(v => selected.includes(v));
    if (allChecked) {
      onChange(selected.filter(v => !selectableValues.includes(v)));
    } else {
      const merged = [...selected];
      selectableValues.forEach(v => { if (!merged.includes(v)) merged.push(v); });
      onChange(merged);
    }
  };

  const clearAll = () => onChange([]);

  const toggleExpand = (groupLabel: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupLabel]: !prev[groupLabel] }));
  };

  const label = selected.length === 0 ? 'Filter by agent' : `Filter by agent (${selected.length})`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
          selected.length > 0
            ? 'bg-blue-50 border-blue-300 text-blue-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <PersonIcon className={selected.length > 0 ? 'text-blue-500' : 'text-gray-500'} />
        <span>{label}</span>
        {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1.5 w-68 bg-white border border-gray-200 rounded-xl shadow-lg z-50" style={{ width: '272px' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent</span>
            {selected.length > 0 && (
              <button onClick={clearAll} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                Clear all
              </button>
            )}
          </div>

          {/* Groups */}
          <div className="py-1.5 max-h-72 overflow-y-auto">
            {agentGroups.map(group => {
              const selectableValues = group.items.filter(i => !i.comingSoon).map(i => i.value);
              const checkedCount = selectableValues.filter(v => selected.includes(v)).length;
              const allChecked = checkedCount === selectableValues.length && selectableValues.length > 0;
              const someChecked = checkedCount > 0 && !allChecked;
              const isExpanded = expandedGroups[group.label] ?? true;

              return (
                <div key={group.label}>
                  {/* Group header row */}
                  <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 transition-colors">
                    <button
                      onClick={() => toggleGroup(group.label)}
                      className="flex items-center gap-2 flex-1 text-left"
                    >
                      <Checkbox checked={allChecked} indeterminate={someChecked} />
                      <span className="text-sm font-semibold text-gray-800">{group.label}</span>
                    </button>
                    <button
                      onClick={() => toggleExpand(group.label)}
                      className="text-gray-400 hover:text-gray-600 p-0.5"
                    >
                      {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </button>
                  </div>

                  {/* Group items */}
                  {isExpanded && (
                    <div>
                      {group.items.map(item => {
                        const checked = selected.includes(item.value);
                        return (
                          <button
                            key={item.value}
                            onClick={() => !item.comingSoon && toggleItem(item.value)}
                            disabled={item.comingSoon}
                            className={`flex items-center gap-2 w-full pl-9 pr-3 py-1.5 text-left transition-colors ${
                              item.comingSoon
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <Checkbox checked={checked} />
                            <span className="text-sm text-gray-700">{item.label}</span>
                            {item.comingSoon && (
                              <span className="ml-auto text-xs text-gray-400 italic">coming soon</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={() => setOpen(false)}
              className="w-full py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
