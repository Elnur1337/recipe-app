import Axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

//Components
import Navbar from '../components/Navbar';
import RecipeCard from '../components/RecipeCard';

//Api key
import apiKey from '../assets/apikey';

document.title = 'Your Next Meal - Search results';

const Search = () => {
    let start = 0, end = 10;
    // let firstPage = 1, lastPage = 10, currentPage = 0;
    const {searchInput} = useParams();

    //States
    const [data, setData] = useState([]);
    const [shownData, setShownData] = useState([]);
    const [recipeDataArr, setRecipeDataArr] = useState([]);
    let tempArr = [];
    // useEffect(() => {
    //     Axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&number=100&ingredients=${searchInput}`)
    //     .then(res => {setData(res.data)});
    //     console.log(data);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    // useEffect(() => {
    //     if (data) {
    //         setShownData(data.slice(start, end));
    //         console.log(shownData);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data])
    // useEffect(() => {
    //     if (shownData) {
    //         for (let counter = 0; counter < 10; counter++) {
    //             console.log(shownData[counter]);
    //             if (shownData[counter]) {
    //                 Axios.get(`https://api.spoonacular.com/recipes/${shownData[counter].id}/information?apiKey=${apiKey}`)
    //                 .then(res => {tempArr.push(res.data)}); 
    //             }
    //         }
    //         setRecipeDataArr(tempArr);
    //     }
    //     console.log(tempArr);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [shownData]);
    useEffect(() => {
        setRecipeDataArr(JSON.parse(localStorage.getItem('random')));
    }, []);
    return (
        <>
            <Navbar/>
            <section>
                <h2 onClick={() => console.log(data)}>Search results</h2>
                <h2 onClick={() => console.log(tempArr)}>Search results</h2>
                {recipeDataArr && recipeDataArr.map((recipe) => {
                    return <RecipeCard key={recipe.id} recipeData={recipe}/>
                })}
            </section>
        </>
    );
}
export default Search;