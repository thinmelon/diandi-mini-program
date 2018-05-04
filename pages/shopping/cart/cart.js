// pages/shopping/cart/cart.js
const mockData = [
	{
		"skuid": 4,
		"name": "有机食物大集合 | 健康过冬",
		"unit": 0.04,
		"amount": 2,
		"attributes": ["颜色: 黄", "规格: S"]
	},
	{
		"skuid": 3,
		"name": "有机食物大集合 | 健康过冬",
		"unit": 0.03,
		"amount": 3,
		"attributes": ["颜色: 黄", "规格: S"]
	},
	{
		"skuid": 2,
		"name": "有机食物大集合 | 健康过冬",
		"unit": 0.02,
		"amount": 1,
		"attributes": ["颜色: 黄", "规格: S"]
	}
];

const __PRICE__ = require('../../../utils/math.price.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		hint: "购物车空空也~ ~",
		editBtnText: "编辑",
		subtotal: 0.00,
		cart: Array,
		selectAll: false,
		editModal: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (mockData.length > 0) {
			this.setData({
				hint: "",
				subtotal: __PRICE__.checkedPrice(mockData),
				cart: mockData
			});
		}
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
	 *   结算
	 */
	bindTapSettleAccount: function () {
		var i,
			length,
			final = [];

		for (i = 0, length = this.data.cart.length; i < length; i++) {
			if (this.data.cart[i].checked) {
				final.push(this.data.cart[i]);
			}
		}

		if (final.length > 0) {
			// TODO:  跳转至 待付款订单 页面
			wx.navigateTo({
				url: '/pages/shopping/buy/buy?cart=' + JSON.stringify(final)
			})
		} else {
			wx.showToast({
				title: '选择要买的商品',
				image: "/icons/public/hint.png",
				duration: 3000
			})
		}
	},

	/**
	 *   编辑
	 */
	bindTapEdit: function (e) {
		this.data.editModal = !this.data.editModal;
		if (this.data.editModal) {
			this.data.editBtnText = '完成'
		} else {
			this.data.editBtnText = '编辑'
		}
		this.setData({
			editBtnText: this.data.editBtnText,
			editModal: this.data.editModal
		})
	},

	/**
	 *   删除
	 */
	bindTapDelete: function (e) {
		var index = this.getIndex(this.data.cart, e.currentTarget.dataset.skuid);
		if (index > -1) {
			this.data.cart.splice(index, 1);
			this.setData({
				subtotal: __PRICE__.checkedPrice(this.data.cart),
				cart: this.data.cart
			})
		}
	},

	getIndex: function (cart, id) {
		var i,
			length;

		for (i = 0, length = cart.length; i < length; i++) {
			if (cart[i].skuid === id) {
				return i;
			}
		}
		return -1;
	},

	/**
	 *   单选
	 */
	cartCheckboxChange: function (e) {
		var i,
			j,
			length,
			count;

		for (i = 0, length = this.data.cart.length; i < length; i++) {
			this.data.cart[i].checked = false;
			for (j = 0, count = e.detail.value.length; j < count; j++) {
				if (this.data.cart[i].skuid === parseInt(e.detail.value[j])) {
					this.data.cart[i].checked = true;
					break;
				}
			}
		}

		this.setData({
			cart: this.data.cart,
			subtotal: __PRICE__.checkedPrice(this.data.cart)
		});
	},

	/**
	 *   全选 
	 */
	selectAllCheckboxChange: function (e) {
		var i, length;

		this.data.selectAll = !this.data.selectAll;
		for (i = 0, length = this.data.cart.length; i < length; i++) {
			this.data.cart[i].checked = this.data.selectAll;
		}
		this.setData({
			cart: this.data.cart,
			subtotal: __PRICE__.checkedPrice(this.data.cart),
			selectAll: this.data.selectAll
		})
	}
})