import { BrowserRouter, Routes, Route } from "react-router";

import './App.css';
import Profile from './components/Profile';
import Home from "./components/Home";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import Chat from "./components/Chat";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={< Feed />} />
            <Route path="login" element={< Login />} />
            <Route path="profile" element={< Profile />} />
            <Route path="connections" element={< Connections />} />
            <Route path="requests" element={< Requests />} />
            <Route path="chat/:targetUserId" element={< Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
