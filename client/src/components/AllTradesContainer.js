import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentUserState, dealState, usersState } from '../recoil/atoms'
import TradeDashboardCard from './TradeDashboardCard'
import { Image, Transformation } from 'cloudinary-react'
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
    //const filtered_request = currentUser.all_request_bags.filter((request) => {return request.request_id === deal.request_id})

    return (
    <div>
      <div>
            <Image cloudName={'chenkhov'} publicId={currentUser.avatar_url} alt={currentUser.username}>
                <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" radius="max" width="150" crop="fill" />
            </Image>
            <h2 name={currentUser.id}> {currentUser.username}</h2>
        </div>
        {displayDeals}
    </div>
  )
}

export default AllTradesContainer