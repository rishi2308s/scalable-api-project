const express = require('express');
const { getTasks, createTask, deleteTask } = require('../controllers/taskController');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate'); // Import the validation middleware
const { taskSchema } = require('../validations/schemas'); // Import the task schema

const router = express.Router();

router.use(authenticate); 

router.get('/', getTasks);

router.post('/', validate(taskSchema), createTask); 

router.delete('/:id', authorize(['ADMIN']), deleteTask); 

module.exports = router;