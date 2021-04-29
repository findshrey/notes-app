import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import EditNote from './EditNote'
import NotFound from './NotFound'

const App = () => {
   return (
      <>
         <header className="main-head">
            <div className="container">
               <h1>Notes App</h1>
               <p>Take notes and never forget</p>
            </div>
         </header>
         <main>
            <BrowserRouter>
               <Switch>
                  <Route path="/" exact>
                     <Home />
                  </Route>
                  <Route path="/edit/:id">
                     <EditNote />
                  </Route>
                  <Route>
                     <NotFound />
                  </Route>
               </Switch>
            </BrowserRouter>
         </main>
      </>
   )
}

export default App