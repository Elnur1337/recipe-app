import { useState } from 'react';

//Icons
import { GiHamburgerMenu } from 'react-icons/gi';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav>
            <h4 className="logoTitle">Your Next Meal</h4>
            <span className="userControls tablet desktop">
                <p className="loginBtn">Login</p>
                <p className="registerBtn">Register</p>
            </span>
            <GiHamburgerMenu className='mobile menuIcon' onClick={() => {setIsMenuOpen(!isMenuOpen)}}/>
            {isMenuOpen && 
                <section className='menuContent'>
                    <ul className='menuList'>
                        <li className='loginBtnMobile'>Login</li>
                        <li className='registerBtnMobile'>Register</li>
                    </ul>
                </section>
            }
        </nav>
    );
}

export default Navbar;