import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div>
        <h2>Error! 404</h2> 
        <p>Page not found!</p>
        <Link to='/'>Back Home</Link>
    </div>
  )
}

export default ErrorPage