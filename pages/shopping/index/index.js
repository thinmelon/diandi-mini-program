// pages/shopping/index/index.js
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
		let mockData = [
			{
				id: 1,
				cover: 'https://pusu.oss-cn-shenzhen.aliyuncs.com/baby/sample/pc_271079.jpg?Expires=1525082290&OSSAccessKeyId=TMP.AQHeQVYf2TPuA1r0ANA3Ke85y9fQrG_J9wqVBP86n8m9idxdBccdLprhFKDvADAtAhQo-_0AAE-ARSvgi4QfzS0oNtn4ugIVALzhUWCyFem-oW0t_Ybs_uZYfo5K&Signature=4DvnPvzTvgXDc52GmcR6tKcYLj0%3D',
				title: '有机食物大集合 | 健康过冬',
				brief: '来自：墨刀模板城 | 19人已购买'
			},
			{
				id: 2,
				cover: 'https://pusu.oss-cn-shenzhen.aliyuncs.com/baby/sample/pc_321868.jpg?Expires=1525082347&OSSAccessKeyId=TMP.AQHeQVYf2TPuA1r0ANA3Ke85y9fQrG_J9wqVBP86n8m9idxdBccdLprhFKDvADAtAhQo-_0AAE-ARSvgi4QfzS0oNtn4ugIVALzhUWCyFem-oW0t_Ybs_uZYfo5K&Signature=HDRa8Ne6zESGYYfpHGdGnOMf2Os%3D',
				title: '春风十里不如你 | 女神心机衣着style',
				brief: '来自：瞎说呗 | 21人已购买'
			}
		]
		this.setData({
			collections: mockData
		})
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
		console.log(e);
		// TODO:  跳转至商品详情页
		wx.navigateTo({
			url: '/pages/shopping/product/product'
		})
	}
})