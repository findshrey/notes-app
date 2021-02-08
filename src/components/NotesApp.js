import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Notes from './Notes'
import EditNote from './EditNote'
import NotFound from './NotFound'

const NotesApp = () => {
   const [notes, setNotes] = useState([])

   return (
      <>
         <header>
            <div className="container">
               <h1>Notes App</h1>
               <p>Take notes and never forget</p>
            </div>
         </header>
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