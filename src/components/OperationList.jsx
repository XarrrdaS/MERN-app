import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const OperationList = () => {
  const [operations, setOperation] = useState([]);

  useEffect(() => {
    fetch('/api/operations')
      .then((response) => response.json())
      .then((data) => setOperation(data))
      .catch((error) => console.error('Error fetching pizzas:', error));
  }, []);

  return (
    <div>
      <h2>Lista Operacji</h2>
      <div className="pizza-container">
        {operations.map((operation) => (
          <Link to={`/operations/${operation._id}`} className="link-styling" key={operation._id}>
            <div className="pizza-tile">
              <h3>{operation.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OperationList;
