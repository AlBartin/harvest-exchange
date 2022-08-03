import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'

function TradeCard({ user }) {
  
const currentUser = useRecoilValue(currentUserState)
    
return (
    <div>
        <div>
            <Image cloudName={'chenkhov'} publicId={currentUser.avatar_url} alt={currentUser.username}>
                <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" radius="max" width="150" crop="fill" />
            </Image>
            <h2 name={currentUser.id}> {currentUser.username}</h2>
        </div>
        
        <div>
            <Image cloudName={'chenkhov'} publicId={user.avatar_url} alt={user.username}>
                <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" radius="max" width="150" crop="fill" />
            </Image>
            <h2 name={user.id}> {user.username}</h2>
        </div>
    </div>
  )
}

export default TradeCard