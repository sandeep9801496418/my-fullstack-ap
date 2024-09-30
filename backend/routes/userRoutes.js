const express = require('express');
const {registerUser, loginUser, getAllUsers, updateUser, deleteUser} = require('../controllers/userController');
const authenticator = require('../middlewares/authenticator');
const validator = require('../middlewares/validator');
const userLogger = require('../middlewares/userLogger');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authenticator, validator, getAllUsers);
router.patch('/:username', authenticator, validator, updateUser);
router.delete('/:username', authenticator, validator, deleteUser);

module.exports = router;
