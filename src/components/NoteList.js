import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { getTime, formatDistanceToNow } from 'date-fns'

import Actions from './Actions'

const sortNotes = (notes, sortBy) => {
   if (!notes.length) {
      return []
   }

   let sortedNotes

   if (sortBy === 'title') {
      sortedNotes = notes.sort((a, b) => {
         if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1
         } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1
         } else {
            return 0
         }
      })
   } else {
      sortedNotes = notes.sort((a, b) => {
         if (a[sortBy] > b[sortBy]) {
            return -1
         } else if (a[sortBy] < b[sortBy]) {
            return 1
         } else {
            return 0
         }
      })
   }

   return sortedNotes
}

const filterNotes = (notes, filterBy) => {
   if (!notes.length) {
      return []
   }

   return notes.filter((note) => note.title.toLowerCase().includes(filterBy.toLowerCase()))
}

const NoteList = ({ notes, setNotes }) => {
   const [sortBy, setSortBy] = useState('title')
   const [filterBy, setFilterBy] = useState('')

   const generatedId = nanoid(10)
   let history = useHistory()

   // Add new note
   const handleAddNote = (id) => {
      const timestamp = getTime(new Date())

      setNotes([
         ...notes,
         {
            id: id,
            title: '',
            body: '',
            created: timestamp,
            modified: timestamp
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

   const handleSort = (e) => {
      setSortBy(e.target.value)
   }

   const sortedNotes = sortNotes(notes, sortBy)
   const filteredNotes = filterBy.trim() ?
      filterNotes(sortedNotes, filterBy) :
      sortedNotes

   return (
      <section className="note-list">
         <div className="container">
            <input value={filterBy} type="text" onChange={(e) => setFilterBy(e.target.value)} />
            <Actions sortBy={sortBy} handleSort={handleSort} />
            {
               filteredNotes.map((note) => (
                  <div key={note.id} className="note">
                     <h4>
                        {note.title ? note.title : 'Unnamed Note'}
                     </h4>
                     <p>Last Modified: {formatDistanceToNow(note.modified, { addSuffix: true })}</p>
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

export default NoteList