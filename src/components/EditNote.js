import React, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getTime } from 'date-fns'

import IconBack from './icons/IconBack'

const EditNote = () => {
   const [notes, setNotes] = useState([])
   const firstUpdate = useRef(false)

   const { id } = useParams()
   let history = useHistory()

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

   const noteIndex = notes.findIndex((note) => note.id === id)

   // Edit note
   const handleNoteEdit = (type, e) => {
      const timestamp = getTime(new Date())
      // Copy notes array
      let notesCopy = [...notes]

      // Edit note and update
      notesCopy[noteIndex] = { ...notesCopy[noteIndex], [type]: e.target.value, edited: timestamp }
      setNotes(notesCopy)
   }

   return (
      <section className="edit-note">
         <div className="container">
            <input
               type="text"
               placeholder="Note Title"
               value={notes?.[noteIndex]?.title || ''}
               onChange={(e) => handleNoteEdit('title', e)}
            />
            <textarea
               placeholder="Enter note text"
               value={notes?.[noteIndex]?.body || ''}
               onChange={(e) => handleNoteEdit('body', e)}
               rows="10"
            />
            <div className="btn-wrapper">
               <button className="primary-btn" onClick={() => history.push('/')}>
                  <span>Back</span>
                  <IconBack />
               </button>
            </div>
         </div>
      </section>
   )
}

export default EditNote