import { useState, useEffect, createContext } from "react";
import PropTypes from 'prop-types' //poner (impt) y te deja poner proptypes mas rapido
import {filterDrinksService, getRecipeService} from "../services/drink.service";
//Contexto : proveedor(es el contexto en si el componente que disponibiliza la info ) y consumidor(los componentes que se consume del contexto)
/* -------------- hay 4 estados para quien lo quiera consumir  -----------------*/
const DrinksContext = createContext();
const DrinksProvider = ({children}) => {

    const [drinks, setDrinks] = useState([])
    const [modal, setModal] = useState(false)//el modal cada vez q quiera ver el detalle producto
    const [drinkId, setDrinkId] = useState(null)
    const [recipe, setRecipe] = useState({})//la re ceta va a ser un objeto con todas sus propiedades etc
    const [loading, setLoading] = useState(false)

    /* --------funcion para que cada vez que clickee el modal se muestre el detalle producto y saber que id estoy pisando con ! muestra y no muestra el modal*/
    function handleModalClick (){
        setModal(!modal);
    }

    /* --------funcion de setear el estado y hacer llamadas a la api */
    function handleDrinkIdClick (id){
        setDrinkId(id)
    }

    /* ---------funcion de las recetas  */
    async function getRecipe(){
        if(!drinkId) return; //si drinkId es null retorna y corta la ejecucion, de lo contrario si hay datos id pasa abajo que activa el true de setloading

        try {
            setLoading(true);//me activa el loading 
            const recipeData = await getRecipeService(drinkId); //hace la llamada a la api espera llega la respuesta y setea el estado de la receta
            setRecipe(recipeData)
        } catch (error) {
            console.error(error)
            
        }finally{
            setLoading(false)//por mas que haya errores o no con finally se ejecuta igual porq quiero ver el loading siempre
        }
    }
 
    /* ---------funcion que dispone la info de la api filtrada por name y category esto lo vamos a usar en formik */
    async function getDrink (data){
        try {
            setLoading(true)
            const drinksData = await filterDrinksService(data.name, data.category)
            const drinksWithPrice = drinksData.map((drink) => {// quiero un obejto modificado con la propiedad price
                return {
                ...drink, //quiero todas las propiedades de drink trae usando expres operator
                price: Math.floor(Math.random() * 101)//al precio le doy un numero random para precio
            }
            })

            setDrinks(drinksWithPrice)
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false)//por mas que haya errores o no con finally se ejecuta igual porq quiero ver el loading siempre
        }
    }

    /* cada vez que el usuario haga click ver detalle va ser la llamada de la api y va devolver el resultado.
    UseEffect : disponibiliza un estado que yo puedo iniciar cuando haga la llamada al hooks, se encarga de cambiar el estado actual por
    un nuevo estado, provocando en react una nueva renderizacion para mostrar el nuevo valor. por eso el renderizado del react
    trabaja asi en el dom sin tener que refrescar la pagina  */
    useEffect(() => {
        getRecipe()
    }, [drinkId])
    


    const contextValues = {
        drinks,            //estado de lista de bebidas
        modal,             //el uso del modal
        recipe,            //recetas de una bebida particular id
        loading,           //estado de loading cargando
        handleModalClick,  //funcion disparada atravez de un evento onclick
        handleDrinkIdClick,//funcion que obtiene el id de la bebida que se quiera consultar la receta
        getDrink           //funcion que dispone la info de la api filtrada por name y category
    }

    return (
        <DrinksContext.Provider value={contextValues}>
            {children}
        </DrinksContext.Provider>
    )

}

DrinksProvider.PropTypes = {
    children: PropTypes.node.isRequired,
};

export{DrinksProvider};

export default DrinksContext;

