import { useState, useEffect } from "react"

const useLocalStorage = (key, initialValue) => {
   const [value, setValue] = useState(initialValue)

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
      localStorage.setItem(key, JSON.stringify(value))
   }, [value])

   return [value, setValue]
}

export default useLocalStorage
