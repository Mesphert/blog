import OpenAI from "openai";
// request params: {prompt}
const openai = new OpenAI({
        apiKey: process.env.OPENAI_KEY,
      });

export async function POST(reqs, res) {

  const request = await reqs.json();
  console.log('Generating Image');

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: request.prompt,
      n: 1,
      size: "1024x1024",
      response_format: 'b64_json'
    });
    const data = await response;
    const base64Image = await data.data[0].b64_json;
    console.log('Image Generated');    
    return new Response(JSON.stringify({ data: base64Image, ok: true}));  
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Handle or log the error as needed
  }
}