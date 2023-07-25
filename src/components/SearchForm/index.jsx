import { Form, Row, Col, Alert } from "react-bootstrap"
import { Formik, Field, ErrorMessage } from "formik"
import * as Yup from "yup" //traigo todos los elementos de yup y lo guardo en una variable Yup
import {useCategories} from "../../hooks/useCAtegories"
import {useDrinks} from "../../hooks/useDrinks"
import styles from "./SearchForm.module.css"

export default function SearchForm() {
    //invocamos o llamamos a las funciones que hice en context provider pero llamados desde los hooks
    const { categories } = useCategories();
    const { getDrink} = useDrinks();
    const {loading} = useDrinks();

    //valores iniciales serian nombre, email,contraseña hay q pasarselo al formik
    const initialvalues = {
        name: "",
        category: "",
    }

    //validaciones y lo validamos con yup al formulario formik
    const validacionYupSchema = Yup.object({
        name: Yup.string().required("debe colocar el nombre"),
        category: Yup.string().required("debe seleccionar una categoria")
    })

    //cuando haga submit el usuario se ejecuta esto los values del formulario y hace la llamada a la api
    //atravez del uso getDrink que traigo de contextprovider pero llamados desde los hooks ponerlo en el formik
    const handleSubmit = (values) => {
        getDrink(values)
    }

    return (
        <Formik initialValues={initialvalues} validationSchema={validacionYupSchema} onSubmit={handleSubmit}>

            {
                (formik) => (
                    <Form onSubmit={formik.handleSubmit}>{/* aca se encarga de pasar el valor sea name password email etc */}
                        {
                            //condicional: en el caso que estatus no haya un dato me muestra el alert de lo contrario no muesta el alert
                            formik.status && (
                                <Alert variant="danger" className="text-danger">
                                    {formik.status}
                                </Alert>
                            )
                        }

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="name">Nombre de la Bebida</Form.Label>

                                    <Field id="name" type="text" placeholder="EJ: tequila, votka, vino" name="name" as={Form.Control} />

                                    <ErrorMessage name="name" component={Form.Text} className="text-danger" />

                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="category">Categoria de la Bebida</Form.Label>

                                    <Field id="category" placeholder="Selecciona una categoria" name="category" as={Form.Select}>
                                        <option disabled>Seleccione Categoria</option>
                                        {
                                            categories.map((category) => (//recorro el array de categorias
                                                <option key={category.strCategory} value={category.strCategory}>

                                                    {category.strCategory}

                                                </option>

                                            ))
                                        }
                                    </Field>

                                    <ErrorMessage name="category" component={Form.Text} className="text-danger" />

                                </Form.Group>
                            </Col>

                        </Row>

                        <Row className="justify-content-end">
                            <Col md={15}>
                                <button className={styles.btn} type="submit" disabled={loading}>
                                        {loading ? "buscando..." : "buscar bebidas"}
                                </button>
                            </Col>

                        </Row>               

                    </Form>
                )
            }

        </Formik>
    )
}