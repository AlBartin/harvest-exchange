import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import SignupForm from './components/SignupForm'
import Login from './components/Login'
import MyAccount from "./components/MyAccount";
import BrowseUsers from './components/BrowseUsers'
import AddItem from "./components/AddItem";
import Logout from "./components/Logout";
import ItemsContainer from "./components/ItemsContainer"
import CurrentTradeContainer from './components/CurrentTradeContainer'
import ErrorPage from './components/ErrorPage'
import AllTradesContainer from './components/AllTradesContainer'
import EditTradeContainer from './components/EditTradeContainer'

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-item' element={<AddItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<BrowseUsers />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/my-profile" element={<MyAccount />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/all-items" element={<ItemsContainer />} />
        <Route path="/current-trades" element={<CurrentTradeContainer />} />
        <Route path="/trades" element={<AllTradesContainer />} />
        <Route path="/edit-trade" element={<EditTradeContainer />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App;