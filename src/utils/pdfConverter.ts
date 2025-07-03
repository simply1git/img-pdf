import * as pdfjsLib from 'pdfjs-dist';

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface ConversionOptions {
  format: string;
  quality: number;
  dpi: number;
  onProgress?: (progress: number) => void;
}

export const convertPdfToImages = async (
  pdfFile: File,
  options: ConversionOptions
): Promise<Blob[]> => {
  const { format, quality, dpi, onProgress } = options;
  
  // Load the PDF file
  const arrayBuffer = await readFileAsArrayBuffer(pdfFile);
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  const numPages = pdf.numPages;
  const scale = dpi / 72; // PDF uses 72 DPI as default
  const imageBlobs: Blob[] = [];
  
  // Process each page
  for (let i = 1; i <= numPages; i++) {
    // Get the page
    const page = await pdf.getPage(i);
    
    // Set viewport
    const viewport = page.getViewport({ scale });
    
    // Create a canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Could not create canvas context');
    }
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    // Render the page
    await page.render({
      canvasContext: context,
      viewport
    }).promise;
    
    // Convert canvas to blob
    const blob = await canvasToBlob(canvas, format, quality);
    imageBlobs.push(blob);
    
    // Update progress
    if (onProgress) {
      onProgress(Math.round((i / numPages) * 100));
    }
  }
  
  return imageBlobs;
};

// Helper function to read a file as an ArrayBuffer
const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

// Helper function to convert a canvas to a blob
const canvasToBlob = (canvas: HTMLCanvasElement, format: string, quality: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas to Blob conversion failed'));
        }
      },
      `image/${format}`,
      quality
    );
  });
};