const router = require('express').Router();

// const list = require('./list');
const add = require('./addBook');
const book = require('./getBooks-by-id');
const remove = require('./deleteBook');
const books = require('./getBooks');
const update = require('./updateBook');
const authorBooks = require('./getBooks-by-author');

router.route('/').get(books.getAllBooks).post(add.createBook);

router
  .route('/:id')
  .delete(remove.deleteBook)
  .get(book.getBook)
  .patch(update.updateBook);

router.get('/author/:authorId', authorBooks.getBookBasedOnAuthor); // get books based on an author

module.exports = router;
