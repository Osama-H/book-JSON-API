const express = require('express');

const router = express.Router();

const bookController = require('../controller/bookController');

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);
router
  .route('/:id')
  .get(bookController.getBook)
  .delete(bookController.deleteBook)
  .patch(bookController.updateBook);

router.route('/author/:authorId').get(bookController.getBookBasedOnAuthor);

// router.route('/date/:startdate').get(bookController.getBooksBasedOnDate);

module.exports = router;
