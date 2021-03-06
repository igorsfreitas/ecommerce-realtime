'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')
const UserTransformer = use('App/Transformers/Admin/UserTransformer')
const OrderItemTransformer = use('App/Transformers/Admin/OrderItemTransformer')
const CouponTransformer = use('App/Transformers/Admin/CouponTransformer')
const DiscountTransformer = use('App/Transformers/Admin/DiscountTransformer')

/**
 * OrderTransformer class
 *
 * @class OrderTransformer
 * @constructor
 */
class OrderTransformer extends BumblebeeTransformer {
  availableInclude(){
    return ['user', 'coupons', 'items', 'discounts']
  }
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    model = model.toJSON()
    return {
     id: model.id,
     status: model.status,
     total: model.total ? parseFloat(model.total.toFixed(2)) : 0,
     qty_items: model.__meta__ && model.__meta__.qty_items ? model.__meta__.qty_items : 0,
     created_at: model.created_at,
     discount: model.__meta__ && model.__meta__.discount ? model.__meta__.discount : 0,
     subtotal: model.__meta__ && model.__meta__.subtotal ? model.__meta__.subtotal : 0,
    }
  }

  includeUser(order){
    return this.item(order.getRelated('user'), UserTransformer)
  }

  includeItems(order){
    return this.collection(order.getRelated('items'), OrderItemTransformer)
  }

  includeCoupons(order){
    return this.collection(order.getRelated('coupons'), CouponTransformer)
  }

  includeDiscounts(order){
    return this.collection(order.getRelated('discounts'), DiscountTransformer)
  }
}

module.exports = OrderTransformer
