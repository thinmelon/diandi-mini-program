const Promisify = require('./promisify.js').Promisify;

/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function wxGetRequestPromise(url, data) {
	return Promisify(wx.request)({
		url: url,
		method: 'GET',
		data: data,
		header: {
			'Content-Type': 'application/json'
		}
	})
}

/**
 * 微信请求post方法封装
 */
function wxPostRequestPromise(url, data) {
	return Promisify(wx.request)({
		url: url,
		method: 'POST',
		data: data,
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
}

/**
 * 获取系统信息
 * brand	手机品牌	1.5.0
 * model	手机型号
 * pixelRatio	设备像素比
 * screenWidth	屏幕宽度	1.1.0
 * screenHeight	屏幕高度	1.1.0
 * windowWidth	可使用窗口宽度
 * windowHeight	可使用窗口高度
 * statusBarHeight	状态栏的高度	1.9.0
 * language	微信设置的语言
 * version	微信版本号
 * system	操作系统版本
 * platform	客户端平台
 * fontSizeSetting	用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位：px	1.5.0
 * SDKVersion	客户端基础库版本
 */
function wxGetSystemInfoPromise() {
	return Promisify(wx.getSystemInfo)();
}

/**
 * 本地存储
 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容
 */
function wxSetStoragePromise(data) {
	wx.removeStorageSync(data.key);
	return Promisify(wx.setStorage)(data);
}

/**
 * 调用接口wx.login() 获取临时登录凭证（code）
 */
function wxLoginPromise() {
	return Promisify(wx.login)();
}

/**
 * 调用wx.requestPayment(OBJECT)发起微信支付
 * 
 */
function wxRequestPaymentPromise(options) {
	return Promisify(wx.requestPayment)({
		'timeStamp': options.data.timeStamp,	//	时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
		'nonceStr': options.data.nonceStr,			//	随机字符串，长度为32个字符以下
		'package': options.data.package,			  // 统一下单接口返回的 prepay_id 参数值
		'signType': 'MD5',									//	签名类型，默认为MD5
		'paySign': options.data.paySign				//	签名
	});
}

/**
 *   显示消息提示框
 *   时长3秒，结束后执行下一步
 */
function wxShowToastPromise(title, icon, image) {
	wx.showToast({
		title: title,
		icon: icon,
		image: image,
		duration: 3000,
		mask: true
	})
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve('Time out.'), 3000);
	});
}

/**
 *   关闭当前页面，跳转到应用内的某个页面。
 */
function wxRedirectToPromise(url) {
	return Promisify(wx.redirectTo)({
		url: url
	});
}

module.exports = {
	getRequest: wxGetRequestPromise,
	postRequest: wxPostRequestPromise,
	getSystemInfo: wxGetSystemInfoPromise,
	setStorage: wxSetStoragePromise,
	login: wxLoginPromise,
	requestPayment: wxRequestPaymentPromise,
	showToast: wxShowToastPromise,
	redirectTo: wxRedirectToPromise
}
