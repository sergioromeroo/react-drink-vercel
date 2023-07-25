import styles from "./DrinkCard.module.css"
import { useDrinks } from "../../hooks/useDrinks"
import PropTypes from "prop-types"
import { useCart } from "../../hooks/useCart";



/*  */
export default function DrinkCard({ drink }) {

    /* aca invoco a los handle q vienen del context de drinksProvider pero pasando por los hooks de usedrink */
    const { handleModalClick, handleDrinkIdClick } = useDrinks();


    /* aca ponemos en onlick que se va ejecutar cuando haga click para agregar uno al carrito arriba importamos 
    el hooks q llama a la logica de agregar carrito*/
    const { addToCart } = useCart(); //addToCart tiene q ser la misma q esta en CartProvider en cartValues para tener acceso a la funcion

    function handleAddToCart(drink) {
        addToCart(drink)
    }


    return (
        <div className={styles.caja}>
            <div className={styles.uicard}>
                <img src={drink.strDrinkThumb} />
                <div className={styles.description}>
                    <h3>{drink.strDrink}</h3>
                    <h3>${drink.price}</h3>
                    <p>gracias por elegirnos 😉</p>
                    <a className={styles.boton} onClick={() => { handleModalClick(); handleDrinkIdClick(drink.idDrink) }}>ver receta</a>
                    <a className={styles.boton} onClick={() => handleAddToCart(drink)}>agregar carrito</a>
                </div>
            </div>
        </div>

    )
}

/* validaciones de proptypes le decimos ejemplo che price va ser de proptypes de tipo number y con required*/
DrinkCard.propTypes = {
    drink: PropTypes.shape({//drink va traer un objeto y va tener esta forma con 3 propiedades que tienen tipo string y required
        strDrinkThumb: PropTypes.string.isRequired,
        strDrink: PropTypes.string.isRequired,
        idDrink: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    }).isRequired,
}

