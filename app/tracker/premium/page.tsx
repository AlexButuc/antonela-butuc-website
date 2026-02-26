'use client';

import { useAuth } from '@/app/providers';
import { useState, useEffect } from 'react';
import { Crown, Check, Sparkles, FileText, Headphones } from 'lucide-react';
import Link from 'next/link';

export default function PremiumPage() {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem('hormonal_tracker_profile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setIsPremium(profile.subscription_status === 'active');
    }
    setLoading(false);
  }, []);

  const handleSubscribe = (plan: 'monthly' | 'annual') => {
    const profile = {
      display_name: 'Demo User',
      cycle_length: 28,
      subscription_status: 'active'
    };
    localStorage.setItem('hormonal_tracker_profile', JSON.stringify(profile));
    setIsPremium(true);
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-stone">Loading...</p>
      </div>
    );
  }

  if (isPremium) {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <Crown className="mx-auto text-gold mb-4" size={48} />
          <h1 className="font-serif text-3xl text-charcoal mb-2">You're Premium</h1>
          <p className="text-stone">Thank you for your support!</p>
        </div>

        <div className="card bg-gold-pale/50 border-gold/30">
          <p className="text-terracotta text-sm text-center">
            Demo Mode — Premium features are now unlocked for this session.
          </p>
        </div>

        <div className="card">
          <h3 className="text-sm tracking-widest uppercase text-stone mb-4">
            Your Premium Benefits
          </h3>
          <div className="space-y-4">
            {[
              { icon: Sparkles, title: 'Full Pattern Insights', desc: 'All correlations and recommendations unlocked' },
              { icon: Headphones, title: 'Weekly EFT Recommendations', desc: 'Personalized tapping sessions based on your data' },
              { icon: FileText, title: 'Monthly Reports', desc: 'PDF reports to share with practitioners' }
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <benefit.icon className="text-gold mt-1" size={20} />
                <div className="flex-1">
                  <h4 className="text-charcoal">{benefit.title}</h4>
                  <p className="text-stone text-sm">{benefit.desc}</p>
                </div>
                <Check className="text-gold" size={20} />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/tracker/insights" className="btn-primary">
            View Your Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Crown className="mx-auto text-gold mb-4" size={48} />
        <h1 className="font-serif text-3xl text-charcoal mb-2">Go Premium</h1>
        <p className="text-stone">Unlock the full power of pattern tracking</p>
      </div>

      {/* Demo mode notice */}
      <div className="card bg-gold-pale/50 border-gold/30">
        <p className="text-terracotta text-sm text-center">
          Demo Mode — Click any plan to instantly unlock all premium features.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card border-gold/30 hover:border-gold/50 transition-colors cursor-pointer" onClick={() => handleSubscribe('monthly')}>
          <h3 className="font-serif text-xl text-charcoal mb-2">Monthly</h3>
          <p className="text-4xl font-serif text-gold mb-1">
            €9<span className="text-base text-stone">/month</span>
          </p>
          <p className="text-stone text-sm mb-4">Cancel anytime</p>
          <button className="btn-outline w-full">
            Start Monthly (Demo)
          </button>
        </div>

        <div className="card border-gold bg-gold-pale/30 relative cursor-pointer" onClick={() => handleSubscribe('annual')}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ivory text-xs px-3 py-1 rounded-full">
            Best Value
          </div>
          <h3 className="font-serif text-xl text-charcoal mb-2">Annual</h3>
          <p className="text-4xl font-serif text-gold mb-1">
            €89<span className="text-base text-stone">/year</span>
          </p>
          <p className="text-stone text-sm mb-4">2 months free</p>
          <button className="btn-primary w-full">
            Start Annual (Demo)
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="card">
        <h3 className="text-sm tracking-widest uppercase text-stone mb-6">
          What's Included
        </h3>
        <div className="space-y-4">
          {[
            { icon: Sparkles, title: 'Full Pattern Insights', desc: 'Unlock all correlations, trends, and personalized recommendations based on your unique hormonal patterns' },
            { icon: Headphones, title: 'Weekly EFT Recommendations', desc: 'Get personalized EFT tapping audio recommendations based on your highest-stress days and symptoms' },
            { icon: FileText, title: 'Monthly Reports', desc: 'Download beautiful PDF reports showing your patterns to share with practitioners or for your records' },
            { title: 'Antonela\'s Interpretation', desc: 'Educational explanations tied to your actual data — "Your pattern suggests cortisol dominance in the evening — here\'s why and what to do"' },
            { title: 'Wellness Club Bridge', desc: 'Direct links to relevant Unbounded Wellness Club content based on your current symptoms' },
            { title: 'Priority Support', desc: 'Get help faster and request new features' }
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              {feature.icon ? (
                <feature.icon className="text-gold mt-1 shrink-0" size={20} />
              ) : (
                <Check className="text-gold mt-1 shrink-0" size={20} />
              )}
              <div>
                <h4 className="text-charcoal">{feature.title}</h4>
                <p className="text-stone text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free vs Premium comparison */}
      <div className="card">
        <h3 className="text-sm tracking-widest uppercase text-stone mb-4">
          Free vs Premium
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-left py-2 text-charcoal">Feature</th>
                <th className="text-center py-2 text-stone">Free</th>
                <th className="text-center py-2 text-gold">Premium</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Daily logging', true, true],
                ['Basic pattern detection', true, true],
                ['Correlation insights', true, true],
                ['Deep pattern analysis', false, true],
                ['Personalized recommendations', false, true],
                ['EFT audio recommendations', false, true],
                ['Monthly PDF reports', false, true],
                ['Wellness Club integration', false, true]
              ].map(([feature, free, premium], i) => (
                <tr key={i} className="border-b border-gold/10">
                  <td className="py-2 text-charcoal">{feature}</td>
                  <td className="text-center py-2">
                    {free ? <Check className="mx-auto text-stone" size={16} /> : <span className="text-feather">—</span>}
                  </td>
                  <td className="text-center py-2">
                    {premium ? <Check className="mx-auto text-gold" size={16} /> : <span className="text-feather">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Testimonial */}
      <div className="card bg-blush border-gold/20">
        <p className="font-serif text-lg italic text-charcoal mb-3">
          "The patterns this revealed were eye-opening. I had no idea my energy crashes 
          were so closely tied to my sleep quality. Now I know exactly what to prioritize."
        </p>
        <p className="text-gold text-sm">— Premium Member</p>
      </div>
    </div>
  );
}
