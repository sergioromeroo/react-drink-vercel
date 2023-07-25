import { useContext } from "react";
import DrinkContext from "../context/DrinksProvider"


export function useDrinks ()  {
  return useContext(DrinkContext);
}
