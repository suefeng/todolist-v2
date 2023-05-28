/**
 * format the date by Intl DateTimeFormatOptions
 * @function
 * @param {string} date
 * @param {Intl.DateTimeFormatOptions} options
 * @example
 * const options: Intl.DateTimeFormatOptions = {
 *   weekday: "long",
 *   year: "numeric",
 *   month: "long",
 *   day: "numeric",
 * };
 * formattedDate({ date: date, options: options })
 * Thursday, December 20, 2012
 */

const defaultDateOptions: Intl.DateTimeFormatOptions = {
  month: 'long',
  year: 'numeric',
};
export const formatDate = (
  date: string | number,
  options: Intl.DateTimeFormatOptions = defaultDateOptions,
) => {
  return new Date(date).toLocaleDateString('en-US', options);
};
