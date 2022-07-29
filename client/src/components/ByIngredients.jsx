import { useState } from "react";
import { Link } from "react-router-dom";

const ByIngredients = () => {
    const [searchInput, setSearchInput] = useState('');
    return (
        <section className="byIngredientsSection">
            <h2>Limited on ingredients?</h2>
            <input type="text" name="searchByIngredients" id="searchByIngredients" placeholder="potato..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            <Link to={`/search/${searchInput}`} className='searchByIngredientsBtn'>Search recipe by ingredients</Link>
        </section>
    );
}
export default ByIngredients;