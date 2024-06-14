import logo from './assets/rogerioCordeiro.svg'
import logoR from './assets/logoRo.svg'
import './Header.css'
import HamburgerMenu from './HamburgerMenu.jsx'

function Header() {
    return(
        <header className="logo">
            <a href="#" className="logoInternal">
                <img src={logoR} alt="R" className='logoRo'/>
                <img src={logo} alt="Rogerio Cordeiro" className='logoRoCor' />
            </a>
            <div className='menu'>
                <HamburgerMenu></HamburgerMenu>
            </div>
        </header>
    )
}

export default Header