//Components
import Header from '../components/Header';
import RandomPicks from '../components/RandomPicks';
import ByIngredients from '../components/ByIngredients';

document.title = 'Your Next Meal';

const Home = () => {
    return (
        <>
            <Header/>
            <RandomPicks/>
            <ByIngredients/>
        </>
    );
}
export default Home;