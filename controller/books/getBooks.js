const allBooks = require('./utils/books');

exports.getAllBooks = (req, res) => {
  const books = allBooks();
  res.json({
    books,
  });
};
