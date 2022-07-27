import { useState } from "react";
import { Link } from "react-router-dom";

const ByIngredients = () => {
    const [searchInput, setSearchInput] = useState('potato');
    return (
        <section className="byIngredientsSection">
            <h2>Limited on ingredients?</h2>
            <input type="text" name="searchByIngredients" id="searchByIngredients" placeholder="potato" onChange={(e) => setSearchInput(e.target.value)}/>
            <Link to={'/'}>Search recipe by ingredients</Link>
        </section>
    );
}
export default ByIngredients;