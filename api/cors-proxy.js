import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
    const proxy = createProxyMiddleware({
        target: req.query.url,
        changeOrigin: true,
        pathRewrite: { '^/api/cors-proxy': '' },
        onProxyReq: (proxyReq) => {
            proxyReq.setHeader('Origin', req.headers.origin);
        },
        onError: (err, req, res) => {
            res.status(500).json({ error: 'Proxy error', details: err.message });
        },
    });
    proxy(req, res);
}
