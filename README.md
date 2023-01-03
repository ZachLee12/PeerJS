# peer.js

A project using PeerJS that wraps the browser's WebRTC implementation to create a peer-to-peer connection API. 

A peer can create a P2P data or media stream connection to a remote peer. A connection can be established with just a `Peer-ID` of each client. Full documentation avaialble at https://peerjs.com/

This is a project on sending ```Data Blobs``` or files encoded with ```base64``` from one peer to another. At this stage of the project, ```Client-1``` is able to send images to ```Client-2``` in ```base64``` encoding.

To demo a peer-to-peer connection:

1. Clone or download .zip of this repo.

2. Navigate to ../PeerJS/server/server.js and run:
   ```
   npm install
   npm start
   ```
   A Peer Server will be listening on `port 9000`. (A cloud-based Peer Server is also possible, but running it locally is easier for a demo)
   
3. Navigate to ../PeerJS/client/client.js and run :
   ```
   npm install
   npm start
   ```
   A Peer(client) will be running on `port:8080`. 
   
4. We need to start another client to demo the peer-to-peer connection. Navigate to ../PeerJS/client-2/client-2.js and run : 
   ```
   npm install
   npm start
   ```
   A second Peer(client-2) will be running on `port:8081`. (Note the change in ports)
   
5. Open up the DevTools console. Refresh both `client` and `client-2`. Logging of some communication will be available in the console, which in this case, `client` sent some messages to `client-2`. 
   
   
   
   

