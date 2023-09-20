import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const IngredientList = () => {
  const [ingredients, setIngredient] = useState([]);

  useEffect(() => {
    fetch('/api/ingredients')
      .then((response) => response.json())
      .then((data) => setIngredient(data))
      .catch((error) => console.error('Error fetching pizzas:', error));
  }, []);

  return (
    <div>
      <h2>Lista składników</h2>
      <div className="pizza-container">
        {ingredients.map((ingredient) => (
          <Link to={`/ingredients/${ingredient._id}`} className="link-styling" key={ingredient._id}>
            <div className="pizza-tile">
              <h3>{ingredient.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IngredientList;
