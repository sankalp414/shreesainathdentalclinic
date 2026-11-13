export interface ToothData {
  number: number;
  fdiNumber: number;
  name: string;
  quadrant: 'upper_right' | 'upper_left' | 'lower_left' | 'lower_right';
  defaultCondition?: 'healthy' | 'decayed' | 'filled' | 'missing' | 'crown' | 'root_canal';
}

/**
 * Returns quadrant name for dental records.
 */
export function getQuadrantLabel(quadrant: ToothData['quadrant']): string {
  switch (quadrant) {
    case 'upper_right':
      return 'Maxillary Right (Q1)';
    case 'upper_left':
      return 'Maxillary Left (Q2)';
    case 'lower_left':
      return 'Mandibular Left (Q3)';
    case 'lower_right':
      return 'Mandibular Right (Q4)';
  }
}

/**
 * Returns color code corresponding to a tooth's condition for the Odontogram.
 */
export function getToothStatusColor(status?: string): string {
  switch (status) {
    case 'decayed':
      return '#ef4444'; // Red-500
    case 'filled':
      return '#3b82f6'; // Blue-500
    case 'crown':
      return '#f59e0b'; // Amber-500
    case 'root_canal':
      return '#8b5cf6'; // Violet-500
    case 'missing':
      return '#94a3b8'; // Slate-400
    case 'healthy':
    default:
      return '#10b981'; // Emerald-500
  }
}