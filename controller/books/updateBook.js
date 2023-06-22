/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const allBooks = require('./utils/books');

const content = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

exports.updateBook = (req, res, next) => {
  const { id } = req.params;
  const { userIds } = req.body; // Who need to do this action, Must be an admin or the book writer

  const finalBooks = [];

  try {
    const user = content.filter((ele) => ele.userId == userIds);
    const foundBook = allBooks().filter((ele) => ele.id == id);
    if (!foundBook.length) {
      throw new Error('No_Book_Found');
    }
    const { name, pages } = req.body;

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const con of content) {
      // const bookLength = con.books.length;
      for (const book of con.books) {
        // eslint-disable-next-line eqeqeq
        if (
          (book.id == id && con.userId == userIds) ||
          user[0].role == 'admin'
        ) {
          if (name) {
            book.bookName = name;
          }
          if (pages) {
            book.numOfPages = pages;
          }
        }
      }
      finalBooks.push(con);
    }

    const jsonContent = JSON.stringify(finalBooks);
    fs.writeFileSync('file.json', jsonContent, 'utf8');

    res.json({
      status: 'success',
      message: 'Updated Successfully',
    });
  } catch (error) {
    switch (error.message) {
      case 'No_Book_Found':
        res.status(404).json({
          message: 'Book Not Found',
        });
        break;
      default:
        next();
        break;
    }
  }
};
