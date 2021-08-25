import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import EditNote from "../pages/EditNote"
import Home from "../pages/Home"
import Layout from "./Layout"
import NotFound from "../pages/NotFound"

const App = () => {
   return (
      <BrowserRouter>
         <Layout>
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
         </Layout>
      </BrowserRouter>
   )
}

export default App
