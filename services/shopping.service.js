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
    const url = __URI__.submitUnifiedOrder(order.session);
    return __WX_API_PROMISE__.postRequest(
        url, {
            appid: order.appid,
            businessId: order.businessId,
            body: order.body,
            total_fee: order.total_fee,
            attach: order.attach,
            sku: order.sku,
            consignee: order.consignee
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
const queryWechatPayOrder = (session, out_trade_no) => {
    const url = __URI__.queryWechatPayOrder(session, out_trade_no);
    return __WX_API_PROMISE__.getRequest(url, {});
}

/**
 * 	 查询退款进度
 */
const queryRefundInfo = (session, out_trade_no) => {
    const url = __URI__.queryRefundInfo(session);
    return __WX_API_PROMISE__.postRequest(url, {
        out_trade_no: out_trade_no
    });
}

/**
 *   查询用户是否已购买过该商品
 */
const queryEverBought = (session, stock_no) => {
    const url = __URI__.queryEverBought(session, stock_no);
    return __WX_API_PROMISE__.getRequest(url, {});
}

/**
 *   获取商品列表
 * 		--	传入参数
 * 			session: **
 * 			startTime: 起始时间
 * 			n: 返回数目
 */
const fetchProductList = (session, businessId, offset, amount) => {
    const url = __URI__.fetchProductList(session, businessId, offset, amount);
    return __WX_API_PROMISE__.getRequest(url, {});
}

/**
 *   获取商品详情
 */
const fetchProductDetail = (session, product_id) => {
    const url = __URI__.fetchProductDetail(session, product_id);
    return __WX_API_PROMISE__.getRequest(url, {});
}

/**
 * 	将卡券放入卡包
 */
const putIntoCardHolder = (session, appid, product_id, out_trade_no) => {
    const url = __URI__.putIntoCardHolder(session);
    return __WX_API_PROMISE__.postRequest(
            url, {
                appid: appid,
                product_id: product_id,
                out_trade_no: out_trade_no
            })
        .then(res => {
            return new Promise((resolve, reject) => { //	构建接口参数
                resolve({
                    cardList: [{
                        cardId: res.data.card_id,
                        cardExt: JSON.stringify({
                            "openid": res.data.openid, //用户
                            "nonce_str": res.data.nonceStr, //随机数
                            "timestamp": res.data.timestamp, //时间戳
                            "signature": res.data.signature //签名
                        })
                    }]
                });
            });
        })
        .then(__WX_API_PROMISE__.addCard); //	调用 wx.addCard
}

/**
 *  在用户领取卡券至微信卡包后，记录用户的领取记录
 */
const recordUserCard = (session, cardid, openid, timestamp, out_trade_no, encrypt_code) => {
    const url = __URI__.recordUserCard(session);
    return __WX_API_PROMISE__.postRequest(
        url, {
            encrypt_code: encrypt_code,
            cardid: cardid,
            openid: openid,
            timestamp: timestamp,
            out_trade_no: out_trade_no
        });
}

/**
 * 对应指定订单列表，查询用户所购买的卡券列表
 */
const queryUserCards = (session, tradeList) => {
    const url = __URI__.queryUserCards();
    return __WX_API_PROMISE__
        .postRequest(
            url, {
                session: session,
                tradeList: tradeList
            });
}

/**
 *  对应指定订单列表，查询用户所购买的卡券列表
 *  打开微信卡券货架
 */
const openUserCardList = (session, out_trade_no) => {
    const url = __URI__.queryUserCards(session);
    return __WX_API_PROMISE__
        .postRequest(
            url, {
                out_trade_no: out_trade_no
            })
        .then(res => {
            return new Promise((resolve, reject) => { //	构建接口参数
                resolve({
                    cardList: [{
                        cardId: res.data.data.card.id,
                        code: res.data.data.card.code
                    }]
                });
            });
        })
        .then(__WX_API_PROMISE__.openCard);
}

/**
 * 	获取当前appid下所有已上线的商户列表
 */
const fetchOnlineBusinessList = (session, appid) => {
    const url = __URI__.fetchOnlineBusinessList(session, appid);
    return __WX_API_PROMISE__.getRequest(url, {});
}

module.exports = {
    __ENUM_ORDER_STATUS__: __ENUM_ORDER_STATUS__,
    submitUnifiedOrder: submitUnifiedOrder,
    repay: repay,
    closeOrder: closeOrder,
    queryOrder: queryWechatPayOrder,
    queryRefundInfo: queryRefundInfo,
    queryEverBought: queryEverBought,
    fetchProductList: fetchProductList,
    fetchProductDetail: fetchProductDetail,
    putIntoCardHolder: putIntoCardHolder,
    recordUserCard: recordUserCard,
    queryUserCards: queryUserCards,
    openUserCardList: openUserCardList,
    fetchOnlineBusinessList: fetchOnlineBusinessList
}