const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const root = path.join(__dirname, 'site');

const mime = {
  '.html':'text/html',
  '.css':'text/css',
  '.js':'application/javascript',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.svg':'image/svg+xml',
  '.json':'application/json'
};

const server = http.createServer((req,res)=>{
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if(reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(root, reqPath);

  if(!filePath.startsWith(root)){
    res.statusCode = 403;res.end('Forbidden');return;
  }

  fs.stat(filePath, (err, stats)=>{
    if(err || !stats.isFile()){
      res.statusCode = 404;res.end('Not found');return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const ct = mime[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', ct+'; charset=utf-8');
    fs.createReadStream(filePath).pipe(res);
  })
});

server.listen(port, ()=>{
  console.log(`静态站点已启动: http://localhost:${port}`);
});
