import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentUserState, dealState, usersState } from '../recoil/atoms'
import TradeDashboardCard from './TradeDashboardCard'
import api from '../api/posts'

function AllTradesContainer() {
  
    const [deals, setDeals] = useRecoilState(dealState)
    const currentUser = useRecoilValue(currentUserState)
    const users = useRecoilValue(usersState)

    console.log(currentUser.all_deals)
    const displayDeals = currentUser.all_deals.map((deal) => <TradeDashboardCard key={deal.id} deal={deal} />)

    //const displayDeals = deals.map((deal) => console.log(deal))
    //const displayUsers = users.map((user) => <TradeDashboardCard key={user.id} user={user} /> )

    console.log(users)

    return (
    <div>
        {displayDeals}
    </div>
  )
}

export default AllTradesContainer