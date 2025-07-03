import React from 'react';
import { FileImage, FilePdf } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="relative">
        <FileImage className="text-primary dark:text-secondary h-8 w-8 absolute -left-1 top-0 transform -rotate-6" />
        <FilePdf className="text-accent dark:text-accent h-8 w-8 absolute -left-3 top-0 transform rotate-6" />
      </div>
      <span className="ml-8 text-xl font-bold text-gray-900 dark:text-white">
        Convert<span className="text-primary dark:text-secondary">Wizard</span>
      </span>
    </div>
  );
};

export default Logo;