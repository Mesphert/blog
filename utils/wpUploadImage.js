'use server'
const wpUploadImage = async (base64Data, blogTitle) => {

    try {
      // Make the request to WordPress API to upload the media
      const result = await fetch('http://localhost:3000/api/wordpress/media', {
        method: 'POST',
        body: JSON.stringify({b64Data: base64Data, title: blogTitle}),
        timeout: 15000,
        cache: 'no-store',
      });

      // Parse the response
      const data = await result.json();
      console.log('Media uploaded successfully:');
      return {id: data.id};
    } catch (error) {
      console.error('Error uploading media:', error);
    }
};

export default wpUploadImage;