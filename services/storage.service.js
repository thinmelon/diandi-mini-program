const __URI__ = require('../utils/uri.constant.js');
const __WX_API_PROMISE__ = require('../utils/wx.api.promise.js');

/**
 *   获取临时凭证
 *   传入参数： session
 */
const fetchSTSToken = (session) => {
	const url = __URI__.fetchSTSToken(session);
	return __WX_API_PROMISE__.getRequest(url, {});
}

module.exports = {
	fetchSTSToken: fetchSTSToken
}