let products = require('../data/products.json');
const {writeDataToFile, getPostData} = require('../utils');
const {v4: uuidv4} = require('uuid')

async function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => {
            return p.id === id;
        })

        console.log(index);
        products[index] = {id, ...product};
        writeDataToFile('./data/products.json', products);
        resolve(products[index]);
        console.log('fgfgf',products[index]);

    });
}


function find() {

    return new Promise((resolve, reject) => {
        resolve(products);
    });
}


function create(product) {

    return new Promise((resolve, reject) => {
        console.log(product)
        const newProduct = {id: uuidv4(), ...product};
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct);
    });
}


function findById(id) {

    return new Promise((resolve, reject) => {
        const product = products.find((product) => {
            return product.id == id
        })
        console.log("product in find by id", product)
        if (!product) {
            reject('product not found')
        } else {
            resolve(product);
        }
    });
}

function remove(id) {

    return new Promise((resolve, reject) => {
        products = products.filter((product) => {
            return product.id !== id
        })
        writeDataToFile('./data/products.json', products);

        console.log('\n', products, '\n');
        resolve()
    });
}


module.exports = {find, remove, findById, update, create}