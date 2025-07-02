import { Story } from '../types/story';

const STORIES_KEY = 'user_stories';
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

export const getStoriesFromStorage = (): Story[] => {
  try {
    const stored = localStorage.getItem(STORIES_KEY);
    if (!stored) return [];
    
    const stories = JSON.parse(stored) as Story[];
    return stories.filter(story => Date.now() - story.timestamp < TWENTY_FOUR_HOURS);
  } catch {
    return [];
  }
};

export const saveStoryToStorage = (story: Story): void => {
  try {
    const existingStories = getStoriesFromStorage();
    const updatedStories = [story, ...existingStories];
    localStorage.setItem(STORIES_KEY, JSON.stringify(updatedStories));
  } catch (error) {
    console.error('Failed to save story:', error);
  }
};

export const updateStoryViewed = (storyId: string): void => {
  try {
    const stories = getStoriesFromStorage();
    const updatedStories = stories.map(story => 
      story.id === storyId ? { ...story, viewed: true } : story
    );
    localStorage.setItem(STORIES_KEY, JSON.stringify(updatedStories));
  } catch (error) {
    console.error('Failed to update story:', error);
  }
};

export const cleanupExpiredStories = (): void => {
  try {
    const validStories = getStoriesFromStorage();
    localStorage.setItem(STORIES_KEY, JSON.stringify(validStories));
  } catch (error) {
    console.error('Failed to cleanup stories:', error);
  }
};