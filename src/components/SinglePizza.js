import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SinglePizza = () => {
  const { pizzaId } = useParams();
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    fetch(`/api/pizzas/${pizzaId}`)
      .then((response) => response.json())
      .then((data) => setPizza(data));
  }, [pizzaId]);

  if (!pizza) {
    return <h1>Ładowanie...</h1>;
  }

  return (
    <div>
      <h1>{pizza.name}</h1>
      
      {pizza.ingredients && pizza.ingredients.length > 0 && (
        <div>
          <h2>Składniki:</h2>
          <ul>
            {pizza.ingredients.map((ingredient) => (
              <li key={ingredient._id}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
      )}

      {pizza.operations && pizza.operations.length > 0 && (
        <div>
          <h2>Operacje:</h2>
          <ul>
            {pizza.operations.map((operation) => (
              <li key={operation._id} >{operation.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SinglePizza;
