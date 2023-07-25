
      //obtener el valor total de de los productos del carrito 
      export function oneTypeItemTotal(cartItems) {
        return cartItems.map((item) => item.quantity * item.price)
      }