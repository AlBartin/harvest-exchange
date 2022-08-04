import React, { useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { counterOfferState, requestState, requestArrayState, counterArrayState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'



function OfferItemCard({ item }) {
    
    const counter = useRecoilValue(counterOfferState)
    const [counterArray, setCounterArray] = useRecoilState(counterArrayState)

    const request = useRecoilValue(requestState)
    const [requestArray, setRequestArray] = useRecoilState(requestArrayState)

    const [newQuantity, setNewQuantity] = useState(0)
    const [editButton, setEditButton] = useState(false)
    const [quantityButton, setQuantityButton] = useState(false)

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
            request_quantity: newQuantity,
            measurement_units: item.measurement_units
          }
          console.log(requestItem)
      try{
        const response = await api.patch(`request-bag/${item.id}`, requestItem)
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
            counter_id: counter.id,
            bag_id: item.id,
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
        <div className="card">
            <Image cloudName={'chenkhov'} publicId={item.bag.image_url} alt={item.item_name}>
                <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" width="175" crop="fill" />
            </Image>
            <div className="container">
            <h2> {item.item_name}</h2>
            <p>Description: {item.bag.descriptions}</p>
            <p>Available Quantity: {item.bag.quantity} {item.bag.measurement_units}</p>
            <p>Requested Quantity: {newQuantity} {item.bag.measurement_units}</p>
            {editButton ? 
                <div>
                {item.counter ? 
                    <div>
                    {item.bag.quantity > 0 ?  
                        <div>
                            <form onSubmit={handleSetOffer}>
                            {newQuantity > 1 ? <button type='button' onClick={()=>setNewQuantity(newQuantity-1)}>-</button>
                            :<button>-</button>}
                            <input type="integer"  placeholder={newQuantity} value={newQuantity} onChange={handleSetQuantity}/>
                            {newQuantity < item.bag.quantity ? <button type='button' onClick={()=>setNewQuantity(newQuantity+1)}>+</button> 
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
                    {item.bag.quantity > 0 ?
                        <div>
                            <form onSubmit={handleSetRequest}>
                            {newQuantity > 1 ? <button type='button' onClick={()=>setNewQuantity(newQuantity-1)}>-</button>
                            :<button>-</button>}
                            <input type="integer" placeholder={newQuantity} name="newQuantity" value={newQuantity} onChange={handleSetQuantity}/>
                            {newQuantity < item.bag.quantity ? <button type='button' onClick={()=>setNewQuantity(newQuantity+1)}>+</button>
                            : <button>+</button>}
                            <input type='submit' value='Set Request Item'/>
                            </form>
                            <button onClick={handleDeleteRequest}>Remove {item.item_name} from Request</button>
                        </div>
                        : 
                            <p>Looks like {counter.user.username} has run out of {item.item_name}</p>
                        }
                    </div>}
                </div>
                :
                <button onClick={() => setEditButton(true)}>Edit Quantity</button>
            }
        </div>
    </div>
  )
}

export default OfferItemCard