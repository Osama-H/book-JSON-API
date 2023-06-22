const allBooks = require('./utils/books');

exports.getBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const books = allBooks();
    // eslint-disable-next-line eqeqeq
    const book = books.filter((ele) => ele.id == id);


    // eslint-disable-next-line eqeqeq
    if (!book.length) {
      throw new Error('NO_BOOKS');
    }

    return res.json({
      status: 'success',
      book,
    });
  } catch (error) {
    switch (error.message) {
      case 'NO_BOOKS':
        res.status(404).json({
          status: 'success',
          message: 'Book Not Found',
        });
        break;

      default:
        next();
        break;
    }
  }
};
