import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { Scan, Camera, Barcode } from 'lucide-react';

const ScanPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header showSearch={false} title="Scan" />
      
      <main className="safe-bottom flex flex-col items-center justify-center p-8 min-h-[60vh]">
        <div className="w-48 h-48 border-4 border-dashed border-primary/30 rounded-3xl flex items-center justify-center mb-8 relative">
          <div className="absolute inset-4 border-2 border-primary rounded-2xl" />
          <Scan className="w-16 h-16 text-primary" />
        </div>
        
        <h2 className="text-xl font-semibold mb-2 text-center">Scan a product</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-xs">
          Point your camera at a barcode or product to find it on Amazon
        </p>

        <div className="flex gap-4">
          <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border/50 w-28 active:scale-95 transition-transform">
            <Camera className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium">Camera</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-card rounded-xl border border-border/50 w-28 active:scale-95 transition-transform">
            <Barcode className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium">Barcode</span>
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default ScanPage;
