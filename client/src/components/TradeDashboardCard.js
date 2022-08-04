import React, { useEffect, useState } from 'react'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { currentUserState, usersState, counterOfferUserState, requestArrayState, counterArrayState, requestState, counterOfferState, dealIdState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'
import TradeDashboardCardDetails from './TradeDashboardCardDetails'
import { useNavigate } from 'react-router-dom'

function TradeDashboardCard({ request, counter, dealId }) {
  
const navigate = useNavigate()    
const [requestArray, setRequestArray] = useRecoilState(requestArrayState)
const [counterArray, setCounterArray] = useRecoilState(counterArrayState)
const setRequest = useSetRecoilState(requestState)
const setCounter = useSetRecoilState(counterOfferState)
const setCounterUser = useSetRecoilState(counterOfferUserState)
const setDealId = useSetRecoilState(dealIdState)

const editRequestTrade = () => {
    setRequestArray(request.deal_request_bags)
    setCounterArray(request.deal_counter_bags)
    setRequest(request.request)
    setCounter(request.counter)
    setCounterUser(request.deal_counter_user)
    setDealId(dealId)
    navigate('/edit-trade')
}

const editCounterTrade = () => {
    setRequestArray([counter.deal_request_bags])
    setCounterArray([counter.deal_counter_bags])
    setRequest(counter.request)
    setCounter(counter.counter)
    setDealId(dealId)
    navigate('/edit-trade')
}

console.log(request)

// const displayRequests = request.all_request_bags.map((request) => <TradeDashboardCardDetails key={request.id} request={request} />)
// const displayCounters = request.all_counter_bags.map((counter) => <TradeDashboardCardDetails key={counter.id} counter={counter} />)
    
// const displayCounterRequests = counter.all_request_bags.map((request) => <TradeDashboardCardDetails key={request.id} request={request} />)
// const displayCounterCounters = counter.all_counter_bags.map((counter) => <TradeDashboardCardDetails key={counter.id} counter={counter} />)

return (
    <div>
        {request ?
        <div> 
        <h3>Requested Items in this Trade:</h3>
        {request.all_request_bags.map((request) => <TradeDashboardCardDetails key={request.id} request={request} />)}
        <h3>Offered Items in this Trade</h3>
        {request.all_counter_bags.map((counter) => <TradeDashboardCardDetails key={counter.id} counter={counter} />)}
        <button onClick={editRequestTrade}>Edit This Trade</button>
        </div>
        : null }

        {counter ?
        <div> 
        <h3>Items Requested from you in this Trade:</h3>
        {counter.all_request_bags.map((request) => <TradeDashboardCardDetails key={request.id} request={request} />)}
        <h3>Offered Items in this Trade</h3>
        {counter.all_counter_bags.map((counter) => <TradeDashboardCardDetails key={counter.id} counter={counter} />)}
        <button onClick={editCounterTrade}>Edit This Trade</button>
        </div>
        : null }


    </div>
  )
}

export default TradeDashboardCard