import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideNavContainerProps {
  children: React.ReactNode;
  className?: string;
  showScrollButtons?: boolean;
}

export const SlideNavContainer: React.FC<SlideNavContainerProps> = ({
  children,
  className = '',
  showScrollButtons = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const slide = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.65;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className={`relative flex items-center group/slide ${className}`}>
      {/* Left Slide Arrow */}
      {showScrollButtons && (
        <button
          onClick={() => slide('left')}
          disabled={!canScrollLeft}
          className={`shrink-0 z-10 p-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 mr-1.5 ${
            canScrollLeft ? 'opacity-100 hover:scale-105 active:scale-95 cursor-pointer' : 'opacity-30 cursor-not-allowed'
          }`}
          title="Slide Left"
          aria-label="Slide Left"
        >
          <ChevronLeft size={16} className="text-[#0070C0] dark:text-blue-400" />
        </button>
      )}

      {/* Slideable Content Viewport */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none scroll-smooth py-1 px-0.5 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* Right Slide Arrow */}
      {showScrollButtons && (
        <button
          onClick={() => slide('right')}
          disabled={!canScrollRight}
          className={`shrink-0 z-10 p-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 ml-1.5 ${
            canScrollRight ? 'opacity-100 hover:scale-105 active:scale-95 cursor-pointer' : 'opacity-30 cursor-not-allowed'
          }`}
          title="Slide Right"
          aria-label="Slide Right"
        >
          <ChevronRight size={16} className="text-[#0070C0] dark:text-blue-400" />
        </button>
      )}
    </div>
  );
};
