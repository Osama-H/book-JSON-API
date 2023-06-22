const router = require('express').Router();

const deleteBooks = require('./delete-my-books');

const users = require('./getUsers');
const user = require('./getUser');

router.delete('/my-books', deleteBooks.deleteMyBooks);
router.get('/', users.getAllUsers);
router.get('/:id', user.getUser);


module.exports = router;
