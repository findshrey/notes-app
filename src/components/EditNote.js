import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

const EditNote = ({ notes, setNotes }) => {
   const location = useLocation()
   let history = useHistory()

   const noteId = location.pathname.substring(location.pathname.length - 10)
   const noteIndex = notes.findIndex((note) => note.id === noteId)

   // Edit note
   const handleNoteEdit = (type, e) => {
      // Copy notes array
      let notesCopy = [...notes]

      // Edit note and update
      notesCopy[noteIndex] = { ...notesCopy[noteIndex], [type]: e.target.value }
      setNotes(notesCopy)
   }

   return (
      <section className="edit-note">
         <div className="container">
            <button onClick={() => history.push('/')}>Home</button>
            <input
               type="text"
               value={notes[noteIndex].title}
               onChange={(e) => handleNoteEdit('title', e)} />
            <textarea
               value={notes[noteIndex].body}
               onChange={(e) => handleNoteEdit('body', e)}
               cols="30"
               rows="10"
            />
         </div>
      </section>
   )
}

export default EditNote