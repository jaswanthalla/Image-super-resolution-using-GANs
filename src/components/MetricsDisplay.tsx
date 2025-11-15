import { Activity, TrendingUp } from 'lucide-react';
import { QualityMetrics } from '../types';

interface MetricsDisplayProps {
  metrics: QualityMetrics;
  processingTime?: number;
}

export default function MetricsDisplay({ metrics, processingTime }: MetricsDisplayProps) {
  const getQualityLevel = (psnr: number): { level: string; color: string } => {
    if (psnr >= 40) return { level: 'Excellent', color: 'text-green-600' };
    if (psnr >= 35) return { level: 'Very Good', color: 'text-blue-600' };
    if (psnr >= 30) return { level: 'Good', color: 'text-yellow-600' };
    return { level: 'Fair', color: 'text-orange-600' };
  };

  const quality = getQualityLevel(metrics.psnr);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-600" />
        Quality Metrics
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4" />
            PSNR
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {metrics.psnr.toFixed(2)}
            <span className="text-sm font-normal text-gray-500 ml-1">dB</span>
          </div>
          <div className={`text-sm font-medium ${quality.color}`}>{quality.level}</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4" />
            SSIM
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {metrics.ssim.toFixed(3)}
          </div>
          <div className="text-sm text-gray-500">Structural Similarity</div>
        </div>

        {processingTime !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Activity className="w-4 h-4" />
              Processing Time
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {processingTime.toFixed(0)}
              <span className="text-sm font-normal text-gray-500 ml-1">ms</span>
            </div>
            <div className="text-sm text-gray-500">Computation Speed</div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">PSNR Range</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-green-50 text-green-700 rounded">40+ dB: Excellent</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 mb-1">SSIM Range</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">0.9+: High Quality</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
