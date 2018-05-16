const __URI__ = require('../utils/uri.constant.js');
const __WX_API_PROMISE__ = require('../utils/wx.api.promise.js');

const userLogin = (request)=>{
	const url = __URI__.userLogin();
	return __WX_API_PROMISE__.postRequest(url, {
		code: request.code
	});
}

module.exports = {
	userLogin: userLogin
}