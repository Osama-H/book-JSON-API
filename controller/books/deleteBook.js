const fs = require('fs');
const allBooks = require('./utils/books');

const content = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

exports.deleteBook = (req, res, next) => {
  const { id } = req.params;
  const { userIds } = req.body; // Who needs to do this action, Must be an admin or the book writer

  const finalContent = [];

  try {
    const user = content.filter((ele) => ele.userId == userIds);

    const foundBook = content.find((ele) =>
      ele.books.some((book) => book.id == id)
    );

    if (!foundBook) {
      throw new Error('Book_notFound');
    }

    for (const con of content) {
      if (con.userId != userIds && user[0].role != 'admin') {
        finalContent.push(con);
      } else {
        const updatedBooks = con.books.filter((book) => book.id != id);
        finalContent.push({ ...con, books: updatedBooks });
      }
    }

    const jsonContent = JSON.stringify(finalContent);
    fs.writeFileSync('file.json', jsonContent, 'utf8');
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    switch (error.message) {
      case 'Book_notFound':
        res.status(404).json({
          status: 'success',
          message: error.message,
        });
        break;
      default:
        next();
        break;
    }
  }
};

// exports.deleteBook = (req, res, next) => {
//   const { id } = req.params;
//   const { userIds } = req.body; // Who need to do this action, Must be an admin or the book writer

//   const finalBooks = [];

//   try {
//     // eslint-disable-next-line eqeqeq
//     const user = content.filter((ele) => ele.userId == userIds);

//     const foundBook = allBooks().filter((ele) => ele.id == id);

//     if (!foundBook.length) {
//       throw new Error('Book_notFound');
//     }

//     // eslint-disable-next-line no-restricted-syntax
//     for (const con of content) {
//       for (const book of con.books) {
//         if (
//           (book.id != id && con.userId != userIds) ||
//           user[0].role != 'admin'
//         ) {
//           finalBooks.push(con);
//           break;
//         }
//       }
//     }
//     const jsonContent = JSON.stringify(finalBooks);
//     fs.writeFileSync('file.json', jsonContent, 'utf8');
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   } catch (error) {
//     switch (error.message) {
//       case 'Book_notFound':
//         res.status(404).json({
//           status: 'success',
//           message: error.message,
//         });
//         break;
//       default:
//         next();
//         break;
//     }
//   }
// };
