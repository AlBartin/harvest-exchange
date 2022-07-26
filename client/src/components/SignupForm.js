import React, { useState } from 'react';
import { useRecoilState } from 'recoil'
import axios from 'axios'
import { Image, Transformation } from 'cloudinary-react'
import api from '../api/posts'

import { signupState } from '../recoil/atoms'
import { useNavigate } from 'react-router-dom';

function SignupForm() {

  const [signupData, setSignupData] = useRecoilState(signupState)
  const [imageSelected, setImageSelected] = useState('')
  const [gardenImage, setGardenImage] = useState('')
  const [image, setImage] = useState('')

  const navigate = useNavigate()
    
  const fiftyStates = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]

  const handleFormChange = e => setSignupData({...signupData, [e.target.name]: e.target.value })    

  const uploadAvatarImage = (files) => {
    const formData = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset", "oxthdym5")

    axios.post("https://api.cloudinary.com/v1_1/chenkhov/image/upload", formData)
      .then((resp) => {
        setImage(resp.data.public_id)
        setSignupData({...signupData, [signupData.avatarUrl]: resp.data.public_id})
      })
  }

  const uploadGardenImage = (files) => {
    const formData = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset", "oxthdym5")

    axios.post("https://api.cloudinary.com/v1_1/chenkhov/image/upload", formData)
      .then((resp) => {
        setGardenImage(resp.data.public_id)
        setSignupData({...signupData, [signupData.personalImage]: resp.data.public_id})
      })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
      console.log(`New user: ${signupData}`)
  
      const newUser = {
        email: signupData.email,
        username: signupData.username,
        password: signupData.password,
        password_confirmation: signupData.passwordConfirm,
        avatar_url: image,
        personal_image: gardenImage,
        crops_grown: signupData.cropsGrown,
        in_search_of_crops: signupData.inSearchOfCrops,
        street_address: signupData.streetAddress,
        city_address: signupData.cityAddress,
        state_address: signupData.stateAddress,
        zipcode: signupData.zipcode 
      }

      try {
        const response = await api.post('signup', newUser)
        setSignupData(response.data)
        navigate('/login')
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }

      // axios.post('/signup', { 
      //   email: signupData.email,
      //   username: signupData.username,
      //   password: signupData.password,
      //   password_confirmation: signupData.passwordConfirm,
      //   avatar_url: signupData.avatarUrl,
      //   personal_image: signupData.personalImage,
      //   crops_grown: signupData.cropsGrown,
      //   in_search_of_crops: signupData.inSearchOfCrops,
      //   street_address: signupData.streetAddress,
      //   city_address: signupData.cityAddress,
      //   state_address: signupData.stateAddress,
      //   zipcode: signupData.zipcode })
      // .then((response) => { setSignupData(response.data)
      // })
      // .catch((error) => console.log(error))
      // console.log(`Avatar: ${image}`)
      // console.log(`Garden: ${gardenImage}`)
      }

    return(
    <div>
      <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Username</label>
        <input type='text' name='username' value={signupData.username} onChange={handleFormChange}/><br/>
        <label>Email</label>
        <input type='text' name='email' value={signupData.email} onChange={handleFormChange}/><br/>
        <label>Password</label>
        <input type='password' name='password' value={signupData.password} onChange={handleFormChange}/><br/>
        <label>Confirm Password</label>
        <input type='password' name='passwordConfirm' value={signupData.passwordConfirm} onChange={handleFormChange}/><br/>
        <label>What kind of crops do you grow?</label>
        <input type='text' name='cropsGrown' value={signupData.cropsGrown} onChange={handleFormChange}/><br/>
        <label>What kind of crops or products are you in the hunt for?</label>
        <input type='text' name='inSearchOfCrops' value={signupData.inSearchOfCrops} onChange={handleFormChange}/><br/>
        <label>Street Address</label>
        <input type='string' name='streetAddress' value={signupData.streetAddress} onChange={handleFormChange}/><br/>
        <label>City</label>
        <input type='string' name='cityAddress' value={signupData.cityAddress} onChange={handleFormChange}/><br/>
        <label>State</label>
        <select type='string' name="stateAddress" value={signupData.stateAddress} onChange={handleFormChange}>
                {fiftyStates.map(oneState => <option key={oneState}> {oneState}</option>)}
            </select>
        <label>Zip Code</label>
        <input type='string' name='zipcode' value={signupData.zipcode} onChange={handleFormChange}/><br/>
        <input type='submit' />
      </form>
      </div>
      <div>
      <label>Show us your garden:</label>
        <input type='file' onChange={(e) => {setImageSelected(e.target.files[0])}} /><button onClick={uploadGardenImage}>Upload Image</button><br/>
        <Image cloudName={'chenkhov'} publicId={gardenImage}>
        <Transformation width="500" crop="scale" />
        </Image> <br/>
      </div>

      <div>
      <label>Profile Avatar</label>
        <input type='file' onChange={(e) => {setImageSelected(e.target.files[0])}} /><button onClick={uploadAvatarImage}>Upload Image</button><br/>
        <Image cloudName={'chenkhov'} publicId={image}>
        <Transformation height="250" crop="scale" />
        </Image> <br/>
      </div>
    </div>
    )
}

export default SignupForm