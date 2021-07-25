import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from "./Home"
import Header from "./Header"
import EditNote from "./EditNote"
import NotFound from "./NotFound"

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
