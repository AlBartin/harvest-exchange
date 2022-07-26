import React from 'react'
import { Image, Transformation } from 'cloudinary-react'
import { usersState } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'


function ItemCard({ item }) {

    const user = useRecoilValue(usersState)
    //const [userBasket, setUserBasket] = useState('')


    return (
    <div>
        <div class="card">
            <Image cloudName={'chenkhov'} publicId={item.image_url} alt={item.item_name}>
                <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" width="175" crop="fill" />
            </Image>
        <div className="container">
        <h2 name={item.id}> {item.item_name}</h2>
        <p>Description: {item.descriptions}</p>
        <p>Quantity: {item.quantity} {item.measurement_units}</p>
        <p>In {user.username}'s basket</p>
        <p><button className="item-button">Initiate Trade</button></p>
        </div>
    </div>
    </div>
  )
}

export default ItemCard