//Libraries
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';

//Icons
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

//Context
import { UserContext } from '../App';

const Navbar = () => {
    //States
    const [user] = useContext(UserContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    //Input states
    const [searchInput, setSearchInput] = useState('');
    return (
        <nav>
            <div  className='flexFix'></div>
            <p className='logoText'><Link to={'/'}>Your Next Meal</Link></p>
            {/* Mobile menu icon */}
            {!isMobileMenuOpen ? 
            <FaBars height={'1.2rem'} className='mobileMenuIcon' onClick={() => setIsMobileMenuOpen(prev => !prev)}/> :
            <FaTimes className='mobileMenuIcon' onClick={() => setIsMobileMenuOpen(prev => !prev)}/>
            }
            <div className='mobileNavContainer' style={isMobileMenuOpen ? {left: '0', borderTop: '1px solid rgb(238, 238, 238)', transition: 'left 500ms ease-in-out, border-top 500ms ease-in-out 500ms'} : {left: '-100%', borderTop: 'none',  transition: 'left 500ms ease-in-out 500ms, border-top 500ms ease-in-out'}}>
                <form className='searchForm' style={isMobileMenuOpen ? {opacity: '1', transition: 'opacity 500ms ease-in-out 500ms' } : {opacity: '0', transition: 'opacity 500ms ease-in-out'}}>
                    <input type="text" className='searchBar' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder='Search recipe...'/>
                    <FaSearch className='searchSubmit'/>
                </form>
                {user ? 
                <div className='userInfoContainer' style={isMobileMenuOpen ? {opacity: '1', transition: 'opacity 500ms ease-in-out 500ms' } : {opacity: '0', transition: 'opacity 500ms ease-in-out'}}>
                    <Link to={'/myprofile'}><img src={''} alt='User avatar' className='userAvatar'/></Link>
                    <p className='username'>Username</p>
                </div> :
                <ul style={isMobileMenuOpen ? {opacity: '1', transition: 'opacity 500ms ease-in-out 500ms' } : {opacity: '0', transition: 'opacity 500ms ease-in-out'}}>
                    <li className='loginBtn'><Link to={'/login'}>Login</Link></li>
                    <li><Link to={'/register'}>Register</Link></li>
                </ul>
                }
            </div>
        </nav>
    );
}
export default Navbar;