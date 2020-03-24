const { resolveString: resolve, Hangul, Character } = require('./Character');

const SERO = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅣ';

const tool = {
    isHangul: (character) => character.isHangul,
    isNoCoda: (character) => character.coda == '',
    isSero: (character) => SERO.indexOf(character.nucleus) != -1
}
exports.replace = function(text, hangulMapper, restMapper) {
    let resolved = resolve(text);

    return resolved.map(character => {
        if(tool.isHangul(character)) {
            const { onset, nucleus, coda } = character;
            return hangulMapper(tool, character, onset, nucleus, coda);
        } else {
            return restMapper(tool, character);
        }
    }).join('');
}