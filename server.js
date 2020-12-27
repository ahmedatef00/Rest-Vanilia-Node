const fs = require('fs');
const http = require('http');
const products = require('./data/products.json');
const PORT = 5000 || process.env.PORT;
const {getProducts, deleteProduct,updateProduct,createProduct, getProduct} = require('./controllers/product')

http.createServer((req, res) => {

    if (req.url == '/api/products' && req.method === 'GET') {
        getProducts(req, res);
    } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3]//api/products/1;
        getProduct(req, res, id)
    }

    else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]//api/products/1;
        console.log(id)
        updateProduct(req, res, id)
    }

    else if (req.url == '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    }

    else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]//api/products/1;
        deleteProduct(req, res, id)
    }

    else {
        res.writeHead(404, {'Content-Type': "application/json"})
        res.end(JSON.stringify({'msg': 'notfound'}))
    }

}).listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});