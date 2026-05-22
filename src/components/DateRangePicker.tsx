import { useState, useRef, useEffect } from 'react';
import { CalendarIcon, ChevronDownIcon } from './icons';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function fmt(d: Date) {
  return `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}, ${d.getFullYear()}`;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells: Array<{ date: Date; current: boolean }> = [];

  for (let i = first - 1; i >= 0; i--)
    cells.push({ date: new Date(year, month - 1, daysInPrev - i), current: false });
  for (let i = 1; i <= daysInMonth; i++)
    cells.push({ date: new Date(year, month, i), current: true });
  while (cells.length % 7 !== 0)
    cells.push({ date: new Date(year, month + 1, cells.length - daysInMonth - first + 1), current: false });

  return cells;
}

function addMonths(date: Date, n: number) {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [leftMonth, setLeftMonth] = useState(() => new Date(value.start ?? new Date()));
  const [hover, setHover] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [draft, setDraft] = useState<DateRange>(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Reset draft and state when dropdown opens
  const handleOpen = () => {
    setDraft(value);
    setSelecting('start');
    setHover(null);
    if (value.start) setLeftMonth(new Date(value.start.getFullYear(), value.start.getMonth(), 1));
    setOpen(true);
  };

  const rightMonth = addMonths(leftMonth, 1);

  const handleDayClick = (date: Date) => {
    const d = startOfDay(date);
    if (selecting === 'start') {
      setDraft({ start: d, end: null });
      setSelecting('end');
    } else {
      if (draft.start && d < draft.start) {
        setDraft({ start: d, end: draft.start });
      } else {
        setDraft({ start: draft.start, end: d });
      }
      setSelecting('start');
    }
  };

  const isInRange = (date: Date) => {
    const d = startOfDay(date);
    const s = draft.start ? startOfDay(draft.start) : null;
    const e = draft.end
      ? startOfDay(draft.end)
      : hover && selecting === 'end'
      ? startOfDay(hover)
      : null;
    if (!s || !e) return false;
    const lo = s <= e ? s : e;
    const hi = s <= e ? e : s;
    return d > lo && d < hi;
  };

  const isStart = (date: Date) => !!draft.start && sameDay(date, draft.start);
  const isEnd   = (date: Date) => {
    const d = startOfDay(date);
    if (draft.end) return sameDay(d, draft.end);
    if (hover && selecting === 'end' && draft.start) {
      return sameDay(d, hover) && !sameDay(hover, draft.start);
    }
    return false;
  };

  const apply = () => {
    if (draft.start && draft.end) {
      onChange(draft);
      setOpen(false);
    }
  };

  const cancel = () => setOpen(false);

  const label = value.start && value.end
    ? `${fmt(value.start)} – ${fmt(value.end)}`
    : 'Select date range';

  const hasValue = !!(value.start && value.end);

  function MonthGrid({ year, month }: { year: number; month: number }) {
    const cells = buildCalendar(year, month);
    return (
      <div>
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((cell, i) => {
            const inRange  = isInRange(cell.date);
            const start    = isStart(cell.date);
            const end      = isEnd(cell.date);
            const selected = start || end;
            const today    = sameDay(cell.date, new Date());

            return (
              <button
                key={i}
                onMouseEnter={() => selecting === 'end' && setHover(startOfDay(cell.date))}
                onMouseLeave={() => setHover(null)}
                onClick={() => handleDayClick(cell.date)}
                className={[
                  'relative h-8 text-xs font-medium transition-colors select-none',
                  !cell.current ? 'text-gray-300' : selected ? 'text-white' : inRange ? 'text-blue-700' : 'text-gray-700 hover:bg-blue-50',
                  inRange ? 'bg-blue-50' : '',
                  selected ? 'bg-blue-600 rounded-full z-10' : '',
                  today && !selected ? 'font-bold underline underline-offset-2' : '',
                ].join(' ')}
              >
                {cell.date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleOpen}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
          hasValue
            ? 'bg-blue-50 border-blue-300 text-blue-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        <CalendarIcon className={hasValue ? 'text-blue-500' : 'text-gray-500'} />
        <span>{label}</span>
        <ChevronDownIcon className={hasValue ? 'text-blue-500' : 'text-gray-400'} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 z-50 bg-white border border-gray-200 rounded-xl shadow-lg p-4" style={{ width: '560px' }}>
          {/* Month navigation header */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setLeftMonth(addMonths(leftMonth, -1))}
              className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex gap-16">
              <span className="text-sm font-semibold text-gray-800 w-32 text-center">
                {MONTHS[leftMonth.getMonth()]} {leftMonth.getFullYear()}
              </span>
              <span className="text-sm font-semibold text-gray-800 w-32 text-center">
                {MONTHS[rightMonth.getMonth()]} {rightMonth.getFullYear()}
              </span>
            </div>
            <button
              onClick={() => setLeftMonth(addMonths(leftMonth, 1))}
              className="p-1 rounded hover:bg-gray-100 text-gray-500 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Two-month grid */}
          <div className="flex gap-6">
            <div className="flex-1">
              <MonthGrid year={leftMonth.getFullYear()} month={leftMonth.getMonth()} />
            </div>
            <div className="w-px bg-gray-100" />
            <div className="flex-1">
              <MonthGrid year={rightMonth.getFullYear()} month={rightMonth.getMonth()} />
            </div>
          </div>

          {/* Selection hint + footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-400">
              {selecting === 'start'
                ? 'Select start date'
                : draft.start
                ? `Start: ${fmt(draft.start)} — select end date`
                : ''}
            </div>
            <div className="flex gap-2">
              <button
                onClick={cancel}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={apply}
                disabled={!draft.start || !draft.end}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
