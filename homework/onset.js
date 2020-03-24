/*
- 문자열이 인자로 전달됩니다. -> word 파라미터
- undefined, null, 문자열이 아닌 타입이 인자로 전달되는 경우 오류를 발생시킵니다(throw 구문 활용)
- 문자열이 입력되는 경우 아래와 같이 반환
    - 완성된 한글(초성, 중성, 종성-받침 없는 경우 포함)으로 구성된 경우 해당 한글의 초성
        - 'ㄱ' , 'ㄴ', 'ㅏ', 'ㅑ' 등 낱자의 경우에는 그대로 반환함
        - 'ㄱ' → 'ㄱ'
        - '가' → 'ㄱ'
        - '슬' → 'ㅅ'
    - 그 외의 경우는 원래의 문자를 그대로
        - 공백 → 공백
        - 영문자 → 영문자
        - 기타 문자 → 기타 문자
*/

// 초성 중성 종성
// 앉 
// ㄱㄲㄴㄵㄶㄷㄹ ... ㅎ
const HANGUL_ONSET = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split('');
const HANGUL_NUCLEUS = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.split('');

// 0중성0
// 가(28) -> 개... 갸 깋 = 21(중성) * 28(받침) = 588개 * 19개 
// 같은 초성의 글자는 모두 588개
// 초성(19) * 중성(21) * 종성(28, 없음 ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ)

// 가 없음 (1) + ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ (27)
// 개 ㅏㅣ 없음 + ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ
// .. 
// 모든 자음 - ㄸ ㅃ ㅉ / 없는 경우 가각갃간갅갆 나다 갛
const HANGUL_CODA = [''].concat('ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'.split(''));

function isHangul(character) {
    let codePoint = character.codePointAt(0);

    // 가~힣 -> 자음/모음
    // codePoint >= 가.codePoint(0)
    // and codePoint <= 힣.codePoint

    // ........ 가 ............. 힣 ..............

    return codePoint >= '가'.codePointAt(0) && codePoint <= '힣'.codePointAt(0);
}
function getOnset(word) {
    // undefined, null, 문자열이 아닌 타입이 인자로 전달되는 경우 오류를 발생시킵니다(throw 구문 활용)
    if(typeof word !== 'string') {
        throw Error('word 인자는 문자열만 가능합니다.');
    }

    let result = '';

    for(c of word) {
        if(isHangul(c)) {
            // 한글 음절인 경우
            // 초성
            // 가 44032 -> 0 정규화
            let normalize = c.codePointAt(0) - '가'.codePointAt(0);
            
            // 588 중성 * 받침
            let index = Math.floor(normalize / 588);

            result = result + HANGUL_ONSET[index];
        } else {
            // 그 외의 글자
            result = result + c;
        }
    }

    return result;
}


console.log(getOnset('안녕하세요')); // ㅇㄴㅎㅅㅇ
console.log(getOnset('안녕Hi')); // ㅇㄴHi

try {
    getOnset(undefined); // 오류 발생
} catch(e) {
    console.log(e);
}

// getOnset(null); // 오류 발생
// getOnset(2.4); // 오류 발생

console.log(getOnset('abc')); // 'abc' 반환
console.log(getOnset('가드니스트')); // 'ㄱㄷㄴㅅㅌ' 반환
console.log(getOnset('가드니스트의 GitHub')); // 'ㄱㄷㄴㅅㅌㅇ GitHub' 반환