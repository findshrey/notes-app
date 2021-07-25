import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import EditNote from "./../pages/EditNote"
import Header from "./Header"
import Home from "./../pages/Home"
import NotFound from "./../pages/NotFound"

const App = () => {
   return (
      <>
         <Header />
         <main>
            <BrowserRouter>
               <Switch>
                  <Route path="/" exact>
                     <Home />
                  </Route>
                  <Route path="/edit/:id">
                     <EditNote />
                  </Route>
                  <Route path="*">
                     <NotFound />
                  </Route>
               </Switch>
            </BrowserRouter>
         </main>
      </>
   )
}

export default App
