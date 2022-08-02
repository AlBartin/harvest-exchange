import React, { useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { currentUserState, counterOfferState, counterOfferBagState, requestState, requestBagState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'

function TradeItemCard({ item }) {

  const currentUser = useRecoilValue(currentUserState)
  const counter = useRecoilValue(counterOfferState)
  const [counterBag, setCounterBag] = useRecoilState(counterOfferBagState)
  const request = useRecoilValue(requestState)
  const [requestBag, setRequestBag] = useRecoilState(requestBagState)

  const [quantity, setQuantity] = useState(0)

  console.log(request.id)
  console.log(item.id)
  console.log(quantity)
  console.log(requestBag)

  const handleRequestBag = () => {
    setRequestBag([...requestBag, item])  
  }
  
  const handleOfferBag = () => {
    setCounterBag([...counterBag, item])
  }

  const handleOfferSubmit = async (e) => {
    e.preventDefault()
    const offerItem = {
      counter_id: counter.id,
      bag_id: item.id,
      request_quantity: quantity,
    }
   try{
      const response = await api.post('counter-bag', offerItem)
      setCounterBag([...counterBag, response.data.bag])
      console.log(response.data.bag)
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
      <button onClick={handleOfferBag}>Offer Item</button>
    : 
      <button onClick={handleRequestBag}>Request Item</button>
    }
    </div>
  </div>
  </div>
  )
}

export default TradeItemCard


// {currentUser.id === item.user_id ? 
//   <p>
//     {quantityButton ? 
//     <form onSubmit={handleOfferSubmit}>
//       <input type="integer" name="requestQuantity" value={quantity.requestQuantity} onChange={(e)=>setQuantity(e.target.value)}/>
//       <input type='submit' value='Offer This Amount'/>
//     </form>
//     : 
//     <button onClick={handleShowQuantity}>Offer Item</button>
//     }
//   </p>
//   :
//   <p> 
//   {quantityButton ? 
//     <form onSubmit={handleOfferSubmit}>
//       <input type="integer" name="requestQuantity" value={quantity.requestQuantity} onChange={(e)=>setQuantity(e.target.value)}/>
//       <input type='submit' value='Request This Amount'/>
//     </form>
//     : 
//     <button onClick={handleShowQuantity}>Request Item</button>
//     }
//     </p>
//   }





  // const handleChange = (e) => {
  //   setQuantity(e.target.value)
  //   console.log(quantity)
  // }


  // const [quantity, setQuantity] = useState('')
  // const [quantityButton, setQuantityButton] = useState(false)


  // const handleShowQuantity = () => {
  //   setQuantityButton(quantityButton => !quantityButton)
  // }