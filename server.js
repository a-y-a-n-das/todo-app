const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoroutes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Server running...');
});

app.listen(3000, () => console.log('Server started on port 3000'));

