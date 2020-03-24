const { resolveString: resolve } = require('./Character');

const SERO = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅣ';

const map = {
    'ㄱ': ['ㄱ', '㉠'],
    'ㄲ': ['ㄲ', 'ㄱㄱ', '㉠㉠'],
    'ㄴ': ['ㄴ', '㉡'],
    'ㄷ': ['ㄷ', '㉢'],
    'ㄸ': ['ㄸ', 'ㄷㄷ'],
    'ㄹ': ['ㄹ', '㉣'],
    'ㅁ': ['ㅁ', '㉤', '□', '■', '▒', '▤', '▥', '▨', '▧', '▦', '▩'],
    'ㅂ': ['ㅂ', '㉥'],
    'ㅃ': ['ㅃ', 'ㅂㅂ', '㉥㉥'],
    'ㅅ': ['ㅅ', '∧', '^', '㉦', 'Λ'],
    'ㅆ': ['ㅆ', 'ㅅㅅ', '^^', 'ΛΛ'],
    'ㅇ': ['ㅇ', '㉧', '◐', '◑', '○', '●', '◎', '⊙', 'ㆁ'],
    'ㅈ': ['ㅈ', '㉨', 'ス', 'ズ'],
    'ㅉ': ['ㅉ', 'ㅈㅈ', '㉨㉨'],
    'ㅊ': ['ㅊ', '㉩', 'ぇ', 'え'],
    'ㅋ': ['ㅋ', '㉪', 'コ', 'ゴ', 'ヲ'],
    'ㅌ': ['ㅌ', '㉫', '∈'],
    'ㅍ': ['ㅍ', '㉬', '立'],
    'ㅎ': ['ㅎ', '㉭'],
    'ㅏ': ['ㅏ', 'r', '├', '┞', '┟', '┡', '┢'],
    'ㅐ': ['ㅐ', 'H'],
    'ㅑ': ['ㅑ', 'F'],
    'ㅒ': ['ㅒ', 'Ħ'],
    'ㅓ': ['ㅓ', '┫', '┨', '┦', '┧', '┩', '┪'],
    'ㅔ': ['ㅔ'],
    'ㅕ': ['ㅕ'],
    'ㅖ': ['ㅖ', 'ㅕㅣ'],
    'ㅣ': ['ㅣ', 'l', 'I', '|', 'i'],

    '랑': ['랑', 'ㄹ5'],
    '그': ['그', 'ュ', 'ユ'],
    'a': ['a', 'A', 'α'], 
    'b': ['b', 'B'], 
    'c': ['c', 'C'], 
    'd': ['d', 'D', 'Ð'], 
    'e': ['e', 'E', 'Ё'], 
    'f': ['f', 'F'], 
    'g': ['g', 'G'], 
    'h': ['h', 'H', 'ㅐ'], 
    'i': ['i', 'I'], 
    'j': ['j', 'J'], 
    'k': ['k', 'K'], 
    'l': ['l', 'L'], 
    'm': ['m', 'M'], 
    'n': ['n', 'N'], 
    'o': ['o', 'O'], 
    'p': ['p', 'P', 'ρ'], 
    'q': ['q', 'Q'], 
    'r': ['r', 'R'], 
    's': ['s', 'S'], 
    't': ['t', 'T'], 
    'u': ['u', 'U'], 
    'v': ['v', 'V'], 
    'w': ['w', 'W', 'ω'], 
    'x': ['x', 'X'], 
    'y': ['y', 'Y'], 
    'z': ['z', 'Z'], 
    '1': ['1', '¹', '₁' ,'⑴', '①'], 
    '2': ['2', '²', '₂' ,'⑵', '②'], 
    '3': ['3', '³', '₃' ,'⑶', '③', 'З'], 
    '4': ['4', '⁴', '₄' ,'⑷', '④'], 
    '5': ['5', '⑸', '⑤'], 
    '6': ['6', '⑹', '⑥'], 
    '7': ['7', '⑺', '⑦'], 
    '8': ['8', '⑻', '⑧'], 
    '9': ['9', '⑼', '⑨'], 
    '0': ['0', 'O', 'Ο', 'Θ', 'θ'], 

    ' ': ['♨', '☏', '☎', '☜', '☞', '♤', '♠', '♡', '♥', '♧', '⊙', '♩', '♪', '♬', '㉿', '☆', '★', '♂', '♀', '※'],
}

function isHangulAndNoCodaAndSero(character) {
    return character.isHangul
        && character.coda == ''
        && SERO.indexOf(character.nucleus) != -1;
}

function random(array) {
    let index = Math.min(Math.floor(Math.random() * array.length), array.length - 1);

    return array[index];
}

exports.generateSpam = function(text, randomSpecial = true) {
    let resolved = resolve(text);

    return resolved.map(character => {
        // 한글이고, 받침 없는 경우
        let step = Math.random() > 0.7 && randomSpecial ? random(map[' ']) : '';
        if(isHangulAndNoCodaAndSero(character)) {
            let onset = map[character.onset];
            let nucleus = map[character.nucleus];

            step += random(onset) + random(nucleus);
        } else {
            let array = map[character.value.toLowerCase()] || [character.value];
            step += random(array);
        }
        return step;
    }).join('');
}