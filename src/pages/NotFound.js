import React from "react"
import { Link } from "react-router-dom"

import useDocumentTitle from "../hooks/useDocumentTitle"

const NotFound = ({ message }) => {
   useDocumentTitle("Notes App | Not Found")

   const displayError = message ? message : "404 - Not Found !"

   return (
      <div className="container not-found">
         {displayError} <Link to="/">Go Home</Link>
      </div>
   )
}

export default NotFound
