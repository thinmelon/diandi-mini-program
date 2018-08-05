// pages/official/index/index.js
const __STORAGE__ = require('../../../services/storage.service.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        newsList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;

        __STORAGE__
            .fetchOfficialMaterial(options.mid)
            .then(res => {
                console.log(res);
                if (res.errMsg === 'request:ok') {
                    if (res.data.news_item.length === 1) {
                        //  仅有一篇文章，直接跳转至文章详情
                        wx.redirectTo({
                            url: '/pages/official/news/news?url=' + encodeURIComponent(res.data.news_item[0].url)
                        });
                    } else if (res.data.news_item.length > 1) {
                        //  不只一篇文章，以列表形式呈现
                        that.setData({
                            newsList: res.data.news_item
                        })
                    }
                }
            })
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

    bindTapNews: function(e) {
        wx.navigateTo({
            url: '/pages/official/news/news?url=' + encodeURIComponent(e.currentTarget.dataset.url)
        });
    }
})