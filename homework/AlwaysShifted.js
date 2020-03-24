const { Hangul,
    HANGUL_ONSET: ONSET,
    HANGUL_NUCLEUS: NUCLEUS,
    HANGUL_CODA: CODA } = require('./Character');
const { replace } = require('./CharacterReplacer');

/*
ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.split('');
const HANGUL_CODA = [''].concat('ㄱㄴㄷㄹㅁㅂㅃㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'.split(''));
*/
const shifted = {
    'ㅏ': 'ㅏ',
    'ㅐ': 'ㅒ',
    'ㅑ': 'ㅑ',
    'ㅒ': 'ㅒ',
    'ㅓ': 'ㅓ',
    'ㅔ': 'ㅖ',
    'ㅕ': 'ㅕ',
    'ㅖ': 'ㅖ',
    'ㅗ': 'ㅗ',
    'ㅘ': 'ㅘ',
    'ㅙ': 'ㅗㅒ',
    'ㅚ': 'ㅚ',
    'ㅛ': 'ㅛ',
    'ㅜ': 'ㅜ',
    'ㅝ': 'ㅝ',
    'ㅞ': 'ㅜㅖ',
    'ㅟ': 'ㅟ',
    'ㅠ': 'ㅠ',
    'ㅡ': 'ㅡ',
    'ㅢ': 'ㅢ',
    'ㅣ': 'ㅣ',
    'ㄱ': 'ㄲ',
    'ㄲ': 'ㄲ',
    'ㄴ': 'ㄴ',
    'ㄳ': 'ㄲㅆ',
    'ㄵ': 'ㄴㅉ',
    'ㄶ': 'ㄶ',
    'ㄷ': 'ㄸ',
    'ㄸ': 'ㄸ',
    'ㄹ': 'ㄹ',
    'ㄺ': 'ㄹㄲ',
    'ㄻ': 'ㄻ',
    'ㄼ': 'ㄹㅃ',
    'ㄽ': 'ㄹㅆ',
    'ㄾ': 'ㄾ',
    'ㄿ': 'ㄿ',
    'ㅀ': 'ㅀ',
    'ㅁ': 'ㅁ',
    'ㅂ': 'ㅃ',
    'ㅃ': 'ㅃ',
    'ㅄ': 'ㅃㅆ',
    'ㅅ': 'ㅆ',
    'ㅆ': 'ㅆ',
    'ㅇ': 'ㅇ',
    'ㅈ': 'ㅉ',
    'ㅉ': 'ㅉ',
    'ㅊ': 'ㅊ',
    'ㅋ': 'ㅋ',
    'ㅌ': 'ㅌ',
    'ㅍ': 'ㅍ',
    'ㅎ': 'ㅎ',
    '₩': '~',
    '`': '~',
    '1': '!',
    '2': '@',
    '3': '#',
    '4': '$',
    '5': '%',
    '6': '^',
    '7': '&',
    '8': '*',
    '9': '(',
    '0': ')',
    '-': '_',
    '=': '+',
    '[': '{',
    ']': '}',
    '\\': '|',
    ';': ':',
    "'": '"',
    ',': '<',
    '.': '>',
    '/': '?',
    '': '',
}
exports.shift = function(text) {
    let step1 = replace(text, 
        (tool, character, onset, nucleus, coda) => {
            // 일단 시프트 시키기
            return shifted[onset] + shifted[nucleus] + shifted[coda];
        },
        (tool, character) => {
            let first = character.value.toUpperCase();

            return shifted[first] || first;
        });

    let result = '';
    let array = [];

    for(let i = 0; i < step1.length ; i++) {
        let c = step1[i];
        
        if(array.length == 0) {
            if(ONSET.indexOf(c) != -1) {
                array.push(c);
                continue;
            } else {
                result = result + c;
                continue;
            }
        }

        if(array.length == 1) {
            if(NUCLEUS.indexOf(c) != -1) {
                array.push(c);
                continue;
            } else {
                result = result + array[0];
                i--;
                array = [];
                continue;
            }
        }

        if(array.length = 2) {
            if(CODA.indexOf(c) != -1) {
                // 종성 위치 가능
                if(i < step1.length && NUCLEUS.indexOf(step1[i + 1]) != -1) {
                    // 다음 글자가 중성인 경우 해당 중성과 조합되어야 함.
                    result = result + Hangul.assemble(...array);
                    array = [c];
                } else {
                    // 다음 글자가 중성이 아닌 경우 종성 붙이고 assemble
                    array.push(c);
                    result = result + Hangul.assemble(...array);
                    array = [];
                }
            } else {
                result = result + Hangul.assemble(...array) + c;
                array = [];
            }
        }
    }

    // array에 남은 글자 처리
    if(array.length > 0) {
        if(array.length == 1) {
            result += array[0];
        } else {
            result += Hangul.assemble(...array);
        }
    }

    return result;
}

