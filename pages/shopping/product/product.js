// pages/shopping/product/product.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperHeight: 320,
        product: {}
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
            price: '0.01',
            freight: 0,
            remaining: 0,
            totalSale: 0
        };
        const scale = wx.getStorageSync('__WindowScale__');
        this.setData({
            product: mockData,
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

    bindTapBackToMall: function (e) {
        wx.redirectTo({
            url: '/pages/shopping/mall/mall',
        })
    },

    bindTapBackToCart: function (e) {
        wx.redirectTo({
            url: '/pages/shopping/cart/cart',
        })
    },

    bindTapJoinToCart: function (e) {

    },

    bindTapBuy: function (e) {

    },

    bindTapSelector: function () {
        var that = this;

        function lift() {
            if (that.data.maskSelectorMarginBottom < 0) {
                that.data.maskSelectorMarginBottom += 100;
                that.setData({
                    maskStyle: "display: block;",
                    maskSelectorStyle: "display: block; height: " + that.data.maskSelectorHeight + "rpx; margin-bottom: " + that.data.maskSelectorMarginBottom + "rpx;",
                    maskSelectorMarginBottom: that.data.maskSelectorMarginBottom
                });
                setTimeout(lift, 50);
            }
        }

        lift();
    },

    bindTapCloseMasker: function () {
        this.data.maskSelectorMarginBottom = -this.data.maskSelectorHeight;
        this.setData({
            maskStyle: "display: none;",
            maskSelectorStyle: "display: none; height: " + this.data.maskSelectorHeight + "rpx; margin-bottom: " + this.data.maskSelectorMarginBottom + "rpx;",
            maskSelectorMarginBottom: this.data.maskSelectorMarginBottom
        });
    },
})