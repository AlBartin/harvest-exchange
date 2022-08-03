import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentUserState, dealState, usersState } from '../recoil/atoms'
import TradeCard from './TradeCard'
import api from '../api/posts'

function TradeContainer() {
  
    const [deals, setDeals] = useRecoilState(dealState)
    const currentUser = useRecoilValue(currentUserState)
    const users = useRecoilValue(usersState)

    console.log(currentUser.all_deals)
  
    // useEffect(() => {
    //     const fetchDeals = async () => {
    //         try {
    //             const response = await api.get('/deals')
    //             setDeals([...deals, response.data])
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
    //     fetchDeals();
    // },[])

    //const displayDeals = deals.map((deal) => console.log(deal))
    const displayUsers = users.map((user) => <TradeCard key={user.id} user={user} /> )

    console.log(users)

    return (
    <div>
        {displayUsers}
    </div>
  )
}

export default TradeContainer