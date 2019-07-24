'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {

    // Relationship between Product and Image
    image() {
        return this.belongsTo('App/Models/Image')
    }

     // Relationship between Product and Product Image Gallery
     images() {
        return this.belongsToMany('App/Models/Image')
    }

    // Relationship between Product and Categories
    categories() {
        return this.belongsToMany('App/Models/Category')
    }

    coupons() {
        return this.belongsToMany('App/Models/Coupon')
    }
}

module.exports = Product
