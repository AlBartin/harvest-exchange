import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import SignupForm from './components/SignupForm'
import Login from './components/Login'
import Profile from "./components/Profile";
import BrowseUsers from './components/BrowseUsers'
import AddItem from "./components/AddItem";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/add-item' element={<AddItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<BrowseUsers />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App;