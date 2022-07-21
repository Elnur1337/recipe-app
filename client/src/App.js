import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Pages
import Home from './pages/Home';

//Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
