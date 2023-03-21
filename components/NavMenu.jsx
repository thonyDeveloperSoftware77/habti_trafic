import styles from "../src/styles/Home.module.css";

function NavMenu() {
    return (
        <>
            <div className={styles.navMenuContainer}>
                <div>
                    <h2>Seguimiento de Habitos</h2>
                </div>
                <div className={styles.navMenu}>
                    <a href="">Habitos</a>
                    <a href="">Seguimiento de habitos</a>
                    <a href="">Configuración</a>
                    <a href="">About</a>
                </div>
                <div className={styles.exitSection}>
                    <a href="">cerrar</a>
                </div>
            </div>


        </>
    )
}

export default NavMenu