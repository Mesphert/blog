'use server';
// Implement the actual WordPress post scheduling API call here
const wpCreatePost = async (postData) => {

  try{
    const response = await fetch('http://localhost:3000/api/wordpress/posts/create',{
      method: 'POST',
      body: JSON.stringify({postData: postData}),
      cache: 'no-store',
    });
    // if(!response.ok){
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // console.log(response);
    const data = await response.json();        
    return{id: data.id};
  }
  catch(error){
    console.log(error);
    throw error;
  }   
};

export default wpCreatePost;