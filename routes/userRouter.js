const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers);
router.route('/:id').get(userController.getUser);
router.route('/my-books/:userId').delete(userController.deleteMyBooks);

module.exports = router;
