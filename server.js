const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoroutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


app.use(cors());
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




