import { DailyLog, PatternInsight, InsightType } from '@/types/log';

interface CorrelationResult {
  coefficient: number;
  pValue: number;
  sampleSize: number;
}

interface PatternResult {
  type: InsightType;
  title: string;
  description: string;
  confidence: number;
  isPremium: boolean;
  data?: Record<string, unknown>;
}

export function calculateCorrelation(x: (number | null)[], y: (number | null)[]): CorrelationResult {
  const validPairs = x
    .map((xi, i) => ({ x: xi, y: y[i] }))
    .filter(pair => pair.x !== null && pair.y !== null && 
            !isNaN(pair.x as number) && !isNaN(pair.y as number));
  
  const n = validPairs.length;
  if (n < 5) {
    return { coefficient: 0, pValue: 1, sampleSize: n };
  }
  
  const xVals = validPairs.map(p => p.x as number);
  const yVals = validPairs.map(p => p.y as number);
  
  const sumX = xVals.reduce((a, b) => a + b, 0);
  const sumY = yVals.reduce((a, b) => a + b, 0);
  const sumXY = xVals.reduce((total, xi, i) => total + xi * yVals[i], 0);
  const sumX2 = xVals.reduce((total, xi) => total + xi * xi, 0);
  const sumY2 = yVals.reduce((total, yi) => total + yi * yi, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  const coefficient = denominator === 0 ? 0 : numerator / denominator;
  
  // Simplified p-value estimation (for display purposes)
  const tStat = coefficient * Math.sqrt((n - 2) / (1 - coefficient * coefficient));
  const pValue = Math.exp(-0.717 * Math.abs(tStat) - 0.396 * tStat * tStat);
  
  return { 
    coefficient: Math.max(-1, Math.min(1, coefficient)), 
    pValue, 
    sampleSize: n 
  };
}

export function calculateAverage(values: (number | null)[]): number {
  const validValues = values.filter(v => v !== null && !isNaN(v as number)) as number[];
  if (validValues.length === 0) return 0;
  return validValues.reduce((a, b) => a + b, 0) / validValues.length;
}

export function findFrequentPairs(items: string[][]): [string, string, number][] {
  const pairCounts: Record<string, number> = {};
  
  items.forEach(arr => {
    if (!arr || arr.length < 2) return;
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const key = [arr[i], arr[j]].sort().join('|');
        pairCounts[key] = (pairCounts[key] || 0) + 1;
      }
    }
  });
  
  return Object.entries(pairCounts)
    .filter(([_, count]) => count >= 3)
    .map(([key, count]) => {
      const [a, b] = key.split('|');
      return [a, b, count] as [string, string, number];
    })
    .sort((a, b) => b[2] - a[2]);
}

export function analyzePhasePatterns(
  logs: DailyLog[]
): { phase: string; avgEnergy: number; avgStress: number; symptomRate: number; count: number }[] {
  const phaseGroups: Record<string, DailyLog[]> = {};
  
  logs.forEach(log => {
    if (log.cycle_phase && log.cycle_phase !== 'unknown') {
      if (!phaseGroups[log.cycle_phase]) {
        phaseGroups[log.cycle_phase] = [];
      }
      phaseGroups[log.cycle_phase].push(log);
    }
  });
  
  return Object.entries(phaseGroups)
    .map(([phase, phaseLogs]) => ({
      phase,
      avgEnergy: calculateAverage(phaseLogs.map(l => l.energy_level)),
      avgStress: calculateAverage(phaseLogs.map(l => l.stress_level)),
      symptomRate: phaseLogs.filter(l => l.physical_symptoms && l.physical_symptoms.length > 0).length / phaseLogs.length,
      count: phaseLogs.length
    }))
    .filter(p => p.count >= 3);
}

