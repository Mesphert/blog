'use server';
async function base64Converter(imageUrl){
	try{
		// Download and convert image file to base64
		const response = await fetch(imageUrl, {cache: 'no-store'});
		const buffer = Buffer.from(await response.arrayBuffer());
		const base64Data = buffer.toString('base64');
		return base64Data;
	}
	catch(error){
		console.log(`Base64 Convertion Failed! ${error}`);
	}
}

export default base64Converter;