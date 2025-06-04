import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a readable string
 * @param date Date to format
 * @returns Formatted date string in Indonesian format
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Get score percentage for visualization
 * @param score Current score
 * @param maxScore Maximum possible score
 * @returns Percentage value
 */
export function getScorePercentage(score: number, maxScore: number = 80): number {
  return (score / maxScore) * 100;
}

/**
 * Calculate dimension scores from answers array
 * @param answers Array of answers (0-4 for each question)
 * @returns Object with dimension scores
 */
export function calculateDimensionScores(answers: number[]) {
  return {
    emosi: answers.slice(0, 5).reduce((sum, val) => sum + (val === -1 ? 0 : val), 0),
    sosial: answers.slice(5, 10).reduce((sum, val) => sum + (val === -1 ? 0 : val), 0),
    spiritual: answers.slice(10, 15).reduce((sum, val) => sum + (val === -1 ? 0 : val), 0),
    fisik: answers.slice(15, 20).reduce((sum, val) => sum + (val === -1 ? 0 : val), 0),
  };
}