/**
 * Sums an array of numbers.
 * @param {number[]} numbers - Array of numbers to sum
 * @returns {number} The total sum
 */
export function sum(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

/**
 * Calculates the average of an array of numbers.
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The average value
 */
export function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

/**
 * Splits text into lines and returns their lengths.
 * @param {string} text - Input text
 * @returns {number[]} Array of line lengths
 */
export function lineLengths(text) {
  if (typeof text !== "string" || text.length === 0) return [];
  return text
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => line.length);
}

/**
 * Finds the maximum number in an array.
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The maximum value
 */
export function max(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;
  return Math.max(...numbers);
}
