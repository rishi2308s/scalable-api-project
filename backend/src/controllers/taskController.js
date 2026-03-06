const prisma = require('../db');

exports.getTasks = async (req, res) => {
  const tasks = req.user.role === 'ADMIN' 
    ? await prisma.task.findMany() 
    : await prisma.task.findMany({ where: { userId: req.user.id } });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await prisma.task.create({
    data: { title, description, userId: req.user.id }
  });
  res.status(201).json(task);
};

exports.deleteTask = async (req, res) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(404).json({ message: "Task not found" });
  }
};