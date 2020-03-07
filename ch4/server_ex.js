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

// 세션
const session = {
    "sdljkflsjflksdjljslfj": {
        userName: "이준영",
        accountId: 1199,
        email: "junyoung.plum@gmail.com"
    },
    "salkdjsljdslkjfalfalskj": {
        userName: "이준일",
        accountId: 2310,
        email: "jkoktw@naver.com"
    }
}

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie); // acc { name="이준영" }

    const { query } = url.parse(req.url);
    const { sessionKey } = qs.parse(query); // { name: "이준영" }

    // ?sessionKey=  
    res.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
    res.end(JSON.stringify(session[sessionKey]));
    // JSON 응답
}).listen(8084, () => {
    console.log('8083번 포트에서 서버 대기 중입니다!');
});