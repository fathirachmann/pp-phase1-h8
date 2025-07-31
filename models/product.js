'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Category, {
        through: 'productCategories'
      })

      Product.belongsTo(models.User, {
        foreignKey: 'UserId'
      }) 
    }
  }
  Product.init({
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Product Name cannot be empty`
        },
        notNull: {
          args: true,
          msg: `Product Name cannot be null`
        },
      }
    },
    description:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Description cannot be empty`
        },
        notNull: {
          args: true,
          msg: `Description cannot be null`
        },
      }
    },
    price:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Price cannot be empty`
        },
        notNull: {
          args: true,
          msg: `Price cannot be null`
        },
      }
    },
    imageUrl:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `ImageURL cannot be empty`
        },
        notNull: {
          args: true,
          msg: `ImageURL cannot be null`
        },
      }
    },
    stock:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Stock cannot be empty`
        },
        notNull: {
          args: true,
          msg: `Stock cannot be null`
        },
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(Product, options) {
        Product.UserId = 1
      }
    },
    sequelize,
    modelName: 'Product',
  });
  return Product;
};