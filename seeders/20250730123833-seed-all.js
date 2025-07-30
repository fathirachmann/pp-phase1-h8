'use strict';
const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let userData = JSON.parse(await fs.readFile('./data/user.json'))
    userData.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Users', userData)

    let profileData = JSON.parse(await fs.readFile('./data/userprofiles.json'))
    profileData.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('UserProfiles', profileData)

    let productData = JSON.parse(await fs.readFile('./data/products.json'))
    productData.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Products', productData)

    let categoryData = JSON.parse(await fs.readFile('./data/categories.json'))
    categoryData.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Categories', categoryData)

    let productCategoriesData = JSON.parse(await fs.readFile('./data/productcategories.json'))
    productCategoriesData.forEach(el => {
      el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('productCategories', productCategoriesData)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('UserProfiles', null, {})
    await queryInterface.bulkDelete('Products', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('productCategories', null, {})
  }
};
