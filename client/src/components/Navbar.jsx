import { useState } from 'react';

//Icons
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    return (
        <nav>
            <p className="logoText">Your Next Meal</p>
            <ul className={`navbarList mobile ${isMobileMenuActive && 'active'}`}> 
                <li className='loginBtn'>Login</li>
                <li className='registerBtn'>Register</li>
            </ul>
            <ul className='navbarLinks desktop'>
                <li className='loginLink'>Login</li>
                <li className='registerLink'>Register</li>
            </ul>
            <FaBars className='hamburgerIcon mobile' onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}/>
        </nav>
    );
}
export default Navbar;