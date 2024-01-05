'use server';
async function extractH2Text(htmlString) {
  // Create a regular expression to match <h2> elements and extract their text content
  const regex = /<h2\b[^>]*>(.*?)<\/h2>/g;
  // Array to store extracted text contents
  const extractedTexts = [];
  // Use a loop to iterate through all matches in the HTML string
  let match;
  while ((match = regex.exec(htmlString)) !== null) {
    // match[1] contains the text content of the <h2> element
    extractedTexts.push(match[1]);
  }
  return extractedTexts;
}

export default extractH2Text;