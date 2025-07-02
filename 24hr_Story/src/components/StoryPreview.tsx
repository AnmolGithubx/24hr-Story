import React from 'react';
import { Story } from '../types/story';

interface StoryPreviewProps {
  story: Story;
  onClick: () => void;
}

export const StoryPreview: React.FC<StoryPreviewProps> = ({ story, onClick }) => {
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };

  return (
    <div className="flex-shrink-0 flex flex-col items-center space-y-2">
      <div
        className={`w-16 h-16 rounded-full p-0.5 cursor-pointer hover:scale-105 transition-transform duration-200 ${
          story.viewed 
            ? 'bg-gray-300' 
            : 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500'
        }`}
        onClick={onClick}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
          <img
            src={story.imageUrl}
            alt="Story preview"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <span className="text-xs text-gray-500 font-medium">
        {formatTime(story.timestamp)}
      </span>
    </div>
  );
};