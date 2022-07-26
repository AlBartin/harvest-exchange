import React, { useEffect } from 'react'
import api from '../api/posts'
import { itemState } from '../recoil/atoms'
import { useRecoilState } from 'recoil'
import ItemCard from './ItemCard'

function ItemsContainer() {

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

const displayItems = items.map((item) => <ItemCard key={item.id} item={item}/> )

  return (
    <div>{displayItems}</div>
  )
}

export default ItemsContainer