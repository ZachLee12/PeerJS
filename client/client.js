import { Peer } from "peerjs";

const peerID = "client-1"
const peer = new Peer("client-1", {
    // self-hosted SERVER config: 
    host: "localhost",
    path: "/",
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
    conn.send("hello!") //can send blobs using this
})


//code for converting to base64
let file = document.getElementById("file-input")
let fileType = undefined;
let fileSize = undefined;
let fileBase64 = undefined;
let dataReady = false;

//only handles one file per time for now
file.addEventListener("change", async function (event) {
    await getFileData(event)
    dataReady = true;
    appendMessageHistory()
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
    reader.readAsDataURL(file) //async
    return new Promise(resolve => {
        reader.onloadend = function () {
            //remove "data:*/*;base64", first to get base64 string
            // base64 = reader.result.split(",")[1] //if you just want base64
            base64 = reader.result;
            resolve(base64);
        }
    })
}

function appendMessageHistory() {
    let div = document.createElement("div")
    div.innerText =
        `[File Type]: ${fileType} 
         [File Size]: ${fileSize} 
         [File Base64]: ${fileBase64.slice(0, 10)}...`
    document.querySelector(".message-history-box").append(div)
    document.querySelector(".base64-string").value = fileBase64
}

//button functions
document.querySelector("#send-button").addEventListener("click", () => {
    if (dataReady) {
        conn.send(fileBase64)
    }
})









