export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'SpellCMS'); // Replace with your upload preset
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dbweny3hj/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      
      if (!response.ok) {
        throw new Error('Image upload failed');
      }
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };