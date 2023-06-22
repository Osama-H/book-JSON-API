const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

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
  res.json({
    status: 'success',
    users,
  });
};
