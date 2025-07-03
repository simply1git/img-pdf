import React, { createContext, useState, useContext, ReactNode } from 'react';

type FileType = 'image' | 'pdf';

interface ConversionFile {
  id: string;
  file: File;
  preview?: string;
  type: FileType;
  status: 'idle' | 'processing' | 'completed' | 'error';
  result?: Blob;
  error?: string;
}

interface ConversionContextType {
  files: ConversionFile[];
  addFiles: (newFiles: File[], type: FileType) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  updateFileStatus: (id: string, status: ConversionFile['status'], result?: Blob, error?: string) => void;
  conversionProgress: number;
  setConversionProgress: (progress: number) => void;
  isConverting: boolean;
  setIsConverting: (isConverting: boolean) => void;
}

const ConversionContext = createContext<ConversionContextType | undefined>(undefined);

export const ConversionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<ConversionFile[]>([]);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);

  const addFiles = (newFiles: File[], type: FileType) => {
    const newFileObjects = Array.from(newFiles).map(file => ({
      id: crypto.randomUUID(),
      file,
      type,
      status: 'idle' as const,
      preview: type === 'image' ? URL.createObjectURL(file) : undefined
    }));

    setFiles(prev => [...prev, ...newFileObjects]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(file => file.id !== id);
    });
  };

  const clearFiles = () => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
    setConversionProgress(0);
  };

  const updateFileStatus = (
    id: string, 
    status: ConversionFile['status'], 
    result?: Blob, 
    error?: string
  ) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === id 
          ? { ...file, status, result, error } 
          : file
      )
    );
  };

  const value = {
    files,
    addFiles,
    removeFile,
    clearFiles,
    updateFileStatus,
    conversionProgress,
    setConversionProgress,
    isConverting,
    setIsConverting
  };

  return (
    <ConversionContext.Provider value={value}>
      {children}
    </ConversionContext.Provider>
  );
};

export const useConversion = () => {
  const context = useContext(ConversionContext);
  if (context === undefined) {
    throw new Error('useConversion must be used within a ConversionProvider');
  }
  return context;
};