import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import IconPencil from './icons/IconPencil'
import IconTrash from './icons/IconTrash'

const Note = ({ note, handleNavigation, handleDeleteNote }) => {
   return (
      <div id="js-note" className="note">
         <div className="note-content">
            <h3>{note.title ? note.title : 'Unnamed Note'}</h3>
            <p>Last Edited: {formatDistanceToNow(note.edited, { addSuffix: true })}</p>
         </div>
         <div className="note-buttons">
            <button className="edit-btn" onClick={() => handleNavigation(note.id)}>
               <IconPencil />
            </button>
            <button className="delete-btn" onClick={(e) => handleDeleteNote(e, note.id)}>
               <IconTrash />
            </button>
         </div>
      </div>
   )
}

export default Note