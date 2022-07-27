import { useState, useEffect } from "react";
import Axios from 'axios';

//Components
import RecipeCard from "./RecipeCard";

//Api key
import apiKey from '../assets/apikey';

const RandomPicks = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('random'));
        if (!local) {
            const getRandom = () => {
                Axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=5`)
                .then((res) => {
                    setData(res.data.recipes);
                    localStorage.setItem('random', JSON.stringify(res.data.recipes));
                })
            }
            getRandom();
        } else {
            setData(local);
        }
    }, []);
    return (
        <section className="randomPicks">
            <h2 className="randomPicksTitle">Our popular picks</h2>
            <div className="cardsContainer">
                {data.map((recipe) => {
                    return <RecipeCard key={recipe.id} recipeData={recipe}/>
                })}
            </div>
        </section>
    );
}
export default RandomPicks;