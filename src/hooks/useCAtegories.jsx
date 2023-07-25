
/* son funciones retorna informacion o funcionalidades sirve para no repetir codigos y usar muchos hooks*/

import { useContext } from "react";//el hooks que me permite acceder a los contextos
import CategoriesContext from "../context/CategoriesProvider"


export function useCategories () {
  return useContext(CategoriesContext) //retorna este hooks le dice a use context q use categoriescontext
  
}

