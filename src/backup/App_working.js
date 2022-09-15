import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

//only pages that you plan to link to - separate pages and components in larger application.
import Home from  './pages/Home'  //page
import About from  './pages/About'  //page
import Contact from  './pages/Contact'  //page

import './App.css';
import Nav from './components/Nav'

export default function App() {
  return (
        
    //path="/about" points to www.bug-tracker.com/about 
    //links at the top of page
    <Router>
        <div className="App">
        <Nav />

        <header >          
          Bug Tracker
        </header>
          <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
          </Routes>
      </div>
   </Router>
  );
}
