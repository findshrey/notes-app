import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { getTime } from 'date-fns'

import useLocalStorage from './../hooks/useLocalStorage'
import useDocumentTitle from './../hooks/useDocumentTitle'
import Actions from './Actions'
import NoteList from './NoteList'
import IconPlus from './icons/IconPlus'

// Sort notes by one of 3 selected categories
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
const filterNotes = (notes, searchText) => {
   if (!notes.length) {
      return []
   }

   return notes.filter((note) => note.title.toLowerCase().includes(searchText.toLowerCase()))
}

const Home = () => {
   const [notes, setNotes] = useLocalStorage('notes', [])
   const [filters, setFilters] = useState({ sortBy: 'title', searchText: '' })
   const [navigationId, setNavigationId] = useState('')
   useDocumentTitle('Notes App | Home')

   let history = useHistory()

   // Trigger navigation
   useEffect(() => {
      if (navigationId) {
         handleNavigation(navigationId)
      }
   }, [navigationId])

   // Add a new note
   const handleAddNote = (id) => {
      const timestamp = getTime(new Date())

      setNotes((prevNotes) => ([
         ...prevNotes,
         {
            id: id,
            title: '',
            body: '',
            created: timestamp,
            edited: timestamp
         }
      ]))

      setNavigationId(id)
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

   // Set filters
   const handleFilters = (type, val) => {
      setFilters(prevFilters => ({ ...prevFilters, [type]: val }))
   }

   // Notes to render
   let renderNotes = sortNotes(notes, filters.sortBy)

   if (filters.searchText.trim()) {
      renderNotes = filterNotes(renderNotes, filters.searchText)
   }

   return (
      <section className="home">
         <div className="container">
            <Actions
               filters={filters}
               handleFilters={handleFilters}
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