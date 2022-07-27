import React, { useEffect, useState } from 'react'
import { requestState, requestBagState, counterOfferUserState, counterOfferState, currentUserState } from '../recoil/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Image, Transformation } from 'cloudinary-react'
import TradeItemCard from './TradeItemCard'
import api from '../api/posts'

function CurrentTradeContainer() {

    const currentUser = useRecoilValue(currentUserState)
    const request = useRecoilValue(requestState)
    const [requestBag, setRequestBag] = useRecoilState(requestBagState)
    const userItemsArray = currentUser.all_bags
    
    // const counter = useRecoilValue(counterOfferState)
    // const counterUser = counter.user_id
    // const [counterUserItemsArray, setCounterUserItemsArray] = useState('')
    //const [counterUser, setCounterUser] = useRecoilState(counterOfferUserState)
    console.log(request)
    console.log(requestBag)
    console.log(currentUser.all_bags)

    const displayCurrentUserItems = userItemsArray.map((product) => <TradeItemCard key={product.id} item={product} />)
  
  //   useEffect(() => {
  //     const fetchCounterUser = async () => {
  //         try {
  //             const response = await api.get(`/counter-user/${counterOfferUserId}`)
  //             setCounterUser(response.data)
  //             setCounterUserItemsArray(response.data.all_bags)
  //         } catch (error) {
  //             if (error.response) {
  //                 console.log(error.response.data)
  //                 console.log(error.response.status)
  //                 console.log(error.response.headers)
  //             } else {
  //                 console.log(`Error: ${error.message}`)
  //             }
  //         }
  //     }
  //     fetchCounterUser();
  // },[])

  // console.log(`Counter User ID: ${counterOfferUserId}`)
  // console.log(`Counter FULL USER: ${counterUser}`)
  // console.log(`Counter User ITEMS ARRAY: ${counterUserItemsArray}`)

  //const displayCounterUserItems = counterUserItemsArray.map((product) => <TradeItemCard key={product.id} item={product} />)
  const displayRequestedItems = requestBag.map((product) => <TradeItemCard key={product.id} item={product} />)
    
  return (
    <div>
        <div>
            <Image cloudName={'chenkhov'} publicId={currentUser.avatar_url} alt={currentUser.username}>
                <Transformation height = "200" width="200" crop="fill" gravity="face"/>
            </Image>
            <h4>{currentUser.username}</h4>
        </div>
        <div>
          <h4>Current Items Requested In This Trade:</h4>
          {displayRequestedItems}
        </div>
        <div>
          <h4>Current Items available to trade</h4>
          {displayCurrentUserItems}
        </div>
        {/* <Image cloudName={'chenkhov'} publicId={counterUser.avatar_url} alt={counterUser.username}>
                <Transformation height = "200" width="200" crop="fill" gravity="face"/>
            </Image>
            <h4>{counterUser.username}</h4>
        <div>
          <h4>Current Items available to trade</h4>
          {displayCounterUserItems}
        </div> */}
    </div>
  )
}

export default CurrentTradeContainer