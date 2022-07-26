import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { currentUserState, userBasketState } from '../recoil/atoms'
import api from '../api/posts'

const Login = () => {
    let navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()

    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
    const [pass, setPass] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loginForm, setLoginForm] = useState('')
    const setUserBasket = useSetRecoilState(userBasketState)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMessage('')
    }, [currentUser, pass])

    const handleChange = (e) => setLoginForm ({...loginForm, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('login',{
                username: loginForm.username,
                password: loginForm.password
            })
        setCurrentUser(response.data)
        setUserBasket(response.data.all_bags)
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/my-profile')
        }
        catch(err) {
            if (!err?.response) {
                setErrorMessage('No Server Response')
            } else if (err.response?.status === 400) {
                setErrorMessage('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrorMessage('Unauthorized')
            } else {
                setErrorMessage('Login Failed')
            }
            errRef.current.focus()
        }
    }


  return (
    <div>
        <p ref={errRef} className={errorMessage ? "error-message" :
        "offscreen"} aria-live="assertive"> {errorMessage}</p>
        <h1> Sign In </h1>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
                type='text' 
                name='username' 
                ref={userRef}
                value={loginForm.username} 
                onChange={handleChange}
                required
                />
            <label>Password</label>
            <input 
                type='password' 
                name='password' 
                value={loginForm.password}
                onChange={handleChange}
                required
                />
            <button>Sign In</button>
        </form>
    </div>
  )
}

export default Login