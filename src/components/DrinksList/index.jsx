import { useDrinks } from "../../hooks/useDrinks"
import DrinkCard from "../DrinkCard"
import styles from "./DrinkList.module.css"

export default function DrinksList() {
    const { drinks } = useDrinks();

    /* renderizado condicional si no hay tragos en el resultado de busqueda y la primera vez 
    inicia no hay resultado si drinks .lenght es 0 me devuelve no hay resultado de lo contrario 
    hace el map para mostrar lista de la cards */

    if (drinks.length === 0) { //si es 0 retorname lo de abajo
        return (
            <>
                <h1 className={styles.texto}> No hay resultados de bebidas</h1>
            </>
        )
    }

    /* de lo contrario si saltea el if de arriba si es mayor a 0 pasa a este return me va mostrar las cards que traigo de DrinkCard*/
    return (

        <div className={styles.bebidas} >
            {
                drinks.map((drink) => (
                    <DrinkCard key={drink.idDrink} //le pasamos un key siempre que iteramos un elemento como el drinkCard q lo traigo de otro lado tiene q tener su propia key unica para lo identifique el dom el idDrink ya es del api
                        drink={drink} /> //esto es la propTypes aca le paso el objeto drink que esta en drinkCard: export default funtion DrinkCard{drink}<-- este le paso
                ))
            }
        </div>


    )
}