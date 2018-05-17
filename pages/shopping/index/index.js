// pages/shopping/index/index.js
const __SHOPPING__ = require('../../../services/wechat.pay.service.js');

Page({

    /**
     * 页面的初始数据
     */
	data: {
		collections: Array
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {

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
		let that = this;

		__SHOPPING__
			.fetchProductList()
			.then(res => {
				console.log(res)
				that.setData({
					collections: res.data.msg
				})
			});

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

	bindTapCollections: function (e) {
		wx.navigateTo({
			url: '/pages/shopping/product/product?product=' + JSON.stringify(e.currentTarget.dataset.product)
		})
	}
})