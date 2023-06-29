const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../utils/ctrlWrapper");
const { Task } = require("../models/task");

const taskInMonth = async (req, res) => {
  const { month, year } = req.body;
  const result = await Task.find({ month: month, year: year });
  if (result.length === 0) {
    throw HttpError(404, `Not found`);
  } else {
    res.status(200).json(result);
  }
};

const removeTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Task.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: `Task not found` });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addTask = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Task.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateTaskById = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  if (JSON.stringify(req.body) === "{}") {
    throw HttpError(400, "missing fields");
  }
  res.json(result);
};

module.exports = {
  taskInMonth: ctrlWrapper(taskInMonth),
  removeTask: ctrlWrapper(removeTask),
  addTask: ctrlWrapper(addTask),
  updateTaskById: ctrlWrapper(updateTaskById),
};
