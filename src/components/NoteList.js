import React from "react"
import { formatDistanceToNow } from "date-fns"

import IconPencil from "../icons/IconPencil"
import IconTrash from "../icons/IconTrash"

const NoteList = ({ renderNotes, handleNavigation, handleDeleteNote }) => {
   return (
      <div className="note-list">
         {renderNotes.map((note) => (
            <div key={note.id} id="js-note" className="note">
               <div className="note-content">
                  <h3>{note.title ? note.title : "Unnamed Note"}</h3>
                  <p>
                     Last Edited:{" "}
                     {formatDistanceToNow(note.edited, { addSuffix: true })}
                  </p>
               </div>
               <div className="note-buttons">
                  <button
                     className="edit-btn"
                     onClick={() => handleNavigation(note.id)}
                  >
                     <IconPencil />
                  </button>
                  <button
                     className="delete-btn"
                     onClick={(e) => handleDeleteNote(e, note.id)}
                  >
                     <IconTrash />
                  </button>
               </div>
            </div>
         ))}
      </div>
   )
}

export default NoteList
