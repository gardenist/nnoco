const http = require('http');

/*
cookie1=hello;cookie2=world;hello=world

["cookie1=hello", "cookie2=world", "hello=world"]

map(v=>v.split('='))
[["cookie1", "hello"], ["cookie2", "world"], ["hello", "world"]]

key = "cookie1", ...vs = ["hello"]
[["cookie1", "hello"], ["cookie2", "world"], ["hello", "world"]]

REDUCE
{} <- ACC
ACC["cookie1"] = decodeURIComponent("hello") 
{
    "cookie1": "hello"
}

ACC["cookie2"] = decodeURIComponent("world") 
{
    "cookie1": "hello",
    "cookie2": "world"
}

{
    "cookie1": "hello",
    "cookie2": "world",
    "hello", "world"
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
        }, {});

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie); 
    // cookies = {} 

    console.log(req.url, cookies);

    res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
    res.end('Hello Cookie');
}).listen(8082, () => {
    console.log('8082번 포트에서 서버 대기 중입니다!');
});