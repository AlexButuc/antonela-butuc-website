'use client';

import { useAuth } from '@/app/providers';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Crown, LogOut, ChevronRight, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('hormonal_tracker_profile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setDisplayName(profile.display_name || '');
      setCycleLength(profile.cycle_length || 28);
      setIsPremium(profile.subscription_status === 'active');
    }
    setLoading(false);
  }, []);

  const handleSave = () => {
    setSaving(true);
    
    const profile = {
      display_name: displayName,
      cycle_length: cycleLength,
      subscription_status: isPremium ? 'active' : 'free'
    };
    
    localStorage.setItem('hormonal_tracker_profile', JSON.stringify(profile));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('demo_user');
    localStorage.removeItem('hormonal_tracker_logs');
    localStorage.removeItem('hormonal_tracker_profile');
    router.push('/');
    router.refresh();
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all your logged data? This cannot be undone.')) {
      localStorage.removeItem('hormonal_tracker_logs');
      alert('All data has been cleared.');
    }
  };

  const handleExportData = () => {
    const storedLogs = localStorage.getItem('hormonal_tracker_logs');
    if (storedLogs) {
      const logs = JSON.parse(storedLogs);
      const csv = [
        'Date,Energy,Sleep Quality,Stress,Sleep Hours,Mood,Symptoms,Cravings,Cycle Phase,Notes',
        ...logs.map((log: any) => [
          log.log_date,
          log.energy_level || '',
          log.sleep_quality || '',
          log.stress_level || '',
          log.sleep_hours || '',
          (log.mood || []).join(';'),
          (log.physical_symptoms || []).join(';'),
          (log.cravings || []).join(';'),
          log.cycle_phase || '',
          `"${(log.notes || '').replace(/"/g, '""')}"`
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hormonal-tracker-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleSeedData = () => {
    if (confirm('This will add 14 days of sample data to your logs. Continue?')) {
      const moods = [['calm'], ['energetic'], ['anxious'], ['calm', 'focused'], ['tired'], ['energetic', 'happy'], ['stressed']];
      const symptoms = [[], ['bloating'], ['brain_fog'], [], ['headache'], [], ['bloating', 'brain_fog']];
      const cravings = [[], ['sugar'], ['carbs'], [], [], ['sugar'], []];
      const phases = ['follicular', 'follicular', 'ovulation', 'ovulation', 'luteal', 'luteal', 'menstrual'];
      
      const sampleLogs = [];
      for (let i = 13; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayIndex = i % 7;
        
        sampleLogs.push({
          id: `sample-${dateStr}`,
          user_id: user?.id || 'demo-user-123',
          log_date: dateStr,
          energy_level: Math.max(1, Math.min(10, 6 + Math.floor(Math.random() * 5) - (i % 7 === 5 ? 3 : 0))),
          sleep_quality: Math.max(1, Math.min(10, 6 + Math.floor(Math.random() * 4))),
          stress_level: Math.max(1, Math.min(10, 4 + Math.floor(Math.random() * 4) + (i % 7 === 6 ? 3 : 0))),
          sleep_hours: Math.round((6 + Math.random() * 2.5) * 10) / 10,
          mood: moods[dayIndex],
          physical_symptoms: symptoms[dayIndex],
          cravings: cravings[dayIndex],
          cycle_phase: phases[Math.floor(i / 2) % 4],
          notes: '',
          created_at: date.toISOString(),
          updated_at: date.toISOString()
        });
      }
      
      localStorage.setItem('hormonal_tracker_logs', JSON.stringify(sampleLogs));
      alert('14 days of sample data has been added. Go to Dashboard to see patterns!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-stone">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-serif text-3xl text-charcoal">Settings</h1>

      {/* Demo mode notice */}
      <div className="card bg-gold-pale/50 border-gold/30">
        <p className="text-terracotta text-sm">
          Demo Mode — Your data is stored locally in your browser. 
          No account or backend required.
        </p>
      </div>

      {/* Account info */}
      <div className="card">
        <h3 className="text-sm tracking-widest uppercase text-stone mb-4">
          Account
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="text-gold" size={20} />
            <div>
              <p className="text-xs text-stone">Email</p>
              <p className="text-charcoal">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile settings */}
      <div className="card">
        <h3 className="text-sm tracking-widest uppercase text-stone mb-4">
          Profile
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-stone mb-2">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input-field"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs text-stone mb-2">
              Average Cycle Length (days)
            </label>
            <input
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
              min="21"
              max="35"
              className="input-field"
            />
            <p className="text-xs text-feather mt-1">
              Used to estimate cycle phases (21-35 days)
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary"
          >
            {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Subscription */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="text-gold" size={20} />
            <div>
              <p className="text-charcoal">Subscription</p>
              <p className="text-stone text-sm">
                {isPremium ? 'Premium' : 'Free plan'}
              </p>
            </div>
          </div>
          {!isPremium && (
            <button
              onClick={() => {
                setIsPremium(true);
                const profile = { display_name: displayName, cycle_length: cycleLength, subscription_status: 'active' };
                localStorage.setItem('hormonal_tracker_profile', JSON.stringify(profile));
              }}
              className="btn-outline text-xs"
            >
              Unlock (Demo)
            </button>
          )}
        </div>
      </div>

      {/* Data export */}
      <div className="card">
        <h3 className="text-sm tracking-widest uppercase text-stone mb-4">
          Your Data
        </h3>
        <p className="text-stone text-sm mb-4">
          Export all your logged data as a CSV file, or clear all data from this browser.
        </p>
        <div className="flex gap-3">
          <button onClick={handleExportData} className="btn-outline text-xs">
            Export Data
          </button>
          <button onClick={handleSeedData} className="btn-outline text-xs">
            Seed Sample Data
          </button>
          <button 
            onClick={handleClearData}
            className="btn-outline text-xs border-error/30 text-error hover:bg-error/10 hover:text-error"
          >
            <Trash2 size={14} className="mr-1" />
            Clear Data
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full p-4 border border-gold/10 rounded-lg text-stone hover:text-charcoal hover:border-gold/30 transition-colors"
      >
        <LogOut size={20} />
        <span>Clear All & Exit Demo</span>
        <ChevronRight size={18} className="ml-auto" />
      </button>
    </div>
  );
}
