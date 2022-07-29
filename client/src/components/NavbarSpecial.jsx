import { useState } from 'react';
import { Link } from 'react-router-dom';

//Icons
import { FaBars } from 'react-icons/fa';

const NavbarSpecial = () => {
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    return (
        <nav>
            <Link to={'/'} className="logoText" style={{color: 'black'}}>Your Next Meal</Link>
            <ul className={`navbarList mobile ${isMobileMenuActive && 'active'}`}> 
                <li className='loginBtn' style={{color: 'black'}}>Login</li>
                <li className='registerBtn' style={{color: 'black'}}>Register</li>
            </ul>
            <ul className='navbarLinks desktop'>
                <li className='loginLink' style={{color: 'black'}}>Login</li>
                <li className='registerLink' style={{color: 'black'}}>Register</li>
            </ul>
            <FaBars className='hamburgerIcon mobile' onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}/>
        </nav>
    );
}
export default NavbarSpecial;