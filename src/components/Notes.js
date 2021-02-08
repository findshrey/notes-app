import React from 'react'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'

const Notes = ({ notes, setNotes }) => {
   const generatedId = nanoid(10)
   let history = useHistory()

   // Add new note
   const handleAddNote = (id) => {
      setNotes([
         ...notes,
         {
            id: id,
            title: '',
            body: ''
         }
      ])
   }

   // Navigate to edit page
   const handleNavigation = (id) => {
      history.push(`/edit/${id}`)
   }

   // Delete note
   const handleDeleteNote = (id) => {
      const updatedNotes = notes.filter((note) => note.id !== id)
      setNotes(updatedNotes)
   }

   return (
      <section className="notes">
         <div className="container">
            {
               notes.map((note) => (
                  <div key={note.id} className="note">
                     <h4>
                        {note.title ? note.title : 'Unnamed Note'}
                     </h4>
                     <button onClick={() => handleNavigation(note.id)}>
                        Edit
                     </button>
                     <button onClick={() => handleDeleteNote(note.id)}>
                        Delete
                     </button>
                  </div>
               ))
            }
            <button onClick={() => { handleAddNote(generatedId); handleNavigation(generatedId) }}>
               Create Note
            </button>
         </div>
      </section>
   )
}

export default Notes