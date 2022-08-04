import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

//Components
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

//Api key
import apiKey from '../assets/apikey';

document.title = 'Your Next Meal - Search results';

const Search = () => {
    const {searchInput} = useParams();

    //States
    const [data, setData] = useState([]);
    const [recipeDataArr, setRecipeDataArr] = useState([]);
    let tempArr = [];
    // useEffect(() => {
    //     Axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&number=18&ingredients=${searchInput}`)
    //     .then(res => {
    //         setData(res.data);            
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    // useEffect(() => {
    //     if (data) {
    //         data.forEach(recipe => {
    //             Axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`)
    //             .then(res => tempArr.push(res.data)); 
    //         });
    //         setRecipeDataArr(tempArr);
    //     }
    //     console.log(recipeDataArr);
    //     console.log(tempArr);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data]);
    useEffect(() => {
        setRecipeDataArr(JSON.parse(localStorage.getItem('search')));
    }, []);
    return (
        <>
            <Navbar/>
            <section className='searchSection'>
                <h2 className='randomPicksTitle' style={{zIndex: '-5'}}>Search results</h2>
                <div className='cardsContainer'>
                    {recipeDataArr && recipeDataArr.map((recipe) => {
                        return <RecipeCard key={recipe.id} recipeData={recipe}/>
                    })}
                </div>
            </section>
            <Footer/>
        </>
    );
}
export default Search;