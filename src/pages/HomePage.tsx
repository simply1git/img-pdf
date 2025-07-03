import React from 'react';
import { Link } from 'react-router-dom';
import { FileImage, FilePdf, ArrowRight, Zap, Lock, Globe } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Convert Files with Ease and Privacy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Free online tool to convert images to PDF and PDF to images. No registration, no email required.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Link to="/image-to-pdf" className="flex-1">
            <Button 
              className="w-full"
              size="lg"
              leftIcon={<FileImage size={20} />}
              rightIcon={<ArrowRight size={16} />}
            >
              Image to PDF
            </Button>
          </Link>
          <Link to="/pdf-to-image" className="flex-1">
            <Button 
              className="w-full"
              variant="secondary"
              size="lg"
              leftIcon={<FilePdf size={20} />}
              rightIcon={<ArrowRight size={16} />}
            >
              PDF to Image
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ConvertWizard?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center p-6">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary mb-4">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Conversion</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Convert your files in seconds with our optimized processing engine that runs entirely in your browser.
              </p>
            </div>
            
            <div className="card text-center p-6">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary mb-4">
                <Lock size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Private</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your files never leave your device. All processing happens locally in your browser, ensuring complete privacy.
              </p>
            </div>
            
            <div className="card text-center p-6">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary mb-4">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Installation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use our tool from any device with a modern web browser. No downloads or installations required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="card p-6">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary dark:bg-secondary text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-2">Upload Files</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Drag and drop your files or click to browse. You can upload multiple files at once.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="card p-6">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary dark:bg-secondary text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-2">Customize Options</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Adjust conversion settings like quality, format, and page size to suit your needs.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="card p-6">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary dark:bg-secondary text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-2">Download Result</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Once conversion is complete, download your files individually or as a zip archive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-primary to-secondary rounded-3xl text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Convert Your Files?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start converting your files now. No registration required, completely free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Link to="/image-to-pdf" className="flex-1">
              <Button 
                className="w-full bg-white text-primary hover:bg-gray-100"
                size="lg"
                leftIcon={<FileImage size={20} />}
              >
                Image to PDF
              </Button>
            </Link>
            <Link to="/pdf-to-image" className="flex-1">
              <Button 
                className="w-full bg-white text-secondary hover:bg-gray-100"
                size="lg"
                leftIcon={<FilePdf size={20} />}
              >
                PDF to Image
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;