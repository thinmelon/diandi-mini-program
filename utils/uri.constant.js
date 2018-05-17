/**
 *  访问地址前缀
 */
const PROTOCOL = 'https://';
const HOST = 'www.thinmelon.cc:3000';
const PREFIX_SHOPPING = PROTOCOL + HOST + '/shopping';
const PREFIX_USER = PROTOCOL + HOST + '/user';

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

module.exports = {
	submitUnifiedOrder: submitUnifiedOrder,
	queryWechatPayOrder: queryWechatPayOrder,
	userLogin: userLogin,
	addNewConsignee: addNewConsignee,
	editConsignee: editConsignee,
	removeConsignee: removeConsignee,
	defaultConsignee: defaultConsignee,
	myConsignee: myConsignee,
	fetchProductList: fetchProductList,
	fetchProductDetail: fetchProductDetail
}