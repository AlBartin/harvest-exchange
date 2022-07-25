import React from 'react'
import { currentUserState } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'
import { Image, Transformation } from 'cloudinary-react'
// import { Axios } from 'axios'



function Profile () {
    const currentUser = useRecoilValue(currentUserState)
    const {username, email, avatar_url} = currentUser

    return (
        <div>
          <h1>Account</h1>
          <h4>Username: {username}</h4>
          <h4>Email: {email}</h4>
          <h4>Avatar: </h4>
          <Image cloudName={'chenkhov'} publicId={avatar_url} alt={username}>
            <Transformation width="500" height="500" crop="scale" />
            </Image>
            {/* <img src={avatar_url} alt="avatar" className="account-avatar-display" />
          <h4>Address: {address}</h4>
          <button onClick={handleLogout}>Logout</button> */}
        </div>
    
      )
    }
    
    export default Profile
