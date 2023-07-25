import axios from "axios";

/* LA CAPA DE SERVICIOS DONDE VAN A ESTAR LOS ARCHIVOS QUE EXPONEN LOS METODOS LAS LLAMADAS A LAS APIS SE USA VITE DE VARIABLE DE ENTORNO QUE AHI 
VA LA URL Y LA CONSUMIMOS*/

const apiUrl = import.meta.env.VITE_API_URL;

export const getCategoriesService = async () => {
    try {
        const url = `${apiUrl}list.php?c=list`;
        const { data } = await axios.get(url);
        return data.drinks || [];
    } catch (error) {
        console.log(error)
        throw new Error("Hubo un error al obtener las categorias.")
    }
}