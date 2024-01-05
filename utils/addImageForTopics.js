'use server';
import getH2Texts from './getHeaderTitles';
import uploadMediasToWp from './upload_attachment';
import addImagesAfterH2 from './addImageElement';

export default async function addImageForTopics(content, blogTitle){
	const h2Texts = await getH2Texts(content);
	const topicImagesUrls = await uploadMediasToWp(h2Texts, blogTitle);
	const contentWithTopicImages = await addImagesAfterH2(content, topicImagesUrls, blogTitle);

	console.log(contentWithTopicImages);
	return(contentWithTopicImages);	
}

