
//if you have a local file, then put the path
fetch("https://i.picsum.photos/id/695/500/500.jpg?hmac=tWPrjN3j85bN4wqSC-VFWrQEkXbroIbbQNvGBFJPA1c")

    .then(res => res.blob()) //convert URL to Blob 
    .then(blob => {
        readFile(blob) //async
        console.log(blob)
        const file = new File([blob], 'image', { type: blob.type })
        console.log(file); //can interchange blob and file
    })

function readFile(input) {
    const fr = new FileReader();

    //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
    fr.readAsDataURL(input); //"blob" parameter
   

    //event fired when "content read" is available
    fr.addEventListener("load", () => {
        const res = fr.result; // returns string as data format
        console.log(res)
    })
}

