const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./file.json', 'utf8'));

const allBooks = () => {
  const bigArray = [];

  for (const con of content) {
    for (const book of con.books) {
      bigArray.push(book);
    }
  }
  return bigArray;
};
module.exports = allBooks;
