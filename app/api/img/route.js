// import imageToBase64 from 'image-to-base64';
// const request = require('request');
import OpenAI from 'openai';
const openai = new OpenAI({
        apiKey: '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',
        // dangerouslyAllowBrowser: true
      });

export async function GET(reqs, res) {
  // const imgUrl = "http://localhost:3000/favicon.ico";

  console.log('Generating Image...');
  try{  
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "white cat",
      n: 1,
      size: "1024x1024",
    });
      console.log(response);
      const image_url = await response.data[0].url; 
      // return { data: { data: [{ url: image_url }] } };
      return new Response(image_url); 
    } catch (error) {
      if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
      } else {
          console.log(error.message);
      }
    }
}


// GET();


  // imageToBase64(imgUrl) // Path to the image
  // .then(
  //     (response) => {
  //         const imageData = response;
  //         console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
  //         return new Response(imageData);
  //     }
  // )
   