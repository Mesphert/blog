'use server';
async function ytEmbedIframe(blogTitle){

    const response = await fetch('http://localhost:3000/api/youtube/search',{
      method: 'POST',
      body: JSON.stringify({title: blogTitle}),
    });
    const data = await response.json();
    return {title: data.title, iframe: data.iframe};
}

export default ytEmbedIframe;