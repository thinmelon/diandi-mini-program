// pages/shopping/buy/buy.js

const __PRICE__ = require('../../../utils/math.price.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cart: [],
		subtotal: 0.00,
		carriage: 0.00,
		total: 0.00,
		message: '',
		isConsigneeSet: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var
			subtotal = 0,
			total = 0;

		this.data.cart = JSON.parse(options.cart);
		this.data.subtotal = __PRICE__.totalPrice(this.data.cart);
		// 总金额（包含运费）
		this.data.total = Math.round((this.data.subtotal + this.data.carriage) * 100) / 100;

		this.setData({
			cart: this.data.cart,
			subtotal: this.data.subtotal,
			total: this.data.total
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
	 *  添加 收件人地址
	 */
	bindTapDeliveryAddress: function () {
		wx.navigateTo({
			url: '/pages/my/consignee/consignee'
		})
	},

	/**
	 *   记录用户留言
	 */
	bindInputFunc: function (e) {
		this.data.message = e.detail.value;
	},

	/**
	 *   提交订单
	 *     --  微信支付
	 */
	bindTapSubmitOrder: function () {
		var i,
			body = "",
			length,
			shoppingList = [];

		if (false === this.data.isConsigneeSet) {
			wx.showToast({
				title: '收件地址未设置',
				duration: 3000,
				image: '/icons/public/hint.png'
			});
			return;
		}
	}
})