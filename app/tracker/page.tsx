'use client';

import { useAuth } from '@/app/providers';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { format, isToday, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { DailyLog, PatternInsight, MOOD_OPTIONS } from '@/types/log';
import { analyzePatterns } from '@/lib/patterns/analyzer';
import { PlusCircle, TrendingUp, Calendar, ChevronRight, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [insights, setInsights] = useState<PatternInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load logs from localStorage
    const storedLogs = localStorage.getItem('hormonal_tracker_logs');
    if (storedLogs) {
      const parsedLogs = JSON.parse(storedLogs);
      setLogs(parsedLogs);
      
      // Generate insights if enough data
      if (parsedLogs.length >= 7 && user) {
        analyzePatterns(parsedLogs).then(patternResults => {
          const convertedInsights = patternResults.map((p, i) => ({
            id: `temp-${i}`,
            user_id: user.id,
            insight_type: p.type,
            title: p.title,
            description: p.description,
            insight_data: p.data || null,
            confidence_score: p.confidence,
            is_premium: p.isPremium,
            valid_from: null,
            valid_to: null,
            created_at: new Date().toISOString()
          }));
          setInsights(convertedInsights);
        });
      }
    }
    setLoading(false);
  }, [user]);

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const todayLog = logs.find(l => l.log_date === todayStr);
  const recentLogs = logs.slice(0, 7);

  const avgEnergy = useMemo(() => {
    const validLogs = logs.filter(l => l.energy_level);
    return validLogs.length > 0 
      ? (validLogs.reduce((sum, l) => sum + (l.energy_level || 0), 0) / validLogs.length).toFixed(1)
      : '—';
  }, [logs]);

  const avgSleep = useMemo(() => {
    const validLogs = logs.filter(l => l.sleep_hours);
    return validLogs.length > 0 
      ? (validLogs.reduce((sum, l) => sum + (l.sleep_hours || 0), 0) / validLogs.length).toFixed(1)
      : '—';
  }, [logs]);

  const avgStress = useMemo(() => {
    const validLogs = logs.filter(l => l.stress_level);
    return validLogs.length > 0 
      ? (validLogs.reduce((sum, l) => sum + (l.stress_level || 0), 0) / validLogs.length).toFixed(1)
      : '—';
  }, [logs]);

  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-charcoal mb-1">Dashboard</h1>
          <p className="text-stone text-sm">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <Link
          href="/tracker/log"
          className="btn-primary flex items-center gap-2"
        >
          <PlusCircle size={18} />
          <span className="hidden sm:inline">Log Today</span>
        </Link>
      </div>

      {/* Today's status */}
      <div className={`card ${todayLog ? 'border-gold/30' : 'border-gold/10'}`}>
        <div className="flex items-center justify-between">
          <div>
            {todayLog ? (
              <>
                <h3 className="text-terracotta text-sm tracking-widest uppercase mb-1">
                  Today Logged
                </h3>
                <p className="text-2xl font-serif text-charcoal">
                  Energy: {todayLog.energy_level}/10
                </p>
                {todayLog.mood && todayLog.mood.length > 0 && (
                  <p className="text-stone mt-1">
                    Mood: {todayLog.mood.map(m => MOOD_OPTIONS.find(o => o.value === m)?.emoji).join(' ')}
                  </p>
                )}
              </>
            ) : (
              <>
                <h3 className="text-stone text-sm tracking-widest uppercase mb-1">
                  Today Not Logged
                </h3>
                <p className="text-xl text-charcoal">How are you feeling?</p>
              </>
            )}
          </div>
          <Link
            href="/tracker/log"
            className="text-gold hover:text-gold-deep transition-colors"
          >
            <ChevronRight size={24} />
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-xs text-stone tracking-widest uppercase mb-2">Avg Energy</p>
          <p className="text-3xl font-serif text-gold">{avgEnergy}</p>
          <p className="text-xs text-stone mt-1">/ 10</p>
        </div>
        <div className="card text-center">
          <p className="text-xs text-stone tracking-widest uppercase mb-2">Avg Sleep</p>
          <p className="text-3xl font-serif text-gold">{avgSleep}</p>
          <p className="text-xs text-stone mt-1">hours</p>
        </div>
        <div className="card text-center">
          <p className="text-xs text-stone tracking-widest uppercase mb-2">Avg Stress</p>
          <p className="text-3xl font-serif text-gold">{avgStress}</p>
          <p className="text-xs text-stone mt-1">/ 10</p>
        </div>
      </div>

      {/* Week view */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm tracking-widest uppercase text-stone">This Week</h3>
          <Link href="/tracker/history" className="text-gold text-sm hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const dayStr = format(day, 'yyyy-MM-dd');
            const log = logs.find(l => l.log_date === dayStr);
            const isTodayDate = isToday(day);
            
            return (
              <Link
                key={dayStr}
                href={`/tracker/log?date=${dayStr}`}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg border transition-colors ${
                  isTodayDate
                    ? 'border-gold bg-gold/10'
                    : log
                    ? 'border-gold/30 hover:border-gold/50'
                    : 'border-gold/10 hover:border-gold/30'
                }`}
              >
                <span className="text-xs text-stone uppercase">
                  {format(day, 'EEE')}
                </span>
                <span className={`text-lg ${isTodayDate ? 'text-gold' : log ? 'text-charcoal' : 'text-feather'}`}>
                  {log?.energy_level || format(day, 'd')}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-gold" size={20} />
          <h3 className="text-sm tracking-widest uppercase text-stone">Your Patterns</h3>
        </div>

        {loading ? (
          <p className="text-stone text-center py-8">Analyzing your data...</p>
        ) : insights.length === 0 ? (
          <div className="text-center py-8">
            <TrendingUp className="mx-auto text-gold/50 mb-3" size={32} />
            <p className="text-stone">
              Log at least 7 days to start seeing patterns
            </p>
            <p className="text-feather text-sm mt-1">
              You have {logs.length} day{logs.length !== 1 ? 's' : ''} logged
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.slice(0, 3).map((insight) => (
              <div
                key={insight.id}
                className="p-4 border border-gold/15 rounded-lg hover:border-gold/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-charcoal mb-1">{insight.title}</h4>
                    <p className="text-stone text-sm">{insight.description}</p>
                  </div>
                  {insight.is_premium && (
                    <span className="text-xs text-terracotta border border-terracotta/30 px-2 py-1 rounded">
                      Premium
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {insights.length > 3 && (
              <Link
                href="/tracker/insights"
                className="block text-center text-gold hover:underline py-2"
              >
                View all {insights.length} insights
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Recent entries */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm tracking-widest uppercase text-stone">Recent Entries</h3>
          <Link href="/tracker/history" className="text-gold text-sm hover:underline">
            View all
          </Link>
        </div>
        
        {logs.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="mx-auto text-gold/50 mb-3" size={32} />
            <p className="text-stone">No entries yet</p>
            <Link href="/tracker/log" className="text-gold hover:underline">
              Log your first day
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {recentLogs.map((log) => (
              <Link
                key={log.id}
                href={`/tracker/log?date=${log.log_date}`}
                className="flex items-center justify-between p-3 border border-gold/10 rounded-lg hover:border-gold/30 transition-colors"
              >
                <div>
                  <p className="text-sm text-charcoal">
                    {format(new Date(log.log_date), 'EEEE, MMM d')}
                  </p>
                  <p className="text-xs text-stone">
                    Energy: {log.energy_level || '—'} • Sleep: {log.sleep_hours || '—'}h
                  </p>
                </div>
                <ChevronRight size={18} className="text-stone" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
