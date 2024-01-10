'use server'
import base64Converter from './base64Converter';
// uploadAttachmentToWordPress
const uploadAttachmentToWordPress = async (headings, blogtitle) => {
  const imageUrl = 'http://localhost:3000/line.png';
  const headingTitles = headings;
  const blogTitle = blogtitle;
  const attachmentUrls = [];
  let url = '';

  const base64Data = await base64Converter(imageUrl);

  for (const headingTitle of headingTitles) {
    const response = await fetch('http://localhost:3000/api/wordpress/media',{
      method: 'POST',
      body: JSON.stringify({base64Data: base64Data, headingTitle: headingTitle, title: blogTitle}),
      timeout: 15000,
    });
    console.log(`Attachment response: ${response}`);
    const data = await response.json();
    attachmentUrls.push(data.url);
  }

  return attachmentUrls;
}


export default uploadAttachmentToWordPress;