import React from 'react';
import './styles.css'; 
import Header from './components/Header';
import Article from './components/Article';
import Suggestions from './components/Suggestions';
import Footer from './components/Footer';      

function App() {
  return (
    <div className="App">
      <Header />
      <Article />
      <Suggestions /> 
      <Footer />    
    </div>
  );
}

export default App;