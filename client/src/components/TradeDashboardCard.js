import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentUserState, usersState } from '../recoil/atoms'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'
import AllTradesItemCard from './AllTradesItemCard'

function TradeDashboardCard({ deal }) {
  
const currentUser = useRecoilValue(currentUserState)
const [requestsBasket, setRequestsBasket] = useState([])
const users = useRecoilValue(usersState)

//if user.all_counters.id === user.all_deals.counter_id
//{display the counter_bag}
//else null

console.log(currentUser)

const filtered_counters = currentUser.all_counter_bags.filter((counter) => {return counter.counter_id === deal.counter_id})
const filtered_requests = currentUser.all_request_bags.filter((request) => {return request.request_id === deal.request_id})

console.log(filtered_counters)

console.log(filtered_requests)


// const fetchBag = async (id) => {    
//     const response = await api.get(`bag/${id}`)
//     try {
//         setRequestsBasket([...requestsBasket, response.data])
//     }
//     catch (error) {
//         console.log(`Error ${error}`)
//     }
// }

// useEffect(() => {
// const fetchRequests = () => {
//     filtered_requests.map((request) => {
//     fetchBag(request.bag_id)
// })
// }
// fetchRequests();
// },[])
// console.log(requestsBasket)

//if user.all_requests.id === user.all_deals.request_id
//{display the request_bag}
//else null


// const userDeals = user.all_deals.map((deal) => <Image cloudName={'chenkhov'} publicId={}>)
  


return (
    <div>
        <div>
            <h2>Requests</h2>
            {filtered_requests.map((request) => <AllTradesItemCard request={request} />)}
        </div>
        <div>
            <h2>Counters</h2>
            {filtered_counters.map((counter) => <AllTradesItemCard counter={counter} />)}
        </div>
        
        {/* <div>
            <Image cloudName={'chenkhov'} publicId={user.avatar_url} alt={user.username}>
                <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" radius="max" width="150" crop="fill" />
            </Image>
            <h2 name={user.id}> {user.username}</h2>
        </div> */}
    </div>
  )
}

export default TradeDashboardCard