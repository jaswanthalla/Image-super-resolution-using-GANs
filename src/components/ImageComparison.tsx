import { useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ImageComparisonProps {
  lowResImage: string;
  highResImage: string;
  imageName: string;
}

export default function ImageComparison({ lowResImage, highResImage, imageName }: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{imageName}</h3>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ZoomOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={highResImage}
          alt="High Resolution"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={lowResImage}
            alt="Low Resolution"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-gray-400 rounded-full" />
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
          Low Res
        </div>
        <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
          High Res
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Original</p>
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <img src={lowResImage} alt="Low Resolution" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Enhanced</p>
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <img src={highResImage} alt="High Resolution" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
