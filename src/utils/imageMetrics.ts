export function calculatePSNR(img1: ImageData, img2: ImageData): number {
  const mse = calculateMSE(img1, img2);
  if (mse === 0) return 100;
  const maxPixelValue = 255;
  return 20 * Math.log10(maxPixelValue / Math.sqrt(mse));
}

export function calculateSSIM(img1: ImageData, img2: ImageData): number {
  const c1 = 6.5025;
  const c2 = 58.5225;

  const mean1 = calculateMean(img1);
  const mean2 = calculateMean(img2);

  const variance1 = calculateVariance(img1, mean1);
  const variance2 = calculateVariance(img2, mean2);
  const covariance = calculateCovariance(img1, img2, mean1, mean2);

  const ssim =
    ((2 * mean1 * mean2 + c1) * (2 * covariance + c2)) /
    ((mean1 * mean1 + mean2 * mean2 + c1) * (variance1 + variance2 + c2));

  return Math.max(0, Math.min(1, ssim));
}

function calculateMSE(img1: ImageData, img2: ImageData): number {
  const data1 = img1.data;
  const data2 = img2.data;
  let sum = 0;
  let count = 0;

  for (let i = 0; i < data1.length; i += 4) {
    const diff1 = data1[i] - data2[i];
    const diff2 = data1[i + 1] - data2[i + 1];
    const diff3 = data1[i + 2] - data2[i + 2];

    sum += diff1 * diff1 + diff2 * diff2 + diff3 * diff3;
    count += 3;
  }

  return sum / count;
}

function calculateMean(img: ImageData): number {
  const data = img.data;
  let sum = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    sum += data[i] + data[i + 1] + data[i + 2];
    count += 3;
  }

  return sum / count;
}

function calculateVariance(img: ImageData, mean: number): number {
  const data = img.data;
  let sum = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    const diff1 = data[i] - mean;
    const diff2 = data[i + 1] - mean;
    const diff3 = data[i + 2] - mean;

    sum += diff1 * diff1 + diff2 * diff2 + diff3 * diff3;
    count += 3;
  }

  return sum / count;
}

function calculateCovariance(
  img1: ImageData,
  img2: ImageData,
  mean1: number,
  mean2: number
): number {
  const data1 = img1.data;
  const data2 = img2.data;
  let sum = 0;
  let count = 0;

  for (let i = 0; i < data1.length; i += 4) {
    sum +=
      (data1[i] - mean1) * (data2[i] - mean2) +
      (data1[i + 1] - mean1) * (data2[i + 1] - mean2) +
      (data1[i + 2] - mean1) * (data2[i + 2] - mean2);
    count += 3;
  }

  return sum / count;
}

export async function getImageData(imageSrc: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
}
