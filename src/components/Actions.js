import React from 'react'

const Actions = ({ sortBy, handleSort }) => {
   return (
      <div className="actions">
         <select value={sortBy} name="" id="" onChange={(e) => handleSort(e)}>
            <option value="title">Sort by Title</option>
            <option value="created">Sort by recently Created</option>
            <option value="modified">Sort by last Modified</option>
         </select>
      </div>
   )
}

export default Actions