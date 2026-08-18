export function sum(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

export function average(numbers) {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

export function lineLengths(text) {
  return text
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => line.length);
}

export function max(numbers) {
  if (numbers.length === 0) return 0;
  return Math.max(...numbers);
}