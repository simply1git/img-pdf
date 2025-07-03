import React, { useState } from 'react';
import { Download, Trash2, FileImage, FilePdf } from 'lucide-react';
import DropZone from '../components/ui/DropZone';
import FilePreview from '../components/ui/FilePreview';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { useConversion } from '../context/ConversionContext';
import { ImageToPdfOptions } from '../components/ui/ConversionOptions';
import { convertImagesToPdf } from '../utils/imageConverter';

const ImageToPdfPage: React.FC = () => {
  const { 
    files, 
    clearFiles, 
    updateFileStatus, 
    conversionProgress, 
    setConversionProgress,
    isConverting,
    setIsConverting
  } = useConversion();
  
  const [pageSize, setPageSize] = useState('a4');
  const [pageOrientation, setPageOrientation] = useState('portrait');
  const [imageQuality, setImageQuality] = useState(80);
  const [resultPdfUrl, setResultPdfUrl] = useState<string | null>(null);
  
  const imageFiles = files.filter(file => file.type === 'image');
  const hasFiles = imageFiles.length > 0;
  
  const handleConvert = async () => {
    if (!hasFiles || isConverting) return;
    
    try {
      setIsConverting(true);
      setConversionProgress(0);
      setResultPdfUrl(null);
      
      // Mark all files as processing
      imageFiles.forEach(file => {
        updateFileStatus(file.id, 'processing');
      });
      
      // Convert images to PDF
      const result = await convertImagesToPdf(
        imageFiles.map(f => f.file),
        {
          pageSize,
          orientation: pageOrientation,
          quality: imageQuality / 100,
          onProgress: setConversionProgress
        }
      );
      
      // Mark all files as completed
      imageFiles.forEach(file => {
        updateFileStatus(file.id, 'completed');
      });
      
      // Set the result URL
      setResultPdfUrl(URL.createObjectURL(result));
      
      setConversionProgress(100);
    } catch (error) {
      console.error('Conversion error:', error);
      
      // Mark all files as error
      imageFiles.forEach(file => {
        updateFileStatus(file.id, 'error', undefined, 'Failed to convert image');
      });
    } finally {
      setIsConverting(false);
    }
  };
  
  const handleDownload = () => {
    if (!resultPdfUrl) return;
    
    const link = document.createElement('a');
    link.href = resultPdfUrl;
    link.download = 'converted_images.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleClearAll = () => {
    clearFiles();
    setResultPdfUrl(null);
    setConversionProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Convert Images to PDF</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your images and convert them to a single PDF document
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileImage className="mr-2 text-primary dark:text-secondary" />
              Upload Images
            </h2>
            
            <DropZone 
              acceptedFileTypes="image/jpeg,image/png,image/gif,image/webp,image/bmp"
              fileType="image"
              multiple={true}
              maxFiles={20}
            />
            
            {hasFiles && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Uploaded Images ({imageFiles.length})</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    leftIcon={<Trash2 size={14} />}
                    onClick={handleClearAll}
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {imageFiles.map(file => (
                    <FilePreview
                      key={file.id}
                      id={file.id}
                      name={file.file.name}
                      type={file.type}
                      preview={file.preview}
                      status={file.status}
                      error={file.error}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FilePdf className="mr-2 text-accent" />
              PDF Options
            </h2>
            
            <ImageToPdfOptions
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageOrientation={pageOrientation}
              setPageOrientation={setPageOrientation}
              imageQuality={imageQuality}
              setImageQuality={setImageQuality}
            />
            
            <div className="space-y-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handleConvert}
                disabled={!hasFiles || isConverting}
                isLoading={isConverting}
              >
                Convert to PDF
              </Button>
              
              {isConverting && (
                <ProgressBar progress={conversionProgress} />
              )}
              
              {resultPdfUrl && (
                <Button
                  className="w-full"
                  variant="secondary"
                  size="lg"
                  leftIcon={<Download size={20} />}
                  onClick={handleDownload}
                >
                  Download PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageToPdfPage;