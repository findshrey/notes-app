import React from "react"

const Actions = ({ filters, handleFilters }) => {
   const { sortBy, searchText } = filters

   return (
      <div className="actions">
         <div className="input-wrapper">
            <input
               type="text"
               placeholder="Filter Notes"
               value={searchText}
               onChange={(e) => handleFilters("searchText", e.target.value)}
            />
         </div>
         <div className="select-wrapper">
            <select
               value={sortBy}
               onChange={(e) => handleFilters("sortBy", e.target.value)}
            >
               <option value="title">Sort by Title</option>
               <option value="created">Sort by recently Created</option>
               <option value="edited">Sort by last Edited</option>
            </select>
         </div>
      </div>
   )
}

export default Actions
