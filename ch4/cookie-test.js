const http = require('http');

http.createServer((req, res) => {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 30);

    res.writeHead(200, [
                ['Set-Cookie', `name=${encodeURIComponent('이준영')}; HttpOnly; Expires=${date.toGMTString()}`],
                ['Set-Cookie', 'second_cookie=hello']
    ]);

    res.end('Hello');
}).listen(8080);