import React, { useCallback, useState } from 'react';
import { Upload, File, Image } from 'lucide-react';
import { useConversion } from '../../context/ConversionContext';

interface DropZoneProps {
  acceptedFileTypes: string;
  fileType: 'image' | 'pdf';
  multiple?: boolean;
  maxFiles?: number;
}

const DropZone: React.FC<DropZoneProps> = ({ 
  acceptedFileTypes, 
  fileType, 
  multiple = true,
  maxFiles = 10
}) => {
  const { addFiles, files } = useConversion();
  const [isDragging, setIsDragging] = useState(false);
  
  const currentFileCount = files.filter(f => f.type === fileType).length;
  const canAddMoreFiles = currentFileCount < maxFiles;

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (canAddMoreFiles) {
      setIsDragging(true);
    }
  }, [canAddMoreFiles]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!canAddMoreFiles) return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileType === 'image') {
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(fileExtension || '');
      } else {
        return fileExtension === 'pdf';
      }
    });
    
    const filesToAdd = validFiles.slice(0, maxFiles - currentFileCount);
    if (filesToAdd.length > 0) {
      addFiles(filesToAdd, fileType);
    }
  }, [addFiles, fileType, canAddMoreFiles, currentFileCount, maxFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !canAddMoreFiles) return;
    
    const selectedFiles = Array.from(e.target.files);
    const filesToAdd = selectedFiles.slice(0, maxFiles - currentFileCount);
    
    if (filesToAdd.length > 0) {
      addFiles(filesToAdd, fileType);
    }
    
    // Reset the input value so the same file can be selected again
    e.target.value = '';
  }, [addFiles, fileType, canAddMoreFiles, currentFileCount, maxFiles]);

  return (
    <div
      className={`drop-zone ${isDragging ? 'drop-zone-active' : ''} ${!canAddMoreFiles ? 'opacity-50 cursor-not-allowed' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id={`file-input-${fileType}`}
        className="hidden"
        accept={acceptedFileTypes}
        onChange={handleFileInputChange}
        multiple={multiple}
        disabled={!canAddMoreFiles}
      />
      <label 
        htmlFor={`file-input-${fileType}`}
        className={`flex flex-col items-center ${canAddMoreFiles ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      >
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
          {fileType === 'image' ? (
            <Image className="h-8 w-8 text-primary dark:text-secondary" />
          ) : (
            <File className="h-8 w-8 text-primary dark:text-secondary" />
          )}
        </div>
        <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
          {isDragging ? 'Drop files here' : (
            <>
              <span className="text-primary dark:text-secondary">Click to upload</span> or drag and drop
            </>
          )}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {fileType === 'image' 
            ? 'JPG, PNG, GIF, WEBP or BMP (max. 10MB each)' 
            : 'PDF files only (max. 20MB each)'}
        </p>
        {!canAddMoreFiles && (
          <p className="mt-2 text-sm text-accent">
            Maximum {maxFiles} files allowed
          </p>
        )}
      </label>
    </div>
  );
};

export default DropZone;