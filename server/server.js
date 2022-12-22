const { PeerServer } = require('peer');

const peerServer = PeerServer({
    port: 9000,
    path: '/'
}, () => {
    console.log("Peer Server listening on port 9000...")
});


