import React from 'react'
import { Link } from 'react-router-dom'

import useDocumentTitle from './../hooks/useDocumentTitle'

const NotFound = ({ message }) => {
   useDocumentTitle('Notes App | Not Found')

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