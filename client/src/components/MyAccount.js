import React from 'react'
import { currentUserState, userBasketState } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'
import { Image, Transformation } from 'cloudinary-react'
import ItemCard from './ItemCard'
// import { Axios } from 'axios'



function MyAccount () {
    const currentUser = useRecoilValue(currentUserState)
    const {username, email, avatar_url, street_address, city_address, state_address, zipcode} = currentUser
    const userBasket = useRecoilValue(userBasketState)
    
    const userItems = userBasket.map((product) => <ItemCard key={product.id} item={product} />)
    
    return (
        <div>
          <div>
          <h1>Account</h1>
          <h4>Username: {username}</h4>
          <h4>Email: {email}</h4>
          <h4>Avatar: </h4>
          <Image cloudName={'chenkhov'} publicId={avatar_url} alt={username}>
            <Transformation height="500" crop="scale" />
          </Image>
          <h4>Address: {street_address}<br/>{city_address}, {state_address} {zipcode}</h4>
          </div>
          {userItems ? <div>{userItems}</div> : <h3>You do not have any items up for trade</h3> }
        </div>
      )
    }
    
    export default MyAccount
