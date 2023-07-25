import { Modal, Image } from "react-bootstrap"
import {useDrinks} from "../../hooks/useDrinks"

export default function DrinkDetailModal() {
    /* aca invoco o llamo los q vienen del context de drinksProvider pero pasando por los hooks de usedrink */
    const { modal, handleModalClick, recipe, loading } = useDrinks();

    /* me va mostrar una lista de todos los ingredientes */
    function showIngredients() {
        let ingredients = []

        for (let index = 1; index < 16; index++) {
            if (recipe[`strIngredient${index}`]) {//va recorrer todos los ingredientes los 16 y va agarrar el valor
                ingredients.push(//toda esa lista ahi q guardarlo en el array vacio
                    <li key={index}>
                        {recipe[`strIngredient${index}`]} {recipe[`strMeasure${index}`]}
                    </li>

                )
            }
        }
        return ingredients;
    };

    return (
        !loading && (
            <Modal show={modal} onHide={handleModalClick}>
                <Image src={recipe.strDrinkThumb} alt={`Imagen receta ${recipe.strDrink}`} />
                <Modal.Header>
                    <Modal.Title>{recipe.strDrink}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-3">
                        <h2>Instrucciones</h2>
                        {recipe.strInstructions}
                        <h2>Ingredientes y Cantidad</h2>
                        {showIngredients()}
                    </div>
                </Modal.Body>
            </Modal>
        )
    );


}