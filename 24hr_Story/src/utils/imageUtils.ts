export const resizeImage = (file: File, maxWidth: number = 1080, maxHeight: number = 1920): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Calculate dimensions maintaining aspect ratio
      let { width, height } = img;
      
      // Ensure 9:16 aspect ratio for stories
      const targetRatio = 9 / 16;
      const currentRatio = width / height;
      
      if (currentRatio > targetRatio) {
        // Image is too wide, crop width
        width = height * targetRatio;
      } else {
        // Image is too tall, crop height
        height = width / targetRatio;
      }
      
      // Scale down if necessary
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and crop image to center
      const sourceX = (img.width - width) / 2;
      const sourceY = (img.height - height) / 2;
      
      ctx.drawImage(
        img,
        sourceX, sourceY, width, height,
        0, 0, width, height
      );
      
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    
    img.src = URL.createObjectURL(file);
  });
};

export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};