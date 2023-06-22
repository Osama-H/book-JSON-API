const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    // eslint-disable-next-line eqeqeq
    const user = content.filter((ele) => ele.userId == id);
    if (!user.length) {
      throw new Error('not_found');
    }
    res.json({
      status: 'success',
      numOfBooks: user[0].books.length,
      user,
    });
  } catch (error) {
    switch (error.message) {
      case 'not_found':
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
