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



























*/
