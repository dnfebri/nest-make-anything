/**
 * Formats a string by replacing placeholders with corresponding values.
 * Placeholders are specified using the format specifiers %s, %d, and %f.
 *
 * @param {string} template - The template string with placeholders.
 * @param {...(string | number)} values - The values to replace the placeholders with.
 * @returns {string} The formatted string.
 */
export function formatString(
  template: string,
  ...values: (string | number)[]
): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return template.replace(/%[sdf]/g, (_match) => {
    const value = values.shift();
    return String(value);
  });
}
