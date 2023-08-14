import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PizzaList from './components/PizzaList';
import IngredientList from './components/IngredientList';
import OperationList from './components/OperationList';
import SinglePizza from './components/SinglePizza';
import SingleIngredient from './components/SingleIngredient';
import SingleOperation from './components/SingleOperation';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul className='navbar'>
          <li className='navbar-element'>
            <Link to="/">Lista pizz</Link>
          </li>
          <li className='navbar-element'>
            <Link to="/ingredients">Lista składników</Link>
          </li>
          <li className='navbar-element'>
            <Link to="/operations">Lista operacji</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<PizzaList />} />
        <Route path="/ingredients" element={<IngredientList />} />
        <Route path="/operations" element={<OperationList />} />
        <Route path="/pizzas/:pizzaId" element={<SinglePizza />} />
        <Route path="/ingredients/:ingredientId" element={<SingleIngredient />} />
        <Route path="/operations/:operationId" element={<SingleOperation />} />
      </Routes>
    </Router>
  );
}

export default App;
