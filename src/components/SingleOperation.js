import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleOperation = () => {
  const { operationId } = useParams();
  const [operation, setOperation] = useState(null);

  useEffect(() => {
    fetch(`/api/operations/${operationId}`)
      .then((response) => response.json())
      .then((data) => setOperation(data));
  }, [operationId]);

  if (!operation) {
    return <h1>Ładowanie...</h1>;
  }

  return (
    <div>
      <h1>{operation.name}</h1>
      
      {operation.ingredients && operation.ingredients.length > 0 && (
        <div>
          <h2>Składniki:</h2>
          <ul>
            {operation.ingredients.map((ingredient) => (
              <li key={ingredient._id}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
      )}

      {operation.pizzas && operation.pizzas.length > 0 && (
        <div>
          <h2>Pizze:</h2>
          <ul>
            {operation.pizzas.map((pizza) => (
              <li key={pizza._id}>{pizza.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SingleOperation;
