import styles from "./Header.module.css";
import useModal from "../../hooks/useModal";
import {useAuth} from '../../hooks/useAuth'



export default function Header() {
  const {toogleModal}= useModal()
  const {currentUser, logout} = useAuth()
  return (
    <header className={`py-5 ${styles.header}`}>
      <h1>Buscador de Bebidas</h1>
      {
        currentUser && (
          <div>
          <h3>Nombre de usuario: {currentUser.name}</h3>
          <button className={styles.carrito} onClick={toogleModal}>🛒</button>
          <button className={styles.carrito} onClick={logout} >Cerrar Session </button>
          </div>
        )
      }
    </header>
  );
}
