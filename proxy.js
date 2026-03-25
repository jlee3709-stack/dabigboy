const http = require('http');
const request = require('request');

const server = http.createServer((req, res) => {
    const url = req.url.slice(1); // remove leading '/' from the URL
    const options = {
        url: url,
        method: req.method,
        headers: req.headers
    };

    req.pipe(request(options)).pipe(res);
});

const PORT = 3000;
server.listen(PORT, () => {
     console.log(`Proxy server is running on port ${PORT}`);
});