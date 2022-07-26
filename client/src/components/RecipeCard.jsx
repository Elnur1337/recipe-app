import { useState } from 'react';

//Icons

import { TbPlant2, TbLeaf, TbCheese, TbCurrencyDollar } from 'react-icons/tb';

const RecipeCard = ({recipeData}) => {

    const [isOpen, setIsOpen] = useState(false);
    console.log(recipeData);
    return (
        <article className="recipeCard">
            <h3>{recipeData.title}</h3>
            <div className='iconsContainer'>

            </div>
            
        </article>
    );
}
export default RecipeCard;