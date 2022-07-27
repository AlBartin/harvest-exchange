import React from 'react'

function AllTradesCard() {
  return (
    <div>
    <div>
    <Image cloudName={'chenkhov'} publicId={currentUser.avatar_url} alt={currentUser.username}>
        <Transformation height = "200" width="200" crop="fill" gravity="face"/>
    </Image>
    <h4>{currentUser.username}</h4>
    </div>
    </div>
  )
}

export default AllTradesCard