const http = require('http');

const fs = require('fs');

http.createServer((req, res) => {
    console.log(req.url);
    fs.readFile('./ch3/readme.html', (err, data) => {
        if(err) {
            throw err;
        }

        res.write(data.toString());
        res.end();
    });
}).listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다.');
})