import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { getTime } from 'date-fns'

import IconBack from './icons/IconBack'

const EditNote = ({ notes, setNotes }) => {
   const location = useLocation()
   let history = useHistory()

   const noteId = location.pathname.substring(location.pathname.length - 10)
   const noteIndex = notes.findIndex((note) => note.id === noteId)

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