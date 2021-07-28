import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
   return (
      <header className="main-head">
         <div className="container">
            <Link>
               <h1>Notes App</h1>
               <span>Take notes and never forget</span>
            </Link>
         </div>
      </header>
   )
}

export default Header
