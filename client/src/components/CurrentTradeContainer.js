import React from 'react'
import { dealState, requestState, requestArrayState, counterOfferState, counterArrayState, currentUserState } from '../recoil/atoms'
import { useResetRecoilState, useRecoilValue, useRecoilState } from 'recoil'
import { Image, Transformation } from 'cloudinary-react'
import TradeItemCard from './TradeItemCard'
import OfferItemCard from './OfferItemCard'
import { useNavigate } from 'react-router-dom'
import api from '../api/posts'

function CurrentTradeContainer() {

    const navigate = useNavigate()

    const currentUser = useRecoilValue(currentUserState)
    const request = useRecoilValue(requestState)
    const userItemsArray = request.all_bags
    const requestArray = useRecoilValue(requestArrayState)
    const resetRequestArray = useResetRecoilState(requestArrayState)

    console.log(request)
    console.log(userItemsArray)
    
    const counter = useRecoilValue(counterOfferState)
    const counterUser = counter.user
    const counterArray = useRecoilValue(counterArrayState)
    const resetCounterArray = useResetRecoilState(counterArrayState)

    const [deal, setDeal] = useRecoilState(dealState)
    const resetDeal = useResetRecoilState(dealState)
    
    const handleDealSubmit = async (e) => {
      e.preventDefault()

      const deal = {
          request_id: request.id,
          counter_id: counter.id,
          request_finalized: true,
          counter_finalized: false
      }

      try{
          const response = await api.post('deal', deal)
          setDeal(response.data)
          console.log(deal)
          resetCounterArray()
          resetRequestArray()
          navigate('/trades')
        } catch (error) {
          console.log(`Error: ${error.message}`)
        }
    }

    const handleDealDelete = () => {
      resetCounterArray()
      resetRequestArray()
      resetDeal()
      navigate('/')
    }

    const displayCurrentUserItems = request.all_bags.map((product) => <TradeItemCard key={product.id} item={product} />)
    const displayCounterUserItems = counter.all_bags.map((product) => <TradeItemCard key={product.id} item={product} /> )

  return (
    <div>
        <div>
            <Image cloudName={'chenkhov'} publicId={currentUser.avatar_url} alt={currentUser.username}>
                <Transformation height = "200" width="200" crop="fill" gravity="face"/>
            </Image>
            <h4>{currentUser.username}</h4>
        </div>
        <div>
          <h4>Current Items Requested In This Trade: </h4>
          {requestArray.length === 0 ? <h4>No Items Currently Requested</h4>
          :
          requestArray.map((product) => <OfferItemCard key={product.id} item={product} />)
          }
        </div>

        <div>
          <h4>Current Items Offered In This Trade: </h4>
          {counterArray.length === 0 ? <h4>No Items Currently in Offer</h4>
          :
          counterArray.map((product) => <OfferItemCard key={product.id} item={product} />)
          }
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
        <button onClick={handleDealDelete}>Cancel Trade</button>
    </div>
  )
}

export default CurrentTradeContainer