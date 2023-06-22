const router = require('express').Router();

const books = require('./controller/books');
const users = require('./controller/users');

router.use('/books', books);
router.use('/users', users);

// router.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).send({
//     message: 'Please contact support',
//   });
// });

module.exports = router;
