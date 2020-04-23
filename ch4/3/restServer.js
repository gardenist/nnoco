const http = require('http');
const fs = require('fs');

const users = {};

http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      return fs.readFile('./restFront.html', (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    } else if (req.url === '/about') {
      return fs.readFile('./about.html', (err, data) => {
        if (err) {
          throw err;
        }
        res.end(data);
      });
    } else if (req.url === '/users') {
      return res.end(JSON.stringify(users));
    }
    return fs.readFile(`.${req.url}`, (err, data) => {
      if (err) {
        res.writeHead(404, 'NOT FOUND');
        return res.end('NOT FOUND');
      }
      return res.end(data);
    });
  } else if (req.method === 'POST') {
    if (req.url === '/users') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      return req.on('end', () => {
        console.log('POST 본문(Body):', body);
        const { name } = JSON.parse(body); // { name: "이준영"}

        // 똑같은 시간에 요청이 여러개 들어오는 경우
        // 중복된 id로 인해서 3개 -> 2개의 데이터가 손실이 생김
        const id = Date.now();
        users[id] = name;
        res.writeHead(201); // 200 OK 201 CREATED
        // 1xx - OPTIONS
        // 2xx - 정상적인 처리 200, 201 Created
        // 3xx - redirection
        // 4xx - 404 NOT FOUND, 400 Bad Request // 클라이언트 니가 잘못했다. 403 Forbidden
        // 5xx - 500 SERVER ERROR // 서버가 잘못했다.
        res.end('등록 성공');
      });
    }
  } else if (req.method === 'PUT') {
    if (req.url.startsWith('/users/')) {
      const key = req.url.split('/')[2];
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      return req.on('end', () => {
        console.log('PUT 본문(Body):', body);
        users[key] = JSON.parse(body).name;
        return res.end(JSON.stringify(users));
      });
    }
  } else if (req.method === 'DELETE') {
    if (req.url.startsWith('/users/')) {
      const key = req.url.split('/')[2];
      delete users[key];
      return res.end(JSON.stringify(users));
    }
  }
  res.writeHead(404, 'NOT FOUND');
  return res.end('NOT FOUND');
})
  .listen(8085, () => {
    console.log('8085번 포트에서 서버 대기중입니다');
  });