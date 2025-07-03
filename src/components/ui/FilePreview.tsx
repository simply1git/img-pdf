import React from 'react';
import { X, FileImage, FilePdf, AlertCircle, Check, Loader } from 'lucide-react';
import { useConversion } from '../../context/ConversionContext';

interface FilePreviewProps {
  id: string;
  name: string;
  type: 'image' | 'pdf';
  preview?: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  error?: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ 
  id, 
  name, 
  type, 
  preview, 
  status,
  error
}) => {
  const { removeFile } = useConversion();

  const handleRemove = () => {
    removeFile(id);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader className="h-5 w-5 text-primary dark:text-secondary animate-spin" />;
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-accent" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative group flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-secondary transition-all">
      <div className="flex-shrink-0 mr-3">
        {type === 'image' && preview ? (
          <div className="h-12 w-12 rounded overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img 
              src={preview} 
              alt={name} 
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-12 w-12 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-700">
            {type === 'image' ? (
              <FileImage className="h-6 w-6 text-primary dark:text-secondary" />
            ) : (
              <FilePdf className="h-6 w-6 text-accent" />
            )}
          </div>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate" title={name}>
          {name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {status === 'error' ? (
            <span className="text-accent">{error || 'Error processing file'}</span>
          ) : (
            type === 'image' ? 'Image file' : 'PDF document'
          )}
        </p>
      </div>
      
      <div className="flex-shrink-0 ml-2 flex items-center space-x-2">
        {getStatusIcon()}
        
        <button
          onClick={handleRemove}
          className="p-1 rounded-full text-gray-400 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          aria-label="Remove file"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FilePreview;