import React from 'react';
import { Story } from '../types/story';
import { StoryUpload } from './StoryUpload';
import { StoryPreview } from './StoryPreview';

interface StoryListProps {
  stories: Story[];
  onStoryAdded: (story: Story) => void;
  onStoryClick: (index: number) => void;
}

export const StoryList: React.FC<StoryListProps> = ({ 
  stories, 
  onStoryAdded, 
  onStoryClick 
}) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        <StoryUpload onStoryAdded={onStoryAdded} />
        {stories.map((story, index) => (
          <StoryPreview
            key={story.id}
            story={story}
            onClick={() => onStoryClick(index)}
          />
        ))}
      </div>
    </div>
  );
};