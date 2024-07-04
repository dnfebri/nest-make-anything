import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as pluginTimezone from 'dayjs/plugin/timezone';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(pluginTimezone);

/**
 * Checks if a given value is a valid Date object.
 * @param date The value to check.
 * @returns A boolean indicating whether the value is a valid Date object.
 */
export function isDate(date: Date): boolean {
  if (!date) return false;
  return !isNaN(date.valueOf());
}

/**
 * Gets the date representing the same day and time from the previous week.
 * @returns The Date object representing the last week's date.
 */
export function getLastWeeksDate(): Date {
  return dayjs().subtract(7, 'day').toDate();
}

/**
 * Gets the current Unix timestamp.
 * @param timezone (Optional) The timezone to use. Defaults to 'Asia/Jakarta'.
 * @returns The current Unix timestamp.
 */
export function getCurrentUnixTimestamp(timezone?: string): number {
  return dayjs()
    .tz(timezone ?? 'Asia/Jakarta')
    .unix();
}

/**
 * Gets the ISO string representation of a future expiration date and time.
 * @param hours The number of hours to add to the current time.
 * @param minutes The number of minutes to add to the current time.
 * @returns The ISO string representation of the future expiration date and time.
 */
export function getExpiredIsoString(hours = 24, minutes = 0): string {
  const unix = this.getCurrentUnixTimestamp();
  return dayjs
    .unix(unix + hours * 3600 + minutes * 60)
    .utc()
    .toISOString();
}

/**
 * Gets the Date object representing a future expiration date and time.
 * @param hours The number of hours to add to the current time.
 * @param minutes The number of minutes to add to the current time.
 * @returns The Date object representing the future expiration date and time.
 */
export function getExpiredDate(hours = 24, minutes = 0): Date {
  const unix = this.getCurrentUnixTimestamp();
  return dayjs
    .unix(unix + hours * 3600 + minutes * 60)
    .utc()
    .toDate();
}

/**
 * Gets the Unix timestamp representing a future expiration date and time.
 * @param hours The number of hours to add to the current time.
 * @param minutes The number of minutes to add to the current time.
 * @returns The Unix timestamp representing the future expiration date and time.
 */
export function getExpiredUnix(hours = 24, minutes = 0): number {
  const unix = this.getCurrentUnixTimestamp();
  return dayjs
    .unix(unix + hours * 3600 + minutes * 60)
    .utc()
    .unix();
}

/**
 * Formats a Date object into a string representation.
 * @param date The Date object to format.
 * @returns The formatted string representation of the Date object.
 */
export function formatDate(date: Date): string {
  return dayjs(date).format('DD-MMMM-YYYY HH:mm:ss');
}

/**
 * Parses a time string and converts it to the corresponding TTL value in milliseconds.
 * The time string should be in the format of a number followed by a unit (e.g., "1d" for 1 day, "1h" for 1 hour).
 * Supported units: d (days), h (hours), m (minutes), y (years).
 * @param timeString The time string to parse.
 * @returns The TTL value in milliseconds.
 * @throws {Error} If the time string is in an invalid format or the unit is not supported.
 */
export function parseTimeToMilliseconds(timeString: string): number {
  const unitMap: { [key: string]: number } = {
    d: 24 * 60 * 60 * 1000, // days to milliseconds
    h: 60 * 60 * 1000, // hours to milliseconds
    m: 60 * 1000, // minutes to milliseconds
    y: 365 * 24 * 60 * 60 * 1000, // years to milliseconds
  };

  const regex = /^(\d+)([dhmy])$/;
  const match = timeString.match(regex);

  if (!match) {
    throw new Error('Invalid time format');
  }

  const amount = parseInt(match[1]);
  const unit = match[2];

  if (!unitMap.hasOwnProperty(unit)) {
    throw new Error('Invalid time unit');
  }

  return amount * unitMap[unit];
}

/**
 * Parses a time string and converts it to the corresponding duration in seconds.
 * The time string should be in the format of a number followed by a unit (e.g., "1d" for 1 day, "1h" for 1 hour).
 * Supported units: d (days), h (hours), m (minutes), s (seconds).
 * @param timeString The time string to parse.
 * @returns The duration in seconds.
 * @throws {Error} If the time string is in an invalid format or the unit is not supported.
 */
export function parseTimeToSeconds(timeString: string): number {
  const unitMap: { [key: string]: number } = {
    d: 24 * 60 * 60, // days to seconds
    h: 60 * 60, // hours to seconds
    m: 60, // minutes to seconds
    s: 1, // seconds
  };

  const regex = /^(\d+)([dhms])$/;
  const match = timeString.match(regex);

  if (!match) {
    throw new Error('Invalid time format');
  }

  const amount = parseInt(match[1]);
  const unit = match[2];

  if (!unitMap.hasOwnProperty(unit)) {
    throw new Error('Invalid time unit');
  }

  return amount * unitMap[unit];
}
