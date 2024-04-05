import './App.css';
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";

import Homepage from './Homepage.jsx';
import CreatePost from './CreatePost/CreatePost.jsx';

function App() {
  return (
    <div className='homepage'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