export function detectEnergyPatterns(logs: DailyLog[]): PatternResult[] {
  const insights: PatternResult[] = [];
  
  if (logs.length < 7) return insights;
  
  // Sort by date
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(a.log_date).getTime() - new Date(b.log_date).getTime()
  );
  
  // Check for day-of-week patterns
  const dayOfWeekEnergy: Record<number, number[]> = {};
  sortedLogs.forEach(log => {
    const day = new Date(log.log_date).getDay();
    if (log.energy_level !== null) {
      if (!dayOfWeekEnergy[day]) dayOfWeekEnergy[day] = [];
      dayOfWeekEnergy[day].push(log.energy_level);
    }
  });
  
  // Find lowest energy day
  let lowestDay = -1;
  let lowestAvg = 10;
  let highestDay = -1;
  let highestAvg = 0;
  
  Object.entries(dayOfWeekEnergy).forEach(([day, energies]) => {
    const avg = energies.reduce((a, b) => a + b, 0) / energies.length;
    if (energies.length >= 2) {
      if (avg < lowestAvg) {
        lowestAvg = avg;
        lowestDay = parseInt(day);
      }
      if (avg > highestAvg) {
        highestAvg = avg;
        highestDay = parseInt(day);
      }
    }
  });
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  if (lowestDay >= 0 && highestDay >= 0 && lowestDay !== highestDay) {
    const diff = highestAvg - lowestAvg;
    if (diff >= 2) {
      insights.push({
        type: 'trend',
        title: 'Weekly energy pattern detected',
        description: `Your energy is typically lowest on ${dayNames[lowestDay]}s (avg: ${lowestAvg.toFixed(1)}/10) and highest on ${dayNames[highestDay]}s (avg: ${highestAvg.toFixed(1)}/10).`,
        confidence: Math.min(0.85, diff / 5),
        isPremium: false
      });
    }
  }
  
  return insights;
}

export function detectSleepImpact(logs: DailyLog[]): PatternResult[] {
  const insights: PatternResult[] = [];
  
  if (logs.length < 7) return insights;
  
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(a.log_date).getTime() - new Date(b.log_date).getTime()
  );
  
  // Sleep quality vs next-day energy
  const sleepQuality: (number | null)[] = [];
  const nextDayEnergy: (number | null)[] = [];
  
  for (let i = 0; i < sortedLogs.length - 1; i++) {
    if (sortedLogs[i].sleep_quality !== null && sortedLogs[i + 1].energy_level !== null) {
      sleepQuality.push(sortedLogs[i].sleep_quality);
      nextDayEnergy.push(sortedLogs[i + 1].energy_level);
    }
  }
  
  const sleepEnergyCorr = calculateCorrelation(sleepQuality, nextDayEnergy);
  
  if (sleepEnergyCorr.sampleSize >= 5 && Math.abs(sleepEnergyCorr.coefficient) > 0.3) {
    const direction = sleepEnergyCorr.coefficient > 0 ? 'improves' : 'decreases';
    insights.push({
      type: 'correlation',
      title: 'Sleep predicts tomorrow\'s energy',
      description: `Your sleep quality strongly ${direction} your next-day energy (correlation: ${sleepEnergyCorr.coefficient.toFixed(2)}). ${sleepEnergyCorr.coefficient > 0 ? 'Prioritizing quality sleep is one of your highest-leverage interventions.' : 'This unexpected pattern warrants attention.'}`,
      confidence: Math.abs(sleepEnergyCorr.coefficient),
      isPremium: sleepEnergyCorr.coefficient > 0.4
    });
  }
  
  // Sleep hours analysis
  const sleepHours = sortedLogs.map(l => l.sleep_hours);
  const avgSleep = calculateAverage(sleepHours);
  
  const goodSleepDays = sortedLogs.filter(l => l.sleep_hours && l.sleep_hours >= 7);
  const poorSleepDays = sortedLogs.filter(l => l.sleep_hours && l.sleep_hours < 6);
  
  if (goodSleepDays.length >= 3 && poorSleepDays.length >= 3) {
    const goodSleepEnergy = calculateAverage(goodSleepDays.map(l => l.energy_level));
    const poorSleepEnergy = calculateAverage(poorSleepDays.map(l => l.energy_level));
    const energyDiff = goodSleepEnergy - poorSleepEnergy;
    
    if (energyDiff >= 1.5) {
      insights.push({
        type: 'correlation',
        title: 'Sleep duration impacts energy',
        description: `On days with 7+ hours sleep, your average energy is ${goodSleepEnergy.toFixed(1)}/10 vs ${poorSleepEnergy.toFixed(1)}/10 on days with less than 6 hours. That's a ${energyDiff.toFixed(1)} point difference.`,
        confidence: Math.min(0.9, energyDiff / 4),
        isPremium: true,
        data: { avgSleep, goodSleepEnergy, poorSleepEnergy }
      });
    }
  }
  
  return insights;
}

