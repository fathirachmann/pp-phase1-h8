const {Category, Product, User} = require('../models/index');
const { Op } = require('sequelize');

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
            res.render('product', {productData, categoryData})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getAddProduct() {
        try {
            res.render('addProduct')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postAddProduct() {
        try {
            res.redirect('/products')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller