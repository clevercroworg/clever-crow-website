// Calling-hours maths in the organisation's time zone. Pure functions, no I/O.

type Window = { timezone: string; callingStart: string; callingEnd: string; allowedDays: number[] };

const WEEKDAY: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Local calendar parts of `date` in `timezone`. */
export function zonedParts(date: Date, timezone: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "short",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value])
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    weekday: WEEKDAY[parts.weekday as string],
  };
}

function minutesOf(hhmm: string) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm);
  if (!m) throw new Error(`Invalid time "${hhmm}"`);
  return Number(m[1]) * 60 + Number(m[2]);
}

/** UTC instant for a local wall-clock time in `timezone` (handles any fixed or DST offset). */
export function zonedTimeToUtc(year: number, month: number, day: number, hour: number, minute: number, timezone: string) {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  // Offset = (local reading of the guess) - guess; apply twice to settle DST edges.
  let ts = guess;
  for (let i = 0; i < 2; i++) {
    const p = zonedParts(new Date(ts), timezone);
    const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
    ts = guess - (asUtc - ts);
  }
  return new Date(ts);
}

/** Is `now` inside the calling window (allowed weekday, start <= time < end)? */
export function isWithinCallingHours(now: Date, w: Window) {
  const p = zonedParts(now, w.timezone);
  const t = p.hour * 60 + p.minute;
  return w.allowedDays.includes(p.weekday) && t >= minutesOf(w.callingStart) && t < minutesOf(w.callingEnd);
}

/** Start of the next calling window at or after `now` (returns `now` if already inside one). */
export function nextCallingWindowStart(now: Date, w: Window): Date {
  if (isWithinCallingHours(now, w)) return now;
  const start = minutesOf(w.callingStart);
  for (let offset = 0; offset < 8; offset++) {
    const day = new Date(now.getTime() + offset * 86_400_000);
    const p = zonedParts(day, w.timezone);
    if (!w.allowedDays.includes(p.weekday)) continue;
    const candidate = zonedTimeToUtc(p.year, p.month, p.day, Math.floor(start / 60), start % 60, w.timezone);
    if (candidate.getTime() > now.getTime()) return candidate;
  }
  throw new Error("No calling day is allowed in settings");
}

/** Start of "today" in the organisation's time zone, for daily limits. */
export function startOfLocalDay(now: Date, timezone: string) {
  const p = zonedParts(now, timezone);
  return zonedTimeToUtc(p.year, p.month, p.day, 0, 0, timezone);
}

/** Start of the current month in the organisation's time zone: the instant, and the date as "YYYY-MM-01". */
export function startOfLocalMonth(now: Date, timezone: string) {
  const p = zonedParts(now, timezone);
  return {
    instant: zonedTimeToUtc(p.year, p.month, 1, 0, 0, timezone),
    date: `${p.year}-${String(p.month).padStart(2, "0")}-01`,
  };
}

/** Today's date ("YYYY-MM-DD") in the organisation's time zone. */
export function localDate(now: Date, timezone: string) {
  const p = zonedParts(now, timezone);
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
}

/** Exponential backoff for retries: base, 2×base, 4×base … capped at 24 hours. */
export function retryDelayMinutes(attemptsSoFar: number, baseMinutes: number) {
  const factor = 2 ** Math.max(0, attemptsSoFar - 1);
  return Math.min(baseMinutes * factor, 24 * 60);
}
