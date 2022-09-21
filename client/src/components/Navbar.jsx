//Libraries
import { Link, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';

//Icons
import { FaBars, FaTimes, FaSearch, FaPlus } from 'react-icons/fa';

//Context
import { UserContext } from '../App';
import { useEffect } from 'react';

const Navbar = () => {
    //States
    const [user] = useContext(UserContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    //Input states
    const [searchInput, setSearchInput] = useState('');

    const location = useLocation();
    useEffect(() => {
        setIsDialogOpen(false);
        setIsMobileMenuOpen(false);
    }, [location]);

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
                <button className='createBtn' onClick={() => setIsDialogOpen(prev => !prev)} style={isMobileMenuOpen ? {opacity: '1', transition: 'opacity 500ms ease-in-out 500ms' } : {opacity: '0', transition: 'opacity 500ms ease-in-out'}}><FaPlus className='createIcon'/>Create</button>
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
            {isDialogOpen && 
            <dialog open className='createDialog'>
                {!user ? 
                <>
                    <button disabled>Create new recipe</button>
                    <p>You need to log in!</p>
                    <button disabled>Create new post</button>
                    <p>You need to log in!</p>
                </> : 
                <>
                    <button>Create new recipe</button>
                    {!user.isPremium ? 
                    <>
                        <button disabled>Create new post</button>
                        <p>For premium users only! Buy premium here.</p>
                    </> :
                    <button>Create new post</button>
                    }
                </>}
            </dialog>}
        </nav>
    );
}
export default Navbar;