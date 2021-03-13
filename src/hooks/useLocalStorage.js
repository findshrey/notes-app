import { useState, useEffect, useRef } from 'react'

const useLocalStorage = (key, initialValue) => {
   const [value, setValue] = useState(initialValue)
   const firstUpdate = useRef(false)

   // Read existing data from localStorage
   useEffect(() => {
      try {
         const dataJSON = localStorage.getItem(key)

         if (dataJSON) {
            setValue(JSON.parse(dataJSON))
         }
      } catch (err) {
         console.error(err)
      }
   }, [])

   // Save data to localStorage
   useEffect(() => {
      if (!firstUpdate.current) {
         firstUpdate.current = true
         return
      }

      localStorage.setItem(key, JSON.stringify(value))
   }, [value])

   return [value, setValue]
}

export default useLocalStorage