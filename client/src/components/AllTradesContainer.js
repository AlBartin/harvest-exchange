import React from 'react'
import { useRecoilValue } from 'recoil'
import {currentUserState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'

function AllTradesContainer() {
  
  const currentUser = useRecoilValue(currentUserState)
    const allRequests = currentUser.all_requests
    const allCounters = currentUser.all_counters

    const displayAllRequests = allRequests.map(request => <AllTradesCard key={request.id} requestItem={request}/>)
    const displayAllCounters = allCounters.map(counter => <AllTradesCard key={request.id} counterItem={counter}/>)


  

    return (
    <div>

    </div>
  )
}

export default AllTradesContainer