// pages/shopping/index/index.js
const __URI__ = require('../../../utils/uri.constant.js');
const __DATE__ = require('../../../utils/date.formatter.js');
const __SHOPPING__ = require('../../../services/wechat.pay.service.js');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        collections: Array,
        swiperHeight: 320, //  滚动图片的高度
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (getApp().isLogIn) {
			this.fetchProductList();
        } else {
            setTimeout(() => {
				this.fetchProductList();
            }, 1000);
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    bindTapCollections: function(e) {
        wx.navigateTo({
            url: '/pages/shopping/product/product?product=' + JSON.stringify(e.currentTarget.dataset.product)
        })
    },

    fetchProductList: function() {
        let that = this;

        __SHOPPING__
            .fetchProductList(
                wx.getStorageSync('__SESSION_KEY__'),
                __DATE__.formatTime(new Date()),
                10)
            .then(res => {
                console.log(res)
                if (res.data.code === 0) {
                    let products = res.data.msg.product.map(item => {
                        let thumbnails = res.data.msg.gallery.filter(image => {
                            return image.productid === item.pid;
                        }).map(thumbnail => {
                            thumbnail.name = __URI__.imageUrlPrefix(thumbnail.name);
                            return thumbnail;
                        })
                        item.name = decodeURIComponent(item.name);
                        item.thumbnails = thumbnails;

                        return item;
                    })
                    console.log(products);

                    that.setData({
                        collections: products
                    })
                }

            });
    }
})