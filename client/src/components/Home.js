import React, { useEffect } from 'react'
import api from '../api/posts'
import { itemState } from '../recoil/atoms'
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

    const displayItems = items.slice(0,6).map((item) => <ItemCard key={item.id} item={item}/> )

  return (
    <div>
        <div>
            <h2>
                Mission Statement
            </h2>
            <p>
                Harvest Exchange prides itself in connecting home growers who are leading and teaching members of their communities responsibly sustainable and organic gardening.
            </p>
        </div>
        <div>
            <h2>
                See what people are currently trading!
            </h2>
            <div>
                {displayItems}
                <Link to='/all-items' id="browse" style={{ textDecoration: 'none' }}>
                <button>Browse More</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Home