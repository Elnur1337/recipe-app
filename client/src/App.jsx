//Libraries
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Pages
import Home from './pages/Home';
import Register from './pages/Register';

//Components
import Navbar from './components/Navbar';

//Context
export const UserContext = React.createContext();

function App() {
  //States
  const [user, setUser] = useState(null);
  useEffect(() => {

  }, []);

  return (
    <section className="App">
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </Router>
      </UserContext.Provider>
    </section>
  );
}

export default App;
