const express = require('express');
const { register, login } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { authSchema } = require('../validations/schemas');
const router = express.Router();

router.post('/register', validate(authSchema), register);
router.post('/login', validate(authSchema), login);

module.exports = router;