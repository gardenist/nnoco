const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => 
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        },{});

// 관계형 데이터베이스 MySQL Oracle MS
// 테이블 표 row col

// 데이터베이스 데이터를 저장하는 용도
// Persistence persist
// MongoDb, Hadoop, 

// key-value no sql
// redis - aws elstic cache
const sessionStore = {}; // 별도의 데이터베이스 

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    console.log('요청이 들어옴: ' + req.url);
    console.dir(cookies);

    if(req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);

        const { name } = qs.parse(query);

        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);

        const sessionId = +new Date(); // Timestamp 1970. 1. 1. 0
        sessionStore[sessionId] = {
            name, 
            expires
        };

        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `sessionId=${sessionId}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
        });
        res.end();
    } else if (cookies.sessionId && sessionStore[cookies.sessionId].expires > new Date()) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(`${sessionStore[cookies.sessionId].name}님 안녕하세요.`);
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if (err) {
                throw err;
            }

            res.end(data);
        });
    }
}).listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
});