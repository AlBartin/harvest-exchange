import React from 'react'
import { Image, Transformation } from 'cloudinary-react'

function TradeUserCard() {
  return (
    <div className="card">
    <Image cloudName={'chenkhov'} publicId={user.avatar_url} alt={user.username}>
    <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" radius="max" width="150" crop="fill" />
    </Image>
    <div className="container">
      <h2 name={user.id}> {user.username}</h2>
      {/* <p className="title">I'm currently growing: {user.crops_grown}</p>
      <p>Searching for: {user.in_search_of_crops}</p> */}
      <p><button className="user-button">View Basket</button></p>
    </div>
    </div>
  )
}

export default TradeUserCard