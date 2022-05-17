const express = require("express");
const { Op } = require("sequelize"); // wildcard operator

const Todo = require("../models/Todo");

const router = express.Router();

var { isLogin } = require("./is_login"); //middleware

router.get("/todos", isLogin, async (req, res) => {
  try {
    const todos = await Todo.findAll();

    res.status(200).json({
      is_ok: true,
      message: "Todos succesfully fetched!",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
    console.log(error);
  }
});

router.get("/todos/:ilikeTodos", isLogin, async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        todo: {
          [Op.iLike]: `%${req.params.ilikeTodos}%`,
        },
      },
    });

    res.status(200).json({
      is_ok: true,
      message: "Todos succesfully fetched",
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      is_ok: false,
      message: "Internal server error",
    });
    console.log(err);
  }
});

router.get("/todo/:todoId", isLogin, async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findByPk(todoId);

    res.status(200).json({
      is_ok: true,
      message: `Todo with id ${todoId} succesfully fetched!`,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal server error",
    });
    console.log(error);
  }
});

router.post("/todos", isLogin, async (req, res) => {
  try {
    const { todo } = req.body;
    const { level } = req.body;

    const newTodo = await Todo.create({
      todo: todo,
      level: level,
      is_done: false,
    });

    res.status(200).json({
      is_ok: true,
      message: "New todo added in the list",
      data: newTodo,
    });
  } catch (err) {
    res.status(500).json({
      is_ok: false,
      message: "Internal server error",
    });
    console.log(err);
  }
});

router.put("/todo/:todoId", isLogin, async (req, res) => {
  try {
    const { todoId } = req.params;
    const selectedTodo = await Todo.findByPk(todoId);

    selectedTodo.set({ ...req.body });

    selectedTodo.save();

    res.status(200).json({
      ok: true,
      message: `Todo with id ${todoId} has been updated`,
      data: selectedTodo,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal Server Error",
    });
    console.log(error);
  }
});

router.delete("/todo/:todoId", isLogin, async (req, res) => {
  try {
    const { todoId } = req.params;

    const selectedTodo = await Todo.findByPk(todoId);

    selectedTodo.destroy();

    res.status(200).json({
      ok: true,
      message: `Todo with id ${todoId} has been deleted`,
      data: selectedTodo,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Internal Server Error",
    });
    console.log(error);
  }
});

module.exports = router;
