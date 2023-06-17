const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

// exports.deleteMyBooks = (req, res) => {
//   const { userId } = req.params;

//   const user = content.filter((ele) => ele.userId == userId);

//   if (!user.length) {
//     return res.status(404).json({
//       status: 'success',
//       message: 'No User Found With this ID',
//     });
//   }

//   for (let i = 0; i < content.length; i++) {
//     if (content[i].userId == userId) {
//       content[i].books = [];
//     }
//   }

//   const jsonContent = JSON.stringify(content);
//   fs.writeFileSync('file.json', jsonContent, 'utf8');

//   res.send(user);
// };

exports.deleteMyBooks = (req, res) => {
  const { userId } = req.params;

  const user = content.filter((ele) => ele.userId == userId);

  if (!user.length) {
    return res.status(404).json({
      status: 'success',
      message: 'No User Found With this ID',
    });
  }

  const deleteBooks = (ele) => {
    if (ele.userId == userId) {
      ele.books = [];
    }
  };

  content.map(deleteBooks);

  const jsonContent = JSON.stringify(content);
  fs.writeFileSync('file.json', jsonContent, 'utf8');

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAge = (birthDate) =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

const getName = (fullName) => {
  const name = fullName.split(' ');
  return `${name[0]} ${name[1][0]}.`;
};

exports.getAllUsers = (req, res) => {
  const users = [];

  // eslint-disable-next-line array-callback-return
  content.map((ele) => {
    users.push({
      Name: getName(ele.name),
      Age: getAge(ele.birthDate),
      Role: ele.role,
    });
  });

  res.status(200).json({
    status: 'success',
    users,
  });
};

exports.getUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  // eslint-disable-next-line array-callback-return

  const user = content.filter((ele) => ele.userId == id);

  if (user.length == 0) {
    return res.status(404).json({
      status: 'success',
      message: 'No User Found with this ID',
    });
  }

  res.status(200).json({
    status: 'success',
    numOfBooks: user[0].books.length,
    user,
  });
};
