import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./MainLayout.module.css";
import PropTypes from "prop-types";
import CartModal from "../components/CartModal";

/* LAYOUT EL ENCARGADO DE RENDERIZAR MIS VISTAS QUE YO HAYA PONIENDO EN COMPONENTS ES COMO QUE TODAS LAS VISTAS PASAN ACA 
Y DE ACA SE VAN A APP.JSX */
export default function MainLayout({ children }) {
  return (
    <div className={styles.main}>
      <Header />
      <section className={styles.contenedorfondoanimado}>

        <div className={styles.animacion}>

          <span className={styles.uno}></span>
          <span className={styles.dos}></span>
          <span className={styles.tres}></span>
          <span className={styles.cuatro}></span>

          <span className={styles.uno}></span>
          <span className={styles.dos}></span>
          <span className={styles.tres}></span>
          <span className={styles.cuatro}></span>

          <span className={styles.uno}></span>
          <span className={styles.dos}></span>
          <span className={styles.tres}></span>
          <span className={styles.cuatro}></span>
        </div>
      
      <Container className="mt-5">{children}</Container>
      </section>
      <CartModal />


      <Footer />

    </div>
    
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
