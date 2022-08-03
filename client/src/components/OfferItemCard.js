import React, { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { currentUserState, counterOfferState, counterOfferBagState, requestState, requestBagState, requestArrayState, counterArrayState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'



function OfferItemCard({ item, counterBagId, requestBagId }) {

    const currentUser = useRecoilValue(currentUserState)
    
    const counter = useRecoilValue(counterOfferState)
    const [counterBag, setCounterBag] = useRecoilState(counterOfferBagState)
    const [counterArray, setCounterArray] = useRecoilState(counterArrayState)
    const [counterItem, setCounterItem] = useState({})

    const request = useRecoilValue(requestState)
    const [requestBag, setRequestBag] = useRecoilState(requestBagState)
    const [requestArray, setRequestArray] = useRecoilState(requestArrayState)
    const [requestItem, setRequestItem] = useState({})

    const [newQuantity, setNewQuantity] = useState(0)
    const [editButton, setEditButton] = useState(false)
    const [quantityButton, setQuantityButton] = useState(false)

    // console.log(counterBagId)
    // console.log(requestBagId)
    //console.log(currentUser)
    // console.log(counter.user.id)
    // console.log(request.user.id)
    console.log(item)

     console.log(requestBag)
     console.log(counterBag)

    const handleShowQuantity = () => {
        setQuantityButton(quantityButton => !quantityButton)
      }

      const handleSetQuantity = (e) => {
        console.log(e.target.value)
        setNewQuantity(e.target.value)
      }
      
      const handleSetRequest = async (e) => {
        e.preventDefault()
        const requestItem = {
            request_id: request.id,
            bag_id: item.id,
            request_quantity: newQuantity
          }
          console.log(requestItem)

      try{
        const response = await api.post('request-bag', requestItem)
        console.log(response.data)
        setRequestItem(response.data)
        setEditButton(editButton => ! editButton)
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
          //setRequestArray([...requestArray, requestItem])
    }
      
      const handleSetOffer = async (e) => {
        e.preventDefault()
        const offerItem = {
            counter_id: counter.id,
            bag_id: item.id,
            counter_quantity: newQuantity
          }
          console.log(offerItem)
          try{
            const response = await api.post('counter-bag', offerItem)
            //setCounterBag([response.data.bag])
            console.log(response.data)
            setCounterItem(response.data)
            setCounterArray([...counterArray, response.data])
            setEditButton(editButton => ! editButton)
          } catch (error) {
            console.log(`Error: ${error.message}`)
          }
          //setCounterArray([...counterArray, offerItem])
      }

      const handleDeleteRequest = async () => {
        try {
            await api.delete(`request-bag/${requestItem.id}`)
            const requestList = requestBag.filter(request => request.id !== item.id)
            setRequestBag(requestList)
        }
        catch(error) {
            console.log(`Error: ${error.message}`)
        }
      }

      const handleDeleteCounter = async () => {
        try {
            await api.delete(`counter-bag/${counterItem.id}`)
            const counterList = counterBag.filter(counter => counter.id !== item.id)
            setCounterBag(counterList)    
        }
        catch(error) {
            console.log(`Error: ${error.message}`)
        }
      }

    return (
        <div className="card">
            <Image cloudName={'chenkhov'} publicId={item.image_url} alt={item.item_name}>
                <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" width="175" crop="fill" />
            </Image>
            <div className="container">
            <h2 name={item.id}> {item.item_name}</h2>
            <p>Description: {item.descriptions}</p>
            <p>Available Quantity: {item.quantity} {item.measurement_units}</p>
            <p> Requested Quantity: {newQuantity}</p>
            {editButton ? 
                <div>
                {currentUser.id == item.user_id ? 
                    <div>
                    {item.quantity > 0 ?  
                        <div>
                            <form onSubmit={handleSetOffer}>
                            {newQuantity > 1 ? <button type='button' onClick={()=>setNewQuantity(newQuantity-1)}>-</button>
                            :<button>-</button>}
                            <input type="integer"  placeholder={newQuantity} value={newQuantity} onChange={handleSetQuantity}/>
                            {newQuantity < item.quantity ? <button type='button' onClick={()=>setNewQuantity(newQuantity+1)}>+</button> 
                            : <button>+</button>}
                            <input type='submit' value='Set Offer Items'/>
                            </form>
                            <button onClick={handleDeleteCounter}>Remove {item.item_name} from Offer</button>
                        </div>
                    :
                    <p>Looks like you have run out of {item.item_name}</p>}
                    </div>
                    :
                    <div>           
                    {item.quantity > 0 ?
                        <div>
                            <form onSubmit={handleSetRequest}>
                            {newQuantity > 1 ? <button type='button' onClick={()=>setNewQuantity(newQuantity-1)}>-</button>
                            :<button>-</button>}
                            <input type="integer" placeholder={newQuantity} name="newQuantity" value={newQuantity} onChange={handleSetQuantity}/>
                            {newQuantity < item.quantity ? <button type='button' onClick={()=>setNewQuantity(newQuantity+1)}>+</button>
                            : <button>+</button>}
                            <input type='submit' value='Set Request Item'/>
                            </form>
                            <button onClick={handleDeleteRequest}>Remove {item.item_name} from Request</button>
                        </div>
                        : 
                            <p>Looks like {counter.user} has run out of {item.item_name}</p>
                        }
                    </div>}
                </div>
                :
                <button onClick={() => setEditButton(true)}>Edit Quantity</button>
            }
            
            {/* <div>
            {currentUser.id === item.user_id ? 
                <div>
                {item.quantity > 0 ?  
                    <div>
                        <form onSubmit={handleSetOffer}>
                        {newQuantity > 1 ? <button type='button' onClick={()=>setNewQuantity(newQuantity-1)}>-</button>
                        :<button>-</button>}
                        <input type="integer"  placeholder={newQuantity} value={newQuantity} onChange={handleSetQuantity}/>
                        {newQuantity < item.quantity ? <button type='button' onClick={()=>setNewQuantity(newQuantity+1)}>+</button> 
                        : <button>+</button>}
                        <input type='submit' value='Set Offer Items'/>
                        </form>
                    </div>
                :
                <p>Looks like you have run out of {item.item_name}</p>}
                </div>
                :
                <div>           
                {item.quantity > 0 ?
                    <div>
                        <form onSubmit={handleSetRequest}>
                        {newQuantity > 1 ? <button type='button' onClick={()=>setNewQuantity(newQuantity-1)}>-</button>
                        :<button>-</button>}
                        <input type="integer" placeholder={newQuantity} name="newQuantity" value={newQuantity} onChange={handleSetQuantity}/>
                        {newQuantity < item.quantity ? <button type='button' onClick={()=>setNewQuantity(newQuantity+1)}>+</button>
                        : <button>+</button>}
                        <input type='submit' value='Set Request Item'/>
                        </form>
                    </div>
                    : 
                        <p>Looks like {counter.user} has run out of {item.item_name}</p>
                    }
                </div>}
            </div> */}
            
            </div>
    </div>
  )
}

export default OfferItemCard

{/* 
            <div>
            {currentUser.id === item.user_id ? 
                <div>
                {item.quantity > 0 ?  
                    <form onSubmit={handleSetQuantity}>
                        {quantity >=1 ? <button onClick={()=>setQuantity(quantity-1)}>-</button>
                        : <button>-</button>}
                        {/* <input type="integer"  placeholder={quantity} name="offerQuantity" value={quantity.offerQuantity} onChange={handleSetQuantity}/>
                        {quantity <= item.quantity ? <button onClick={()=>setQuantity(quantity+1)}>+</button>
                        : <button>+</button>}
                        <input type='submit' value='Offer This Amount'/>
                    </form>
                    : 
                    <p>Looks like you've run out of {item.item_name}</p>
                } </div>
            :           
            <div>
            {item.quantity > 0 ?  
                <form onSubmit={handleSetQuantity}>
                    {quantity >=1 ? <button onClick={()=>setQuantity(quantity-1)}>-</button>
                    : <button>-</button>}
                    {/* <input type="integer" placeholder={quantity} name="requestQuantity" value={quantity} onChange={handleSetQuantity}/>
                    {quantity <= item.quantity ? <button onClick={()=>setQuantity(quantity+1)}>+</button>
                    : <button>+</button>}
                    <input type='submit' value='Request This Amount'/>
                </form>
                : 
                <p>Looks like {counter.user} has run out of {item.item_name}</p>
            } </div>}
            </div> */}

                //   const handleDealSubmit = async () => {
        
    //     const deal = {
    //         request_id: request.id,
    //         counter_id: counter.id,
    //         request_finalized: false,
    //         deal_finalized: false
    //     }

    //     try{
    //         const response = await api.post('request-bag', requestBag)
    //         setRequestBag([response.data.bag])
    //         console.log(response.data.bag)
    //       } catch (error) {
    //         console.log(`Error: ${error.message}`)
    //       }

    //    try{
    //       const response = await api.post('counter-bag', counterBag)
    //       setCounterBag([response.data.bag])
    //       console.log(response.data.bag)
    //     } catch (error) {
    //       console.log(`Error: ${error.message}`)
    //     }

    //     try{
    //         const response = await api.post('deal', deal)
    //         console.log(response.data)
    //       } catch (error) {
    //         console.log(`Error: ${error.message}`)
    //       }
    //   }
