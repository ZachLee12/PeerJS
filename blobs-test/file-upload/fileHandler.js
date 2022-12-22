
document.querySelector("#myFile").addEventListener("change", handleFile, false)

function handleFile() {

    const fileList = this.files;
    console.log(fileList)

    const fr = new FileReader();

    //async
    fr.onload = (event) => {
        //console.log(event.target.result)
    }


    const blob = new Blob(fileList);

    console.log(blob);

}





