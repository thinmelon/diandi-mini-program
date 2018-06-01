/**
 *  访问地址前缀
 */
const PROTOCOL = 'https://';
const HOST = 'www.thinmelon.cc:3000';
const PREFIX_SHOPPING = PROTOCOL + HOST + '/shopping';
const PREFIX_USER = PROTOCOL + HOST + '/user';
const PREFIX_STORAGE = PROTOCOL + HOST + '/oss';

/**
 *  商品列表
 */
const fetchProductList = () => {
	return `${PREFIX_SHOPPING}/product/list`;
}

/** 
 *   商品详情
 */
const fetchProductDetail = (product_id) => {
	return `${PREFIX_SHOPPING}/product/detail/${product_id}`;
}

/**
 *   提交统一订单
 */
const submitUnifiedOrder = () => {
	return `${PREFIX_SHOPPING}/order/new`;
}

/**
 *   查询微信支付订单
 */
const queryWechatPayOrder = (out_trade_no) => {
	return `${PREFIX_SHOPPING}/order/${out_trade_no}`;
}

/**
 *   用户登录
 */
const userLogin = () => {
	return `${PREFIX_USER}/login`;
}

/**
 *   添加新的收件人
 */
const addNewConsignee = (session) => {
	return `${PREFIX_USER}/new/consignee/${session}`;
}

/**
 *   编辑收件人
 */
const editConsignee = (session) => {
	return `${PREFIX_USER}/edit/consignee/${session}`;
}

/**
 *   移除收件人
 */
const removeConsignee = (session) => {
	return `${PREFIX_USER}/remove/consignee/${session}`;
}

/**
 *   缺省收件人
 */
const defaultConsignee = (session) => {
	return `${PREFIX_USER}/default/consignee/${session}`;
}

/**
 *   我的收件人列表
 */
const myConsignee = (session) => {
	return `${PREFIX_USER}/my/consignee/${session}`;
}

/**
 *   我的购物车
 */
const myCart = (session) => {
	return `${PREFIX_USER}/my/cart/${session}`;
}

/**
 *   添加至购物车
 */
const joinToCart = () => {
	return `${PREFIX_USER}/cart/new`;
}

/**
 *   添加至购物车
 */
const updateMyCart = () => {
	return `${PREFIX_USER}/cart/update`;
}

/**
 *   从购物车移除商品
 */
const removeMyCart = () => {
	return `${PREFIX_USER}/cart/remove`;
}

/**
 *   获取我的历史订单
 */
const fetchMyOrders = () => {
	return `${PREFIX_USER}/my/order`;
}

/**
 *  由用户发起退款申请
 */
const submitRefund = () => {
	return `${PREFIX_USER}/my/refund`;
}

/**
 * 	
 */
const fetchSTSToken = (session) => {
	return `${PREFIX_STORAGE}/${session}`;
}

/**
 *   上传图片
 */
const uploadImage = () => {
	return `${PREFIX_STORAGE}/image/new`;
}

/**
 *   上传图片
 */
const uploadVideo = () => {
	return `${PREFIX_STORAGE}/video/new`;
}

module.exports = {
	submitUnifiedOrder: submitUnifiedOrder,
	submitRefund: submitRefund,
	queryWechatPayOrder: queryWechatPayOrder,
	userLogin: userLogin,
	addNewConsignee: addNewConsignee,
	editConsignee: editConsignee,
	removeConsignee: removeConsignee,
	defaultConsignee: defaultConsignee,
	myConsignee: myConsignee,
	myCart: myCart,
	joinToCart: joinToCart,
	updateMyCart: updateMyCart,
	removeMyCart: removeMyCart,
	uploadImage: uploadImage,
	uploadVideo: uploadVideo,
	fetchProductList: fetchProductList,
	fetchProductDetail: fetchProductDetail,
	fetchMyOrders: fetchMyOrders,
	fetchSTSToken: fetchSTSToken
}