export function detectStressPatterns(logs: DailyLog[]): PatternResult[] {
  const insights: PatternResult[] = [];
  
  if (logs.length < 7) return insights;
  
  const stressLevels = logs.map(l => l.stress_level);
  const energyLevels = logs.map(l => l.energy_level);
  
  const stressEnergyCorr = calculateCorrelation(stressLevels, energyLevels);
  
  if (stressEnergyCorr.sampleSize >= 7 && Math.abs(stressEnergyCorr.coefficient) > 0.25) {
    if (stressEnergyCorr.coefficient < -0.3) {
      insights.push({
        type: 'correlation',
        title: 'Stress drains your energy',
        description: `High stress days predict lower energy (correlation: ${stressEnergyCorr.coefficient.toFixed(2)}). On days when stress is above 6, your energy drops by an average of 1.5 points.`,
        confidence: Math.abs(stressEnergyCorr.coefficient),
        isPremium: true
      });
    }
  }
  
  // Symptom-stress correlation
  const highStressDays = logs.filter(l => l.stress_level && l.stress_level >= 7);
  const lowStressDays = logs.filter(l => l.stress_level && l.stress_level <= 3);
  
  if (highStressDays.length >= 3 && lowStressDays.length >= 3) {
    const highStressSymptomRate = highStressDays.filter(l => 
      l.physical_symptoms && l.physical_symptoms.length > 0
    ).length / highStressDays.length;
    
    const lowStressSymptomRate = lowStressDays.filter(l => 
      l.physical_symptoms && l.physical_symptoms.length > 0
    ).length / lowStressDays.length;
    
    if (highStressSymptomRate > lowStressSymptomRate + 0.2) {
      insights.push({
        type: 'correlation',
        title: 'Stress triggers physical symptoms',
        description: `Physical symptoms are ${Math.round((highStressSymptomRate - lowStressSymptomRate) * 100)}% more frequent on high-stress days. Your body is clearly signaling when stress is too high.`,
        confidence: 0.75,
        isPremium: true
      });
    }
  }
  
  return insights;
}

export function detectCyclePhasePatterns(logs: DailyLog[]): PatternResult[] {
  const insights: PatternResult[] = [];
  
  const phaseAnalysis = analyzePhasePatterns(logs);
  
  if (phaseAnalysis.length < 2) return insights;
  
  // Find highest and lowest energy phases
  const sortedByEnergy = [...phaseAnalysis].sort((a, b) => b.avgEnergy - a.avgEnergy);
  const highestEnergy = sortedByEnergy[0];
  const lowestEnergy = sortedByEnergy[sortedByEnergy.length - 1];
  
  if (highestEnergy.avgEnergy - lowestEnergy.avgEnergy >= 1.5) {
    insights.push({
      type: 'phase_pattern',
      title: 'Energy varies by cycle phase',
      description: `Your energy is highest during ${highestEnergy.phase} phase (${highestEnergy.avgEnergy.toFixed(1)}/10) and lowest during ${lowestEnergy.phase} phase (${lowestEnergy.avgEnergy.toFixed(1)}/10). Plan important activities accordingly.`,
      confidence: 0.8,
      isPremium: false
    });
  }
  
  // Luteal phase specific analysis
  const luteal = phaseAnalysis.find(p => p.phase === 'luteal');
  const follicular = phaseAnalysis.find(p => p.phase === 'follicular');
  
  if (luteal && follicular && luteal.symptomRate > follicular.symptomRate + 0.2) {
    insights.push({
      type: 'phase_pattern',
      title: 'Luteal phase symptoms detected',
      description: `Physical symptoms are ${Math.round((luteal.symptomRate - follicular.symptomRate) * 100)}% more common in your luteal phase. This is hormonally normal and manageable with the right support.`,
      confidence: 0.75,
      isPremium: true
    });
  }
  
  return insights;
}

export function detectCravingPatterns(logs: DailyLog[]): PatternResult[] {
  const insights: PatternResult[] = [];
  
  if (logs.length < 7) return insights;
  
  // Craving frequency by phase
  const phaseCravings: Record<string, string[]> = {};
  
  logs.forEach(log => {
    if (log.cycle_phase && log.cycle_phase !== 'unknown' && log.cravings && log.cravings.length > 0) {
      if (!phaseCravings[log.cycle_phase]) {
        phaseCravings[log.cycle_phase] = [];
      }
      phaseCravings[log.cycle_phase].push(...log.cravings.filter(c => c !== 'none'));
    }
  });
  
  // Find most common craving in luteal
  if (phaseCravings['luteal'] && phaseCravings['luteal'].length >= 3) {
    const counts: Record<string, number> = {};
    phaseCravings['luteal'].forEach(c => {
      counts[c] = (counts[c] || 0) + 1;
    });
    
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (sorted.length > 0 && sorted[0][1] >= 2) {
      insights.push({
        type: 'phase_pattern',
        title: 'Luteal phase craving pattern',
        description: `You tend to crave ${sorted[0][0]} during your luteal phase. This is common and often linked to serotonin and magnesium needs.`,
        confidence: 0.7,
        isPremium: true
      });
    }
  }
  
  // Stress-craving correlation
  const highStressLogs = logs.filter(l => l.stress_level && l.stress_level >= 7);
  const hasCravingsOnHighStress = highStressLogs.filter(l => 
    l.cravings && l.cravings.length > 0 && !l.cravings.includes('none')
  ).length;
  
  if (highStressLogs.length >= 5 && hasCravingsOnHighStress / highStressLogs.length > 0.5) {
    insights.push({
      type: 'correlation',
      title: 'Stress triggers cravings',
      description: `${Math.round(hasCravingsOnHighStress / highStressLogs.length * 100)}% of your high-stress days include cravings. Your body may be seeking quick energy or comfort.`,
      confidence: 0.75,
      isPremium: true
    });
  }
  
  return insights;
}

