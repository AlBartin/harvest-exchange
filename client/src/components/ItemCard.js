import React from 'react'
import { Image, Transformation } from 'cloudinary-react'
import { requestState, requestArrayState, counterOfferState, currentUserState } from '../recoil/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import api from '../api/posts'

function ItemCard({ item }) {

    const navigate = useNavigate()
    const currentUser = useRecoilValue(currentUserState)
    const [request, setRequest] = useRecoilState(requestState)
    const [counterOffer, setCounterOffer] = useRecoilState(counterOfferState)
    const [requestArray, setRequestArray] = useRecoilState(requestArrayState)

    const handleRequest = async () => {
        
        const newRequest = {
            user_id: currentUser.id
        }
        
        try {
            const requestResp = await api.post('request', newRequest)
            setRequest(requestResp.data)

            const requestItem = {
                request_id: requestResp.data.id,
                bag_id: item.id,
                request_quantity: 0,
                measurement_units: item.measurement_units
            }
            try{
                const response = await api.post('request-bag', requestItem)
                setRequestArray([...requestArray, response.data])
                console.log(response)
    
            } catch (error) {
                console.log(`Error: ${error.message}`)
            }
        } catch(error) {
            console.log(`Error: ${error.message}`)
        }

        const newCounterOffer = {
            user_id: item.user_id
        }

        try {
            const counterResp = await api.post('counter', newCounterOffer)
            setCounterOffer(counterResp.data)
            navigate('/current-trades')
        } catch(error) {
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
                <p>Quantity: {item.quantity} {item.measurement_units}</p>
                {currentUser && currentUser.id !== item.user_id ? 
                <p><button className="item-button" onClick={handleRequest}>Initiate Trade</button></p>
                : null}
            </div>
        </div>
  )
}

export default ItemCard