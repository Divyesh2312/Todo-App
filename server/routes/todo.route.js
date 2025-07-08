const express = require('express');
const TodoController = require("../controller/todo.controller");
const UserCheckAuth = require("../middleware/user-check-auth")

const router = express.Router();

router.get('/list',UserCheckAuth, TodoController.getTodos);
router.post('/add',UserCheckAuth, TodoController.createTodo);
router.put('/update/:id',UserCheckAuth, TodoController.updateTodo);
router.delete('/delete/:id',UserCheckAuth, TodoController.deleteTodo);
router.get("/detail/:id",UserCheckAuth, TodoController.getTodoById);

module.exports = router;