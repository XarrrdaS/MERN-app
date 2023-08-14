import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleIngredient = () => {
  const { ingredientId } = useParams();
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    fetch(`/api/ingredients/${ingredientId}`)
      .then((response) => response.json())
      .then((data) => setIngredient(data));
  }, [ingredientId]);

  if (!ingredient) {
    return <h1>Ładowanie...</h1>;
  }

  return (
    <div>
      <h1>{ingredient.name}</h1>
      
      {ingredient.operations && ingredient.operations.length > 0 && (
        <div>
          <h2>Operacje:</h2>
          <ul>
            {ingredient.operations.map((operation) => (
              <li key={operation._id}>{operation.name}</li>
            ))}
          </ul>
        </div>
      )}

      {ingredient.pizzas && ingredient.pizzas.length > 0 && (
        <div>
          <h2>Pizze:</h2>
          <ul>
            {ingredient.pizzas.map((pizza) => (
              <li key={pizza._id}>{pizza.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleIngredient;
