import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

import Home from  './pages/Home'  //page
import About from  './pages/About'  //page
import Contact from  './pages/Contact'  //page

// //import { Link } from 'react-router-dom'
// import { HashLink } from 'react-router-hash-link'
// //import { NavLink } from 'react-router-dom'

//import Home from './pages/Home';
import './App.css';
import Nav from './components/Nav';

export default function App() {
  return (        
    <div className="App">
        <Router>  
          <Nav />        
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router> 
    </div>
  );
}
