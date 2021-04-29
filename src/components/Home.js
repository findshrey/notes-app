import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { getTime } from 'date-fns'

import useLocalStorage from './../hooks/useLocalStorage'
import Actions from './Actions'
import NoteList from './NoteList'
import IconPlus from './icons/IconPlus'

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

const Home = () => {
   const [notes, setNotes] = useLocalStorage('notes', [])
   const [newId, setNewId] = useState('')
   const [sortBy, setSortBy] = useState('title')
   const [filterBy, setFilterBy] = useState('')

   let history = useHistory()

   useEffect(() => {
      document.title = 'Notes App | Home'
   }, [])

   useEffect(() => {
      if (newId) {
         handleNavigation(newId)
      }
   }, [newId])

   // Navigate to edit page
   const handleNavigation = (id) => {
      history.push(`/edit/${id}`)
   }

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

      setNewId(id)
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

   // Sort or filter notes
   const handleAction = (type, val) => {
      if (type === 'sort') {
         setSortBy(val)
      } else if (type === 'filter') {
         setFilterBy(val)
      }
   }

   // Notes to render
   let renderNotes = sortNotes(notes, sortBy)

   if (filterBy.trim()) {
      renderNotes = filterNotes(renderNotes, filterBy)
   }

   return (
      <section className="home">
         <div className="container">
            <Actions
               sortBy={sortBy}
               filterBy={filterBy}
               handleAction={handleAction}
            />
            <NoteList
               renderNotes={renderNotes}
               handleNavigation={handleNavigation}
               handleDeleteNote={handleDeleteNote}
            />
            <div className="btn-wrapper">
               <button
                  className="primary-btn"
                  onClick={() => handleAddNote(nanoid(10))}
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