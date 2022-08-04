import React, { useState } from 'react'
import { Image, Transformation } from 'cloudinary-react'

 function TradeDashboardCardDetails({ request, counter }) {

    console.log(request)

  return (
    <div>
        {request ?
    <div>
        <Image cloudName = {'chenkhov'} publicId={request.image_url} alt={request.item_name}>
            <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" radius="max" width="150" crop="fill"/>
        </Image>
        <h3>{request.item_name}</h3>
        <h4>{request.request_quantity}</h4>
    </div>
    : null }
    {counter ?
    <div>
        <Image cloudName = {'chenkhov'} publicId={counter.image_url} alt={counter.item_name}>
            <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" radius="max" width="150" crop="fill"/>
        </Image>
        <h3>{counter.item_name}</h3>
        <h4>{counter.request_quantity}</h4>
    </div>
    :
    null
}
    </div>    

  )
}

export default TradeDashboardCardDetails