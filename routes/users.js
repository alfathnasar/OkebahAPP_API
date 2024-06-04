const express = require('express');
const userController = require('../controller/users.js')

const router = express.Router();

router.get('/:email', userController.getUsers);
router.post('/', userController.createNewUser)
router.patch('/:username', userController.updateUser);
router.patch('/token/:email/:token', userController.updateUserToken);
router.patch('/resetpass/:username/:password', userController.updateUserPass);
router.delete('/:username', userController.deleteUser);

module.exports = router;
