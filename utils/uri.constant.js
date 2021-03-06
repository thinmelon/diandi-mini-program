/**
 *  访问地址前缀
 */
const PROTOCOL = 'https://';
const HOST = 'www.pusudo.cn';
const PREFIX_PLATFORM = PROTOCOL + HOST + '/platform';
const PREFIX_SHOPPING = PROTOCOL + HOST + '/shopping';
const PREFIX_USER = PROTOCOL + HOST + '/user';
const PREFIX_STORAGE = PROTOCOL + HOST + '/oss';

/**
 *   用户登录
 */
const userLogin = (appid) => {
    return `${PREFIX_PLATFORM}/miniprogram/${appid}`;
}

/**
 * 模板有效性验证
 */
const checkTemplateValidity = () => {
    return `${PREFIX_PLATFORM}/template/ever/bought`;
}

/**
 * 	获取在线商户列表
 */
const fetchOnlineBusinessList = (session, appid) => {
    return `${PREFIX_SHOPPING}/business/online?session=${session}&appid=${appid}`;
}

/**
 *  商品列表
 */
const fetchProductList = (session, businessId, offset, amount) => {
    return `${PREFIX_SHOPPING}/product/partial?session=${ session }&bid=${ businessId }&skip=${ offset }&limit=${ amount }`;
}

/** 
 *   商品详情
 */
const fetchProductDetail = (session, product_id) => {
    return `${PREFIX_SHOPPING}/product/detail/${product_id}?session=${session }`;
}

/**
 *   提交统一订单
 */
const submitUnifiedOrder = (session) => {
    return `${PREFIX_SHOPPING}/order?session=${session }`;
}

/**
 * 	重新支付
 */
const repay = (session) => {
    return `${PREFIX_SHOPPING}/order/repay?session=${session }`;
}

/**
 * 	关闭订单
 */
const closeOrder = (session) => {
    return `${PREFIX_SHOPPING}/order?session=${session }`;
}

/**
 *  查询微信支付订单
 */
const queryWechatPayOrder = (session, out_trade_no) => {
    return `${PREFIX_SHOPPING}/order/${out_trade_no}?session=${session}`;
}

/**
 * 	 查询用户是否已购买过该商品
 */
const queryEverBought = (session, stock_no) => {
    return `${PREFIX_SHOPPING}/product/everBought?session=${session}&stock_no=${stock_no}`;
}

/**
 *  由用户发起退款申请
 */
const submitRefund = (session) => {
    return `${PREFIX_USER}/my/refund?session=${session}`;
}

/**
 * 	获取退款进度
 */
const queryRefundInfo = (session) => {
    return `${PREFIX_SHOPPING}/refund/progress?session=${session}`;
}

/**
 * 	将卡券放入卡包
 */
const putIntoCardHolder = (session) => {
    return `${PREFIX_SHOPPING}/card/holder?session=${session}`;
}

/**
 * 	在用户领取卡券至微信卡包后，记录用户的领取记录
 */
const recordUserCard = (session) => {
    return `${PREFIX_SHOPPING}/card/user?session=${session}`;
}

/**
 * 对应指定订单列表，用户所购买的卡券列表
 */
const queryUserCards = (session) => {
    return `${PREFIX_SHOPPING}/card/user/orders?session=${session}`;
}

/**
 *   添加新的收件人
 */
const addNewConsignee = (session) => {
    return `${PREFIX_USER}/consignee?session=${session }`;
}

/**
 *   编辑收件人
 */
const editConsignee = (session) => {
    return `${PREFIX_USER}/consignee?session=${session }`;
}

/**
 *   移除收件人
 */
const removeConsignee = (session) => {
    return `${PREFIX_USER}/consignee?session=${session }`;
}

/**
 *   缺省收件人
 */
const defaultConsignee = (session) => {
    return `${PREFIX_USER}/default/consignee?session=${session }`;
}

/**
 *   我的收件人列表
 */
const myConsignee = (session) => {
    return `${PREFIX_USER}/my/consignee?session=${session }`;
}

/**
 *   我的购物车
 */
const myCart = (session) => {
    return `${PREFIX_USER}/my/cart?session=${session }`;
}

/**
 *   添加至购物车
 */
const joinToCart = (session) => {
    return `${PREFIX_USER}/cart?session=${session }`;
}

/**
 *   更新购物车
 */
const updateMyCart = (session) => {
    return `${PREFIX_USER}/cart?session=${session }`;
}

/**
 *   从购物车移除商品
 */
const removeMyCart = (session) => {
    return `${PREFIX_USER}/cart?session=${session }`;
}

/**
 *   提交订单后从购物车移除要买的商品
 */
const renewMyCart = (session) => {
    return `${PREFIX_USER}/cart/afterSubmit?session=${session }`;
}

/**
 *   获取我的历史订单
 */
const fetchMyOrders = (session) => {
    return `${PREFIX_USER}/my/order?session=${session }`;
}

/**
 * 	获得临时Token
 */
const fetchSTSToken = (session) => {
    return `${PREFIX_STORAGE}/${session}`;
}

/**
 *   上传图片
 */
const uploadImage = () => {
    return `${PREFIX_STORAGE}/image`;
}

/**
 *   上传视频
 */
const uploadVideo = () => {
    return `${PREFIX_STORAGE}/video`;
}

/**
 *  图片地址
 */
const imageUrlPrefix = (name) => {
    return `${PREFIX_STORAGE}/image/${encodeURIComponent(name)}`;
}

/**
 *  公众号图文素材
 */
const fetchOfficialMaterial = (mediaId) => {
    return `${PREFIX_STORAGE}/official/material/${mediaId}`;
}

/**
 *  公众号文章详情地址
 */
const fetchOfficialNews = (url) => {
    return `${PREFIX_STORAGE}/official/news?url=${url}`;
}

module.exports = {
    userLogin: userLogin,
    checkTemplateValidity: checkTemplateValidity,
    submitUnifiedOrder: submitUnifiedOrder,
    repay: repay,
    closeOrder: closeOrder,
    submitRefund: submitRefund,
    queryWechatPayOrder: queryWechatPayOrder,
    queryRefundInfo: queryRefundInfo,
    queryEverBought: queryEverBought,
    putIntoCardHolder: putIntoCardHolder,
    recordUserCard: recordUserCard,
    queryUserCards: queryUserCards,
    fetchOnlineBusinessList: fetchOnlineBusinessList,
    addNewConsignee: addNewConsignee,
    editConsignee: editConsignee,
    removeConsignee: removeConsignee,
    defaultConsignee: defaultConsignee,
    myConsignee: myConsignee,
    myCart: myCart,
    joinToCart: joinToCart,
    updateMyCart: updateMyCart,
    removeMyCart: removeMyCart,
    renewMyCart: renewMyCart,
    uploadImage: uploadImage,
    uploadVideo: uploadVideo,
    fetchProductList: fetchProductList,
    fetchProductDetail: fetchProductDetail,
    fetchMyOrders: fetchMyOrders,
    fetchSTSToken: fetchSTSToken,
    imageUrlPrefix: imageUrlPrefix,
    fetchOfficialMaterial: fetchOfficialMaterial,
    fetchOfficialNews: fetchOfficialNews
}