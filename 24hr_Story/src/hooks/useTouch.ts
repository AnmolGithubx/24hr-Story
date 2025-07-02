import { useState, useCallback } from 'react';
import { TouchPosition } from '../types/story';

interface UseTouchReturn {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
}

export const useTouch = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  threshold: number = 50
): UseTouchReturn => {
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null);
  const [touchEnd, setTouchEnd] = useState<TouchPosition | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = Math.abs(touchStart.y - touchEnd.y);
    
    // Ensure horizontal swipe is primary
    if (Math.abs(distanceX) > distanceY && Math.abs(distanceX) > threshold) {
      if (distanceX > 0 && onSwipeLeft) {
        onSwipeLeft();
      } else if (distanceX < 0 && onSwipeRight) {
        onSwipeRight();
      }
    }
  }, [touchStart, touchEnd, onSwipeLeft, onSwipeRight, threshold]);

  return { onTouchStart, onTouchMove, onTouchEnd };
};