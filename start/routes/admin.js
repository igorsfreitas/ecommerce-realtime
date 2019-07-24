'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
    /**
     * Categories Resource Routes
     */
    Route.resource('categories', 'CategoryController').apiOnly()

    /**
     * Products Resource Routes
     */
    Route.resource('products', 'ProductController').apiOnly()

    /**
     * Coupon Resource Routes
     */
    Route.resource('coupons', 'CouponController').apiOnly()

    /**
     * Order Resource Routes
     */
    Route.resource('orders', 'OrderController').apiOnly()

    /**
     * Image Resource Routes
     */
    Route.resource('images', 'ImageController').apiOnly()

    /**
     * User Resource Routes
     */
    Route.resource('users', 'UserController').apiOnly()
}).prefix('v1/admin').namespace('Admin')