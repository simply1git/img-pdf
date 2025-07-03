import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import HomePage from './pages/HomePage';
import ImageToPdfPage from './pages/ImageToPdfPage';
import PdfToImagePage from './pages/PdfToImagePage';
import { ConversionProvider } from './context/ConversionContext';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ConversionProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/image-to-pdf" element={<ImageToPdfPage />} />
                <Route path="/pdf-to-image" element={<PdfToImagePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ConversionProvider>
    </ThemeProvider>
  );
};

export default App;