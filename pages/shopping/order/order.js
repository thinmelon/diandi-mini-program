// pages/shopping/order/order.js
const __PRICE__ = require('../../../utils/math.price.js');
const __WX_PAY_SERVICE__ = require('../../../services/wechat.pay.service.js');
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
		wx.navigateTo({
			url: '/pages/shopping/refund-reason/refund-reason?order=' + JSON.stringify(this.data.order)
		})
	},

	/**
	 * 	查询退款单
	 */
	bindTapQueryRefund: function () {
		wx.navigateTo({
			url: '/pages/shopping/refund/refund?order=' + JSON.stringify(this.data.order)
		})
	},

	/**
	 * 	重新支付
	 */
	bindTapRepay: function () {
		__WX_PAY_SERVICE__
			.repay(																				  //  发起重新支付的动作
			wx.getStorageSync('__SESSION_KEY__'),      				//  用户 session
			this.data.order.out_trade_no
			)
			.then(__WX_API_PROMISE__.requestPayment)        //  调用支付接口
			.then(res => {
				// 支付成功
				if (res.errMsg === 'requestPayment:ok') {
					__WX_API_PROMISE__
						.showToast('支付成功', 'success', '')   //  提示
						.then(() => __WX_API_PROMISE__.redirectTo('/pages/my/orders/orders'))	//	跳转至 我的订单
				}
			}, res => {
				if (res.errMsg === "requestPayment:fail cancel") {
					// 用户取消支付
					__WX_API_PROMISE__
						.showToast('支付已取消', 'none', '/icons/public/hint.png')		//	提示
				} else {
					// 订单已过期，请重新下单
					__WX_API_PROMISE__
						.showToast(res.err_desc, 'none', '/icons/public/hint.png')		//	提示
				}
			})
	},

	/**
	 *  关闭订单
	 */
	bindTapCloseOrder: function () {
		__WX_PAY_SERVICE__
			.closeOrder(																		//  发起重新支付的动作
			wx.getStorageSync('__SESSION_KEY__'),      				//  用户 session
			this.data.order.out_trade_no
			)
			.then(res => {
				console.log(res);
				if (res.data.code === 0) {
					__WX_API_PROMISE__
						.showToast('已关闭', 'success', '')   //  提示
						.then(() => __WX_API_PROMISE__.redirectTo('/pages/my/orders/orders'))	//	跳转至 我的订单
				}
			});
	}
})