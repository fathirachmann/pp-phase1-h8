const {Category, Product, productCategory} = require('../models/index');
const { Op, where } = require('sequelize');
const formatRupiah = require('../helpers/formatRupiah');

class Controller {
    static async getProduct(req, res) {
        try {
            const {filter, name, taste} = req.query
            let productData = await Product.search(filter, name, taste)
            let categoryData = await Category.findAll()
            res.render('product', {productData, categoryData, formatRupiah, req})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getAddProduct(req, res) {
        try {
            let categoryData = await Category.findAll()
            res.render('addProduct', {categoryData, req})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postAddProduct(req, res) {
        try {
            let {productName, price, stock, imageUrl, CategoryId, description} = req.body;
            let createdData = await Product.create({productName, price, stock, imageUrl, description});
            let data = await Product.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });
            data = data[data.length-1];
            let ProductId = data.dataValues.id;
            console.log(CategoryId, '<<<<<<<<<<<<<<<<<<<<<<<<<<<');
            
            if (CategoryId && !Array.isArray(CategoryId)) {
                productCategory.create({ProductId, CategoryId});
            } else if (CategoryId.length > 1) {
                CategoryId.forEach(el => {
                    productCategory.create({ProductId, CategoryId: el})
                });
            }
            res.redirect('/products');
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async productDetail(req, res) {
        try {
            const {id} = req.params
            let productData = await Product.findByPk(id, {
                include: Category
            })
            res.render('productDetail', {productData, formatRupiah, req})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getEditProduct(req, res) {
        try {
            const {id} = req.params
            let product = await Product.findByPk(id, {
                include: Category
            })
            let categoryData = await Category.findAll()
            res.render('editProduct', {product, categoryData, req})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postEditProduct(req, res) {
        try {
            const {id} = req.params
            let {productName, price, stock, imageUrl, CategoryId, description} = req.body;
            console.log(CategoryId);
            
            await Product.update({productName, price, stock, imageUrl, CategoryId, description}, {
                where: {
                    id: id
                }
            })
            let ProductId = id
            if (CategoryId) {
                productCategory.update({ProductId, CategoryId})
            } else if (CategoryId.length > 1) {
                CategoryId.forEach(el => {
                    productCategory.update({ProductId, CategoryId: +el}, {
                        where: {
                            ProductId: id,
                            CategoryId: +el
                        }
                    })
                })
            }
            res.redirect(`/products/${id}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async deleteProduct(req, res) {
        try {
            const {id} = req.params
            await Product.destroy({
                where: {
                    id: id
                }
            })
            res.redirect('/products')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async getBuyProduct(req, res) {
        try {
            const {id} = req.params
            let product = await Product.findByPk(id)
            res.render('buyProduct', {product, req})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postBuyProduct(req, res) {
        try {
            const { id } = req.params
            const { buy } = req.body
            await Product.buyProduct(id, buy)
            res.redirect('/products')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller