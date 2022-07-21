import { useState, useEffect } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Axios from 'axios';

//Api key
import API_KEY from '../assets/apikey';

//Components
import RecipeCard from "./RecipeCard";

const Popular = () => {
    //States
    const [popularPicks, setPopularPicks] = useState([]);
    const getRecipes = () => {
        const localData = JSON.parse(localStorage.getItem('popular'));
        if (!localData) {
            Axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10`)
            .then((res) => {
                setPopularPicks(res.data);
                localStorage.setItem('popular', JSON.stringify(res.data));
            });
        } else {
            setPopularPicks(localData.recipes);
            console.log(popularPicks);
        }
    }

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <section className="popularPicks">
            {popularPicks.map((recipe) => {
                return (
                    <img key={recipe.id} src={recipe.image} alt="mealImage"/>
                );
            })}
        </section>
    );
}

export default Popular;