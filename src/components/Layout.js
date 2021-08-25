import React from "react"

import Header from "./Header"

const Layout = (props) => {
   return (
      <>
         <Header />
         <main className="main-content">{props.children}</main>
      </>
   )
}

export default Layout
