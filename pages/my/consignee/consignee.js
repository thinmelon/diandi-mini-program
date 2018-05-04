// pages/my/consignee/consignee.js
const mockData = [
	{
		aid: 1,
		isDefault: 1,
		name: '李云鹏',
		mobile: '18159393355',
		address: '福建省莆田市城厢区凤凰山街道学园南街宝厦日月潭2504室',
		postcode: '351100'
	},
	{
		aid: 2,
		isDefault: 0,
		name: '李小鹏',
		mobile: '18159393355',
		address: '福建省莆田市涵江区凤凰山街道学园南街宝厦日月潭2504室',
		postcode: '351111'
	}

];
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		consignees: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			consignees: mockData
		})
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

	bindTapAdd: function (e) {
		console.info(e);
		wx.navigateTo({
			url: '/pages/my/address/address?aid=0'
		});
	},

	bindTapEdit: function (e) {
		wx.navigateTo({
			url: '/pages/my/address/address?aid=' + e.currentTarget.id +
			'&name=' + e.currentTarget.dataset.name +
			'&mobile=' + e.currentTarget.dataset.mobile +
			'&address=' + e.currentTarget.dataset.address +
			'&postcode=' + e.currentTarget.dataset.postcode
		});
	},

	bindTapDelete: function () {

	},

	radioChange: function (e) {
		wx.showToast({
			title: '设置默认地址',
		})
	}

})