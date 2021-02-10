import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { getTime } from 'date-fns'

import Actions from './Actions'
import Note from './Note'

// Sort notes by one of the 3 selected ways
const sortNotes = (notes, sortBy) => {
   if (!notes.length) {
      return []
   }

   let sortedNotes

   if (sortBy === 'title') {
      return sortedNotes = notes.sort((a, b) => {
         if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1
         } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1
         } else {
            return 0
         }
      })
   } else {
      return sortedNotes = notes.sort((a, b) => {
         if (a[sortBy] > b[sortBy]) {
            return -1
         } else if (a[sortBy] < b[sortBy]) {
            return 1
         } else {
            return 0
         }
      })
   }
}

// Filter notes by title
const filterNotes = (notes, filterBy) => {
   if (!notes.length) {
      return []
   }

   return notes.filter((note) => note.title.toLowerCase().includes(filterBy.toLowerCase()))
}

const NoteList = ({ notes, setNotes }) => {
   const [sortBy, setSortBy] = useState('title')
   const [filterBy, setFilterBy] = useState('')

   let history = useHistory()
   const generatedId = nanoid(10)

   // Add a new note
   const handleAddNote = (id) => {
      const timestamp = getTime(new Date())

      setNotes([
         ...notes,
         {
            id: id,
            title: '',
            body: '',
            created: timestamp,
            edited: timestamp
         }
      ])
   }

   // Delete a note
   const handleDeleteNote = (id) => {
      const updatedNotes = notes.filter((note) => note.id !== id)
      setNotes(updatedNotes)
   }

   // Navigate to edit page
   const handleNavigation = (id) => {
      history.push(`/edit/${id}`)
   }

   // Notes to render
   const sortedNotes = sortNotes(notes, sortBy)
   const filteredNotes = filterBy.trim() ?
      filterNotes(sortedNotes, filterBy) :
      sortedNotes

   return (
      <section className="note-list">
         <div className="container">
            <Actions sortBy={sortBy} setSortBy={setSortBy} filterBy={filterBy} setFilterBy={setFilterBy} />
            <div className="notes-wrapper">
               {
                  filteredNotes.map((note) => (
                     <Note
                        key={note.id}
                        note={note}
                        handleNavigation={handleNavigation}
                        handleDeleteNote={handleDeleteNote}
                     />
                  ))
               }
            </div>
            <button onClick={() => { handleAddNote(generatedId); handleNavigation(generatedId) }}>
               Create Note
            </button>
         </div>
      </section>
   )
}

export default NoteList