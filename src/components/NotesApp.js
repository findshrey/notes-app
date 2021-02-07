import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './Header'
import Notes from './Notes'
import EditNote from './EditNote'
import NotFound from './NotFound'

const NotesApp = () => {
   const [notes, setNotes] = useState([])

   return (
      <>
         <Header />
         <BrowserRouter>
            <Switch>
               <Route path="/" exact>
                  <Notes notes={notes} setNotes={setNotes} />
               </Route>
               <Route path="/edit/:id">
                  <EditNote notes={notes} setNotes={setNotes} />
               </Route>
               <Route>
                  <NotFound />
               </Route>
            </Switch>
         </BrowserRouter>
      </>
   )
}

export default NotesApp