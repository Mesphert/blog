'use server'
const uploadImageToWordPress = async (base64Data, blogTitle) => {
  const apiUrl = 'https://mesphert.com/wp-json/wp/v2/media';
  const username = process.env.WP_USER_NAME;
  const password = process.env.WP_PASSWORD;

    try {
      // Convert base64 string to a Blob
      const blob = await fetch(`data:image/png;base64,${base64Data}`, { cache: 'no-store' }).then(res => res.blob());

      // Create a FormData object and append the media file
      const formData = new FormData();
      formData.append('file', blob, `${blogTitle}.jpg`);
      formData.append('alt_text', blogTitle);

      // Make the request to WordPress API to upload the media
      const result = await fetch(apiUrl, {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Basic ' + btoa(`${username}:${password}`),
        }),
        body: formData,
        timeout: 15000,
      });

      // Parse the response
      const data = await result.json();
      console.log('Media uploaded successfully:');
      return {id: data.id};
    } catch (error) {
      console.error('Error uploading media:', error);
    }
};

export default uploadImageToWordPress;

// const uploadImageToWordPress = async (headingTitle='', b64Data, blogTitle) => {
//   const apiUrl = 'https://mesphert.com/wp-json/wp/v2/media';
//   const username = process.env.WP_USER_NAME;
//   const password = process.env.WP_PASSWORD;
//   const base64Data = b64Data; 

//     try {

//       // Convert base64 string to a Blob
//       const response = await fetch(`data:image/png;base64,${base64Data}`, { cache: 'no-store' })
//       const blob = await response.blob();

//       // Create a FormData object and append the media file
//       const formData = new FormData();
//       formData.append('file', blob, `${headingTitle}.png`);
//       formData.append('alt_text', blogTitle);

//       // Make the request to WordPress API to upload the media
//       const result = await fetch(apiUrl, {
//         method: 'POST',
//         headers: new Headers({
//           Authorization: 'Basic ' + btoa(`${username}:${password}`),
//         }),
//         body: formData,
//         timeout: 15000,
//       });

//       // Parse the response
//       const data = await result.json();
//       console.log('Media uploaded successfully:', data.guid.raw);
//       return data.guid.raw;
//     } catch (error) {
//       console.error('Error uploading media:', error);
//     }
// };