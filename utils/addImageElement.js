'use server';
async function addImagesAfterH2(htmlString, imageUrls, altText) {
  // Create a regular expression to match <h2> elements
  const regex = /(<h2\b[^>]*>.*?<\/h2>)/g;

  // Use a counter to iterate through the imageUrls array
  let imageUrlIndex = 0;

  // Replace each <h2> element with itself followed by the <img> tag
  const modifiedHtml = htmlString.replace(regex, (match) => {
    const imageUrl = imageUrls[imageUrlIndex % imageUrls.length];
    imageUrlIndex++;
    return `${match}\n<img alt="${altText}" src="${imageUrl}" />`;
  });

  return modifiedHtml;
}

export default addImagesAfterH2;