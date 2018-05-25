// pages/shopping/order/order.js
const __PRICE__ = require('../../../utils/math.price.js');
const __WX_PAY_SERVICE__ = require('../../../services/wechat.pay.service.js');
const __USER_SERVICE__ = require('../../../services/credential.service.js');
const __WX_API_PROMISE__ = require('../../../utils/wx.api.promise.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order: {},
		subtotal: 0.00
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const that = this;
		console.log(options);
		const order = JSON.parse(options.order);
		// console.log(order);

		__WX_PAY_SERVICE__
			.queryOrder(order.out_trade_no)
			.then(res => {
				console.log(res)
				if (res.data.code === 0) {
					//	创建时间
					order.createTime = res.data.msg[0].createTime;
					//  支付时间
					order.payTime = res.data.msg[0].payTime;
					//  找到状态值相应的文字描述
					order.status = __WX_PAY_SERVICE__.__ENUM_ORDER_STATUS__[res.data.msg[0].status];
					//  订单总金额，保留小数点后两位，单位：元
					order.totalFee = (res.data.msg[0].totalFee / 100).toFixed(2);
					//  运费
					order.freight = res.data.msg[0].freight;
					//  附加信息，如用户留言
					order.attach = res.data.msg[0].attach;
					//	收件人信息
					order.consignee = {
						receiver: res.data.msg[0].name,				//	姓名
						address: res.data.msg[0].address,			//	地址
						mobile: res.data.msg[0].mobile,				//	手机号码
						postcode: res.data.msg[0].postcode		  //  邮政编码
					}

					that.setData({
						subtotal: __PRICE__.totalPrice(order.skuList),
						order: order
					})
				}	/** end of if */
			});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	/**
	 *  申请退款
	 */
	bindTapRefund: function () {
		var i, length, skuList = [];

		for (i = 0, length = this.data.order.skuList.length; i < length; i++) {
			skuList.push(this.data.order.skuList[i].stock_no);
		}

		__USER_SERVICE__
			.submitRefund(
			wx.getStorageSync('__SESSION_KEY__'),      //  用户 session
			this.data.order.out_trade_no,
			Math.round(this.data.order.totalFee * 100),
			Math.round(this.data.order.totalFee * 100),
			'拍错了，不是我想要的。。。',
			JSON.stringify(skuList))
			.then(res => {
				console.log(res);
				if (res.data.code === 0) {
					__WX_API_PROMISE__
						.showToast('已申请退款', 'success', '')   //  提示
						.then(() => __WX_API_PROMISE__.redirectTo('/pages/my/orders/orders'))	//	跳转至 我的订单
				} else if (res.data.code === -500) {
					__WX_API_PROMISE__
						.showToast('已提交，请等待', 'none', '/icons/public/hint.png')		//	提示
						.then(() => __WX_API_PROMISE__.redirectTo('/pages/my/orders/orders'))	//	跳转至 我的订单
				}
			})
	}
})