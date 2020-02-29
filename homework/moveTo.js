function moveTo(array, x, y) {
    let target = array[x];

    if(x < y) {
        // x가 앞쪽에 위치한 경우
        // ... x -> y ...
        for(let i = x; i < y; i++) {
            array[i] = array[i + 1];
        }
    } else {
        // x가 뒷쪽에 위치한 경우
        // ... y <- x ...
        for(let i = x; i > y; i--) {
            array[i] = array[i - 1];
        }
    }

    // y의 위치에 x의 원래 값을 넣기
    array[y] = target;
}

let sample = ["a", "b", "c", "d", "e", "f", "g", "h"];
moveTo(sample, 2, 5);
console.log(sample);
moveTo(sample, 5, 2);
console.log(sample);

sample = [
    "청소하기",
    "빨래하기",
    "환기하기",
    "밥먹기",
    "정리하기",
    "분리수거하기"
]

moveTo(sample, 1, 4);
console.log(sample);
moveTo(sample, 5, 2);
console.log(sample);
