import logo from './assets/rogerioCordeiro.svg'
import './Header.css'

function Header() {
    return(
        <header className="logo">
            <a href="#" className="logo internal">
                <img src={logo} alt="Rogerio Cordeiro" />
            </a>
        </header>
    )
}

export default Header