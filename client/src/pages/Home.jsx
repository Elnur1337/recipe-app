//Components
import Header from '../components/Header';
import RandomPicks from '../components/RandomPicks';
import ByIngredients from '../components/ByIngredients';
import Footer from '../components/Footer';

document.title = 'Your Next Meal';

const Home = () => {
    return (
        <>
            <Header/>
            <RandomPicks/>
            <ByIngredients/>
            <Footer/>
        </>
    );
}
export default Home;