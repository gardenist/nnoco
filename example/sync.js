function readFile(path, callback) {
    // path에 위치한 파일 읽어옴
    callback(path + ' Gardenist');
}

console.log('readFile 호출 전입니다.');
readFile('example', (data) => console.log(data));
console.log('readFile 호출 후입니다.');