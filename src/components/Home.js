import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { getTime } from 'date-fns'

import IconPlus from './icons/IconPlus'
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

const Home = ({ notes, setNotes }) => {
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
   const handleDeleteNote = (e, id) => {
      // Find note and add class
      const element = e.target
      const note = element.closest('#js-note')
      note.classList.add('fall')

      // Wait for transition to complete and delete note
      setTimeout(() => {
         const updatedNotes = notes.filter((note) => note.id !== id)
         setNotes(updatedNotes)
      }, 800)
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
      <section className="home">
         <div className="container">
            <Actions sortBy={sortBy} setSortBy={setSortBy} filterBy={filterBy} setFilterBy={setFilterBy} />
            <div className="note-list">
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
            <div className="btn-wrapper">
               <button
                  className="primary-btn"
                  onClick={() => { handleAddNote(generatedId); handleNavigation(generatedId) }}
               >
                  <span>Create Note</span>
                  <IconPlus />
               </button>
            </div>
         </div>
      </section>
   )
}

export default Home