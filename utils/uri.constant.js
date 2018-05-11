/**
 *  访问地址前缀
 */
const PROTOCOL = 'https://';
const HOST = 'www.thinmelon.cc:3000';
const API = '/shopping';
const PREFIX = PROTOCOL + HOST + API;

// const ChinaBondYieldRate = (from, to) => {
// 	return `${PREFIX}/bond/${from}-${to}`;
// }
const submitUnifiedOrder = () => {
	return `${PREFIX}/order/new`;
}

const queryWechatPayOrder = (out_trade_no) => {
	return `${PREFIX}/order/${out_trade_no}`;
}

module.exports = {
	submitUnifiedOrder: submitUnifiedOrder,
	queryWechatPayOrder: queryWechatPayOrder
}