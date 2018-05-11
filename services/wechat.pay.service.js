const __URI__ = require('../utils/uri.constant.js');
const __WX_API_PROMISE__ = require('../utils/wx.api.promise.js');

const submitUnifiedOrder = (body, total_fee, openid) => {
	const url = __URI__.submitUnifiedOrder();
	return __WX_API_PROMISE__.postRequest(
		url,
		{
			body: body,
			total_fee: total_fee,
			openid: openid
		});
}

const queryWechatPayOrder = (out_trade_no) => {
	const url = __URI__.queryWechatPayOrder(out_trade_no);
	return __WX_API_PROMISE__.getRequest(url, {});
}

module.exports = {
	submitUnifiedOrder: submitUnifiedOrder,
	queryOrder: queryWechatPayOrder
}