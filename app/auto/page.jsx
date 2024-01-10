"use client"
// Load blog data from a JSON file (replace with your actual file path)
import React, { useState } from 'react';
import blogData from './../blogData.json';
import wpUploadImage from '@utils/wpUploadImage';
import generatePostList from '@utils/generatePostList';
import addImageForTopics from '@utils/addImageForTopics';
import wpCreatePost from '@utils/wpCreatePost';
import gptGenerateContent from '@utils/gptGenerateContent';
import gptGenerateImage from '@utils/gptGenerateImage';
import ytEmbedIframe from '@utils/ytEmbedIframe';
import promptTemplate from '@resource/promptTemplate';
import incrementDate from '@utils/incrementDate';

// App component
const App = () => {
    // State to manage selected blog
    const [selectedBlog, setSelectedBlog] = useState(null);
    // State to store generated content
    const [generatedContent, setGeneratedContent] = useState('');
    // State to store generated image URL
    const [generatedImageData, setGeneratedImageData] = useState('');
    // State to store schedule date 
    const [scheduleDate, setScheduleDate] = useState('');
    // State to Related Keyword
    const [relatedKeyword, setRelatedKeyword] = useState('');
    // State for loading container
    const [container, setContainer] = useState(false);

    const listPostDate = (length) => {
      const postTime =  [];
      let newTime = scheduleDate;
      const timeItems = [30, 40, 50];
      var item = timeItems[Math.floor(Math.random()*timeItems.length)];        
      for(let i=0; i<length; i++){
        postTime[i] = incrementDate(newTime, timeItems[Math.floor(Math.random()*timeItems.length)]);
        newTime = postTime[i];
      }
      return postTime;
    }

    const schedulePost = async (selectedBlog, postTime) => {
        if (selectedBlog) {
            const postScheduleTime = postTime;

            // Generate image using DALL-E API
            const imagePrompt = selectedBlog.imgDesc;
            const generatedImageResponse = await gptGenerateImage(imagePrompt);
            const imageData = await generatedImageResponse.data;
            setGeneratedImageData(imageData);

            // Upload image to WordPress (replace with actual WordPress API call)
            const imageUploadResponse = await wpUploadImage(imageData, selectedBlog.title);

            // Generate content using ChatGPT API
            const contentPrompt = promptTemplate(selectedBlog, 'default');
            const generatedContentResponse = await gptGenerateContent(contentPrompt, facts);
            let generatedContentText = generatedContentResponse.text;
            const internalLinks = await generatePostList(relatedKeyword);
            const ytIframe = await ytEmbedIframe(selectedBlog.title);
            generatedContentText += `\n <h3>${ytIframe.title}</h3> \n ${ytIframe.iframe} \n <h3>Also read:</h3> \n ${internalLinks}`;
            setGeneratedContent(generatedContentText);

            // Schedule post on WordPress with generated content and uploaded image
            const schedulePostResponse = await wpCreatePost({
                title: selectedBlog.title,
                content: generatedContentText,
                imageId: imageUploadResponse.id,
                excerpt: selectedBlog.info,
                scheduleDate: postTime[index],
            });
        }  
    }

    const autoPost = async (jsonData, index = 0, postTime) => {
      if (index < jsonData.length) {
        schedulePost(jsonData[index], postTime, index);
        setTimeout(() => {
          autoPost(jsonData, index + 1, postTime);
        }, 1 * 5 * 1000);
      }
    };

    // Handle generate button click
    const handleGenerateClick = async () => {
        const postTime = listPostDate(blogData.length);
        autoPost(blogData, 0, postTime);
    };

    return (
      <div className="grid grid-cols-2 p-px">
        <div className="flex flex-col p-px">
          <h1 className="font-sans title text-3xl font-bold text-gray-light">Blog Post Generator</h1>
          <label className="text-lg font-sans mt-4 text-gray-light" htmlFor="scheduleDate">Schedule Date and Time</label>
          <input className="block w-full rounded-md border-0 h-10 p-1 text-gray-light ring-1 ring-inset ring-gray-light placeholder:text-gray-dark bg-blue" type="datetime-local" id="scheduleDate"
            value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
          <button className="font-sans bg-blue-dark py-2 px-4 rounded mt-4 text-gray-light" onClick={handleGenerateClick}>Generate</button> 
        </div>
        <div  className="flex flex-col p-px">
          <h1 className="font-sans title text-3xl font-bold">Generated Content</h1>
        </div>
      </div>
    );
};


export default App;


// https://platform.openai.com/docs/api-reference/images/create

