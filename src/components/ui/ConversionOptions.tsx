import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Button from './Button';

interface ImageToPdfOptionsProps {
  pageSize: string;
  setPageSize: (size: string) => void;
  pageOrientation: string;
  setPageOrientation: (orientation: string) => void;
  imageQuality: number;
  setImageQuality: (quality: number) => void;
}

export const ImageToPdfOptions: React.FC<ImageToPdfOptionsProps> = ({
  pageSize,
  setPageSize,
  pageOrientation,
  setPageOrientation,
  imageQuality,
  setImageQuality
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const pageSizes = [
    { value: 'a4', label: 'A4' },
    { value: 'letter', label: 'Letter' },
    { value: 'legal', label: 'Legal' }
  ];

  const orientations = [
    { value: 'portrait', label: 'Portrait' },
    { value: 'landscape', label: 'Landscape' }
  ];

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        leftIcon={<Settings size={16} />}
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2"
      >
        Conversion Options
      </Button>
      
      {isOpen && (
        <div className="card mt-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Page Size
            </label>
            <div className="flex space-x-2">
              {pageSizes.map(size => (
                <button
                  key={size.value}
                  type="button"
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    pageSize === size.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setPageSize(size.value)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Orientation
            </label>
            <div className="flex space-x-2">
              {orientations.map(orientation => (
                <button
                  key={orientation.value}
                  type="button"
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    pageOrientation === orientation.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setPageOrientation(orientation.value)}
                >
                  {orientation.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image Quality: {imageQuality}%
            </label>
            <input
              type="range"
              min="30"
              max="100"
              value={imageQuality}
              onChange={(e) => setImageQuality(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>Lower quality</span>
              <span>Higher quality</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface PdfToImageOptionsProps {
  imageFormat: string;
  setImageFormat: (format: string) => void;
  imageQuality: number;
  setImageQuality: (quality: number) => void;
  dpi: number;
  setDpi: (dpi: number) => void;
}

export const PdfToImageOptions: React.FC<PdfToImageOptionsProps> = ({
  imageFormat,
  setImageFormat,
  imageQuality,
  setImageQuality,
  dpi,
  setDpi
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formats = [
    { value: 'png', label: 'PNG' },
    { value: 'jpeg', label: 'JPEG' },
    { value: 'webp', label: 'WebP' }
  ];

  const dpiOptions = [
    { value: 72, label: '72 DPI' },
    { value: 150, label: '150 DPI' },
    { value: 300, label: '300 DPI' }
  ];

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        leftIcon={<Settings size={16} />}
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2"
      >
        Conversion Options
      </Button>
      
      {isOpen && (
        <div className="card mt-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image Format
            </label>
            <div className="flex space-x-2">
              {formats.map(format => (
                <button
                  key={format.value}
                  type="button"
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    imageFormat === format.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setImageFormat(format.value)}
                >
                  {format.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Resolution
            </label>
            <div className="flex space-x-2">
              {dpiOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`px-3 py-1.5 text-sm rounded-md ${
                    dpi === option.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setDpi(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          {imageFormat === 'jpeg' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image Quality: {imageQuality}%
              </label>
              <input
                type="range"
                min="30"
                max="100"
                value={imageQuality}
                onChange={(e) => setImageQuality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Lower quality</span>
                <span>Higher quality</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};