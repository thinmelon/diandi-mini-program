// pages/shopping/product/product.js
const mockData = {
	swiper: [
		{
			index: 1,
			url: 'https://pusu.oss-cn-shenzhen.aliyuncs.com/baby/sample/pc_787568.jpg?Expires=1525170192&OSSAccessKeyId=TMP.AQH35oip0f6dF452hdLstMN3hl3Y1gbGvKl79lDURhLRjweekYNOu8vHzaaCADAtAhRuL_Zrjqdlgn7wT8he9o-nvS6DyQIVAJIflK-2iqOTzF2bWa6uusBT-Se4&Signature=aVUocTR%2FqiaU75Y9fsG%2BjyAe7%2Bc%3D'
		},
		{
			index: 2,
			url: 'https://pusu.oss-cn-shenzhen.aliyuncs.com/baby/sample/pc_882754.jpg?Expires=1525170181&OSSAccessKeyId=TMP.AQH35oip0f6dF452hdLstMN3hl3Y1gbGvKl79lDURhLRjweekYNOu8vHzaaCADAtAhRuL_Zrjqdlgn7wT8he9o-nvS6DyQIVAJIflK-2iqOTzF2bWa6uusBT-Se4&Signature=KfAJ94rs9vtrp9W4msdeB7HNP5U%3D'
		},
		{
			index: 3,
			url: 'https://pusu.oss-cn-shenzhen.aliyuncs.com/baby/sample/pc_909252.jpg?Expires=1525170204&OSSAccessKeyId=TMP.AQH35oip0f6dF452hdLstMN3hl3Y1gbGvKl79lDURhLRjweekYNOu8vHzaaCADAtAhRuL_Zrjqdlgn7wT8he9o-nvS6DyQIVAJIflK-2iqOTzF2bWa6uusBT-Se4&Signature=lCX5W%2F09RBfFuKBzGJwF9FsLeqw%3D'
		}
	],
	name: '有机食物大集合 | 健康过冬',
	freight: 0,
	totalSale: 0,
	standards: [
		{
			attribute: '颜色',
			collections: [
				{
					skuValueId: 1,
					value: '红'
				},
				{
					skuValueId: 2,
					value: '黄'
				},
				{
					skuValueId: 3,
					value: '蓝'
				}
			]
		},
		{
			attribute: '规格',
			collections: [
				{
					skuValueId: 4,
					value: 'S'
				},
				{
					skuValueId: 5,
					value: 'M'
				},
				{
					skuValueId: 6,
					value: 'L'
				}
			]
		}
	],
	sku: [
		{
			skuId: 1,
			unit: 0.01,
			stock: 0,
			sales: 0,
			attributes: '1,4',
			productId: 1
		},
		{
			skuId: 2,
			unit: 0.02,
			stock: 20,
			sales: 0,
			attributes: '1,5',
			productId: 1
		},
		{
			skuId: 3,
			unit: 0.03,
			stock: 30,
			sales: 0,
			attributes: '1,6',
			productId: 1
		},
		{
			skuId: 4,
			unit: 0.04,
			stock: 40,
			sales: 0,
			attributes: '2,4',
			productId: 1
		},
		{
			skuId: 5,
			unit: 0.05,
			stock: 50,
			sales: 0,
			attributes: '2,5',
			productId: 1
		},
		{
			skuId: 6,
			unit: 0.06,
			stock: 60,
			sales: 0,
			attributes: '2,6',
			productId: 1
		},
		{
			skuId: 7,
			unit: 0.07,
			stock: 70,
			sales: 0,
			attributes: '3,4',
			productId: 1
		},
		{
			skuId: 8,
			unit: 0.08,
			stock: 80,
			sales: 0,
			attributes: '3,5',
			productId: 1
		},
		{
			skuId: 9,
			unit: 0.09,
			stock: 90,
			sales: 0,
			attributes: '3,6',
			productId: 1
		}
	]
};

