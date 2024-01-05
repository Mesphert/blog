'use server'
// uploadAttachmentToWordPress
const uploadAttachmentToWordPress = async (headings, blogtitle) => {
  const imageUrl = 'http://localhost:3000/line.png';
  const headingTitles = headings;
  const blogTitle = blogtitle;
  const attachmentUrls = [];
  let url = '';

  for (const title of headingTitles) {
    const url = await uploadImageToWordPress(title, imageUrl, blogTitle);
    attachmentUrls.push(url);
  }

  return attachmentUrls;
}

const uploadImageToWordPress = async (headingTitle, imageUrl, blogTitle) => {
  const apiUrl = 'https://mesphert.com/wp-json/wp/v2/media';
  const username = process.env.WP_USER_NAME;
  const password = process.env.WP_PASSWORD;

    try {
      // Download and convert image file to base64
      const response = await fetch(imageUrl);
      const buffer = Buffer.from(await response.arrayBuffer());
      const base64Data = buffer.toString('base64');

      // Convert base64 string to a Blob
      const blob = await fetch(`data:image/png;base64,${base64Data}`, { cache: 'no-store' }).then(res => res.blob());

      // Create a FormData object and append the media file
      const formData = new FormData();
      formData.append('file', blob, `${headingTitle}.png`);
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
      console.log('Media uploaded successfully:', data.guid.raw);
      return data.guid.raw;
    } catch (error) {
      console.error('Error uploading media:', error);
    }
};


export default uploadAttachmentToWordPress;