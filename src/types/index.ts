export interface ImagePair {
  id: string;
  name: string;
  lowRes: string;
  highRes: string;
  description: string;
}

export interface QualityMetrics {
  psnr: number;
  ssim: number;
}

export interface ProcessingResult {
  originalImage: string;
  enhancedImage: string;
  metrics: QualityMetrics;
  processingTime: number;
}
