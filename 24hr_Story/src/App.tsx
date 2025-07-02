import React, { useState, useEffect } from 'react';
import { Story } from './types/story';
import { getStoriesFromStorage, cleanupExpiredStories } from './utils/storageUtils';
import { StoryList } from './components/StoryList';
import { StoryViewer } from './components/StoryViewer';
import { Camera } from 'lucide-react';

function App() {
  const [stories, setStories] = useState<Story[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    // Cleanup expired stories and load remaining ones
    cleanupExpiredStories();
    const savedStories = getStoriesFromStorage();
    setStories(savedStories);
  }, []);

  const handleStoryAdded = (newStory: Story) => {
    setStories(prev => [newStory, ...prev]);
  };

  const handleStoryClick = (index: number) => {
    setCurrentStoryIndex(index);
    setViewerOpen(true);
  };

  const handleViewerClose = () => {
    setViewerOpen(false);
    // Refresh stories to update viewed status
    const updatedStories = getStoriesFromStorage();
    setStories(updatedStories);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Camera size={18} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Stories</h1>
          </div>
        </div>
      </div>

      {/* Story List */}
      <div className="max-w-4xl mx-auto">
        <StoryList
          stories={stories}
          onStoryAdded={handleStoryAdded}
          onStoryClick={handleStoryClick}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {stories.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Camera size={36} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Story</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Upload photos to share moments with others. Your stories will automatically disappear after 24 hours.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
              <ul className="text-sm text-blue-800 space-y-2 text-left">
                <li>• Click the + button to upload an image</li>
                <li>• Images are automatically resized and optimized</li>
                <li>• Stories disappear after 24 hours</li>
                <li>• Swipe or use arrow keys to navigate</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stories.map((story, index) => (
              <div
                key={story.id}
                className="aspect-[9/16] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md"
                onClick={() => handleStoryClick(index)}
              >
                <img
                  src={story.imageUrl}
                  alt="Story"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Story Viewer */}
      {viewerOpen && (
        <StoryViewer
          stories={stories}
          initialIndex={currentStoryIndex}
          onClose={handleViewerClose}
        />
      )}
    </div>
  );
}

export default App;