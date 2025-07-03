import { jsPDF } from 'jspdf';

interface ConversionOptions {
  pageSize: string;
  orientation: string;
  quality: number;
  onProgress?: (progress: number) => void;
}

export const convertImagesToPdf = async (
  imageFiles: File[],
  options: ConversionOptions
): Promise<Blob> => {
  const { pageSize, orientation, quality, onProgress } = options;
  
  // Create a new PDF document
  const pdf = new jsPDF({
    orientation: orientation as any,
    unit: 'mm',
    format: pageSize as any
  });
  
  // Get page dimensions
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Process each image
  for (let i = 0; i < imageFiles.length; i++) {
    // Add a new page for each image after the first one
    if (i > 0) {
      pdf.addPage();
    }
    
    // Convert the image file to a data URL
    const imageDataUrl = await readFileAsDataURL(imageFiles[i]);
    
    // Calculate image dimensions to fit the page while maintaining aspect ratio
    const img = new Image();
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.src = imageDataUrl;
    });
    
    const imgRatio = img.width / img.height;
    const pageRatio = pageWidth / pageHeight;
    
    let imgWidth = pageWidth;
    let imgHeight = imgWidth / imgRatio;
    
    if (imgHeight > pageHeight) {
      imgHeight = pageHeight;
      imgWidth = imgHeight * imgRatio;
    }
    
    // Add image to the PDF
    pdf.addImage(
      imageDataUrl,
      'JPEG',
      (pageWidth - imgWidth) / 2,
      (pageHeight - imgHeight) / 2,
      imgWidth,
      imgHeight,
      `img${i}`,
      'FAST',
      0
    );
    
    // Update progress
    if (onProgress) {
      onProgress(Math.round(((i + 1) / imageFiles.length) * 100));
    }
  }
  
  // Generate the PDF as a blob
  const pdfBlob = pdf.output('blob');
  return pdfBlob;
};

// Helper function to read a file as a data URL
const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};