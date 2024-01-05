
export async function POST(reqs, res){
  const apiUrl = 'https://mesphert.com/wp-json/wp/v2/media';
  const username = process.env.WP_USER_NAME;
  const password = process.env.WP_PASSWORD;
  const request = await reqs.json();

    try {
      // Convert base64 string to a Blob
      const blob = await fetch(`data:image/png;base64,${request.b64Data}`, { cache: 'no-store' }).then(res => res.blob());

      // Create a FormData object and append the media file
      const formData = new FormData();
      formData.append('file', blob, `${request.title}.jpg`);
      formData.append('alt_text', request.title);

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
      return new Response(JSON.stringify({id: data.id}));
    } catch (error) {
      console.error('Error uploading media:', error);
    }
}