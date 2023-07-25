import { createContext, useEffect, useReducer, useState } from "react"
import { PropTypes } from "prop-types";
import { oneTypeItemTotal } from "../utils/cart.utils";

/* ------------carrito aca va estar todas la logica de agregar al carrito remover remover todo o limpiar carrito---------------- */

const CartContext = createContext();

const cartInitialState = {
   cartItems: [] //cada vez q nos pase un producto para agregar al carrito guardamos el objeto nuevo

}

/* tipo de acciones va tener asignadas cada vez que quiera disparar una accion add to cart lo llamo a la propiedad "ADD_TO_CART"*/
const actionTypes = {
   ADD_TO_CART: "ADD_TO_CART",
   REMOVE_ONE_FROM_CART: 'REMOVE__ONE_FROM_CART',
   REMOVE_ALL_FROM_CART: 'REMOVE_ALL_FROM_CART',
   CLEAR_CART: 'CLEAR_CART'

}
/* FUNCION REDUCTORA recibe el state del estado actual y las acciones que son las de arriba actionTypes
tiene 2 propiedades tipos y el dato que quiero guardar, si es q lo necesito, y ese dato se recibe al momento que el dispatch se dispara 
seria lo que esta abajo el cartProvider dispatch video clase6 1:19min*/


function cartReducer(state, { type, payload = {} }) { //payload representa el producto que queremos agregar al payload un objeto vacio para q no rompa cuando pongo limpiar carrito
   const { idDrink } = payload //creo una variable cuando haga el dispath de la accion me devuelve este paylod el id del producto el precio lo q sea 

   //quiero saber si existe la bebida, para poder guardarlo en mi carrito 
   let hayBebidasEnCarrito = state.cartItems.find((item) => item.idDrink === idDrink)

   switch (type) {

      /* --------logica para agregar al carrito--------- */
      //aca usamos las variables q usamos arriba del actionTypes
      case actionTypes.ADD_TO_CART:

         if (hayBebidasEnCarrito) {
            //afirmativo si hace click en agregarcarrito, incrementar la cantidad en + 1
            let cartItemsUpdate = state.cartItems.map(item => {
               if (item.idDrink === idDrink) {
                  return {
                     ...item,
                     quantity: item.quantity + 1
                  }
               }
               return item
            })

            return {
               ...state,
               cartItems: cartItemsUpdate
            }
         } else {
            //negativo, agregamos el producto con cantidad 1
            payload.quantity = 1
            return {
               ...state,
               cartItems: [...state.cartItems, payload]
            }

         }

      /* --------FIN logica para agregar al carrito--------- */



      /* --------logica para Eliminar uno del carrito--------- */
      case actionTypes.REMOVE_ONE_FROM_CART:
         //existe el prodcuto en el carrito?

         //si esta en el carrito y cantidad es mayor a 1 entra al if y lo mapea y la cantidad restale 1 
         if (hayBebidasEnCarrito.quantity > 1) {
            //quantity > 1 ? --> resta 1
            let cartItemsUpdate = state.cartItems.map((item) => {
               if (item.idDrink === idDrink) {
                  return {
                     ...item,
                     quantity: item.quantity - 1
                  }
               }
               return item
            })

            //retorna el estado con el array ya modificado osea le resto 1 ya
            return {
               ...state,
               cartItems: cartItemsUpdate
            }
         } else {
            //quantity < 1 --> quitar del carrito de lo contrario elimino el producto del array del carrito
            //filtrar el item que estoy iterando es distinto al id de la bebida 
            let cartItemsUpdate = state.cartItems.filter((item) => item.idDrink !== idDrink) //esto me va devolver un array nuevo con todos los elementos menos el que quiero eliminar

            return {
               ...state,
               cartItems: cartItemsUpdate
            }
         }
      /* --------FIN logica para Eliminar uno del carrito--------- */


      /* --------logica para Eliminar TODOS del carrito este seria el tachito de basura--------- */
      case actionTypes.REMOVE_ALL_FROM_CART:
         if (hayBebidasEnCarrito) {// che si esta el producto en el carrito sacalo
            let cartItemsUpdate = state.cartItems.filter((item) => item.idDrink !== idDrink) //esto me va devolver un array nuevo con todos los elementos menos el que quiero eliminar

            return {
               ...state, 
               cartItems: cartItemsUpdate
            }
         }

         return state // si no entra al de arriba retorname el state como estaba el estado actual sin modificar

      /* --------FIN para Eliminar TODOS del carrito este seria el tachito de basura--------- */



      /* ----------------logica para eliminar todo todo------------ */
      case actionTypes.CLEAR_CART:
         //   
         return {
            ...state,
            cartItems: []
         }



   }
}


/* --------todas estas funciones vamos a usarlos en los onlclick de las vistas */
function CartProvider({ children }) {
   const [state, dispatch] = useReducer(cartReducer, cartInitialState)//desestructurar useReducer me devuelve un state(es el q contiene los cart ) y un dispatch es una funcion que me permite disparar acciones para modificar el estado actual 
   
   
   //necesito pasarlo al context value para poder usarlo en el onclick y poder usarlo a esta logica de TOTAL hago este useState
   // asi lo coloco el ordenTotal en contextvalue
   const [orderTotal, setOrderTotal] = useState()

   //----------funcion para tener la suma TOTAL del carrito, oneTypeItemTotal tendria que estar aca pero lo lleve a utils para modularizar -----------
   useEffect(()=>{
      /* esto me retorna el array de todo el total de los productos q tengo en el carrito lo llamo de /utils/cart.utils */
      //if(state.cartItems.length > 0 ){ //if si el cartItem tiene algo que haga la accion se ejecute cuando aya algo en el carrito 
         let total = oneTypeItemTotal(state.cartItems).reduce((a,b) => a+b, 0)
         setOrderTotal(total)
      //}
   },[state])



   //----------add to cart va agregar de a uno---------
   function addToCart(drink) {//esta funcion recibe un parametro que es el drink las bebidas
      dispatch({ type: actionTypes.ADD_TO_CART, payload: drink }) //dispatch lanza un objeto seria lo que hcimos arriba la funcion cartReducer
   }

   //----------para sacar de a uno en el carrito---------
   function removeOneFromCart(idDrink) {
      dispatch({ type: actionTypes.REMOVE_ONE_FROM_CART, payload: { idDrink } })
   }

   //-----------remove all para sacar todos de una lo q tengo en el carrito----------
   function removeAllFromCart(idDrink) {
      dispatch({ type: actionTypes.REMOVE_ALL_FROM_CART, payload: { idDrink } })

   }

   //--------limpia todo el carrito---------
   function clearCart() {
      dispatch({ type: actionTypes.CLEAR_CART });
      setOrderTotal(0)//cuando se limpie el carrito el Total se ponga en 0
   }


   //---------alert que muestre el stock del carrito-------

   function sendOrder(){
      alert("gracias por su compra");
   }

   //la variable lo hago aca para usarlo en values
   const cartValues = {
      cart: state,
      addToCart,
      removeOneFromCart,
      removeAllFromCart,
      clearCart,
      sendOrder,
      orderTotal
   }

   return (
      <CartContext.Provider value={cartValues}>
         {children}
      </CartContext.Provider>
   )
}

//las proptypes
CartProvider.propTypes = {
   children: PropTypes.node.isRequired
}

export { CartProvider, CartContext }
