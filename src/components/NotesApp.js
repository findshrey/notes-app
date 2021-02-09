import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NoteList from './NoteList'
import EditNote from './EditNote'
import NotFound from './NotFound'

const NotesApp = () => {
   const [notes, setNotes] = useState([])
   const firstUpdate = useRef(false)

   // Read existing notes from localStorage
   useEffect(() => {
      const notesJSON = localStorage.getItem('notes')

      try {
         notesJSON ? setNotes(JSON.parse(notesJSON)) : setNotes([])
      } catch (e) {
         console.log(e)
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
                  <NoteList notes={notes} setNotes={setNotes} />
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