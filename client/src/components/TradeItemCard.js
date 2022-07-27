import React, { useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { currentUserState, counterOfferState, counterOfferBagState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'

function TradeItemCard({ item }) {

  const currentUser = useRecoilValue(currentUserState)
  const counter = useRecoilValue(counterOfferState)
  const counterUser = counter.user
  const [counterBag, setCounterBag] = useRecoilState(counterOfferBagState)

  const [quantity, setQuantity] = useState('')
  let showQuantityButton = false

  const handleShowQuantity = () => {
    showQuantityButton = !showQuantityButton
  }

  const handleChange = (e) => {
    setQuantity(e.target.value)
  }

  const handleOffer = async () => {
    const offerItem = {
      counter_id: counter.id,
      bag_id: item.id,
      request_quantity: quantity,
    }
   try{
      const response = api.post('counter-bag', offerItem)
      setCounterBag([response.data])
      console.log(response)
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
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
    {currentUser.id === item.user_id ? 
    <p>
      {showQuantityButton ? 
      <p>
        <input type="integer" name="requestQuantity" value={quantity.requestQuantity} onChange={handleChange}/>
        <button onClick={handleOffer}>Offer This Amount</button>
      </p>
      : 
      <button onClick={handleShowQuantity}>Offer Item</button>
      }
    </p>
    :
    <p> 
    {showQuantityButton ? 
      <p>
        <input type="integer" name="requestQuantity" value={quantity.requestQuantity} onChange={handleChange}/>
        <button onClick={handleOffer}>Request This Amount</button>
      </p>
      : 
      <button onClick={handleShowQuantity}>Request Item</button>
      }
      </p>
    }
    </div>
</div>
</div>
  )
}

export default TradeItemCard