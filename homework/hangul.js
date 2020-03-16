const HANGUL_GA = '가'.codePointAt(0);
const HANGUL_HIH = '힣'.codePointAt(0);
const HANGUL_ONSET = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split('');
const HANGUL_NUCLEUS = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.split('');
const HANGUL_CODA = [''].concat('ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅊㅋㅌㅎ'.split(''));

class HangulSyllable {
    constructor(hangul) {
        this.hangul = hangul;
        this.codePoint = hangul.codePointAt(0);
        
        let base = this.codePoint - HANGUL_GA;

        this.onsetIndex = Math.floor(base / 588);
        this.nucleusIndex = Math.floor(base / 28) % 21;
        this.codaIndex = base % 28;
    }

    getOnset() {
        return HANGUL_ONSET[this.onsetIndex];
    }

    getNucleus() {
        return HANGUL_NUCLEUS[this.nucleusIndex];
    }

    getCoda() {
        return HANGUL_CODA[this.codaIndex];
    }

    static allOnset() { return HANGUL_ONSETS; }
    static allNucleus() { return HANGUL_NUCLEUS; }
    static allCoda() { return HANGUL_CODA; }

    static assemble(onset, nucleus, coda) {
        // TODO 범위 체크
        return String.fromCodePoint(HANGUL_GA +
            HANGUL_ONSET.indexOf(onset) * 588 +
            HANGUL_NUCLEUS.indexOf(nucleus) * 21 +
            HANGUL_CODA.indexOf(coda));
    }
}

function isHangul(codePoint) {
    return HANGUL_GA <= codePoint && codePoint <= HANGUL_HIH;
}

function getOnsetIfHangul(character) {
    let codePoint = character.codePointAt(0);

    // 한글이 아니면 그대로 반환
    if(!isHangul(codePoint)) return character;
    
    index = Math.floor((codePoint - HANGUL_GA) / 588);
    return HANGUL_ONSETS[index];
}

function getOnset(text) {
    // string 여부 체크
    if(typeof text !== 'string') {
        throw Error('string에 대해서만 처리할 수 있습니다.');
    }

    let onsets = [];

    for(const character of text) {
        onsets.push(getOnsetIfHangul(character));
    }

    return onsets.join('');
}

console.log(getOnset('안녕하세요? Hello! 내 이름은'));
console.log(getOnset('가깋나닣하힣'));
try {
    getOnset(123);
} catch(e) {
    console.error(e.message);
}