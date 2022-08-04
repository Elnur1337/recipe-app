import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//Icons
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();

    //States
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    return (
        <nav>
            {location.pathname === '/' ? 
                <>
                    <Link to={'/'} className="logoText" style={{color: 'white'}}>Your Next Meal</Link>
                    <ul className={`navbarList mobile ${isMobileMenuActive && 'active'}`}>
                        <li className='loginBtn' style={{color: 'white'}}>Login</li>
                        <li className='registerBtn' style={{color: 'white'}}>Register</li>
                    </ul>
                    <ul className='navbarLinks desktop'>
                        <li className='loginLink' style={{color: 'white'}}>Login</li>
                        <li className='registerLink' style={{color: 'white'}}>Register</li>
                    </ul>
                    <FaBars className='hamburgerIcon mobile' onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}/>
                </>
            :
                <>
                    <Link to={'/'} className="logoText" style={{color: 'black'}}>Your Next Meal</Link>
                    <ul className={`navbarList mobile ${isMobileMenuActive && 'active'}`} style={{backgroundColor: '#222', zIndex: '1'}}>
                        <li className='loginBtn' style={{color: 'white'}}>Login</li>
                        <li className='registerBtn' style={{color: 'white'}}>Register</li>
                    </ul>
                    <ul className='navbarLinks desktop'>
                        <li className='loginLink' style={{color: 'black'}}>Login</li>
                        <li className='registerLink' style={{color: 'black'}}>Register</li>
                    </ul>
                    <FaBars className='hamburgerIcon mobile' style={{color: 'black'}} onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}/>
                </>    
            }
        </nav>
    );
}
export default Navbar;