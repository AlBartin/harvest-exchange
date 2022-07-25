import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import axios from 'axios'
import { ThemeContext } from '@emotion/react'

const Login = () => {
    let navigate = useNavigate()
    const userRef = useRef()
    const errRef = useRef()

    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
    const [pass, setPass] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loginForm, setLoginForm] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMessage('')
    }, [currentUser, pass])

    const handleChange = (e) => setLoginForm ({...loginForm, [e.target.name]: e.target.value})

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('login',{
            username: loginForm.username,
            password: loginForm.password
            }
        )
        .then((response) => {
            setCurrentUser(response.data)
            navigate('/users', { replace: true })
        })
        .catch((err) => {
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
        })
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
                ref={userRef}
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