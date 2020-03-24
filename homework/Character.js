const HANGUL_GA = '가'.codePointAt(0);
const HANGUL_HIH = '힣'.codePointAt(0);
const HANGUL_ONSET = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split('');
const HANGUL_NUCLEUS = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.split('');
const HANGUL_CODA = [''].concat('ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'.split(''));

exports.HANGUL_GA = HANGUL_GA;
exports.HANGUL_HIH = HANGUL_HIH;
exports.HANGUL_ONSET = HANGUL_ONSET;
exports.HANGUL_NUCLEUS = HANGUL_NUCLEUS;
exports.HANGUL_CODA = HANGUL_CODA;

class Character {
    constructor(value) {
        this._value = value.slice(0, 1);
        this._codePoint = value.codePointAt(0);
    }

    get value() {
        return this._value;
    }

    get codePoint() {
        return this._codePoint;
    }
}

class Hangul extends Character {
    constructor(value) {
        super(value);

        let base = value.codePointAt(0) - HANGUL_GA;

        this._onsetIndex = Math.floor(base / 588);
        this._nucleusIndex = Math.floor(base / 28) % 21;
        this._codaIndex = base % 28;
    }

    get isHangul() {
        return true;
    }

    get onset() {
        return HANGUL_ONSET[this._onsetIndex];
    }

    get nucleus() {
        return HANGUL_NUCLEUS[this._nucleusIndex];
    }

    get coda() {
        return HANGUL_CODA[this._codaIndex];
    }

    static assemble(onset, nucleus, coda = '') {
        // TODO 범위 체크
        return String.fromCodePoint(HANGUL_GA +
            (HANGUL_ONSET.indexOf(onset) * 588) +
            (HANGUL_NUCLEUS.indexOf(nucleus) * 28) +
            (HANGUL_CODA.indexOf(coda)));
    }

    static isHangul(character) {
        let codePoint = character.codePointAt(0);

        return codePoint >= HANGUL_GA && codePoint <= HANGUL_HIH;
    }
}

exports.resolveString = function(string) {
    return string.split('').map(character => {
        let isHangul = Hangul.isHangul(character);
        return isHangul ? new Hangul(character) : new Character(character);
    });
};

exports.Hangul = Hangul;
exports.Character = Character;