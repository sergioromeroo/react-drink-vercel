import styles from "./CartModal.module.css"
import useModal from "../../hooks/useModal"
import { useCart } from "../../hooks/useCart"
import { isEmptyArray } from "formik"

//videoclase9 14min
export default function CartModal() {

    /* traemos el hooks de onClick de modal */
    const { isOpen, toogleModal } = useModal()

    /* llamo a las funciones que tiene context cartProvider llamo a todas sus logicas*/
    const { cart, addToCart, removeOneFromCart, removeAllFromCart, clearCart, sendOrder, orderTotal } = useCart()


    //si abrir esta en falso lo de abajo(modal) no tendria q mostrar hasta ponerlo en true cuando le haga click 
    if (isOpen)
        return (
            <div className={styles.modalBg}>
                <div className={styles.modal}>
                    <i className={styles.cruz} onClick={toogleModal}>❌</i>
                    <h2>Mi Carrito</h2>
                    <section className={styles.modalBody}>
                        <div className={styles.modalDrinksListContainer}>

                            {cart.cartItems.length === 0 && (
                                <div className={styles.modal}>
                                    👜
                                <h3> ¡Empieza un carrito de compras!  </h3>
                                <p>Suma Productos de lo que mas deseas</p>
                                </div>
                            )}
                            
                                {cart.cartItems.map(drink => (
                                    <article key={drink.idDrink} className={styles.card}>

                                        <img src={drink.strDrinkThumb} alt="imagen de bebidas" />
                                        <span>{drink.strDrink}</span>
                                        <span>{drink.price}</span>

                                        <div className={styles.counter}>
                                            <button onClick={() => removeOneFromCart(drink.idDrink)}>
                                                -
                                            </button>
                                            <span>{drink.quantity}</span>
                                            <button onClick={() => addToCart(drink)}> {/* este se ejecuta con callback osino se crea un bucle infinito y no cada vez q hago click*/}
                                                +
                                            </button>
                                        </div>

                                        <i onClick={() => removeAllFromCart(drink.idDrink)}>🗑</i>

                                    </article>
                                ))
                            }

                        </div>
                        <aside className={styles.aside}>
                            <h3>Total: {orderTotal}</h3>
                            <div className={styles.btnContainer}>

                                <div className={styles.del} >
                                    <div onClick={clearCart}>
                                        Vaciar Carrito
                                    </div>
                                </div>

                                <div className={styles.del2} >
                                    <div onClick={sendOrder}>
                                    Confirmar compra
                                    </div>
                                </div>

                            </div>

                        </aside>

                    </section>
                </div>
            </div>
        )

}