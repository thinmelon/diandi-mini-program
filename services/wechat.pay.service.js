const __URI__ = require('../utils/uri.constant.js');
const __WX_API_PROMISE__ = require('../utils/wx.api.promise.js');

/**
 *  提交统一订单
 */
const submitUnifiedOrder = (order) => {
    const url = __URI__.submitUnifiedOrder();
    return __WX_API_PROMISE__.postRequest(
        url,
        {
            body: order.body,
            attach: order.attach,
            total_fee: order.total_fee,
            session: order.session,
            consignee_no: order.consignee_no,
            skuList: order.sku_list
        });
}

/**
 *   查询支付结果
 */
const queryWechatPayOrder = (out_trade_no) => {
    const url = __URI__.queryWechatPayOrder(out_trade_no);
    return __WX_API_PROMISE__.getRequest(url, {});
}

/**
 *   获取商品列表
 */
const fetchProductList = () => {
    const url = __URI__.fetchProductList();
    return __WX_API_PROMISE__.getRequest(url, {});
}

/**
 *   获取商品详情
 */
const fetchProductDetail = (product_id) => {
    const url = __URI__.fetchProductDetail(product_id);
    return __WX_API_PROMISE__.getRequest(url, {});
}

module.exports = {
    submitUnifiedOrder: submitUnifiedOrder,
    queryOrder: queryWechatPayOrder,
    fetchProductList: fetchProductList,
    fetchProductDetail: fetchProductDetail
}