import React from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import { useNavigate } from 'react-router-dom'
import api from '../api/posts'

function Logout() {

    const setCurrentUser = useSetRecoilState(currentUserState)
    const currentUser = useRecoilValue(currentUserState)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
        await api.delete('logout')
        localStorage.removeItem('user')
        setCurrentUser(null)
        console.log(currentUser)
        navigate('/')
        } catch (error) {console.log(error)}
    }

  // const handleLogout = () => {
  //   api.delete('/logout')
  //   .then({resetCurrentUser()
  //   localStorage.removeItem('user')
  //   navigate('/')})
  //   .catch(error) {console.log(error)}
  // }

  return (
    <div>Are you sure you want to log out?
        <button onClick={handleLogout}>Log out</button>
        <button>No, I'm not done</button>
    </div>
  )
}

export default Logout