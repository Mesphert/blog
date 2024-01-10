'use server'
async function generatePostList(keyword) {
  const response = await fetch('http://localhost:3000/api/wordpress/posts/search', {
    method: 'POST',
    body: JSON.stringify({query: keyword, limit: 5}),
    cache: 'no-store',
  });

  let htmlString = '<ul>';
  const posts = await response.json();
  posts.forEach(post => {
    htmlString += `<li><a href="${post.guid.rendered}">${post.title.rendered}</a></li>`;
  });
  htmlString += '</ul>';
  return htmlString;
}

export default generatePostList;