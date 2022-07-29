import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

//Components
import NavbarSpecial from '../components/NavbarSpecial';
import RecipeCard from '../components/RecipeCard';

//Api key
import apiKey from '../assets/apikey';

const Search = () => {
    const {searchInput} = useParams();
    console.log(searchInput);

    //States
    const [data, setData] = useState([]);
    const [shownData, setShownData] = useState([]);
    useEffect(() => {
        Axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&number=10&ingredients=${searchInput}`)
        .then(res => {
            const newData = res.data.map((recipe) => recipe.id);
            console.log(newData);
            newData.forEach((id) => {
                Axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
                .then(res => setData(...data, res.data));
            });
            console.log(data);
        });
    }, []);
    return (
        <section>
            <NavbarSpecial/>
            <h2 onClick={() => {console.log(data);}}>Search results</h2>
            {console.log(data)}
            {data.map((recipe) => {
                return <RecipeCard key={recipe.id} recipeData={recipe}/>
            })}
        </section>
    );
}
export default Search;