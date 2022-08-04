import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentUserState, dealState, usersState, requestBagState, counterBagState } from '../recoil/atoms'
import TradeDashboardCard from './TradeDashboardCard'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'

function AllTradesContainer() {
  
    const [deals, setDeals] = useRecoilState(dealState)
    const currentUser = useRecoilValue(currentUserState)
    const users = useRecoilValue(usersState)

    const [requestBag, setRequestBag] = useRecoilState(requestBagState)
    const [counterBag, setCounterBag] = useRecoilState(counterBagState)
    

    //const displayDeals = deals.map((deal) => <TradeDashboardCard key={deal.id} deal={deal} />)

    // useEffect(() => {
    //   const fetchRequests = async () => {
    //     try{
    //       const response = await api.get('requests')
    //       setRequestBag(response.data)
    //       console.log(response.data)
    //     }
    //     catch(error) {
    //       console.log(`Error: ${error}`)
    //     }
    //   }
    //   fetchRequests();
    // }, [])

    // useEffect(() => {
    //   const fetchCounters = async () => {
    //     try{
    //       const response = await api.get('counters')
    //       setCounterBag(response.data)
    //       console.log(response.data)
    //     }
    //     catch(error) {
    //       console.log(`Error: ${error}`)
    //     }
    //   }
    //   fetchCounters();
    // }, [])

    useEffect(() => {
      const fetchDeals = async () => {
        try{
          const response = await api.get('deals')
          setDeals(response.data)
          console.log(response.data)
        }
        catch(error) {
          console.log(`Error: ${error}`)
        }
      }
      fetchDeals();
    }, [])

    console.log(deals)
    const filteredCounters = deals.filter((deal) => {
      return deal.deal_counter_user.id === currentUser.id
    })

    const filteredRequests = deals.filter((deal) => {
      return deal.deal_request_user.id === currentUser.id
    })
  
    console.log(filteredCounters)
    console.log(filteredRequests)

    const allRequestBags = filteredRequests.map((request) => <TradeDashboardCard key={request.id} request={request} dealId={request.id} />)
    const allCounterBags = filteredCounters.map((counter) => <TradeDashboardCard key={counter.id} counter={counter} dealId={counter.id}/>)
      //bag.all_request_bags.map((request) => {<TradeDashboardCard key={request.id} request={request}/>})})

    return (
      <div>
        <div>
            <Image cloudName={'chenkhov'} publicId={currentUser.avatar_url} alt={currentUser.username}>
                <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" radius="max" width="150" crop="fill" />
            </Image>
            <h2>{currentUser.username}</h2>
        </div>
        <div>
          <h2>Request Trades</h2>
          {allRequestBags}
          {/* { filteredRequests.length !== 0 ?  bag.map((request) => <TradeDashboardCard key={bag.id} bag={bag} quantity={bag.request_quantity} />)
          : null } */}
        </div>
        <div>
          <h2>Counter-Trades</h2>
          {allCounterBags}
          {/* { counterBag.length !== 0 ? counterBag.map((bag) => <TradeDashboardCard key={bag.id} bag={bag} quantity={bag.counter_quantity} />)
          : null }*/}
        </div>
    </div>
  )
}

export default AllTradesContainer