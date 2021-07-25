import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { getTime } from "date-fns"

import useLocalStorage from "../hooks/useLocalStorage"
import useDocumentTitle from "../hooks/useDocumentTitle"
import IconBack from "../icons/IconBack"
import NotFound from "./NotFound"

const EditNote = () => {
   const [notes, setNotes] = useLocalStorage("notes", [])
   const { id } = useParams()
   let history = useHistory()

   // Get index of current note
   const noteIndex = notes.findIndex((note) => note.id === id)
   // Get note title
   const noteTitle =
      notes[noteIndex]?.title !== "" ? notes[noteIndex]?.title : "Unnamed Note"

   useDocumentTitle(`Notes App | Edit Note - ${noteTitle}`, notes)

   // Edit a note
   const handleEditNote = (type, e) => {
      const timestamp = getTime(new Date())
      // Copy notes array
      let notesCopy = [...notes]

      // Edit note and update
      notesCopy[noteIndex] = {
         ...notesCopy[noteIndex],
         [type]: e.target.value,
         edited: timestamp,
      }
      setNotes(notesCopy)
   }

   if (noteIndex === -1) {
      return <NotFound message={"Could not fetch the data for that note."} />
   }

   return (
      <section className="edit-note">
         <div className="container">
            <input
               type="text"
               placeholder="Note Title"
               value={notes?.[noteIndex]?.title || ""}
               onChange={(e) => handleEditNote("title", e)}
            />
            <textarea
               placeholder="Enter note text"
               value={notes?.[noteIndex]?.body || ""}
               onChange={(e) => handleEditNote("body", e)}
               rows="10"
            />
            <div className="btn-wrapper">
               <button
                  className="primary-btn"
                  onClick={() => history.push("/")}
               >
                  <span>Back</span>
                  <IconBack />
               </button>
            </div>
         </div>
      </section>
   )
}

export default EditNote
