import React from 'react'
import axios from 'axios'
import { useResetRecoilState } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import { useNavigate } from 'react-router-dom'
import api from '../api/posts'

function Logout() {

    const resetCurrentUser = useResetRecoilState(currentUserState)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
        await api.delete('/logout')
        resetCurrentUser()
        navigate('/')
        } catch (error) {console.log(error)}
    }

  return (
    <div>Are you sure you want to log out?
        <button onClick={handleLogout}>Log out</button>
        <button>No, I'm not done</button>
    </div>
  )
}

export default Logout