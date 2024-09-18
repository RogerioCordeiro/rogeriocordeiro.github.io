import styles from './Navbar.module.css'
import logo from '../img/RACS.png'

function Navbar() {

    return (
        <header className={styles.container}>
            <nav className={styles.navbar}>
                <div className={styles.navbarImg}>
                    <a href="#"><img src={logo} alt="RACS" title='Rogerio Aparecido' /></a>
                </div>
                <ul className={styles.navbarLinks}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Sobre Min</a></li>
                    <li><a href="#">Protfólio</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <div className={styles.navbarButtons}>
                    <a className={styles.navbarSignIn} href="#">Sign In</a>
                    <a className={styles.navbarRegister} href="#">Register</a>
                </div>
            </nav>
        </header>
    )
}

export default Navbar