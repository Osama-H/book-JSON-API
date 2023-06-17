const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

const allBooks = () => {
  let len;
  const bigArray = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < content.length; i++) {
    len = content[i].books.length;

    if (len >= 2) {
      // eslint-disable-next-line no-plusplus
      for (let j = 0; j < len; j++) {
        bigArray.push(content[i].books[j]);
      }
    } else {
      bigArray.push(content[i].books[0]);
    }
  }
  return bigArray;
};

// Get all Books
exports.getAllBooks = (req, res) => {
  const books = allBooks();
  res.send(books);
};

// Get Book by ID
exports.getBook = (req, res) => {
  const bookId = req.params.id;
  const books = allBooks();
  // eslint-disable-next-line eqeqeq
  const book = books.filter((ele) => ele.id == bookId);
  if (book.length === 0) {
    return res.status(404).json({
      status: 'success',
      message: 'Book Not Found',
    });
  }
  res.status(200).json({
    status: 'success',
    book,
  });
};

// Add Book
exports.createBook = (req, res) => {
  const { bookName, userId, authorName } = req.body;
  const books = allBooks();
  const { length } = books;
  const id = length + 1;
  const newBook = {
    userId,
    name: authorName,
    books: [
      {
        id,
        bookName,
      },
    ],
  };

  content.push(newBook);
  res.send(newBook);
  const jsonContent = JSON.stringify(content);
  fs.writeFileSync('file.json', jsonContent, 'utf8');
  res.status(201).json({
    status: 'success',
    newBook,
  });
};

// Delete Book
exports.deleteBook = (req, res) => {
  const { id } = req.params;
  const { userIds } = req.body; // Who need to do this action, Must be an admin or the book writer

  const finalBooks = [];

  const user = content.filter((ele) => ele.userId === userIds);

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < content.length; i++) {
    if (
      content[i].books[0].id != id ||
      content[i].userId != userIds ||
      user[0].role === 'admin'
    ) {
      finalBooks.push(content[i]);
    }
  }

  const jsonContent = JSON.stringify(finalBooks);
  fs.writeFileSync('file.json', jsonContent, 'utf8');
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// Get all books for specific author
exports.getBookBasedOnAuthor = (req, res) => {
  const { authorId } = req.params;

  // const allBooks = [];
  // eslint-disable-next-line no-plusplus
  // for (let i = 0; i < content.length; i++) {
  //   if (content[i].userId === authorId) {
  //     allBooks.push(content[i].books);
  //   }
  // }
  const user = content.filter((ele) => ele.userId == authorId);
  if (user.length == 0) {
    return res.status(404).json({
      status: 'success',
      message: 'No User Found with this ID',
    });
  }
  res.status(200).json({
    status: 'success',
    numOfBooks: user[0].books,
  });
};

exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { userIds } = req.body; // Who need to do this action, Must be an admin or the book writer

  const finalBooks = [];

  const user = content.filter((ele) => ele.userId === userIds);

  const { name, pages } = req.body;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < content.length; i++) {
    if (
      content[i].books[0].id == id ||
      content[i].userId == userIds ||
      user[0].role == 'admin'
    ) {
      if (name) {
        content[i].books[0].bookName = name;
      }

      if (pages) {
        content[i].books[0].numOfPages = pages;
      }

      finalBooks.push(content[i]);
    } else {
      finalBooks.push(content[i]);
    }
  }

  const jsonContent = JSON.stringify(finalBooks);
  fs.writeFileSync('file.json', jsonContent, 'utf8');
  res.status(200).json({
    status: 'success',
    message: 'Book Updated Successfully',
  });
};

// Update book name

// exports.updateBook = (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const { userIds } = req.body;

//   const finalBooks = [];

//   const user = content.filter((ele) => ele.userId === userIds);

//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < content.length; i++) {
//     if (
//       content[i].books[0].id == id ||
//       content[i].userId == userIds ||
//       user[0].role == 'admin'
//     ) {
//       content[i].books[0].bookName = name;
//       finalBooks.push(content[i]);
//     } else {
//       finalBooks.push(content[i]);
//     }
//   }

//   const jsonContent = JSON.stringify(finalBooks);
//   fs.writeFileSync('file.json', jsonContent, 'utf8');
//   res.send('Book updated successfully');
// };
