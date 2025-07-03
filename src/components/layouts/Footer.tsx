import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ConvertWizard</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Free online tool to convert images to PDF and PDF to images. No registration required.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-secondary"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-secondary"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/image-to-pdf" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary"
                >
                  Image to PDF
                </Link>
              </li>
              <li>
                <Link 
                  to="/pdf-to-image" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-secondary"
                >
                  PDF to Image
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              ConvertWizard is a free online tool that helps you convert files without compromising your privacy. All processing happens in your browser.
            </p>
            <p className="text-gray-600 dark:text-gray-400 flex items-center">
              Made with <Heart size={16} className="mx-1 text-accent" /> by ConvertWizard Team
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {currentYear} ConvertWizard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;