const prompts = (blog, name) => {
	const template = [{
			name: 'default',
			content: `Write a 1000 word article content for blog post titled "${blog.title}" that is optimized for the keyword "${blog.keyword}". This exact keyword should appear at least 20 times in the post, each subheading should have at least two long paragraphs. Make shorter sentences to improve readability and use more transition words. Also hyperlink at least 5 words or terms or names or phrases that are inside paragraphs related to ${blog.keyword} with a possible Wikipedia page or website or other blog. PLEASE format the content with HTML using ONLY <h>,<p>,<a> and <li> tags (NOT HTML Document). Include a table of contents at the start of the post (apply jump links).`,
			},
		];
	console.log(template[0]);
	const prompt = template.find(temp => temp.name === name);
	return prompt.content;
}

export default prompts;