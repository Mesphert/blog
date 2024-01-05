'use server';
import cheerio from 'cheerio';
// Function to fetch posts based on a search string
async function getRelatedPosts(searchString, limit = 10) {

  const apiUrl = 'https://mesphert.com/wp-json/wp/v2';

  try {
    const response = await fetch(`${apiUrl}/posts?search=${encodeURIComponent(searchString)}&per_page=${limit}`, {cache: 'no-store'});
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Handle or log the error as needed
  }
}
// // Example usage:
// const postListContainer = generatePostList(rPosts);  

// const GetRelatedPosts = () =>{
//   // Example usage:
//   const searchQuery = 'canadian';
//   const limit = 5;
//   fetchPostsBySearch(searchQuery, limit)
//     .then(posts => {
//       console.log('Fetched posts:', posts);
//       // Handle the retrieved posts as needed
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       // Handle the error
//     });

// }

export default getRelatedPosts;
