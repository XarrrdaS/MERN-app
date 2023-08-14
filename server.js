const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Kacper-task:IFJRDrJXT3SI8bL0@task-app.aztrgnj.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Pizza = mongoose.model('Pizza', {
  name: String,
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  operations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Operation' }],
});

const Ingredient = mongoose.model('Ingredient', {
  name: String,
  operations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Operation' }],
  pizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' }],
});

const Operation = mongoose.model('Operation', {
  name: String,
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
  pizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' }],
});

app.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/pizzas', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/ingredients', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/operations', async (req, res) => {
  try {
    const operations = await Operation.find();
    res.json(operations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/pizzas/:pizzaId', async (req, res) => {
  try {
    const pizzaId = req.params.pizzaId;
    const pizza = await Pizza.findById(pizzaId)
      .populate('ingredients')
      .populate('operations')
      .exec();

    if (!pizza) {
      return res.status(404).json({ message: 'Pizza not found' });
    }

    res.json(pizza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/operations/:operationId', async (req, res) => {
  try {
    const operationId = req.params.operationId;
    const operation = await Operation.findById(operationId)
      .populate('ingredients')
      .populate('pizzas')
      .exec();

    if (!operation) {
      return res.status(404).json({ message: 'Pizza not found' });
    }

    res.json(operation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/ingredients/:ingredientId', async (req, res) => {
  try {
    const ingredientId = req.params.ingredientId;
    const ingredient = await Ingredient.findById(ingredientId)
      .populate('operations')
      .populate('pizzas')
      .exec();

    if (!ingredient) {
      return res.status(404).json({ message: 'Pizza not found' });
    }

    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/*', async (req, res) => {
  try {
    const response = await axios.get(`http://localhost:5000${req.url}`);
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
