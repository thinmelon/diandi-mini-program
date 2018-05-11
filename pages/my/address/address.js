// pages/my/address/address.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		aid: 0,
		receiver: "",
		mobile: "",
		address: "",
		postcode: ""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.info(options);

		this.setData({
			aid: options.aid || this.data.aid,
			receiver: options.name || this.data.receiver,
			mobile: options.mobile || this.data.mobile,
			address: options.address || this.data.address,
			postcode: options.postcode || this.data.postcode
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

	bindTapChooseLocation: function () {
		var that = this;
		wx.chooseLocation({
			success: function (res) {
				console.info(res);
				that.setData({
					address: res.address
				});
			}
		});
	},

	bindTapSubmit: function () {

	},

	bindInputFunc: function (e) {
		switch (e.currentTarget.dataset.field) {
			case "receiver":
				this.data.receiver = e.detail.value;
				break;
			case "mobile":
				this.data.mobile = e.detail.value;
				break;
			case "address":
				this.data.address = e.detail.value;
				break;
			case "postcode":
				this.data.postcode = e.detail.value;
				break;
			default:
				break;
		}
	}
})