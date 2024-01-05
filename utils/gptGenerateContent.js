'use server';
// Function to generate content from OpenAI API using prompt and title
const gptGenerateContent = async (prompt, facts) => {
  const conversationHistory = [];
  conversationHistory.push({"role": "system", "content": "You are a helpful assistant."});
  facts? conversationHistory.push({"role": "user", "content": `Using this facts: "${facts}", ${prompt}`}):conversationHistory.push({"role": "user", "content": prompt});

  try{
    const response = await fetch('http://localhost:3000/api/openai/text-completion',{
      method: 'POST',
      body: JSON.stringify({conversationHistory: conversationHistory}),
      cache: 'no-store',
    });

    console.log(response);
    const data = await response.json();
    return{text: data.text};
  }
  catch(error){
    console.log(error);
    throw error;
  }   
};

export default gptGenerateContent;