import React, { useEffect, useState } from 'react'
import { requestState, requestBagState, requestArrayState, counterOfferBagState, counterOfferState, counterArrayState, currentUserState } from '../recoil/atoms'
import { useResetRecoilState, useRecoilValue } from 'recoil'
import { Image, Transformation } from 'cloudinary-react'
import TradeItemCard from './TradeItemCard'
import OfferItemCard from './OfferItemCard'
import api from '../api/posts'

function CurrentTradeContainer() {

    const currentUser = useRecoilValue(currentUserState)
    const request = useRecoilValue(requestState)
    const requestBag = useRecoilValue(requestBagState)
    const userItemsArray = request.user.all_bags
    const resetRequestArray = useResetRecoilState(requestArrayState)
    const requestArray = useRecoilValue(requestArrayState)

    console.log(userItemsArray)
    
    const counter = useRecoilValue(counterOfferState)
    const counterUser = counter.user
    const counterUserItemsArray = counterUser.all_bags
    const counterBag = useRecoilValue(counterOfferBagState)
    const resetCounterArray = useResetRecoilState(counterArrayState)
    const counterArray = useRecoilValue(counterArrayState)

    //const [counterUserItemsArray, setCounterUserItemsArray] = useState('')
    // const [counterUser, setCounterUser] = useRecoilState(counterOfferUserState)
    
    console.log(request)
    console.log(requestBag)
    console.log(request.user.all_bags)
    console.log(counter)
    console.log(counterBag)

    const handleDealSubmit = async (e) => {
      e.preventDefault()

      const deal = {
          request_id: request.id,
          counter_id: counter.id,
          request_finalized: false,
          counter_finalized: false
      }

      try{
          const response = await api.post('deal', deal)
          console.log(response.data)
        } catch (error) {
          console.log(`Error: ${error.message}`)
        }
    }

  const displayCurrentUserItems = userItemsArray.map((product) => <TradeItemCard key={product.id} item={product} />)
  const displayCounterUserItems = counterUserItemsArray.map((product) => <TradeItemCard key={product.id} item={product} />)

  const displayRequestedItems = requestBag.map((product) => <OfferItemCard key={product.id} item={product}/>)

  return (
    <div>
      {/* <Prompt when={shouldBlockNavigation} */}
        <div>
            <Image cloudName={'chenkhov'} publicId={currentUser.avatar_url} alt={currentUser.username}>
                <Transformation height = "200" width="200" crop="fill" gravity="face"/>
            </Image>
            <h4>{currentUser.username}</h4>
        </div>
        <div>
          <h4>Current Items Requested In This Trade: </h4>
          {displayRequestedItems}
        </div>

        <div>
          <h4>Current Items Offered In This Trade: </h4>
          {counterBag ? counterBag.map((product) => <OfferItemCard key={product.id} item={product} />)
          :
          <h4>No Items Currently in Offer</h4>}
        </div>

        <div>
          <h4>Current Items available to trade</h4>
          {displayCurrentUserItems}
        </div>
        <Image cloudName={'chenkhov'} publicId={counterUser.avatar_url} alt={counterUser.username}>
                <Transformation height = "200" width="200" crop="fill" gravity="face"/>
            </Image>
            <h4>{counterUser.username}</h4>
        <div>
          <h4>Current Items available to trade</h4>
          {displayCounterUserItems}
        </div>
        <button onClick={handleDealSubmit}>Request Trade</button>
    </div>
  )
}

export default CurrentTradeContainer