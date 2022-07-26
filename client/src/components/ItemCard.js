import React from 'react'
import { Image, Transformation } from 'cloudinary-react'
import { usersState, requestState } from '../recoil/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import api from '../api/posts'

function ItemCard({ item }) {

    const user = useRecoilValue(usersState)
    const [request, setRequest] = useRecoilState(requestState)
    const handleRequest = async () => {
        const newRequest = {
            user_id: user.id
        }
        try{
            const response = await api.post('request', {newRequest})
            setRequest(response)
        } catch(error) {
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
        <p><button className="item-button" onClick={handleRequest}>Initiate Trade</button></p>
        </div>
    </div>
    </div>
  )
}

export default ItemCard