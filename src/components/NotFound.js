import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
   return (
      <div className="not-found">
         <div className="container">
            404 - Not Found ! <Link to="/">Go Home</Link>
         </div>
      </div>
   )
}

export default NotFound