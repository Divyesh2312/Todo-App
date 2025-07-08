const TodoModel = require("../models/todo.model")
const Helper = require("../helper/index")
const niv = require("node-input-validator");


exports.createTodo = async (req, res) => {
  try {
    const validator = new niv.Validator(req.body, {
      title: "required|string",
      completed: "boolean"
    });

    const matched = await validator.check();
    if (!matched) {
      return res.status(400).json({ errors: validator.errors });
    }

    const todo = new TodoModel({
      ...req.body,
      userId: req.user.id
    });
    await todo.save();
    res.status(201).json({
      message: "Todo created successfully",
      todo
    });
  } catch (error) {
    Helper.writeErrorLog(req, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({userId: req.user.id})
    res.status(200).json(todos);
  } catch (error) {
    Helper.writeErrorLog(req, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


exports.updateTodo = async (req, res) => { 
  try {
    const { id } = req.params;
    const validator = new niv.Validator(req.body, {
      title: "string",
      completed: "boolean"
    });

    const matched = await validator.check();
    if (!matched) {
      return res.status(400).json({ errors: validator.errors });
    }

    const todo = await TodoModel.findByIdAndUpdate({_id:id, userId: req.user.id}, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    res.status(200).json({
      message: "Todo updated successfully",
      todo
   } );
  } catch (error) {
    Helper.writeErrorLog(req, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findByIdAndDelete({_id: id, userId: req.user.id});
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    Helper.writeErrorLog(req, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById({_id: id, userId: req.user.id});
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }   
    res.status(200).json(todo);
  } catch (error) {
    Helper.writeErrorLog(req, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}