'use client';

import { useAuth } from '@/app/providers';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { DailyLog, MOOD_OPTIONS } from '@/types/log';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HistoryPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const storedLogs = localStorage.getItem('hormonal_tracker_logs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
    setLoading(false);
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getLogForDate = (date: Date) => {
    return logs.find(log => isSameDay(parseISO(log.log_date), date));
  };

  const getEnergyColor = (level: number | null) => {
    if (!level) return 'bg-gold/10';
    if (level >= 8) return 'bg-green-500/30';
    if (level >= 6) return 'bg-gold/30';
    if (level >= 4) return 'bg-orange-500/30';
    return 'bg-red-500/30';
  };

  const monthLogs = logs.filter(log => {
    const logDate = parseISO(log.log_date);
    return logDate >= monthStart && logDate <= monthEnd;
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="font-serif text-3xl">History</h1>

      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 text-silver hover:text-gold transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <h2 className="font-serif text-xl">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 text-silver hover:text-gold transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="card">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs text-silver py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {days.map((day) => {
            const log = getLogForDate(day);
            const isToday = isSameDay(day, new Date());
            
            return (
              <Link
                key={day.toISOString()}
                href={`/tracker/log?date=${format(day, 'yyyy-MM-dd')}`}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg border transition-colors ${
                  isToday
                    ? 'border-gold'
                    : log
                    ? 'border-gold/30 hover:border-gold/50'
                    : 'border-gold/10 hover:border-gold/30'
                } ${log ? getEnergyColor(log.energy_level) : ''}`}
              >
                <span className="text-xs text-silver">
                  {format(day, 'd')}
                </span>
                {log && (
                  <span className="text-sm font-serif text-cream">
                    {log.energy_level}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-silver">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500/30" />
          <span>High energy (8+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gold/30" />
          <span>Good (6-7)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-orange-500/30" />
          <span>Low (4-5)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500/30" />
          <span>Very low (&lt;4)</span>
        </div>
      </div>

      {/* Entries list */}
      {monthLogs.length > 0 && (
        <div className="card">
          <h3 className="text-sm tracking-widest uppercase text-silver mb-4">
            All Entries This Month
          </h3>
          <div className="space-y-2">
            {monthLogs.map((log) => (
              <Link
                key={log.id}
                href={`/tracker/log?date=${log.log_date}`}
                className="flex items-center justify-between p-3 border border-gold/10 rounded-lg hover:border-gold/30 transition-colors"
              >
                <div>
                  <p className="text-cream">
                    {format(parseISO(log.log_date), 'EEEE, MMMM d')}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-silver mt-1">
                    <span>Energy: {log.energy_level}/10</span>
                    <span>Sleep: {log.sleep_hours}h</span>
                    <span>Stress: {log.stress_level}/10</span>
                  </div>
                </div>
                <div className="text-right">
                  {log.mood && log.mood.length > 0 && (
                    <p className="text-xl">
                      {log.mood.map(m => MOOD_OPTIONS.find(o => o.value === m)?.emoji).join('')}
                    </p>
                  )}
                  {log.physical_symptoms && log.physical_symptoms.length > 0 && (
                    <p className="text-xs text-silver mt-1">
                      {log.physical_symptoms.length} symptom{log.physical_symptoms.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {monthLogs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-silver">No entries for this month</p>
          <Link href="/tracker/log" className="text-gold hover:underline mt-2 inline-block">
            Start logging
          </Link>
        </div>
      )}
    </div>
  );
}
