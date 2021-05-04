import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = ({ message }) => {
   const displayError = message ? message : '404 - Not Found !'

   return (
      <section className="not-found">
         <div className="container">
            {displayError} <Link to="/">Go Home</Link>
         </div>
      </section>
   )
}

export default NotFound