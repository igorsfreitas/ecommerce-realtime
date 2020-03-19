'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(()=>{
    /**
     * Categories Resource Routes
     */
    Route.resource('categories', 'CategoryController').apiOnly()
        .validator(new Map([
            [['categories.store'], ['Admin/StoreCategory']],
            [['categories.update'], ['Admin/StoreCategory']]
        ]))

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
    Route.post('orders/:id/discount', 'OrderController.applyDiscount')
    Route.delete('orders/:id/discount', 'OrderController.removeDiscount')
    Route.resource('orders', 'OrderController').apiOnly().validator( new Map(
        [
            [['orders.store'], ['Admin/StoreOrder']]
        ]
    ))

    /**
     * Image Resource Routes
     */
    Route.resource('images', 'ImageController').apiOnly()

    /**
     * User Resource Routes
     */
    Route.resource('users', 'UserController').apiOnly().validator([
        [['users.store'],['Admin/StoreUser']],
        [['users.update'],['Admin/StoreUser']],
    ])
}).prefix('v1/admin').namespace('Admin').middleware(['auth', 'is:( admin || manager )'])