import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Story } from '../types/story';
import { updateStoryViewed } from '../utils/storageUtils';
import { useTouch } from '../hooks/useTouch';

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ 
  stories, 
  initialIndex, 
  onClose 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = stories[currentIndex];
  const storyDuration = 5000; // 5 seconds per story

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const { onTouchStart, onTouchMove, onTouchEnd } = useTouch(
    goToNext,
    goToPrevious
  );

  useEffect(() => {
    if (!currentStory || isPaused) return;

    // Mark story as viewed
    if (!currentStory.viewed) {
      updateStoryViewed(currentStory.id);
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + (100 / storyDuration) * 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, currentStory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  if (!currentStory) return null;

  const formatTime = (timestamp: number) => {
    const now = new Date();
    const storyTime = new Date(timestamp);
    const diff = now.getTime() - storyTime.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
      <div 
        className="relative w-full max-w-sm h-full max-h-screen bg-black rounded-lg overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Progress bars */}
        <div className="absolute top-4 left-4 right-4 z-10 flex space-x-1">
          {stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-transform duration-100 ease-linear"
                style={{ 
                  transform: `scaleX(${
                    index < currentIndex ? 1 : 
                    index === currentIndex ? progress / 100 : 0
                  })`,
                  transformOrigin: 'left'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-12 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-full bg-white"></div>
            </div>
            <span className="text-white text-sm font-medium">
              {formatTime(currentStory.timestamp)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Story Image */}
        <img
          src={currentStory.imageUrl}
          alt="Story"
          className="w-full h-full object-cover"
        />

        {/* Navigation areas */}
        <div className="absolute inset-0 flex">
          <div 
            className="flex-1 cursor-pointer flex items-center justify-start pl-4"
            onClick={goToPrevious}
          >
            {currentIndex > 0 && (
              <ChevronLeft size={32} className="text-white opacity-0 hover:opacity-60 transition-opacity" />
            )}
          </div>
          <div 
            className="flex-1 cursor-pointer flex items-center justify-end pr-4"
            onClick={goToNext}
          >
            <ChevronRight size={32} className="text-white opacity-0 hover:opacity-60 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
};