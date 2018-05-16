/**
 *  访问地址前缀
 */
const PROTOCOL = 'https://';
const HOST = 'www.thinmelon.cc:3000';
const PREFIX_SHOPPING = PROTOCOL + HOST + '/shopping';
const PREFIX_USER = PROTOCOL + HOST + '/user';

const fetchProductList = () => {
	return `${PREFIX_SHOPPING}/product/list`;
}

const submitUnifiedOrder = () => {
	return `${PREFIX_SHOPPING}/order/new`;
}

const queryWechatPayOrder = (out_trade_no) => {
	return `${PREFIX_SHOPPING}/order/${out_trade_no}`;
}

const userLogin = () => {
	return `${PREFIX_USER}/login`;
}

module.exports = {
	submitUnifiedOrder: submitUnifiedOrder,
	queryWechatPayOrder: queryWechatPayOrder,
	userLogin: userLogin,
	fetchProductList: fetchProductList
}