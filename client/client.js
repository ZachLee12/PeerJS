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

const conn = peer.connect("client-2") //dataConnection instance


//media connection event
//"open" = Emitted when the connection is established and ready-to-use.
conn.on("open", function () {
    console.log("Connection ID:" + conn.connectionId)

    console.log(conn.peer)
    conn.on("error", (err) => console.log(err))

    //send to client2
    conn.send("hello!") //you can send blobs using .send()

    conn.send("How are you?")
})






