const path = require('path');

const string = __filename;
console.log(string);
console.log(path.basename(string, path.extname(string)));

console.log(path.parse(string));