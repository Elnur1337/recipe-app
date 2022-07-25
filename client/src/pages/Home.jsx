//Components
import Header from '../components/Header';
import RandomPicks from '../components/RandomPicks';

document.title = 'Your Next Meal';

const Home = () => {
    return (
        <>
            <Header/>
            <RandomPicks/>
        </>
    );
}
export default Home;