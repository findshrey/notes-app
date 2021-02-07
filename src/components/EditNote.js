import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const EditNote = ({ notes, setNotes }) => {
   const location = useLocation()

   const noteId = location.pathname.substring(location.pathname.length - 10)
   const noteIndex = notes.findIndex((note) => note.id === noteId)

   const handleNoteEdit = (type, e) => {
      let newStateArr = [...notes]

      newStateArr[noteIndex] = { ...newStateArr[noteIndex], [type]: e.target.value }

      setNotes(newStateArr)
   }

   return (
      <div>
         <div className="container">
            <Link to="/">Home</Link>
            <input value={notes[noteIndex].title} onChange={(e) => handleNoteEdit('title', e)} type="text" />
            <textarea value={notes[noteIndex].body} onChange={(e) => handleNoteEdit('body', e)} name="" id="" cols="30" rows="10"></textarea>
         </div>
      </div>
   )
}

export default EditNote