import React from 'react'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'

const Notes = ({ notes, setNotes }) => {
   const noteId = nanoid(10)

   const handleAddNote = () => {
      // console.log('handled!');
      setNotes([
         ...notes,
         {
            id: noteId,
            title: '',
            body: ''
         }
      ])
   }

   return (
      <section className="notes">
         <div className="container">
            <div>
               {
                  notes.map((note) => {
                     return (
                        <p>
                           <Link to={`/edit/${note.id}`}>
                              {note.title ? note.title : 'Unnamed Note'}
                           </Link>
                        </p>
                     )
                  })
               }
            </div>
            <Link to={`/edit/${noteId}`} onClick={handleAddNote}>Create Note</Link>
         </div>
      </section>
   )
}

export default Notes