import { AuthProvider } from "./context/AuthProvider"
import { CartProvider } from "./context/CartProvider"
import { CategoriesProvider } from "./context/CategoriesProvider"
import { DrinksProvider } from "./context/DrinksProvider"
import { ModalProvider } from "./context/ModalProvider"
import MainLayout from "./layout"
import AppRoutes from "./routes"
import {BrowserRouter as Router } from "react-router-dom";


function App() {

  return (
    /* aca van todos los context que vaya creando para que aparesca su logica */
    <Router>
    <AuthProvider>
      <ModalProvider>
        <CartProvider>
          <MainLayout>
            <DrinksProvider>
              <CategoriesProvider>
                <AppRoutes />
              </CategoriesProvider>
            </DrinksProvider>
          </MainLayout>
        </CartProvider>
      </ModalProvider>
    </AuthProvider>
    </Router>
  )
}

export default App

