import axios from "axios";

/* LA CAPA DE SERVICIOS DONDE VAN A ESTAR LOS ARCHIVOS QUE EXPONEN LOS METODOS LAS LLAMADAS A LAS APIS SE USA VITE DE VARIABLE DE ENTORNO QUE AHI 
VA LA URL Y LA CONSUMIMOS*/

/* detalle de producto */

const apiUrl = import.meta.env.VITE_API_URL;

const getRecipeService = async (drinkId) => {
    try {
        const url = `${apiUrl}lookup.php?i=${drinkId}`;
        const { data } = await axios.get(url);
        return data.drinks[0]

    } catch (error) {
        console.error(error)
        throw new Error("Hubo un error al obtener la Receta.")/* lanzamos una instancia del objeto error */
    }
}


/* otro metodo para traer los tragos filtrados por categoria */

const filterDrinksService = async (name, category) => {

    try {
        const url = `${apiUrl}filter.php?i=${name}&c=${category}`;
        const { data } = await axios.get(url);
        return data.drinks;
    } catch (error) {
        console.error(error)
        throw new Error("Hubo un error al obtener las bebidas.")/* lanzamos una instancia del objeto error */
    }
}

export{getRecipeService, filterDrinksService}