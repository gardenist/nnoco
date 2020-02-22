function readFile(path, callback) {
    // path에 위치한 파일 읽어옴
    
    // 느린 작업을 시뮬레이션
    setTimeout(() => {
        callback(path + ' Gardenist');
    }, 10)
}
console.log('readFile 호출 전입니다.');
readFile('example', (data) => console.log(data));
console.log('readFile 호출 후입니다.');