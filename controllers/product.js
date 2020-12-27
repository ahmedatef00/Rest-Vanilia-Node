const Product = require('../models/product');
const {getPostData} = require('../utils')

async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.writeHead(200, {'Content-Type': "application/json"});
        res.end(JSON.stringify(products));
    } catch (error) {

    }
}


async function createProduct(req, res) {

    try {
        const body = await getPostData(req);

        console.log('body in create', body, '\n');
        const {name, description, price} = JSON.parse(body)

        const product = {
            name,
            description,
            price
        }

        console.log('product in create', product, '\n');


        const newProduct = await Product.create(product);
        res.writeHead(201, {'Content-Type': "application/json"});
        return res.end(JSON.stringify(newProduct));
    } catch (error) {
        console.log(error)
    }
}


async function updateProduct(req, res, id) {

    try {

        const product = Product.findById(id).catch((error)=>{
            res.end(JSON.stringify({error}))
        });
        console.log(product)
        if (!product) {
            console.log('dsds')
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not Found'}))
        } else {
            const body = await getPostData(req);

            console.log('body in create', body, '\n');
            const {name, description, price} = JSON.parse(body)

            const product = {
                name,
                description,
                price
            }
            console.log('product in create', product, '\n');
            const newProduct = await Product.update(id,product);
            res.writeHead(201, {'Content-Type': "application/json"});
            return res.end(JSON.stringify(newProduct));
        }
    } catch (error) {
        console.log(error)
    }
}

async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id).catch((error)=>{
            res.end(JSON.stringify({error}))
        });
        if (!product) {
            res.writeHead(404, {'Content-Type': "application/json"});
            res.end(JSON.stringify({'msg': 'notfound'}))

        } else {
            res.writeHead(200, {'Content-Type': "application/json"});
            res.end(JSON.stringify(product));
        }

    } catch (error) {

    }
}


async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id).catch((error)=>{
            res.end(JSON.stringify({error}))
        });
        if (!product) {
            res.writeHead(404, {'Content-Type': "application/json"});
            res.end(JSON.stringify({'msg': 'notfound'}))

        } else {
            const product = await Product.remove(id);

            res.writeHead(200, {'Content-Type': "application/json"});
            res.end(JSON.stringify({message: `product ${id} removed`, product}));
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getProducts, getProduct, createProduct,
    updateProduct, deleteProduct
}