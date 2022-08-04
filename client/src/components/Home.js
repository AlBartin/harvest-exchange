import React, { useEffect } from 'react'
import api from '../api/posts'
import { itemState, usersState } from '../recoil/atoms'
import { useRecoilState } from 'recoil'
import ItemCard from './ItemCard'
import { Link } from 'react-router-dom'

function Home() {

    const [items, setItems] = useRecoilState(itemState)

    useEffect(() => {
      const fetchItems = async () => {
          try {
              const response = await api.get('/all-items')
              setItems(response.data)
          } catch (error) {
              if (error.response) {
                  console.log(error.response.data)
                  console.log(error.response.status)
                  console.log(error.response.headers)
              } else {
                  console.log(`Error: ${error.message}`)
              }
          }
      }
      fetchItems();
  },[])

  const [users, setUsers] = useRecoilState(usersState)

  useEffect(() => {
  const fetchUsers = async () => {
      try {
          const response = await api.get('/users')
          setUsers(response.data)
      } catch (error) {
          if (error.response) {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
          } else {
              console.log(`Error: ${error.message}`)
          }
      }
  }
  fetchUsers();
},[])

    const displayItems = items.slice(0,6).map((item) => <ItemCard key={item.id} item={item}/> )

  return (
    <div className="home-container">
        <div className="mission-container">
            <h2>
                Mission Statement
            </h2>
            <p>
                Harvest Exchange prides itself in connecting home growers who are leading and teaching members in their communities responsible, sustainable, and organic gardening.
            </p>
        </div>
        <div className="current-items-container">
            <h2>
                See what people are currently trading!
            </h2>
            <div className = "listed-items-container">
                {displayItems}
            </div>
            <div className="current-items-container-button">
                <Link to='/all-items' id="browse" style={{ textDecoration: 'none' }}>
                <button className="browse-more-button">Browse More</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Home