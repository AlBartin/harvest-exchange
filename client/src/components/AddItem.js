import React, { useState } from 'react'
import axios from 'axios'
import api from '../api/posts'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil'
import { newItemState, currentUserState, userBasketState } from '../recoil/atoms'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"


import { Image, Transformation } from 'cloudinary-react'

const AddItem = () => {

    const currentUser = useRecoilValue(currentUserState)
    let navigate = useNavigate()
    const [userBasket, setUserBasket] = useRecoilState(userBasketState)
    const [newItem, setNewItem] = useRecoilState(newItemState)
    const resetForm = useResetRecoilState(newItemState)
    const [imageSelected, setImageSelected] = useState('')
    const [image, setImage] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const units = ['', 'lbs', 'kgs', 'units', 'oz']
      

    const uploadImage = (files) => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "oxthdym5")
    
        axios.post("https://api.cloudinary.com/v1_1/chenkhov/image/upload", formData)
        .then((resp) => {setImage(resp.data.public_id)})
    }

    const handleChange = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const postItem = {
            user_id: currentUser.id,
            item_name: newItem.itemName,
            image_url: image,
            descriptions: newItem.descriptions,
            harvest_date: startDate,
            quantity: newItem.quantity,
            measurement_units: newItem.measurementUnits
        }
  
        try {
          const response = await api.post('add-item', postItem)
          setUserBasket([...userBasket, response.data])
          resetForm()
          navigate('/my-profile')
        } catch (error) {
          console.log(`Error: ${error.message}`)
        }
    }


    return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Name of product:</label>
            <input type='text' name="itemName" value={newItem.itemName} onChange={handleChange} /><br/>
            
            <label>Describe your product:</label>
            <input type='text' name="descriptions" value={newItem.descriptions} onChange={handleChange} /><br/>
            
            <label>Date of Harvest:</label><br/>
            <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
            
            <label>Quantity:</label>
            <input type='text' name="quantity" value={newItem.quantity} onChange={handleChange} /><br/>
                    
            <label>Unit of Measurement</label>
            <select type='string' name="measurementUnits" value={newItem.measurementUnits} onChange={handleChange}>
            {units.map(unit => <option key={unit}> {unit}</option>)}
            </select><br/>
            <input type='submit'/>
        </form>


        <input type="file" onChange={(e) => {setImageSelected(e.target.files[0])}} />
        <button onClick={uploadImage}>Upload Image</button><br/>

        <Image cloudName={'chenkhov'} publicId={image}>
        <Transformation width="500" height="500" crop="scale" />
        </Image>
    </div>
  )
}

export default AddItem