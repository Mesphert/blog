"use client"
// Load blog data from a JSON file (replace with your actual file path)
import blogData from './blogData.json';
import React, { useState } from 'react';
import wpUploadImage from '@utils/wpUploadImage';
import ContentLoading from './content-loading';
import ImageLoading from './image-loading';
import generatePostList from '@utils/generatePostList';
import addImageForTopics from '@utils/addImageForTopics';
import wpCreatePost from '@utils/wpCreatePost';
import gptGenerateContent from '@utils/gptGenerateContent';
import gptGenerateImage from '@utils/gptGenerateImage';
import ytEmbedIframe from '@utils/ytEmbedIframe';
import StatusBar from '@components/StatusBar';
import promptTemplate from '@resource/promptTemplate'

// App component
const App = () => {

    const [excutionTime, setExcutionTime] = useState();
    const [step, setStep] = useState(0);
    const [gptContentStatus, setGptContentStatus] = useState({
      step: 3,
      status: null,
      progressText: 'Generating Content',
      success: 'Content Generated',
      errorText: 'Generating Content Failed',
    });
    const [gptImageStatus, setGptImageStatus] = useState({
      step: 1,
      status: null,
      progressText: 'Generating Image',
      success: 'Image Generated',
      errorText: 'Generating Image Failed',
    });
    const [wpImageStatus, setWpImageStatus] = useState({
      step: 2,
      status: null,
      progressText: 'Uploading Image',
      success: 'Image Uploaded',
      errorText: 'Uploading Image Failed',
    });
    const [wpPostStatus, setWpPostStatus] = useState({
      step: 4,
      status: null,
      progressText: 'Publishing Content',
      success: 'Content Published',
      errorText: 'Publishing Image Failed',
    });
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
    // State to Facts
    const [facts, setFacts] = useState('');
    // State for content loading
    const [contLoading, setContLoading] = useState(false);
    // State for image loading
    const [imgLoading, setImgLoading] = useState(false);
    // State for loading container
    const [container, setContainer] = useState(false);

    // Handle change in select element
    const handleSelectChange = async (event) => {
        const selectedTitle = event.target.value;
        const blog = blogData.find((item) => item.title === selectedTitle);
        setSelectedBlog(blog);
    };

    const handleTimeChange = async (event) =>{
      setScheduleDate(event.target.value);
      console.log(scheduleDate);
    }

    // Handle generate button click
    const handleGenerateClick = async () => {
        setContLoading(true);
        setImgLoading(true);
        if (selectedBlog) {
          // Start time
          const startTime = performance.now();
          console.log(startTime/1000);

            // Generate image using DALL-E API
            setStep(1);
            const imagePrompt = selectedBlog.imgDesc;
            const generatedImageResponse = await gptGenerateImage(imagePrompt);
            const imageData = await generatedImageResponse.data;
            setImgLoading(false);
            setGeneratedImageData(imageData);
            generatedImageData? setGptImageStatus({...gptImageStatus, status: true}): setGptImageStatus({...gptImageStatus, status: false});

            // Upload image to WordPress (replace with actual WordPress API call)
            console.log('Uploading Image');
            imageData? setStep(2): console.log('gptImageStatus is FALSE');
            const imageUploadResponse = await wpUploadImage(imageData, selectedBlog.title);
            (imageUploadResponse?.id)? setWpImageStatus({...wpImageStatus, status: true}): setWpImageStatus({...wpImageStatus, status: false});

            // Generate content using ChatGPT API
            console.log('Generating Content');
            wpImageStatus.status? setStep(3): null;
            const contentPrompt = promptTemplate(selectedBlog, 'default');
            const generatedContentResponse = await gptGenerateContent(contentPrompt, facts);
            let generatedContentText = generatedContentResponse.text;
            generatedContentResponse?.text? setGptContentStatus({...gptContentStatus, status: true}): setGptContentStatus({...gptContentStatus, status: false});
            // generatedContentText = await addImageForTopics(generatedContentText, selectedBlog.title);
            const internalLinks = await generatePostList(relatedKeyword);
            const ytIframe = await ytEmbedIframe(selectedBlog.title);

            generatedContentText += `\n <h3>${ytIframe.title}</h3> \n ${ytIframe.iframe} \n <h3>Also read:</h3> \n ${internalLinks}`;
            console.log(generatedContentText);
            setGeneratedContent(generatedContentText);

            // Schedule post on WordPress with generated content and uploaded image
            gptContentStatus.status? setStep(4): null;
            const schedulePostResponse = await wpCreatePost({
                title: selectedBlog.title,
                content: generatedContentText,
                imageId: imageUploadResponse.id,
                excerpt: selectedBlog.info,
                scheduleDate: scheduleDate,
            });
            schedulePostResponse.id? setWpPostStatus({...wpPostStatus, status: true}): setWpPostStatus({...wpPostStatus, status: false});
            setStep(5); 

            // End time
            const endTime = performance.now();
            const timeInSeconds = (endTime - startTime)/1000;
            setExcutionTime(timeInSeconds);
        }
    };

    return (
      <div className="grid grid-cols-2 p-px">
        <div className="flex flex-col p-px">
          <h1 className="font-sans title text-3xl font-bold text-gray-light">Blog Post Generator</h1>
          <label className="text-lg font-sans mt-4 text-gray-light" htmlFor="blogSelect">Select a Blog</label>
          <select id="titles" className="block w-full rounded-md border-0 h-10 p-1 text-gray-light ring-1 ring-inset ring-gray-light placeholder:text-gray-dark bg-blue" id="blogSelect"              onChange={handleSelectChange}>
              <option value="" disabled>Select a blog...</option>
              {blogData.map((blog) => (
                  <option key={blog.title} value={blog.title}>{blog.title}</option>
              ))}
          </select>
      {/* Related Keyword input */}
          <label className="text-lg font-sans mt-4 text-gray-light" htmlFor="scheduleDate">Related keyword</label>
          <input className="block w-full rounded-md border-0 h-10 p-1 text-gray-light ring-1 ring-inset ring-gray-light placeholder:text-gray-dark bg-blue" type="text" id="keyword"
            value={relatedKeyword} onChange={(e) => setRelatedKeyword(e.target.value)} />
          {/* Facts input */}
          <label className="text-lg font-sans mt-4 text-gray-light" htmlFor="scheduleDate">Facts</label>
          <textarea className="block w-full rounded-md border-0 h-10 p-1 text-gray-light ring-1 ring-inset ring-gray-light placeholder:text-gray-dark bg-blue" id="keyword" value={facts} onChange={(e) => setFacts(e.target.value)}/>                  
          {/* Date and time input */}
          <label className="text-lg font-sans mt-4 text-gray-light" htmlFor="scheduleDate">Schedule Date and Time</label>
          <input className="block w-full rounded-md border-0 h-10 p-1 text-gray-light ring-1 ring-inset ring-gray-light placeholder:text-gray-dark bg-blue" type="datetime-local" id="scheduleDate"
            value={scheduleDate} onChange={handleTimeChange} />
          <button className="font-sans bg-blue-dark py-2 px-4 rounded mt-4 text-gray-light" onClick={handleGenerateClick}>Generate</button> 
          <div className="p-px">
          {[gptImageStatus, wpImageStatus, gptContentStatus, wpPostStatus].map((prcs) => (
              <StatusBar 
                key={prcs.step}
                progressText={prcs.progressText} 
                successText={prcs.successText} 
                errorText={prcs.errorText} 
                color={prcs.status} 
                loading={step}
                step={prcs.step}
              />
          ))}
            <h3 className="text-white">{`Excution Time: ${excutionTime}`}</h3>
          </div>
        </div>
        <div  className="flex flex-col p-px">
          <h1 className="font-sans title text-3xl font-bold">Generated Content</h1>
        {selectedBlog && (
            <div className="">
                <h2 className="font-sans ">{selectedBlog.title}</h2>
              {generatedImageData? (
                  <div><img src={`data:image/png;base64,${generatedImageData}`} /></div>
              ): (imgLoading && <ImageLoading />)}
              {generatedContent? (
                  <div><div dangerouslySetInnerHTML={{ __html: generatedContent }} /></div>
              ): (contLoading && <ContentLoading />)}
          </div>
        ) }
        </div>
      </div>
    );
};


export default App;


// https://platform.openai.com/docs/api-reference/images/create

