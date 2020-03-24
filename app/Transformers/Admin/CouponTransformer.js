'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const UserTransformer = use('App/Transformers/Admin/UserTransformer')
const ProductTransformer = use('App/Transformers/Admin/ProductTransformer')
const OrderTransformer = use('App/Transformers/Admin/OrderTransformer')

/**
 * CouponTransformer class
 *
 * @class CouponTransformer
 * @constructor
 */
class CouponTransformer extends BumblebeeTransformer {

  availableIncludes(){
    return ['users', 'products', 'orders']
  }

  /**
   * This method is used to transform the data.
   */
  transform (model) {
    model = model.toJSON()
    delete model.created_at
    delete model.updated_at
    return model
  }

  includeUsers(coupon){
    return this.collection(coupon.getRelated('users'), UserTransformer)
  }

  includeProducts(coupon){
    return this.collection(coupon.getRelated('products'), ProductTransformer)
  }

  includeOrders(coupon){
    return this.collection(coupon.getRelated('orders'), OrderTransformer)
  }
}

module.exports = CouponTransformer
