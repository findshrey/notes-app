import React, { useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { getTime } from 'date-fns'

import useLocalStorage from './../hooks/useLocalStorage'
import IconBack from './icons/IconBack'

const EditNote = () => {
   const [notes, setNotes] = useLocalStorage('notes', [])
   const { id } = useParams()
   let history = useHistory()

   useEffect(() => {
      document.title = `Edit Note | ${notes[noteIndex]?.title ?? 'Unnamed Note'}`
   }, [notes])

   // Get index of current note
   const noteIndex = notes.findIndex((note) => note.id === id)

   // Edit a note
   const handleEditNote = (type, e) => {
      const timestamp = getTime(new Date())
      // Copy notes array
      let notesCopy = [...notes]

      // Edit note and update
      notesCopy[noteIndex] = { ...notesCopy[noteIndex], [type]: e.target.value, edited: timestamp }
      setNotes(notesCopy)
   }

   return (
      <section className="edit-note">
         {
            noteIndex !== -1 ? (
               <div className="container">
                  <input
                     type="text"
                     placeholder="Note Title"
                     value={notes?.[noteIndex]?.title || ''}
                     onChange={(e) => handleEditNote('title', e)}
                  />
                  <textarea
                     placeholder="Enter note text"
                     value={notes?.[noteIndex]?.body || ''}
                     onChange={(e) => handleEditNote('body', e)}
                     rows="10"
                  />
                  <div className="btn-wrapper">
                     <button className="primary-btn" onClick={() => history.push('/')}>
                        <span>Back</span>
                        <IconBack />
                     </button>
                  </div>
               </div>
            ) : (
               <div className="not-found">
                  <div className="container">
                     Could not fetch the data for that note. <Link to="/">Go Home</Link>
                  </div>
               </div>
            )
         }
      </section>
   )
}

export default EditNote