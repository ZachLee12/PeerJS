import { Peer } from "peerjs";

const peerID = "client-2"
const peer = new Peer(peerID, {
    host: "localhost",
    path: "/",
    port: "9000",
    debug: 1
});

//peer events
peer.on("open", (id) => {
    console.log('My peer ID is: ' + id);
})

//base64 from client-1 test:
let fileBase64 = "";
let image = new Image();
peer.on('connection', function (conn) {
    //received from client-1, when connected
    conn.on('data', function (data) {
        fileBase64 = data;
        let imgElement = document.createElement("img");
        imgElement.src = data;
        imgElement.width = 100;
        document.querySelector("section").append(imgElement)
        console.log(`[${conn.peer}]: ` + fileBase64.slice(0, 10) + "...");
    });
});


const conn = peer.connect("client-1")

conn.on("open", function () {
    console.log("Connection ID: " + conn.connectionId)

    //received from client1
    conn.on("data", (data) => {
        console.log("Received" + data);
    }
    )

    conn.on("error", (err) => console.log(err))

    console.log("Remote peer: " + conn.peer)
})



