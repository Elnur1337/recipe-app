import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//Pages
import Home from "./pages/Home";
import Search from './pages/Search';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/search/:searchInput' element={<Search/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
