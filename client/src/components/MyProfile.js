import React from 'react'
import { currentUserState } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'
import { Image, Transformation } from 'cloudinary-react'
import ItemCard from './ItemCard'
// import { Axios } from 'axios'



function MyProfile () {
    const currentUser = useRecoilValue(currentUserState)
    const {username, email, avatar_url, all_bags} = currentUser
    console.log(all_bags)
    console.log(currentUser)
    
    return (
        <div>
          <div>
          <h1>Account</h1>
          <h4>Username: {username}</h4>
          <h4>Email: {email}</h4>
          <h4>Avatar: </h4>
          <Image cloudName={'chenkhov'} publicId={avatar_url} alt={username}>
            <Transformation width="500" height="500" crop="crop" gravity="auto"/>
          </Image>
          </div>
          {all_bags ? all_bags.map((product) => <ItemCard item={product}/>)
          :
          <h3>You do not have any items up for trade</h3>
          }
        </div>
    
      )
    }
    
    export default MyProfile
