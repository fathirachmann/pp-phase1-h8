const {Category, Product, productCategory} = require('../models/index');
const { Op } = require('sequelize');
const formatRupiah = require('../helpers/formatRupiah');

class Controller {
    static async getProduct(req, res) {
        try {
            const {filter, name, taste} = req.query
            let options = {
                include: {
                    model: Category
                }
            }

            if (filter) {
                options.include.where = {
                    beanType: filter
                }
            }

            if (name) {
                options.where = {
                    productName: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            }
            if (taste) {
                options.include.where = {
                    tasteProfile: {
                        [Op.iLike]: `%${taste}%`
                    }
                }
            }
            let productData = await Product.findAll(options)
            let categoryData = await Category.findAll()
            console.log(Category);
            res.render('product', {productData, categoryData, formatRupiah})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getAddProduct(req, res) {
        try {
            let categoryData = await Category.findAll()
            res.render('addProduct', {categoryData})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postAddProduct(req, res) {
        try {
            let {productName, price, stock, imageUrl, CategoryId, description} = req.body
            await Product.create({productName, price, stock, imageUrl, description})
            let data = await Product.findAll()
            data = data[data.length-1]
            let ProductId = data.dataValues.id
            
            if (CategoryId.length > 1) {
                CategoryId.forEach(el => {
                    productCategory.create({ProductId, CategoryId: +el})
                });
            }
            res.redirect('/products')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async productDetail(req, res) {
        try {
            const {id} = req.params
            let productData = await Product.findByPk(id)
            console.log(`<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`);
            res.render('productDetail', {productData})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getEditProduct(req, res) {
        try {
            let categoryData = await Category.findAll()
            res.render('addProduct', {categoryData})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postEditProduct(req, res) {
        try {
            let categoryData = await Category.findAll()
            res.render('addProduct', {categoryData})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async deleteProduct(req, res) {
        try {
            const {id} = req.params
            let categoryData = await Category.findAll()
            res.render('addProduct', {categoryData})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async buyProduct(req, res) {
        try {
            const {id} = req.params
            let categoryData = await Category.findAll()
            res.render('addProduct', {categoryData})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller