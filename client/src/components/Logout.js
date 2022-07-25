import React from 'react'
import axios from 'axios'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import { useNavigate } from 'react-router-dom'
import api from '../api/posts'

function Logout() {

    const resetCurrentUser = useResetRecoilState(currentUserState)
    const currentUser = useRecoilValue(useRecoilValue)
    const navigate = useNavigate()

    const handleLogout = async () => {

        let logoutUser = await axios.delete('/logout')
        resetCurrentUser()
        navigate('/', {replace: true})
        catch((error) => {console.log(error)}
    }

        // fetch('/logout', {method: 'DELETE'})
        // .then(res => {
        //   if (res.ok) {
        //     resetFullUser()
        //     resetUserId()
        //     navigate('/', {replace: true})
        //   } else {
        //     res.json().then(error => console.error(error))
        //   }
        // })

  return (
    <div>Are you sure you want to log out?
        <button onClick={handleLogout}>Log out</button>
        <button>No, I'm not done</button>
    </div>
  )
}

export default Logout