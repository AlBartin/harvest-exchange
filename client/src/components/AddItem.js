import React, {useState} from 'react'
import axios from 'axios'
import { Image, Transformation } from 'cloudinary-react'

const AddItem = () => {
  
    const [imageSelected, setImageSelected] = useState('')
    const [image, setImage] = useState('')

    const uploadImage = (files) => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "oxthdym5")
    
        axios.post("https://api.cloudinary.com/v1_1/chenkhov/image/upload", formData)
        .then((resp) => {setImage(resp.data.public_id)})
    }
  
    return (
    <div>

        <input type="file" onChange={(e) => {setImageSelected(e.target.files[0])}} />
        <button onClick={uploadImage}>Upload Image</button>

        <Image cloudName={'chenkhov'} publicId={image}>
        <Transformation width="500" height="500" crop="scale" />
        </Image>
    </div>
  )
}

export default AddItem