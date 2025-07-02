# Stories Feature - Social Media Stories Clone

A modern, responsive Stories feature implementation similar to Instagram and WhatsApp Stories, built with React, TypeScript, and Tailwind CSS. This client-side application allows users to upload images that automatically expire after 24 hours.


## ✨ Features

### Core Functionality
- **Image Upload**: Click the + button to upload images (JPG, PNG, WebP)
- **24-Hour Expiration**: Stories automatically disappear after 24 hours
- **Local Storage**: Client-side persistence using browser localStorage
- **Image Processing**: Automatic resizing and optimization (max 1080x1920px)
- **9:16 Aspect Ratio**: Stories maintain Instagram-style vertical format

### User Experience
- **Swipe Navigation**: Touch gestures for mobile story navigation
- **Keyboard Controls**: Arrow keys and Escape for desktop users
- **Progress Indicators**: Visual progress bars showing story duration
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Visual Feedback**: Hover states, transitions, and micro-interactions

### Design Elements
- **Instagram-Inspired UI**: Circular story previews with gradient borders
- **Modern Aesthetics**: Clean interface with subtle shadows and rounded corners
- **Full-Screen Viewer**: Immersive story viewing experience
- **Timestamp Display**: Relative time indicators (e.g., "2h ago", "now")
- **Viewed Status**: Visual distinction between viewed and unviewed stories

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stories-feature
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Storage**: Browser localStorage
- **Image Processing**: HTML5 Canvas API

## 📱 Usage Guide

### Adding Stories
1. Click the **+** button in the story list
2. Select an image file (JPG, PNG, or WebP under 10MB)
3. Image is automatically processed and added to your stories
4. Story appears with a colorful gradient border indicating it's new

### Viewing Stories
1. Click on any story preview to open full-screen viewer
2. **Navigation Options**:
   - **Touch**: Swipe left/right on mobile devices
   - **Keyboard**: Use arrow keys (←/→) or Escape to close
   - **Mouse**: Click left/right sides of the story
3. Stories auto-advance every 5 seconds
4. Progress bars show current story position and time remaining

### Story Management
- Stories automatically expire after 24 hours
- Expired stories are cleaned up when the app loads
- Viewed stories show a gray border instead of colorful gradient
- No manual deletion required - everything is automatic

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── StoryList.tsx    # Horizontal scrollable story list
│   ├── StoryPreview.tsx # Individual story preview circles
│   ├── StoryUpload.tsx  # Upload button and file handling
│   └── StoryViewer.tsx  # Full-screen story viewer
├── hooks/               # Custom React hooks
│   └── useTouch.ts      # Touch gesture handling
├── types/               # TypeScript type definitions
│   └── story.ts         # Story and touch interfaces
├── utils/               # Utility functions
│   ├── imageUtils.ts    # Image processing and validation
│   └── storageUtils.ts  # localStorage operations
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind imports
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Main brand color
- **Secondary**: Purple (#8B5CF6) - Accent and gradients
- **Success**: Green (#10B981) - Positive actions
- **Gradients**: Pink to yellow for story borders
- **Neutrals**: Gray scale for text and backgrounds

### Typography
- **Headings**: Bold weights with proper hierarchy
- **Body Text**: Regular weight with 150% line height
- **UI Text**: Medium weight for labels and buttons
- **Font Stack**: System fonts for optimal performance

### Spacing System
- **Base Unit**: 8px grid system
- **Component Spacing**: Consistent 16px, 24px, 32px intervals
- **Layout Margins**: Responsive margins based on screen size

## 📊 Technical Details

### Image Processing
- **Automatic Resizing**: Images scaled to max 1080x1920px
- **Aspect Ratio**: Enforced 9:16 ratio with center cropping
- **Compression**: JPEG output at 80% quality for optimal file size
- **Format Support**: JPG, PNG, WebP input formats

### Storage Management
- **localStorage Key**: `user_stories`
- **Data Format**: JSON array of story objects
- **Automatic Cleanup**: Expired stories removed on app load
- **Error Handling**: Graceful fallbacks for storage failures

### Performance Optimizations
- **Image Optimization**: Canvas-based resizing and compression
- **Lazy Loading**: Stories loaded on demand
- **Memory Management**: Automatic cleanup of expired content
- **Touch Debouncing**: Smooth gesture recognition

## 🔧 Configuration

### Image Constraints
```typescript
const MAX_WIDTH = 1080;      // Maximum image width
const MAX_HEIGHT = 1920;     // Maximum image height
const MAX_FILE_SIZE = 10MB;  // Maximum upload size
const STORY_DURATION = 5000; // Story display time (ms)
const EXPIRY_TIME = 24h;     // Story expiration time
```

### Supported File Types
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

## 🚀 Deployment

### Netlify (Recommended)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for SPA routing if needed

### Vercel
1. Connect your GitHub repository
2. Vercel will automatically detect Vite configuration
3. Deploy with zero configuration

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from Instagram and WhatsApp Stories
- Icons provided by [Lucide React](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed description
3. Include browser version and steps to reproduce

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**