Page({

    /**
     * 页面的初始数据
     */
	data: {
		swiperHeight: 320,					  //  滚动图片的高度
		product: {},								//  商品信息
		amount: 1,								   //  当前SKU的购买数量
		price: '0.01', 								 //  当前SKU的单位价格
		remaining: 0,							  //  当前SKU剩余的库存
		chosenSkuId: 0,						   //  选中的SKU的ID
		chosenItems: [],						//  已选择的参数
		toView: '',									//  定位至View的Id
		scrollViewHeight: 0					//  ScrollView的高度
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
		const scale = wx.getStorageSync('__WindowScale__');

		this.setData({
			product: mockData,
			scrollViewHeight: scale.height,
			swiperHeight: scale.width
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

	/**
	 *   跳转至商城
	 */
	bindTapBackToMall: function (e) {
		wx.redirectTo({
			url: '/pages/shopping/mall/mall',
		})
	},

	/**
	 *   跳转至购物车
	 */
	bindTapBackToCart: function (e) {
		wx.redirectTo({
			url: '/pages/shopping/cart/cart',
		})
	},

	/**
	 *   加入购物车
	 */
	bindTapJoinToCart: function (e) {

	},

	/**
	 *    购买
	 */
	bindTapBuy: function (e) {
		var i,
			length,
			index,
			attributes = [],
			_cart = [];

		index = this.isHit();
		// 如果商品参数未全部设定，则将页面滚动至指定位置
		if (index === -1) {
			this.setData({
				toView: 'intro'
			})
		} else {
			if (0 === this.data.remaining) {
				wx.showToast({
					title: '没有库存',
					image: "/icons/public/hint.png"
				})
			} else {
				for (i = 0, length = this.data.chosenItems.length; i < length; i++) {
					attributes.push(this.getSku(this.data.chosenItems[i]));
				}
				console.log(attributes);

				_cart.push({
					skuid: this.data.chosenSkuId,
					name: this.data.product.name,
					unit: this.data.price,
					amount: this.data.amount,
					attributes: attributes
					// thumbnail: this.data.product.swiper[0].url
				});

				// TODO:  跳转至 待付款订单 页面
				wx.navigateTo({
					url: '/pages/shopping/buy/buy?cart=' + JSON.stringify(_cart)
				})
			}
		}
	},

	/**
	 *   选择规格参数
	 */
	bindTapChooseItem: function (e) {
		var i, j, count, length, vid, index;

		const currentChosenAttribute = e.currentTarget.dataset.attribute;
		const currentChosenValueId = e.currentTarget.dataset.valueid;

		// 遍历standards数组
		for (i = 0, count = this.data.product.standards.length; i < count; i++) {
			// 判断是否等于当前的attribute
			if (this.data.product.standards[i].attribute === currentChosenAttribute) {
				for (j = 0, length = this.data.product.standards[i].collections.length; j < length; j++) {
					// 遍历已选择的元素数组 chosenItems 
					index = this.data.chosenItems.indexOf(this.data.product.standards[i].collections[j].skuValueId);
					// 判断是否等于当前的 valueId
					if (currentChosenValueId === this.data.product.standards[i].collections[j].skuValueId) {
						this.data.product.standards[i].collections[j].enable = true;
						// 判断是否已在数组 chosenItems
						if (index === -1) {
							this.data.chosenItems.push(this.data.product.standards[i].collections[j].skuValueId)
						}
					} else {
						// 判断其之前是否已选中
						if (this.data.product.standards[i].collections[j].enable) {
							this.data.product.standards[i].collections[j].enable = false;
							if (index > -1) {
								this.data.chosenItems.splice(index, 1);
							}
						}
					}
				}
				break;
			}
		}	/** end of for */
		index = this.isHit();
		if (index === -1) {
			this.setData({
				product: this.data.product
			});
		} else {
			// 命中
			// 设置为对应的SKU参数
			this.setData({
				amount: 1,
				product: this.data.product,
				chosenSkuId: this.data.product.sku[index].skuId,
				price: this.data.product.sku[index].unit,
				remaining: this.data.product.sku[index].stock
			})
		}
	},

	bindTapMinus: function () {
		if (this.data.amount > 1) {
			this.data.amount--;
			this.setData({
				amount: this.data.amount
			});
		}
	},

	bindTapAdd: function () {
		if (this.data.amount < this.data.remaining) {
			this.data.amount++;
			this.setData({
				amount: this.data.amount
			});
		}
	},

	/**
	 *   判断是否已选择全部参数
	 */
	isHit: function () {
		var i, count, currentStandards;

		//  如果已选参数数组长度不足，直接返回 -1
		if (this.data.chosenItems.length === this.data.product.standards.length) {
			currentStandards = this.data.chosenItems.sort().join(',');
			//  遍历sku数组，找到对应参数的 SKU
			for (i = 0, count = this.data.product.sku.length; i < count; i++) {
				if (currentStandards === this.data.product.sku[i].attributes.split(',').sort().join(',')) {
					return i;		// 返回sku数组的索引值 
				}
			}
		}
		return -1;
	},

	getSku: function (skuValueId) {
		var i,
			j,
			count,
			length;

		for (i = 0, count = this.data.product.standards.length; i < count; i++) {
			for (j = 0, length = this.data.product.standards[i].collections.length; j < length; j++) {
				if (skuValueId === this.data.product.standards[i].collections[j].skuValueId) {
					return this.data.product.standards[i].attribute + ": " + this.data.product.standards[i].collections[j].value;
				}
			}
		}
		return "";
	}
})