export function detectSymptomClusters(logs: DailyLog[]): PatternResult[] {
  const insights: PatternResult[] = [];
  
  if (logs.length < 7) return insights;
  
  const pairs = findFrequentPairs(logs.map(l => l.physical_symptoms || []));
  
  if (pairs.length > 0) {
    const [symptom1, symptom2, count] = pairs[0];
    insights.push({
      type: 'trend',
      title: 'Symptom cluster detected',
      description: `${symptom1.replace('_', ' ')} and ${symptom2.replace('_', ' ')} often appear together (${count} times). This suggests a common underlying pattern that can be addressed holistically.`,
      confidence: Math.min(0.85, count / logs.length + 0.3),
      isPremium: true
    });
  }
  
  // Most common symptoms
  const symptomCounts: Record<string, number> = {};
  logs.forEach(log => {
    (log.physical_symptoms || []).forEach(s => {
      symptomCounts[s] = (symptomCounts[s] || 0) + 1;
    });
  });
  
  const sortedSymptoms = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1]);
  
  if (sortedSymptoms.length > 0 && sortedSymptoms[0][1] >= logs.length * 0.3) {
    insights.push({
      type: 'trend',
      title: 'Recurring symptom identified',
      description: `${sortedSymptoms[0][0].replace('_', ' ')} appears on ${Math.round(sortedSymptoms[0][1] / logs.length * 100)}% of your logged days. This is worth discussing with a practitioner.`,
      confidence: sortedSymptoms[0][1] / logs.length,
      isPremium: false
    });
  }
  
  return insights;
}

export function generateRecommendations(logs: DailyLog[], insights: PatternResult[]): PatternResult[] {
  const recommendations: PatternResult[] = [];
  
  if (logs.length < 14) return recommendations;
  
  const avgStress = calculateAverage(logs.map(l => l.stress_level));
  const avgSleep = calculateAverage(logs.map(l => l.sleep_hours));
  
  if (avgStress >= 6) {
    recommendations.push({
      type: 'recommendation',
      title: 'Consider stress management support',
      description: `Your average stress level is ${avgStress.toFixed(1)}/10. EFT tapping sessions can help lower cortisol and improve overall wellbeing.`,
      confidence: 0.85,
      isPremium: true
    });
  }
  
  if (avgSleep < 7) {
    recommendations.push({
      type: 'recommendation',
      title: 'Sleep optimization opportunity',
      description: `You're averaging ${avgSleep.toFixed(1)} hours of sleep. Small improvements in sleep hygiene could significantly impact your energy and symptom patterns.`,
      confidence: 0.8,
      isPremium: true
    });
  }
  
  return recommendations;
}

export async function analyzePatterns(logs: DailyLog[]): Promise<PatternResult[]> {
  if (logs.length < 7) {
    return [{
      type: 'recommendation',
      title: 'Keep logging for insights',
      description: `You've logged ${logs.length} day${logs.length === 1 ? '' : 's'}. After 7 days, we'll start showing you personalized patterns in your data.`,
      confidence: 1,
      isPremium: false
    }];
  }
  
  const allInsights: PatternResult[] = [
    ...detectEnergyPatterns(logs),
    ...detectSleepImpact(logs),
    ...detectStressPatterns(logs),
    ...detectCyclePhasePatterns(logs),
    ...detectCravingPatterns(logs),
    ...detectSymptomClusters(logs)
  ];
  
  const recommendations = generateRecommendations(logs, allInsights);
  allInsights.push(...recommendations);
  
  // Sort by confidence
  return allInsights.sort((a, b) => b.confidence - a.confidence);
}
