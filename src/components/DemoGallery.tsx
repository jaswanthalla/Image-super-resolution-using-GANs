import { ImagePair } from '../types';

interface DemoGalleryProps {
  images: ImagePair[];
  onSelectImage: (image: ImagePair) => void;
  selectedId?: string;
}

export default function DemoGallery({ images, onSelectImage, selectedId }: DemoGalleryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Example Images</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => onSelectImage(image)}
            className={`group relative aspect-square rounded-lg overflow-hidden transition-all ${
              selectedId === image.id
                ? 'ring-4 ring-blue-500 scale-105'
                : 'ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-300 hover:scale-102'
            }`}
          >
            <img
              src={image.lowRes}
              alt={image.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-white text-xs font-medium truncate">{image.name}</p>
              </div>
            </div>
            {selectedId === image.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
