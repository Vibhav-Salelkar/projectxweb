/*
Documentation:

- create react app with vite
- cleanup unwanted files
- install tailwind, daisyui
    - configure in config file of vit
- create components folder and add NavBar, Footer, Profile components
- use navbar and footer in from daisy ui in app.jsx
- install react-router and create browser router in app.jsx
    - create routes and nested route, define outlet in main component where view will change as child
- implement login card
    - use daisyui card component
    - add state for username and password on change input
    - handle login button click and call api of login passing username and password 
    - use axios for api call
- add cors in backend
    - install cors package
    - call as middleware in app.js, eg. app.use(cors({origin: 'http://localhost:5173', credentials: true}))
    - this corsOptions will allow the frontend to access the backend, and also pass cookies and headers
- add cors in frontend
    - while sending request, add withCredentials: true
    - this will store token in cookies
- install redux-toolkit package
- create store folder
    - create appStore.js file
    - create slices folder
        - create userSlice.js file
- add actions and reducers in userSlice.js
- use those while login and signup
- create signup and login form in same file based on state
- handle invalid credentials error
- in home page get the profile of user, if not then redirect to login page

Web Sockets and socket.io:
- web sockets, bidirectional, both client and server send data to each other
- event based communication between client and server
- low latency
- create Chat component and route which is dynamic - /chat/:targetUserId
- use the useParams() hook to get the param data that is id in chat
- write jsx and styles for basic chat screen with message area and input and send button to send chat
- install socket.io-client package
- create socket connection method in utils folder
- as soon as the chat component userid or targetuserid changes, create a socket connection
- emit event to join the chat room with userId and targetUserId
- dont forget to disconnect the socket when the component unmounts
- store the input message in state and on send call socket connection and emit the event to send message
- send info like firstName, userId, targetUserId and message
- listen to the messageReceived event and update the messages state with the message sent by server
    - now you will wonder why not store when sending the message?
    - or what is need to get message on server and then again emit receive message event?
    - it is because it is chat, and other user will send, server will listen to sendmessage, and
    - broadcast it back to all users in the room using receive message event

More on Web Sockets:



















*/
