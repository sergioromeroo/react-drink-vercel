import { useState, useEffect, createContext } from "react";
import PropTypes from 'prop-types' //poner (impt) y te deja poner proptypes mas rapido
import { getCategoriesService } from "../services/categories.service";

/* -------------Contexto para las Categorias--------------- */

const CategoriesContext = createContext();

const CategoriesProvider = ({ children }) => {//provider es el componente que envuelve a todos los componentes para estar dentro del contexto se va llamar children
    const [categories, setCategories] = useState([])//va devolver la lista de las categorias 

    /* la llamada a la api que va ser llamado en useEffect*/
    const getCategories = async () => {
        try {
            const categoriesData = await getCategoriesService()
            setCategories(categoriesData)// voy a setear las categorias
        } catch (error) {
            console.error(error)
        }
    }
/* usamos el hooks useEffect cuando se monta por primera vez un componente se dispara una accion,un metodo, una llamada a la api atravez de un efecto */
    useEffect(() => {
        getCategories()
    }, [])



    return (
        <CategoriesContext.Provider value={{ categories }}>
            {children}
        </CategoriesContext.Provider>
    )
}

CategoriesProvider.PropTypes = {
    children: PropTypes.node.isRequired,
};

export{CategoriesProvider};

export default CategoriesContext;
