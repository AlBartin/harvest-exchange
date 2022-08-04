import React, { useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { counterOfferState, requestState, requestArrayState, counterArrayState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'



function EditTradeCard({ item, quantity }) {
    
    const counter = useRecoilValue(counterOfferState)
    const [counterArray, setCounterArray] = useRecoilState(counterArrayState)

    const request = useRecoilValue(requestState)
    const [requestArray, setRequestArray] = useRecoilState(requestArrayState)

    const [newQuantity, setNewQuantity] = useState(quantity)
    const [editButton, setEditButton] = useState(false)
    const [quantityButton, setQuantityButton] = useState(false)

console.log(item)
console.log(request)
console.log(counter)


    const requestBag = request.all_request_bags
    const counterBag = counter.all_counter_bags

    const filteredRequest = requestBag.find(request => {
        return request.id === item.id;
        })

    const filteredCounter = counterBag.find(counter => {
        return counter.id === item.id;
        })

    const requestItems = request.all_bags
    const counterItems = counter.all_bags

    console.log(requestItems)
    console.log(counterItems)


    const requestItemDetails = requestItems.find(request => {
        return request.id === item.bag_id
    })

    const counterItemDetails = counterItems.find(counter => {
        return counter.id === item.bag_id
    })
   
    console.log(requestItemDetails)
    console.log(counterItemDetails)

    const handleShowQuantity = () => {
        setQuantityButton(quantityButton => !quantityButton)
      }

      const handleSetQuantity = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setNewQuantity(e.target.value)
      }
      
      const handleSetRequest = async (e) => {
        e.preventDefault()
        const requestItem = {
            //request_id: filteredRequest.id,
            bag_id: item.bag_id,
            request_quantity: newQuantity,
            measurement_units: item.measurement_units
          }
          console.log(requestItem)
      try{
        const response = await api.patch(`request-bag/${item.id}`, requestItem)
        console.log(response.data)
        const newRequest = requestArray.map(obj => {
            if (obj.id === response.data.id) {
                return response.data
            }
              return obj;
            })
        setRequestArray(newRequest);
        setEditButton(editButton => ! editButton)
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
    }
      
      const handleSetOffer = async (e) => {
        e.preventDefault()
        const offerItem = {
            //counter_id: filteredCounter.id,
            bag_id: item.bag_id,
            counter_quantity: newQuantity,
            measurement_units: item.measurement_units
          }
          console.log(offerItem)
          try{
            const response = await api.patch(`counter-bag/${item.id}`, offerItem)
            const newCounter = counterArray.map(obj => {
                if (obj.id === response.data.id) {
                    return response.data
                }
                  return obj;
                })
            setCounterArray(newCounter);
            setEditButton(editButton => ! editButton)
          } catch (error) {
            console.log(`Error: ${error.message}`)
          }
      }

      const handleDeleteRequest = async () => {
        try {
            await api.delete(`request-bag/${item.id}`)
            setRequestArray(requestArray =>
                requestArray.filter(request => {
                  return request.id !== item.id;
                }),
              );
        }
        catch(error) {
            console.log(`Error: ${error.message}`)
        }
      }

      const handleDeleteCounter = async () => {
        try {
            await api.delete(`counter-bag/${item.id}`)
            setCounterArray(counterArray =>
                counterArray.filter(counter => {
                  return counter.id !== item.id;
                }),
              );
        }
        catch(error) {
            console.log(`Error: ${error.message}`)
        }
      }

    return (
        <div>
            {requestItemDetails ?
        <div className="card">
            <Image cloudName={'chenkhov'} publicId={requestItemDetails.image_url} alt={requestItemDetails.item_name}>
                <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" width="175" crop="fill" />
            </Image>
            <div className="container">
            <h2> {requestItemDetails.item_name}</h2>
            <p>Description: {requestItemDetails.descriptions}</p>
            <p>Available Quantity: {requestItemDetails.quantity} {requestItemDetails.measurement_units}</p>
            <p>Requested Quantity: {newQuantity} {requestItemDetails.measurement_units}</p>
            {editButton ? 
                <div>  
                    <form onSubmit={handleSetOffer}>
                    {newQuantity > 1 ? <button type='button' onClick={()=>setNewQuantity(newQuantity-1)}>-</button>
                    :<button type='button'>-</button>}
                    <input type="integer"  placeholder={newQuantity} value={newQuantity} onChange={handleSetQuantity}/>
                    {newQuantity < requestItemDetails.quantity ? <button type='button' onClick={()=>setNewQuantity(newQuantity+1)}>+</button> 
                    : <button type='button'>+</button>}
                    <input type='submit' value='Set Offer Items'/>
                    </form>
                    <button onClick={handleDeleteCounter}>Remove {item.item_name} from Offer</button>
                </div>
                : <button onClick={() => setEditButton(true)}>Edit Quantity</button> 
                }
            </div>
        </div>
        : null }
        {counterItemDetails ?
        <div className="card">
            <Image cloudName={'chenkhov'} publicId={counterItemDetails.image_url} alt={counterItemDetails.item_name}>
                <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" width="175" crop="fill" />
            </Image>
            <div className="container">
            <h2> {counterItemDetails.item_name}</h2>
            <p>Description: {counterItemDetails.descriptions}</p>
            <p>Available Quantity: {counterItemDetails.quantity} {counterItemDetails.measurement_units}</p>
            <p>Requested Quantity: {newQuantity} {counterItemDetails.measurement_units}</p>
            {editButton ? 
                <div>
                    <form onSubmit={handleSetRequest}>
                    {newQuantity > 1 ? <button type='button' onClick={()=>setNewQuantity(newQuantity-1)}>-</button>
                    :<button type='button'>-</button>}
                    <input type="integer" placeholder={newQuantity} name="newQuantity" value={newQuantity} onChange={handleSetQuantity}/>
                    {newQuantity < counterItemDetails.quantity ? <button type='button' onClick={()=>setNewQuantity(newQuantity+1)}>+</button>
                    : <button type='button'>+</button>}
                    <input type='submit' value='Set Request Item'/>
                    </form>
                    <button onClick={handleDeleteRequest}>Remove {item.item_name} from Request</button>
                </div>
                : <button onClick={() => setEditButton(true)}>Edit Quantity</button> 
                }
            </div>
        </div>
        : null }  
        </div>
  )
}

export default EditTradeCard