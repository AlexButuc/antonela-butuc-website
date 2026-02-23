'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/providers';
import { useSearchParams } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { DailyLog, MOOD_OPTIONS, SYMPTOM_OPTIONS, CRAVING_OPTIONS, CYCLE_PHASES, CyclePhase } from '@/types/log';
import { ChevronLeft, ChevronRight, Check, Save } from 'lucide-react';

export default function LogPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');
  
  const [currentDate, setCurrentDate] = useState(
    dateParam || format(new Date(), 'yyyy-MM-dd')
  );
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form state
  const [energyLevel, setEnergyLevel] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [sleepHours, setSleepHours] = useState(7);
  const [mood, setMood] = useState<string[]>([]);
  const [physicalSymptoms, setPhysicalSymptoms] = useState<string[]>([]);
  const [cravings, setCravings] = useState<string[]>([]);
  const [cyclePhase, setCyclePhase] = useState<CyclePhase>('unknown');
  const [notes, setNotes] = useState('');

  // Load existing log for this date
  useEffect(() => {
    if (currentDate) {
      loadLog();
    }
  }, [currentDate]);

  const loadLog = () => {
    setLoading(true);
    const storedLogs = localStorage.getItem('hormonal_tracker_logs');
    if (storedLogs) {
      const logs: DailyLog[] = JSON.parse(storedLogs);
      const existingLog = logs.find(l => l.log_date === currentDate);
      
      if (existingLog) {
        setEnergyLevel(existingLog.energy_level || 5);
        setSleepQuality(existingLog.sleep_quality || 5);
        setStressLevel(existingLog.stress_level || 5);
        setSleepHours(existingLog.sleep_hours || 7);
        setMood(existingLog.mood || []);
        setPhysicalSymptoms(existingLog.physical_symptoms || []);
        setCravings(existingLog.cravings || []);
        setCyclePhase(existingLog.cycle_phase || 'unknown');
        setNotes(existingLog.notes || '');
      } else {
        resetForm();
      }
    } else {
      resetForm();
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEnergyLevel(5);
    setSleepQuality(5);
    setStressLevel(5);
    setSleepHours(7);
    setMood([]);
    setPhysicalSymptoms([]);
    setCravings([]);
    setCyclePhase('unknown');
    setNotes('');
  };

  const toggleArrayItem = (arr: string[], item: string): string[] => {
    return arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];
  };

  const handleSave = () => {
    setSaving(true);
    
    const now = new Date().toISOString();
    const newLog: DailyLog = {
      id: `log-${Date.now()}`,
      user_id: user?.id || 'demo-user-123',
      log_date: currentDate,
      energy_level: energyLevel,
      sleep_quality: sleepQuality,
      stress_level: stressLevel,
      sleep_hours: sleepHours,
      mood,
      physical_symptoms: physicalSymptoms,
      cravings,
      cycle_phase: cyclePhase,
      cycle_day: null,
      notes: notes || null,
      created_at: now,
      updated_at: now,
    };

    // Get existing logs
    const storedLogs = localStorage.getItem('hormonal_tracker_logs');
    let logs: DailyLog[] = storedLogs ? JSON.parse(storedLogs) : [];
    
    // Remove existing log for this date
    logs = logs.filter(l => l.log_date !== currentDate);
    
    // Add new log
    logs.push(newLog);
    
    // Sort by date descending
    logs.sort((a, b) => new Date(b.log_date).getTime() - new Date(a.log_date).getTime());
    
    // Save to localStorage
    localStorage.setItem('hormonal_tracker_logs', JSON.stringify(logs));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setSaving(false);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const date = parseISO(currentDate);
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(format(newDate, 'yyyy-MM-dd'));
  };

  const formatDateDisplay = (dateStr: string) => {
    const date = parseISO(dateStr);
    const today = new Date();
    const isToday = format(today, 'yyyy-MM-dd') === dateStr;
    
    if (isToday) {
      return 'Today';
    }
    return format(date, 'EEEE, MMMM d');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Date navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateDate('prev')}
          className="p-2 text-silver hover:text-gold transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="text-center">
          <h1 className="font-serif text-2xl">{formatDateDisplay(currentDate)}</h1>
          <p className="text-silver text-sm">
            {format(parseISO(currentDate), 'MMMM yyyy')}
          </p>
        </div>
        
        <button
          onClick={() => navigateDate('next')}
          className="p-2 text-silver hover:text-gold transition-colors"
          disabled={currentDate === format(new Date(), 'yyyy-MM-dd')}
        >
          <ChevronRight size={24} className={currentDate === format(new Date(), 'yyyy-MM-dd') ? 'opacity-30' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-silver">Loading...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Energy Level */}
          <div className="card">
            <label className="block text-sm tracking-widest uppercase text-silver mb-4">
              Energy Level
            </label>
            <div className="flex items-center gap-4">
              <span className="text-silver text-sm">Low</span>
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                style={{ '--value': `${(energyLevel - 1) * 11.11}%` } as React.CSSProperties}
                className="flex-1"
              />
              <span className="text-silver text-sm">High</span>
            </div>
            <p className="text-center text-3xl font-serif text-gold mt-4">
              {energyLevel}<span className="text-silver text-lg">/10</span>
            </p>
          </div>

          {/* Sleep Quality */}
          <div className="card">
            <label className="block text-sm tracking-widest uppercase text-silver mb-4">
              Sleep Quality
            </label>
            <div className="flex items-center gap-4">
              <span className="text-silver text-sm">Poor</span>
              <input
                type="range"
                min="1"
                max="10"
                value={sleepQuality}
                onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                style={{ '--value': `${(sleepQuality - 1) * 11.11}%` } as React.CSSProperties}
                className="flex-1"
              />
              <span className="text-silver text-sm">Great</span>
            </div>
            <p className="text-center text-3xl font-serif text-gold mt-4">
              {sleepQuality}<span className="text-silver text-lg">/10</span>
            </p>
            
            <div className="mt-4 pt-4 border-t border-gold/10">
              <label className="block text-xs tracking-widest uppercase text-silver mb-2">
                Hours slept
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                  style={{ '--value': `${((sleepHours - 3) / 9) * 100}%` } as React.CSSProperties}
                  className="flex-1"
                />
                <span className="text-gold font-serif text-xl w-12 text-right">
                  {sleepHours}h
                </span>
              </div>
            </div>
          </div>

          {/* Stress Level */}
          <div className="card">
            <label className="block text-sm tracking-widest uppercase text-silver mb-4">
              Stress Level
            </label>
            <div className="flex items-center gap-4">
              <span className="text-silver text-sm">Calm</span>
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(parseInt(e.target.value))}
                style={{ '--value': `${(stressLevel - 1) * 11.11}%` } as React.CSSProperties}
                className="flex-1"
              />
              <span className="text-silver text-sm">High</span>
            </div>
            <p className="text-center text-3xl font-serif text-gold mt-4">
              {stressLevel}<span className="text-silver text-lg">/10</span>
            </p>
          </div>

          {/* Mood */}
          <div className="card">
            <label className="block text-sm tracking-widest uppercase text-silver mb-4">
              Mood (select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {MOOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMood(toggleArrayItem(mood, option.value))}
                  className={`mood-btn ${mood.includes(option.value) ? 'selected' : ''}`}
                >
                  {option.emoji} {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Physical Symptoms */}
          <div className="card">
            <label className="block text-sm tracking-widest uppercase text-silver mb-4">
              Physical Symptoms
            </label>
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPhysicalSymptoms(toggleArrayItem(physicalSymptoms, option.value))}
                  className={`symptom-tag ${physicalSymptoms.includes(option.value) ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cravings */}
          <div className="card">
            <label className="block text-sm tracking-widest uppercase text-silver mb-4">
              Cravings
            </label>
            <div className="flex flex-wrap gap-2">
              {CRAVING_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    if (option.value === 'none') {
                      setCravings(['none']);
                    } else {
                      const newCravings = cravings.filter(c => c !== 'none');
                      setCravings(toggleArrayItem(newCravings, option.value));
                    }
                  }}
                  className={`symptom-tag ${cravings.includes(option.value) ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cycle Phase */}
          <div className="card">
            <label className="block text-sm tracking-widest uppercase text-silver mb-4">
              Cycle Phase (optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CYCLE_PHASES.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setCyclePhase(option.value)}
                  className={`p-3 text-left border rounded-lg transition-colors ${
                    cyclePhase === option.value
                      ? 'border-gold bg-gold/10'
                      : 'border-gold/20 hover:border-gold/40'
                  }`}
                >
                  <p className="text-cream text-sm">{option.label}</p>
                  <p className="text-silver text-xs">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="card">
            <label className="block text-sm tracking-widest uppercase text-silver mb-4">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional observations..."
              rows={3}
              className="w-full bg-transparent border border-gold/20 rounded-lg p-3 text-cream placeholder:text-silver/40 focus:border-gold focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <Check size={18} />
                Saved!
              </>
            ) : saving ? (
              'Saving...'
            ) : (
              <>
                <Save size={18} />
                Save Entry
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
