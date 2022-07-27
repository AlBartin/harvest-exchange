import React from 'react'
import { Image, Transformation } from 'cloudinary-react'
import { requestState, requestBagState, counterOfferState, counterOfferBagState, currentUserState, dealState } from '../recoil/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import api from '../api/posts'

function ItemCard({ item }) {

    const navigate = useNavigate()
    const currentUser = useRecoilValue(currentUserState)
    const [request, setRequest] = useRecoilState(requestState)
    const [requestBag, setRequestBag] = useRecoilState(requestBagState)
    const [counterOffer, setCounterOffer] = useRecoilState(counterOfferState)
    const [deal, setDeal] = useRecoilState(dealState)

        const handleDeal = async () => {
            const newDeal = {
                ...deal,
                request_id: request.id,
                request_finalized: false,
                counter_finalized: false
            }
            try {
                const dealResp = await api.post('deal', newDeal)
                setDeal(dealResp.data)
                navigate('/current-trades')
            } catch(error) {
                console.log(`Error: ${error.message}`)
            }
            console.log(deal)
        }



    const handleRequest = async () => {
        
        const newRequest = {
            user_id: currentUser.id
        }
        
        try {
            const requestResp = await api.post('request', newRequest)
            setRequest(requestResp.data)
            setRequestBag([...requestBag, item])
            console.log(requestResp.data)
            console.log(requestResp.data.id)
            const requestID = {request_id: requestResp.data.id}
            setDeal({...deal, ...requestID})
            console.log(deal)
        } catch(error) {
            console.log(`Error: ${error.message}`)
        }
        const newCounterOffer = {
            user_id: item.user_id
        }

        try {
            const counterResp = await api.post('counter', newCounterOffer)
            setCounterOffer(counterResp.data)
            console.log(counterResp.data)
            console.log(counterResp.data.id)
            const counterID = {counter_id: counterResp.data.id}
            setDeal({...deal, ...counterID})
        } catch(error) {
            console.log(`Error: ${error.message}`)
        }
        handleDeal();

        // const newDeal = {
        //     request_id: requestResp.data.id,
        //     counter_id: counterResp.data.id,
        //     request_finalized: false,
        //     counter_finalized: false
        // }

        // try {
        //     const dealResp = await api.post('deal', newDeal)
        //     setDeal(dealResp.data)
        //     navigate('/current-trades')
        // } catch(error) {
        //     console.log(`Error: ${error.message}`)
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
        {currentUser ? 
        <p><button className="item-button" onClick={handleRequest}>Initiate Trade</button></p>
        : null}

        </div>
    </div>
    </div>
  )
}

export default ItemCard