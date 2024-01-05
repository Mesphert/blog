const downloadImage = async (url, imageName, imagePath) => {
  try{
    const response = await fetch(url);
    const buffer = await response.buffer();
    const fullPath = path.join(imagePath, imageName);
    fs.writeFileSync(fullPath, buffer);
    console.log(fullPath);
    return fullPath;
  }
  catch(error){
    console.log(error)
  }
}

export default downloadImage;