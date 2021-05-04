import { useEffect } from 'react'

const useDocumentTitle = (docTitle, dependency = null) => {
   useEffect(() => {
      document.title = docTitle
   }, [dependency])
}

export default useDocumentTitle