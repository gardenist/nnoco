const http = require('http');

http.createServer((req, res) => {
    let date = new Date();
    date.setMinutes(date.getMinutes() + 30);

    res.writeHead(200, {
        'Set-Cookie': `name=${encodeURIComponent('이준영')}; HttpOnly; Expires=${date.toGMTString()}`
    });

    res.end('Hello');
}).listen(8080);