/**
 * Resizes an image to a maximum dimension while maintaining aspect ratio
 */
export async function resizeImage(dataUrl: string, maxDim: number = 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height *= maxDim / width;
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width *= maxDim / height;
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Could not get canvas context');

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * Normalizes player name (Automatic capitalization)
 */
export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats a metric value
 */
export function formatMetric(value: string | number, unit: 'm' | 'kg'): string {
  if (unit === 'm') {
    const num = parseFloat(String(value));
    return isNaN(num) ? '-' : num.toFixed(2) + ' m';
  }
  return value + ' kg';
}
