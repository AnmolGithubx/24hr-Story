import React, { useRef } from 'react';
import { Plus } from 'lucide-react';
import { resizeImage, isValidImageFile } from '../utils/imageUtils';
import { saveStoryToStorage } from '../utils/storageUtils';
import { Story } from '../types/story';

interface StoryUploadProps {
  onStoryAdded: (story: Story) => void;
}

export const StoryUpload: React.FC<StoryUploadProps> = ({ onStoryAdded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !isValidImageFile(file)) {
      alert('Please select a valid image file (JPG, PNG, WebP) under 10MB');
      return;
    }

    try {
      const resizedImage = await resizeImage(file);
      const newStory: Story = {
        id: Date.now().toString(),
        imageUrl: resizedImage,
        timestamp: Date.now(),
        viewed: false,
      };

      saveStoryToStorage(newStory);
      onStoryAdded(newStory);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    }
  };

  return (
    <div
      className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
        <Plus size={24} className="text-gray-600" />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};