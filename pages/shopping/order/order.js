// pages/shopping/order/order.js
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
	  cart: [],
	  subtotal: 0.00,
	  consignee: '',
	  mobile: '',
	  address: '',
	  message: '',
	  cashFee: 0.00
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  if (mockData.length > 0) {
		  this.setData({
			  subtotal: __PRICE__.checkedPrice(mockData),
			  cart: mockData,
			  consignee: '李云鹏',
			  mobile: '18159393355',
			  address: '福建省莆田市城厢区凤凰山街道学园南街宝厦日月潭2504室',
			  message: '请在非工作日时间内送达'
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
  
  }
})