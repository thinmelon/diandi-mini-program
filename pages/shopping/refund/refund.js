// pages/shopping/refund/refund.js
const __CRYPT__ = require('../../../utils/crypt.js');
const __WX_PAY_SERVICE__ = require('../../../services/shopping.service.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        createTime: '',
        completeTime: '',
        refund: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        this.data.order = JSON.parse(options.order);

        __WX_PAY_SERVICE__
            .queryRefundInfo( //  查询退款单
                encodeURIComponent(__CRYPT__.encryptData('')),
                this.data.order.out_trade_no
            )
            .then(res => {
                console.log(res);
                if (res.data.code === 0) {
                    that.setData({
                        createTime: res.data.data.createTime,
                        completeTime: res.data.data.completeTime,
                        refund: res.data.data.refund
                    });
                }
            });
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

    }
})