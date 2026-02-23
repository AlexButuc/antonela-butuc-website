'use client';

import { useAuth } from '@/app/providers';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DailyLog, PatternInsight, InsightType } from '@/types/log';
import { analyzePatterns } from '@/lib/patterns/analyzer';
import { Sparkles, Lock, TrendingUp, Calendar, Moon, Zap, AlertCircle } from 'lucide-react';

export default function InsightsPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [insights, setInsights] = useState<PatternInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const storedLogs = localStorage.getItem('hormonal_tracker_logs');
    if (storedLogs) {
      const parsedLogs = JSON.parse(storedLogs);
      setLogs(parsedLogs);
      
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
    
    const storedProfile = localStorage.getItem('hormonal_tracker_profile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setIsPremium(profile.subscription_status === 'active');
    }
    
    setLoading(false);
  }, [user]);

  const getInsightIcon = (type: InsightType) => {
    switch (type) {
      case 'correlation':
        return <TrendingUp size={20} className="text-gold" />;
      case 'trend':
        return <Calendar size={20} className="text-gold" />;
      case 'phase_pattern':
        return <Moon size={20} className="text-gold" />;
      case 'recommendation':
        return <Zap size={20} className="text-gold" />;
      default:
        return <Sparkles size={20} className="text-gold" />;
    }
  };

  const freeInsights = insights.filter(i => !i.is_premium);
  const premiumInsights = insights.filter(i => i.is_premium);

  const unlockPremium = () => {
    const profile = { display_name: 'Demo User', cycle_length: 28, subscription_status: 'active' };
    localStorage.setItem('hormonal_tracker_profile', JSON.stringify(profile));
    setIsPremium(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <Sparkles className="text-gold" size={28} />
        <h1 className="font-serif text-3xl">Your Patterns</h1>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-silver">Analyzing your data...</p>
        </div>
      ) : logs.length < 7 ? (
        <div className="card text-center py-12">
          <AlertCircle className="mx-auto text-gold/50 mb-4" size={48} />
          <h2 className="font-serif text-xl mb-2">Keep Logging</h2>
          <p className="text-silver mb-4">
            You have {logs.length} day{logs.length !== 1 ? 's' : ''} logged. 
            We need at least 7 days to start detecting patterns in your data.
          </p>
          <Link href="/tracker/log" className="btn-outline">
            Log Today
          </Link>
        </div>
      ) : (
        <>
          <div className="card">
            <h3 className="text-sm tracking-widest uppercase text-silver mb-4">
              Data Summary
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-serif text-gold">{logs.length}</p>
                <p className="text-xs text-silver">Days logged</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-gold">{insights.length}</p>
                <p className="text-xs text-silver">Patterns found</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-gold">{freeInsights.length}</p>
                <p className="text-xs text-silver">Free insights</p>
              </div>
            </div>
          </div>

          {freeInsights.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm tracking-widest uppercase text-silver">
                Discovered Patterns
              </h3>
              {freeInsights.map((insight) => (
                <div key={insight.id} className="card">
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.insight_type)}
                    <div>
                      <h4 className="text-cream mb-1">{insight.title}</h4>
                      <p className="text-silver text-sm">{insight.description}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gold/60">
                          Confidence: {Math.round(insight.confidence_score * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {premiumInsights.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm tracking-widest uppercase text-silver">
                Premium Insights
              </h3>
              {premiumInsights.map((insight) => (
                <div
                  key={insight.id}
                  className={`card ${!isPremium ? 'relative overflow-hidden' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.insight_type)}
                    <div className="flex-1">
                      <h4 className="text-cream mb-1">{insight.title}</h4>
                      {isPremium ? (
                        <>
                          <p className="text-silver text-sm">{insight.description}</p>
                          <div className="mt-2">
                            <span className="text-xs text-gold/60">
                              Confidence: {Math.round(insight.confidence_score * 100)}%
                            </span>
                          </div>
                        </>
                      ) : (
                        <p className="text-silver text-sm">
                          {insight.description.slice(0, 80)}...
                        </p>
                      )}
                    </div>
                    {!isPremium && (
                      <Lock size={16} className="text-gold/50" />
                    )}
                  </div>
                  
                  {!isPremium && (
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent flex items-end justify-center pb-4">
                      <button
                        onClick={unlockPremium}
                        className="btn-primary text-xs"
                      >
                        Unlock (Demo)
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!isPremium && (
            <div className="card border-gold/30 bg-gold/5">
              <div className="text-center">
                <h3 className="font-serif text-xl mb-2">Get Full Insights</h3>
                <p className="text-silver text-sm mb-4">
                  Upgrade to Premium for {premiumInsights.length} additional insights, 
                  personalized EFT recommendations, and monthly reports.
                </p>
                <button onClick={unlockPremium} className="btn-primary">
                  Unlock Premium (Demo)
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
