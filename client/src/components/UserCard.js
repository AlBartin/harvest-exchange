import React from 'react'
import { useRecoilValue } from 'recoil'
import { Image, Transformation } from 'cloudinary-react'
import { usersState } from '../recoil/atoms'


function UserCard ({ user }) {

// const user = useRecoilValue(currentUserState)


return (
    <div>
        <Image cloudName={'chenkhov'} publicId={user.avatar_url} alt={user.username}>
        <Transformation width="500" height="500" crop="scale" />
        </Image>
        {/* <img src={user.avatar_url} alt={user.username} name={user.id} style={{cursor:"pointer"}}/> */}
        <h2 name={user.id}> {user.username}</h2>
    </div>
  )
}

export default UserCard