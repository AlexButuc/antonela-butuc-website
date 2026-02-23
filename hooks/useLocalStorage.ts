import { useState, useEffect, useCallback } from 'react';
import { DailyLog } from '@/types/log';

const STORAGE_KEY = 'hormonal_tracker_logs';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

export function useLogs() {
  const [logs, setLogs] = useLocalStorage<DailyLog[]>(STORAGE_KEY, []);

  const saveLog = useCallback((logData: Partial<DailyLog> & { log_date: string }) => {
    const now = new Date().toISOString();
    const existingIndex = logs.findIndex(l => l.log_date === logData.log_date);
    
    if (existingIndex >= 0) {
      // Update existing log
      setLogs(prev => prev.map((l, i) => 
        i === existingIndex 
          ? { ...l, ...logData, updated_at: now }
          : l
      ));
    } else {
      // Create new log
      const newLog: DailyLog = {
        id: `log-${Date.now()}`,
        user_id: 'demo-user-123',
        log_date: logData.log_date,
        energy_level: logData.energy_level ?? null,
        sleep_quality: logData.sleep_quality ?? null,
        stress_level: logData.stress_level ?? null,
        sleep_hours: logData.sleep_hours ?? null,
        mood: logData.mood ?? [],
        physical_symptoms: logData.physical_symptoms ?? [],
        cravings: logData.cravings ?? [],
        cycle_phase: logData.cycle_phase ?? null,
        cycle_day: logData.cycle_day ?? null,
        notes: logData.notes ?? null,
        created_at: now,
        updated_at: now,
      };
      setLogs(prev => [...prev, newLog].sort((a, b) => 
        new Date(b.log_date).getTime() - new Date(a.log_date).getTime()
      ));
    }
  }, [logs, setLogs]);

  const getLogByDate = useCallback((date: string) => {
    return logs.find(l => l.log_date === date);
  }, [logs]);

  const deleteLog = useCallback((logId: string) => {
    setLogs(prev => prev.filter(l => l.id !== logId));
  }, [setLogs]);

  return {
    logs,
    saveLog,
    getLogByDate,
    deleteLog,
  };
}

export function useProfile() {
  const [profile, setProfile] = useLocalStorage<{
    display_name: string;
    cycle_length: number;
    subscription_status: 'free' | 'active';
  }>('hormonal_tracker_profile', {
    display_name: 'Demo User',
    cycle_length: 28,
    subscription_status: 'free',
  });

  return {
    profile,
    updateProfile: setProfile,
    isPremium: profile.subscription_status === 'active',
  };
}
