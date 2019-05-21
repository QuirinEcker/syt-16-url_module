let http = require('http');
let fs = require('fs');
let url = require('url');

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    if (q.pathname === '/') {
        fs.readFile('html/index.html', function (err, data) {
            res.write(data);
            res.end();
        });
    } else if (q.pathname === '/style.css') {
        fs.readFile('css/style.css', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(data);
            res.end();
        });
    } else {
        let filename = './html' + q.pathname + ".html";

        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end('404 Not Found');
            }

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }
}).listen(3000);