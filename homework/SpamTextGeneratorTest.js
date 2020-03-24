const { generateSpam } = require('./SpamTextGenerator');
const AlwaysShifted = require('./AlwaysShifted');

// let spam = generateSpam('안녕하세요. 저는 nnoco입니다. 만나서 반갑따리');
let spam = generateSpam('단돈 3만 9천 900원에 모십니다!');
let shiftedSpam = generateSpam(AlwaysShifted.shift('단돈 3만 9천 900원에 모십니다!', false));
console.log(spam);
console.log(shiftedSpam);