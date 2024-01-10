'use server';

const gptGenerateImage = async (prompt) => {

  try{
    const response = await fetch('http://localhost:3000/api/openai/image-generation',{
      method: 'POST',
      body: JSON.stringify({prompt: prompt}),
      cache: 'no-store',
    });
    const data = await response.text();
    console.log(data);

    if(!data.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return{data: data.data};
  }
  catch(error){
    console.log(error);
    throw error;
  }   
};

export default gptGenerateImage;