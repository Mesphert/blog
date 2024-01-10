import fs from 'fs';

export async function POST(reqs, res){
  const apiUrl = 'https://mesphert.com/wp-json/wp/v2/media';
  const username = process.env.WP_USER_NAME;
  const password = process.env.WP_PASSWORD;
  const request = await reqs.json();
  const fileName = request.title;

  console.log('Uploading Image');  

    try {
      // Convert base64 string to a Blob
      const response = await fetch(`data:image/png;base64,${request.base64Data}`, { cache: 'no-store' })
      const blob = await response.blob();
      // .then(res => res.blob());

      // Create a FormData object and append the media file
      const formData = new FormData();
      formData.append('file', blob, `${request.title}.jpg`);
      formData.append('alt_text', request.title);
      
      const headers = new Headers();
      headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
      // headers.append('Content-Type', 'multipart/form-data');

      // Make the request to WordPress API to upload the media
      const result = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: formData,
        timeout: 15000,
        cache: 'no-store',
      });

      // Parse the response
      const data = await result.json();
      // console.log(data);
      console.log('Image Uploaded');
      return new Response(JSON.stringify({id: data.id, url: data.guid.raw}));
    } catch (error) {
      console.error('Error uploading media:', error);
    }
}