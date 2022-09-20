import { useState, useEffect } from "react";

const Header = () => {
    //States
    const [meal, setMeal] = useState('breakfest');
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
            <h3>Welcome to Your Next Meal!</h3>
            <article>{clock}</article>
            <button>{`Find your next ${meal}`}</button>
        </header>
    );
}
export default Header;