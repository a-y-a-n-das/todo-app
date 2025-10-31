const express = require('express');
const router = express.Router();
const { getTodos, addTodo, deleteTodo, completeTodo } = require('../controllers/todoControllers');


router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/', deleteTodo);
router.patch('/', completeTodo);

module.exports = router;
