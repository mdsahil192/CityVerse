import { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface ThenVsNowProps {
  historicalImage: string;
  currentImage: string;
  historicalYear: number;
  currentYear: number;
}

export default function ThenVsNow({ historicalImage, currentImage, historicalYear, currentYear }: ThenVsNowProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex justify-between items-center px-1">
        <h4 className="font-bold text-sm text-orange-400">THEN — {historicalYear}</h4>
        <h4 className="font-bold text-sm text-cyan-400">NOW — {currentYear}</h4>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden cursor-ew-resize select-none border border-white/20 shadow-xl"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      >
        {/* Current Image (Background) */}
        <div className="absolute inset-0 w-full h-full">
          <img src={currentImage} alt="Now" className="w-full h-full object-cover" draggable={false} />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Historical Image (Foreground clip) */}
        <div 
          className="absolute inset-0 h-full overflow-hidden border-r-2 border-white"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={historicalImage} 
            alt="Then" 
            className="absolute top-0 left-0 w-full h-full object-cover max-w-none grayscale opacity-90 sepia-[0.3]" 
            style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}
            draggable={false} 
          />
        </div>

        {/* Draggable Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 flex items-center justify-center -ml-0.5"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center -translate-x-1/2 absolute">
            <MoveHorizontal className="h-4 w-4 text-gray-800" />
          </div>
        </div>
      </div>
      <p className="text-center text-[10px] text-blue-200/50 uppercase tracking-widest mt-1">Drag to compare</p>
    </div>
  );
}
