import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

/* hooks custom es para no repetir useContext y Cart context y solo usar el hooks de useCart */

export function useCart() {
    return useContext(CartContext)
}