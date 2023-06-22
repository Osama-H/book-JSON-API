const fs = require('fs');
const allBooks = require('./utils/books');

const content = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

exports.createBook = async (req, res, next) => {
  const { bookName, userId, numOfPages } = req.body;
  // eslint-disable-next-line eqeqeq

  const newBooksWithArray = [];
  try {
    const user = content.filter((ele) => ele.userId == userId);

    // eslint-disable-next-line eqeqeq
    if (!user.length) {
      throw new Error('User_notFound');
    }
    const books = allBooks();
    const { length } = books;
    const id = length + 1;

    const newBook = {
      id,
      bookName,
      numOfPages,
    };

    user[0].books.push(newBook);
    const ids = user[0].userId;

    content.forEach((ele) => {
      if (ele.userId == ids) {
        newBooksWithArray.push(user[0]);
      } else {
        newBooksWithArray.push(ele);
      }
    });

    // res.send(newBooksWithArray);

    const jsonContent = JSON.stringify(newBooksWithArray);
    fs.writeFileSync('file.json', jsonContent, 'utf8');

    res.status(201).json({
      status: 'success',
      newBook,
    });
  } catch (error) {
    switch (error.message) {
      case 'User_notFound':
        res.status(404).json({
          status: 'fail',
          message: 'User Not Found',
        });

        break;
      default:
        next();
        break;
    }
  }
};
