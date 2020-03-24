const { resolveString } = require('./Character');

// ㅇㅏㄴㄴㅕㅇㅎㅏ
let resolved = resolveString('abcd안녕하세요')
    .map(character => character.isHangul ? character.onset : character.value);

console.dir(resolved);

let hangul = resolveString('안녕하세요')
    .map(hangul => hangul.onset + hangul.nucleus + hangul.coda)
    .join('');

console.log(hangul);