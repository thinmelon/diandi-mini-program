// pages/shopping/order/order.js
const __PRICE__ = require('../../../utils/math.price.js');
const __WX_PAY_SERVICE__ = require('../../../services/wechat.pay.service.js');

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
		const order = JSON.parse(options.order);
		// console.log(order);

		__WX_PAY_SERVICE__
			.queryOrder(order.out_trade_no)
			.then(res => {
				console.log(res)
				if(res.data.code === 0){
					order.freight = res.data.msg[0].freight;
					order.attach = res.data.msg[0].attach;
					order.payTime = res.data.msg[0].payTime;
					order.consignee = {
						receiver: res.data.msg[0].name,
						address: res.data.msg[0].address,
						mobile: res.data.msg[0].mobile,
						postcode: res.data.msg[0].postcode
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

	bindTapRefund: function(){
		
	}
})