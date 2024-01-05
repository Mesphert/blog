

export async function POST(reqs, res){
    const request = await reqs.json();
    const apiKey = process.env.YOUTUBE_API_KEY;
    const query = request.title;
        // YouTube Data API endpoint for video search
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;
    try{
	    // Fetch data from the YouTube API
	    const response = await fetch(apiUrl);
	    const data = await response.json();

	    console.log('Video Fetched From YouTube');
	    const ifrm = `<iframe title="${data.items[0].snippet.title}" width="760" height="428" src="https://www.youtube.com/embed/${data.items[0].id.videoId}?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
	    return new Response(JSON.stringify({title: data.items[0].snippet.title, iframe: ifrm}));
    }
    catch(error) {
        console.error('Error fetching YouTube API data:', error);
    };	
}