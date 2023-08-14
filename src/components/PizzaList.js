import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('/api/pizzas')
      .then((response) => response.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error('Error fetching pizzas:', error));
  }, []);

  return (
    <div>
      <h2>Lista pizz</h2>
      <div className="pizza-container">
        {pizzas.map((pizza) => (
          <Link to={`/pizzas/${pizza._id}`} className="link-styling" key={pizza._id}>
            <div className="pizza-tile">
              <h3>{pizza.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
