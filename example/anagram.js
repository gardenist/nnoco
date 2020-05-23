

/*
    0 1 2 3 4 5 6 7 8 9
    0 2 1 0 0 0             -> "0210000000"
      2     1       1
      2 1
      2     1       1
      2     1       1
*/

// 속도 

function change(number) {
    let string = number.toString();

    let sequence = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    

    // 들어온 숫자를 반복
    for(let c of string) {
        // 0 ~ 9까지 반복

        for(let i = 0; i < 10 ; i++) {
            if(i == c) { // 숫자 == 문자
                sequence[i] = sequence[i] + 1;
            }
        }
    }

    // [0, 2, 1, 0, 0, 0, 0, 0, 0, 0];
    let result = sequence.join('');
    // "0210000000";

    return result;
}


// numbers = [112, 1814, 121, 1481, 1184]
function solution(numbers) {
    let group = {};

    /*
    {
        "021000...": 1
        "02001...10": 1
    }
    */

    for(let i = 0; i < numbers.length ; i++) {
        let result = change(numbers[i]);

        group[result] = 1;
    }

    return Object.keys(group).length;
}

let input = [112, 1814, 121, 1481, 1184];

console.log("정답은: " + solution(input));

input = [123, 456, 789, 321, 654, 987];

console.log("정답은: " + solution(input));

input = [1, 2, 3, 1, 2, 3, 4];

console.log("정답은: " + solution(input));

input = [123, 234, 213, 432, 234, 1234, 2341, 12345, 324];

console.log("정답은: " + solution(input));