const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

exports.getBookBasedOnAuthor = (req, res, next) => {
  const { authorId } = req.params;
  try {
    // eslint-disable-next-line eqeqeq
    const user = content.filter((ele) => ele.userId == authorId);
    if (!user.length) {
      throw new Error('Not_Found');
    }

    res.status(200).json({
      status: 'success',
      numOfBooks: user[0].books,
    });
  } catch (error) {
    switch (error.message) {
      case 'Not_Found':
        res.status(404).json({
          status: 'success',
          message: 'User Not Found',
        });
        break;

      default:
        next();
        break;
    }
  }
};
