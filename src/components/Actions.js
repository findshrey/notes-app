import React from 'react'

const Actions = ({ sortBy, setSortBy, filterBy, setFilterBy }) => {
   return (
      <div className="actions">
         <input value={filterBy} type="text" onChange={(e) => setFilterBy(e.target.value)} />
         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="title">Sort by Title</option>
            <option value="created">Sort by recently Created</option>
            <option value="edited">Sort by last Edited</option>
         </select>
      </div>
   )
}

export default Actions