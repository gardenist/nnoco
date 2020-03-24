const webUtil = require('./web-util');
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const userDb = require('./userDb');

const sessionStore = {};

http.createServer((req, res) => {
    const cookies = webUtil.parseCookies(req.headers.cookie);

    console.log('요청이 들어옴: ' + req.url);
    console.dir(cookies);

    if(req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);

        const { id, password } = qs.parse(query);

        // 데이터베이스에서
        /* 1건이 조회됐다 -> 정상적인 아이디와 PW
           0건이 조회됐다 -> ID/PW 틀린경우 
            SELECT *
            FROM user
            WHERE id=${id} AND password=${password}
        */

        let user = userDb.login(id, password);

        if(user) {
            // 정상적으로 id, pw입력한 경우
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 30);

            const sessionId = +new Date(); // Timestamp 1970. 1. 1. 0
            sessionStore[sessionId] = {
                user, 
                expires
            };

            res.writeHead(302, {
                Location: '/',
                'Set-Cookie': `sessionId=${sessionId}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
            });
            res.end();
        } else {
            // id 없거나, pw 틀린 경우

            fs.readFile('./login_fail.html', (err, data) => {
                if (err) {
                    throw err;
                }
    
                res.end(data);
            });
        }
    } else if (cookies.sessionId && sessionStore[cookies.sessionId] && sessionStore[cookies.sessionId].expires > new Date()) {
        // 세션으로부터 유저 객체를 가져오기
        let { user } = sessionStore[cookies.sessionId]; // { user: user, expires: expires }

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(`${user.name}님 안녕하세요. ${user.id}:${user.nickname}`);
    } else {
        fs.readFile('./login.html', (err, data) => {
            if (err) {
                throw err;
            }

            res.end(data);
        });
    }
}).listen(8083, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
});