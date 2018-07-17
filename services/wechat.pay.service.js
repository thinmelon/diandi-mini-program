const __URI__ = require('../utils/uri.constant.js');
const __WX_API_PROMISE__ = require('../utils/wx.api.promise.js');

const __ENUM_ORDER_STATUS__ = [
    '未支付', //    	NOTPAY: 0,
    '支付成功', // 		SUCCESS: 1,
    '转入退款', //		REFUND: 2,
    '已关闭', //		 CLOSE: 3,
    '已撤销（刷卡支付）', //		REVOKED: 4,
    '用户支付中', //		USERPAYING: 5,
    '支付失败', //		PAYERROR: 6,
    '状态异常' //		ABNORMAL: 7
];

/**
 *  提交统一订单
 */
const submitUnifiedOrder = (order) => {
    const url = __URI__.submitUnifiedOrder();
    return __WX_API_PROMISE__.postRequest(
        url, {
            body: order.body,
            attach: order.attach,
            total_fee: order.total_fee,
            session: order.session,
            consignee_no: order.consignee_no,
            skuList: order.sku_list
        });
}

/**
 * 	重新支付
 */
const repay = (session, out_trade_no) => {
    const url = __URI__.repay();
    return __WX_API_PROMISE__.postRequest(
        url, {
            session: session,
            out_trade_no: out_trade_no
        });
}

/**
 *  关闭订单
 */
const closeOrder = (session, out_trade_no) => {
    const url = __URI__.closeOrder();
    return __WX_API_PROMISE__.deleteRequest(
        url, {
            session: session,
            out_trade_no: out_trade_no
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
 * 	 查询退款进度
 */
const queryRefundInfo = (session, out_trade_no) => {
    const url = __URI__.queryRefundInfo();
    return __WX_API_PROMISE__.postRequest(
        url, {
            session: session,
            out_trade_no: out_trade_no
        });
}

/**
 *   获取商品列表
 * 		--	传入参数
 * 			session: **
 * 			startTime: 起始时间
 * 			n: 返回数目
 */
const fetchProductList = (session, startTime, n) => {
    const url = __URI__.fetchProductList(session, startTime, n);
    return __WX_API_PROMISE__.getRequest(url, {});
}

/**
 *   获取商品详情
 */
const fetchProductDetail = (product_id) => {
    const url = __URI__.fetchProductDetail(product_id);
    return __WX_API_PROMISE__.getRequest(url, {});
}

/**
 * 	将卡券放入卡包
 */
const putIntoCardHolder = (session, product_id, out_trade_no) => {
    const url = __URI__.putIntoCardHolder();
    return __WX_API_PROMISE__.postRequest(
        url, {
            session: session,
            product_id: product_id,
            out_trade_no: out_trade_no
        });
}

module.exports = {
    __ENUM_ORDER_STATUS__: __ENUM_ORDER_STATUS__,
    submitUnifiedOrder: submitUnifiedOrder,
    repay: repay,
    closeOrder: closeOrder,
    queryOrder: queryWechatPayOrder,
    queryRefundInfo: queryRefundInfo,
    fetchProductList: fetchProductList,
    fetchProductDetail: fetchProductDetail,
    putIntoCardHolder: putIntoCardHolder
}