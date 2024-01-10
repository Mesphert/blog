import OpenAI from "openai";
// request params: {prompt, conversationHistory}
const openai = new OpenAI({
        apiKey: process.env.OPENAI_KEY,
      });

export async function POST(reqs, res) {

  const request = await reqs.json();
    console.log('Generating Content');

  try {
    const completion = await openai.chat.completions.create({
      messages: request.conversationHistory,
      model: "gpt-3.5-turbo",
    });
    let data = await completion;
    const modifiedData = data.choices[0].message.content.replace(/<h1>.*?<\/h1>/g, '');

    // if (!data.ok) {
    //   throw new Error(`HTTP error! Status: ${data.status}`);
    // }
    // console.log(modifiedData);
    console.log('Content Generated');  
    return new Response(JSON.stringify({ text: modifiedData }));  
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Handle or log the error as needed
  }
}