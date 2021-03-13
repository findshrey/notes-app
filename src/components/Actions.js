import React from 'react'

const Actions = ({ sortBy, filterBy, handleAction }) => {
   return (
      <div className="actions">
         <div className="input-wrapper">
            <input
               type="text"
               placeholder="Filter Notes"
               value={filterBy}
               onChange={(e) => handleAction('filter', e.target.value)}
            />
         </div>
         <div className="select-wrapper">
            <select value={sortBy} onChange={(e) => handleAction('sort', e.target.value)}>
               <option value="title">Sort by Title</option>
               <option value="created">Sort by recently Created</option>
               <option value="edited">Sort by last Edited</option>
            </select>
         </div>
      </div>
   )
}

export default Actions