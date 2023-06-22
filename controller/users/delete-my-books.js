const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

exports.deleteMyBooks = async (req, res, next) => {
  const { userIds } = req.body;
  const finalUsAndBo = [];

  try {
    // eslint-disable-next-line eqeqeq
    const user = content.filter((ele) => ele.userId == userIds);

    if (!user.length) {
      throw new Error('NO_User');
    }

    for (const con of content) {
      if (con.userId != userIds) {
        finalUsAndBo.push(con);
      } else {
        finalUsAndBo.push({ ...con, books: [] });
      }
    }

    const jsonContent = JSON.stringify(finalUsAndBo);
    fs.writeFileSync('file.json', jsonContent, 'utf8');

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    // eslint-disable-next-line default-case
    switch (error.name) {
      case 'NO_User':
        res.status(404).json({
          status: 'success',
          message: 'No User Found With this ID',
        });
        break;

      default:
        next();
        break;
    }
  }
};
