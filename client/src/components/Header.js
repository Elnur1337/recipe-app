import { useState, useEffect, useRef } from 'react';

//Icons
import { BiSearchAlt } from 'react-icons/bi';

//Images
import headerBgDesktop from '../assets/headerBgDesktop.jpg';
import headerBgMobile from '../assets/headerBgMobile.jpg';


const Header = () => {
    //Input states
    const [searchInput, setSearchInput] = useState('');

    const ref = useRef(null);

    return (
        <header>
            <div className='overlay'></div>
            <picture className="headerBgImg">
                <source media="(min-width: 650px)" srcSet={headerBgDesktop}/>
                {/* Photo by Maarten van den Heuvel: https://www.pexels.com/photo/person-holding-sliced-vegetable-2284166/ */}
                <img src={headerBgMobile} alt="backgroundImg" />
                {/* Photo by DapurMelodi: https://www.pexels.com/photo/person-pouring-salt-in-bowl-1109197/ */}
            </picture>
            <h1>Welcome to Find Your Next Meal!</h1>
            <form>
                <label htmlFor="searchByIngredient" className='searchByIngredientLabel'>Search recipe by ingredient:</label>
                <div className='searchBarContainer' onClick={() => {ref.current.focus()}}>
                    <BiSearchAlt className='searchIcon'/>
                    <input type="text" placeholder='potato...' ref={ref} name='searchByIngredient' className='searchInput' value={searchInput} onChange={e => {setSearchInput(e.target.value)}}/>
                </div>
            </form>
        </header>
    );
}

export default Header;