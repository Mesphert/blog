
// params: {postData}
export async function POST(reqs, res){

  const request = await reqs.json();
  const username = process.env.WP_USER_NAME;
  const password = process.env.WP_PASSWORD;
  const postUrl = 'https://mesphert.com/wp-json/wp/v2/posts';
  const inputDate = await request.postData.scheduleDate;
  const formattedDate = inputDate.replace('T', ' ').replace(/\..+/, '') + ':00';

  console.log('Publishing Post');  

  const post = {
    title: request.postData.title,
    content: request.postData.content.replace(/\\/g, ''),
    featured_media: request.postData.imageId,
    status: 'schedule',
    status: 'future',
    excerpt: request.postData.excerpt,
    date: formattedDate,
  };

  const headers = new Headers();
  headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(post)
  };

  try {
    
    const response = await fetch(postUrl, requestOptions);
    const data = await response.json();
    // console.log(data);
    console.log(`Post Published At: ${formattedDate}`);  
    return new Response(JSON.stringify({id: data.id}));
  } catch (error) {
    console.error('Error Publishing post:', error);
  }

}
