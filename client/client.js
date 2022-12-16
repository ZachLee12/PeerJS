import { Peer } from "peerjs";

const peerID = "client-1"
const peer = new Peer("client-1", {
    // self-hosted SERVER config: 
    host: "localhost",
    path: "/server",
    port: "9000",
    debug: 1
});

//peer events
peer.on("open", (id) => {
    console.log('My peer ID is: ' + id);
})

peer.on("error", (error) => {
    console.log(error)
})



//dataConnection events
const conn = peer.connect("client-2") //dataConnection instance

//media connection event
//"open" = Emitted when the connection is established and ready-to-use.
conn.on("open", function () {
    console.log("Connection ID:" + conn.connectionId)

    console.log("Remote peer: " + conn.peer)
    conn.on("error", (err) => console.log(err))

    //send to client2
    conn.send("hello!") //you can send blobs using .send()

    conn.send("How are you?")
})


//code for converting to base64
let file = document.getElementById("file-input")
let fileType = undefined;
let fileSize = undefined;
let fileBase64 = undefined;

//only handles one file per time for now
file.addEventListener("change", async function (event) {
    await getFileData(event)
    appendMessageHistory()
    // console.log(fileType)
    // console.log(fileSize);
    // console.log(fileBase64)
})

async function getFileData(event) {
    let file = event.target.files[0]
    fileType = file.type
    fileSize = file.size
    fileBase64 = await imageToBase64(file)
}

function imageToBase64(file) {
    let reader = new FileReader();
    let base64 = "";
    reader.readAsDataURL(file) //async!!!
    return new Promise(resolve => {
        reader.onloadend = function () {
            //remove "data:*/*;base64", first to get base64 string
            base64 = reader.result.split(",")[1]
            resolve(base64);
        }
    })
}

function appendMessageHistory() {
    let div = document.createElement("div")
    div.innerText =
        `[File Type]: ${fileType} 
         [File Size]: ${fileSize} 
         [File Base64]: ${fileBase64.slice(0,10)}...`
    document.querySelector(".message-history-box").append(div)
    document.querySelector(".base64-string").value = fileBase64
}








