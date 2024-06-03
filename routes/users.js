const express = require('express');
const userController = require('../controller/users.js')

const router = express.Router();

router.get('/:username', userController.getUsers);
router.post('/', userController.createNewUser)
router.patch('/:username', userController.updateUser);
router.patch('/token/:username/:token', userController.updateUserToken);
router.patch('/resetpassword/:username/:password', userController.updateUserPass);
router.delete('/:username', userController.deleteUser);

module.exports = router;
