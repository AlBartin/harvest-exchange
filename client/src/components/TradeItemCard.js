import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { currentUserState, counterOfferState, counterBagState, counterArrayState, requestState, requestBagState, requestArrayState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'

function TradeItemCard({ item }) {

  const currentUser = useRecoilValue(currentUserState)
  const counter = useRecoilValue(counterOfferState)
  //const [counterBag, setCounterBag] = useRecoilState(counterBagState)
  const [counterArray, setCounterArray] = useRecoilState(counterArrayState)
    
  const request = useRecoilValue(requestState)
  //const [requestBag, setRequestBag] = useRecoilState(requestBagState)
  const [requestArray, setRequestArray] = useRecoilState(requestArrayState)


  const handleRequestBag = async () => {
    //setRequestBag([...requestBag, item])
    const requestItem = {
      request_id: request.id,
      bag_id: item.id,
      request_quantity: 0,
      measurement_units: item.measurement_units
    }
      console.log(requestItem)

    try{
      const response = await api.post('request-bag', requestItem)
      setRequestArray([...requestArray, response.data])
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }
  
  const handleOfferBag = async () => {
    //setCounterBag([...counterBag, item])
    const offerItem = {
      counter_id: counter.id,
      bag_id: item.id,
      counter_quantity: 0,
      measurement_units: item.measurement_units
    }
    console.log(offerItem)
    try{
      const response = await api.post('counter-bag', offerItem)
      //setCounterBag([response.data.bag])
      setCounterArray([...counterArray, response.data])
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