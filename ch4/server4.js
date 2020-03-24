const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// "name=이준영;value=123"
/* {
    name: "이준영",
    value: 123
}
*/
const parseCookies = (cookie = '') => 
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        },{})

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie); // acc { name="이준영" }

    console.log(cookies);

    if(req.url.startsWith('/login')) { // HTML form action="/login"
        const { query } = url.parse(req.url); // "https://localhost:8083/login?name=" => { ... query: { name: "이준영" }, ...}
        // query = "name=이준영&key=value"

        const { name } = qs.parse(query); // { name: "이준영" }

        const expires = new Date(); // 실행된 순간의 시간 3시 5분 52초 
        expires.setMinutes(expires.getMinutes() + 5); // 쿠키의 유효기간을 요청한 시간으로부터 5분뒤까지로 한다.
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
        });
        res.end();
    } else if (cookies.name) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요.`);
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