

export async function POST(reqs, res) {

  const apiUrl = 'https://mesphert.com/wp-json/wp/v2';
  const request = await reqs.json()

  try {
    const response = await fetch(`${apiUrl}/posts?search=${encodeURIComponent(request.query)}&per_page=${request.limit}`, {cache: 'no-store'});
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    return new Response(JSON.stringify(data));  
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Handle or log the error as needed
  }
}

export async function GET(reqs, res) {

  console.log('Generating Image...');
  return new Response(JSON.stringify({title: 'News title'}));  
}