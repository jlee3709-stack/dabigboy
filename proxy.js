const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Proxy middleware
app.use('/proxy/', createProxyMiddleware({
    changeOrigin: true,
    pathRewrite: {
        '^/proxy/': ''
    },
    onError: (err, req, res) => {
        res.status(500).send('Proxy Error: ' + err.message);
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Proxy server is running on port ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
});