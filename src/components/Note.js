import React from 'react'
import { formatDistanceToNow } from 'date-fns'

const Note = ({ note, handleNavigation, handleDeleteNote }) => {
   return (
      <div className="note">
         <h4>{note.title ? note.title : 'Unnamed Note'}</h4>
         <p>Last Edited: {formatDistanceToNow(note.edited, { addSuffix: true })}</p>
         <button onClick={() => handleNavigation(note.id)}>Edit</button>
         <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
      </div>
   )
}

export default Note