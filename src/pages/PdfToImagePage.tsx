import React, { useState } from 'react';
import { Download, Trash2, FileImage, FilePdf, Archive } from 'lucide-react';
import DropZone from '../components/ui/DropZone';
import FilePreview from '../components/ui/FilePreview';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { useConversion } from '../context/ConversionContext';
import { PdfToImageOptions } from '../components/ui/ConversionOptions';
import { convertPdfToImages } from '../utils/pdfConverter';

const PdfToImagePage: React.FC = () => {
  const { 
    files, 
    clearFiles, 
    updateFileStatus, 
    conversionProgress, 
    setConversionProgress,
    isConverting,
    setIsConverting
  } = useConversion();
  
  const [imageFormat, setImageFormat] = useState('png');
  const [imageQuality, setImageQuality] = useState(80);
  const [dpi, setDpi] = useState(150);
  const [resultImageUrls, setResultImageUrls] = useState<string[]>([]);
  
  const pdfFiles = files.filter(file => file.type === 'pdf');
  const hasFiles = pdfFiles.length > 0;
  
  const handleConvert = async () => {
    if (!hasFiles || isConverting) return;
    
    try {
      setIsConverting(true);
      setConversionProgress(0);
      setResultImageUrls([]);
      
      // Process only the first PDF file for now
      const pdfFile = pdfFiles[0];
      updateFileStatus(pdfFile.id, 'processing');
      
      // Convert PDF to images
      const result = await convertPdfToImages(
        pdfFile.file,
        {
          format: imageFormat,
          quality: imageQuality / 100,
          dpi,
          onProgress: setConversionProgress
        }
      );
      
      // Create object URLs for the resulting images
      const imageUrls = result.map(blob => URL.createObjectURL(blob));
      setResultImageUrls(imageUrls);
      
      updateFileStatus(pdfFile.id, 'completed');
      setConversionProgress(100);
    } catch (error) {
      console.error('Conversion error:', error);
      
      // Mark file as error
      pdfFiles.forEach(file => {
        updateFileStatus(file.id, 'error', undefined, 'Failed to convert PDF');
      });
    } finally {
      setIsConverting(false);
    }
  };
  
  const handleDownloadAll = () => {
    if (resultImageUrls.length === 0) return;
    
    // For simplicity, we'll just trigger downloads for each image
    // In a real app, you might want to create a zip file
    resultImageUrls.forEach((url, index) => {
      const link = document.createElement('a');
      link.href = url;
      link.download = `page_${index + 1}.${imageFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  
  const handleClearAll = () => {
    // Revoke object URLs to prevent memory leaks
    resultImageUrls.forEach(url => URL.revokeObjectURL(url));
    
    clearFiles();
    setResultImageUrls([]);
    setConversionProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Convert PDF to Images</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload a PDF document and convert it to high-quality images
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FilePdf className="mr-2 text-accent" />
              Upload PDF
            </h2>
            
            <DropZone 
              acceptedFileTypes="application/pdf"
              fileType="pdf"
              multiple={false}
              maxFiles={1}
            />
            
            {hasFiles && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Uploaded PDF</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    leftIcon={<Trash2 size={14} />}
                    onClick={handleClearAll}
                  >
                    Clear
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {pdfFiles.map(file => (
                    <FilePreview
                      key={file.id}
                      id={file.id}
                      name={file.file.name}
                      type={file.type}
                      status={file.status}
                      error={file.error}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {resultImageUrls.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">Converted Images ({resultImageUrls.length})</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {resultImageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img 
                          src={url} 
                          alt={`Page ${index + 1}`} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <a 
                          href={url} 
                          download={`page_${index + 1}.${imageFormat}`}
                          className="p-2 bg-white rounded-full"
                        >
                          <Download size={16} className="text-gray-900" />
                        </a>
                      </div>
                      <p className="text-xs text-center mt-1">Page {index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileImage className="mr-2 text-primary dark:text-secondary" />
              Image Options
            </h2>
            
            <PdfToImageOptions
              imageFormat={imageFormat}
              setImageFormat={setImageFormat}
              imageQuality={imageQuality}
              setImageQuality={setImageQuality}
              dpi={dpi}
              setDpi={setDpi}
            />
            
            <div className="space-y-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handleConvert}
                disabled={!hasFiles || isConverting}
                isLoading={isConverting}
              >
                Convert to Images
              </Button>
              
              {isConverting && (
                <ProgressBar progress={conversionProgress} />
              )}
              
              {resultImageUrls.length > 0 && (
                <Button
                  className="w-full"
                  variant="secondary"
                  size="lg"
                  leftIcon={<Archive size={20} />}
                  onClick={handleDownloadAll}
                >
                  Download All Images
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfToImagePage;