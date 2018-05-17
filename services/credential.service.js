const __URI__ = require('../utils/uri.constant.js');
const __WX_API_PROMISE__ = require('../utils/wx.api.promise.js');

/**
 *  用户登录
 */
const userLogin = (request) => {
	const url = __URI__.userLogin();
	return __WX_API_PROMISE__.postRequest(url, {
		code: request.code
	});
}

/**
 *   添加新的收件人
 */
const addNewConsignee = (session, receiver, mobile, address, postcode) => {
	const url = __URI__.addNewConsignee(session);
	return __WX_API_PROMISE__.postRequest(url, {
		'name': receiver,
		'mobile': mobile,
		'address': address,
		'postcode': postcode,
		'isDefault': 0
	});
}

/**
 *   编辑收件人
 */
const editConsignee = (session, consignee_no, receiver, mobile, address, postcode) => {
	const url = __URI__.editConsignee(session);
	return __WX_API_PROMISE__.postRequest(url, {
		'consignee_no': consignee_no,
		'name': receiver,
		'mobile': mobile,
		'address': address,
		'postcode': postcode
	});
}

/**
 *   移除收件人
 */
const removeConsignee = (session) => {
	const url = __URI__.removeConsignee(session);
	return __WX_API_PROMISE__.postRequest(url, {

	});
}

/**
 *   设置缺省收件人
 */
const setAsDefaultConsignee = (session, consignee_no) => {
	const url = __URI__.defaultConsignee(session);
	return __WX_API_PROMISE__.postRequest(url, {
		consignee_no: consignee_no
	});
}

/**
 *  获取缺省收件人
 */
const fetchDefaultConsignee = (session) => {
	const url = __URI__.defaultConsignee(session);
	return __WX_API_PROMISE__.getRequest(url, {});
}

/**
 *   我的收件人列表
 */
const fetchMyConsignee = (session) => {
	const url = __URI__.myConsignee(session);
	return __WX_API_PROMISE__.getRequest(url, {});
}

module.exports = {
	userLogin: userLogin,
	addNewConsignee: addNewConsignee,
	editConsignee: editConsignee,
	removeConsignee: removeConsignee,
	setAsDefaultConsignee: setAsDefaultConsignee,
	fetchDefaultConsignee: fetchDefaultConsignee,
	fetchMyConsignee: fetchMyConsignee
}