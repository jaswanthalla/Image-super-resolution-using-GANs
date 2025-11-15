import { Upload, Image as ImageIcon } from 'lucide-react';

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
}

export default function UploadSection({ onFileSelect }: UploadSectionProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-1">
            Upload Your Low-Resolution Image
          </p>
          <p className="text-sm text-gray-500">
            Drag and drop or click to select
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <ImageIcon className="w-4 h-4" />
          <span>Supports: JPG, PNG, WebP</span>
        </div>
      </label>
    </div>
  );
}
