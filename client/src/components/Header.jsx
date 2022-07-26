import React, { Suspense, useState, useEffect } from 'react';

//Components
import Navbar from './Navbar';
const HeaderMobile = React.lazy(() => import("../components/HeaderMobile"));
const HeaderDesktop = React.lazy(() => import("../components/HeaderDesktop"));

const Header = () => {

    const [meal, setMeal] = useState('breakfast');
    const [clock, setClock] = useState(null);

    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            setClock(now.toLocaleTimeString());
        }, 1000);
        const now = new Date();
        if (now.getHours() >= 4 && now.getHours() < 12) {
            setMeal('breakfest');
        } else if (now.getHours() >= 12 && now.getHours() < 18) {
            setMeal('lunch');
        } else {
            setMeal('dinner');
        }
    }, []);

    return (
        <header>
            <div className="blackOverlay"></div>
            <Suspense>
                {window.innerWidth >= 700 ? <HeaderDesktop/> : <HeaderMobile/>}
            </Suspense>
            <div className='headerContent'>
                <Navbar/>
                <h2 className='wlcmMsg'>Welcome to Your Next Meal!</h2>
                <article className='clock'>{clock}</article>
                <p className='getRandom'>Get random recipe from our database!</p>
                <button className='findMeal'>{`Find your next ${meal}`}</button>
            </div>
        </header>
    );
}
export default Header;