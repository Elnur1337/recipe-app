import { useState } from 'react';
import { Link } from 'react-router-dom';

//Icons
import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

const RecipeCard = ({recipeData}) => {
    const [isSaved, setIsSaved] = useState(false);
    return (
        <article className="recipeCard">
            <img src={recipeData.image} alt="recipeImg"/>
            <div className='infoContainer'>
                <h4 className='cardTitle'><Link to={'/'}>{recipeData.title.startsWith('http') ? 'No title available' : recipeData.title}</Link></h4>
                <p dangerouslySetInnerHTML={{__html: `${recipeData.summary.slice(0, 88)}...`}} className='recipeSummary'></p>
                <Link to={'/'} className='readMoreBtn'>Read more</Link>
                <div className='cardFooter'>
                    <span className='readyInMinutes'><AiOutlineClockCircle className='clockIcon'/> {recipeData.readyInMinutes}min</span>
                    {isSaved ? <MdBookmark className='isSavedIcon' onClick={() => setIsSaved(!isSaved)}/> : <MdBookmarkBorder className='isSavedIcon' onClick={() => setIsSaved(!isSaved)}/>}
                </div>
            </div>
        </article>
    );
}
export default RecipeCard;