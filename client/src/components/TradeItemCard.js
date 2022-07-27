import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState, counterOfferBagState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'

function TradeItemCard({ item  }) {

  const currentUser = useRecoilValue(currentUserState)

  const handleOffer = async () => {
    // const offerItem = {
    //   counter_id: ,
    //   bag_id: ,
    //   item_name: ,
    //   quantity: ,
    //   measurement_units: ,
    // }
    // try{
    //   const response = api.post('counter', offerItem)
    // } catch (error) {

    // }
  }


  return (
    <div>
    <div className="card">
        <Image cloudName={'chenkhov'} publicId={item.image_url} alt={item.item_name}>
            <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" width="175" crop="fill" />
        </Image>
    <div className="container">
    <h2 name={item.id}> {item.item_name}</h2>
    <p>Description: {item.descriptions}</p>
    <p>Quantity: {item.quantity} {item.measurement_units}</p>
    {currentUser.id === item.user_id ? <p><button onClick={handleOffer}>Offer Item</button></p>
    : <p><button>Request Item</button></p>}
    </div>
</div>
</div>
  )
}

export default TradeItemCard