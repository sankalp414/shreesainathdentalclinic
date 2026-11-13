// Time Utilities for 24-hour dental scheduling & slots

export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const clean = timeStr.trim().toUpperCase();
  if (clean === '24 HOURS' || clean === '11:59 PM' || clean === '23:59') return 1439;
  if (clean === '12:00 AM' || clean === '00:00' || clean.startsWith('12:00 AM')) return 0;
  
  // 12-hour format e.g. "08:30 AM" or "8:30 PM"
  const match12 = clean.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (match12) {
    let hours = parseInt(match12[1], 10);
    const minutes = parseInt(match12[2], 10);
    const ampm = match12[3];
    if (ampm) {
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
    }
    return hours * 60 + minutes;
  }
  return 0;
}

export function formatMinutesTo12h(totalMinutes: number): string {
  const norm = ((totalMinutes % 1440) + 1440) % 1440;
  let hours = Math.floor(norm / 60);
  const minutes = norm % 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const hStr = hours < 10 ? `0${hours}` : `${hours}`;
  const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hStr}:${mStr} ${ampm}`;
}

export function formatMinutesTo24h(totalMinutes: number): string {
  const norm = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(norm / 60);
  const minutes = norm % 60;
  const hStr = hours < 10 ? `0${hours}` : `${hours}`;
  const mStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hStr}:${mStr}`;
}

export function sortTimeSlotsChronologically(slots?: string[]): string[] {
  if (!Array.isArray(slots)) return [];
  return [...slots].sort((a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b));
}

export const STANDARD_TIME_OPTIONS: string[] = [
  '12:00 AM',
  '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM',
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
  '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
  '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM',
  '11:59 PM'
];

// 15-minute increment list for lunch breaks and fine tuning
export const STANDARD_TIME_OPTIONS_15MIN: string[] = (() => {
  const list: string[] = [];
  for (let m = 0; m < 1440; m += 15) {
    list.push(formatMinutesTo12h(m));
  }
  list.push('11:59 PM');
  return list;
})();

export function calculateTimeDifferenceMinutes(startTime: string, endTime: string): number {
  if (!startTime || !endTime || startTime === 'None' || endTime === 'None') return 0;
  const startMin = parseTimeToMinutes(startTime);
  let endMin = parseTimeToMinutes(endTime);
  if (endMin <= startMin) endMin += 1440;
  return endMin - startMin;
}

export interface TimeOption {
  value: string;
  label12h: string;
  label24h: string;
  period: 'night' | 'morning' | 'afternoon' | 'evening';
}

// Generate complete 24-hour dropdown options in 15-minute increments (96 options + 11:59 PM)
export function generate24HourOptions(intervalMinutes: number = 15): TimeOption[] {
  const options: TimeOption[] = [];
  for (let m = 0; m < 1440; m += intervalMinutes) {
    const val12h = formatMinutesTo12h(m);
    const val24h = formatMinutesTo24h(m);
    let period: 'night' | 'morning' | 'afternoon' | 'evening' = 'morning';
    if (m < 360) period = 'night'; // 00:00 - 05:59
    else if (m < 720) period = 'morning'; // 06:00 - 11:59
    else if (m < 1020) period = 'afternoon'; // 12:00 - 16:59
    else if (m < 1260) period = 'evening'; // 17:00 - 20:59
    else period = 'night'; // 21:00 - 23:59

    options.push({
      value: val12h,
      label12h: `${val12h} (${val24h})`,
      label24h: `${val24h} [${val12h}]`,
      period,
    });
  }
  
  // Include 11:59 PM for full day coverage
  options.push({
    value: '11:59 PM',
    label12h: '11:59 PM (23:59 - End of Day)',
    label24h: '23:59 (11:59 PM - End of Day)',
    period: 'night',
  });
  return options;
}

// Generate time slots based on opening time, closing time, duration, and lunch break
export function generateSlotsForSchedule(
  startTime: string,
  endTime: string,
  durationMinutes: number = 45,
  lunchStart?: string,
  lunchEnd?: string
): string[] {
  let startMin = parseTimeToMinutes(startTime);
  let endMin = parseTimeToMinutes(endTime);
  
  // If 24 hours round the clock (e.g. 12:00 AM to 11:59 PM or same time), cover full day
  const is24h = (startTime === '12:00 AM' && (endTime === '11:59 PM' || endTime === '12:00 AM')) ||
                (startMin === endMin && startTime !== '');
  
  const slots: string[] = [];
  const lunchStartMin = (lunchStart && lunchStart !== 'None' && lunchStart !== 'No Break') ? parseTimeToMinutes(lunchStart) : -1;
  const lunchEndMin = (lunchEnd && lunchEnd !== 'None' && lunchEnd !== 'No Break') ? parseTimeToMinutes(lunchEnd) : -1;

  if (is24h) {
    startMin = 0;
    endMin = 1440;
  } else if (endMin <= startMin) {
    // Crosses midnight (e.g. 08:00 PM to 06:00 AM)
    endMin += 1440;
  }

  let curr = startMin;
  const step = Math.max(15, durationMinutes);

  while (curr + step <= endMin || (is24h && curr < 1440)) {
    const slotMin = curr % 1440;
    
    // Check lunch collision
    let inLunch = false;
    if (lunchStartMin !== -1 && lunchEndMin !== -1) {
      if (lunchStartMin < lunchEndMin) {
        if (slotMin >= lunchStartMin && slotMin < lunchEndMin) inLunch = true;
      } else {
        // Overnight break
        if (slotMin >= lunchStartMin || slotMin < lunchEndMin) inLunch = true;
      }
    }

    if (!inLunch) {
      slots.push(formatMinutesTo12h(slotMin));
    }
    curr += step;
  }

  return sortTimeSlotsChronologically(Array.from(new Set(slots)));
}

export function getTimeSlotPeriod(slot: string): 'night' | 'morning' | 'afternoon' | 'evening' {
  const m = parseTimeToMinutes(slot);
  if (m < 360) return 'night'; // 00:00 - 05:59
  if (m < 720) return 'morning'; // 06:00 - 11:59
  if (m < 1020) return 'afternoon'; // 12:00 - 16:59
  if (m < 1260) return 'evening'; // 17:00 - 20:59
  return 'night'; // 21:00 - 23:59
}