import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = ({ message }) => {
   const displayError = message ? message : '404 - Not Found !'

   return (
      <div className="not-found">
         <div className="container">
            {displayError} <Link to="/">Go Home</Link>
         </div>
      </div>
   )
}

export default NotFound