import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import EditNote from './EditNote'
import NotFound from './NotFound'

const App = () => {
   const [notes, setNotes] = useState([])
   const firstUpdate = useRef(false)

   // Read existing notes from localStorage
   useEffect(() => {
      try {
         const notesJSON = localStorage.getItem('notes')
         if (notesJSON) {
            setNotes(JSON.parse(notesJSON))
         }
      } catch (e) {
         console.error(e)
      }
   }, [])

   // Save notes to localStorage
   useEffect(() => {
      if (!firstUpdate.current) {
         firstUpdate.current = true
         return
      }

      localStorage.setItem('notes', JSON.stringify(notes))
   }, [notes])

   return (
      <>
         <header className="main-head">
            <div className="container">
               <h1>Notes App</h1>
               <p>Take notes and never forget</p>
            </div>
         </header>
         <BrowserRouter>
            <Switch>
               <Route path="/" exact>
                  <Home notes={notes} setNotes={setNotes} />
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

export default App