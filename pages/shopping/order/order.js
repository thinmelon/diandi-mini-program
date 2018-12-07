// pages/shopping/order/order.js
const __CRYPT__ = require('../../../utils/crypt.js');
const __PRICE__ = require('../../../utils/math.price.js');
const __WX_API_PROMISE__ = require('../../../utils/wx.api.promise.js');
const __WX_PAY_SERVICE__ = require('../../../services/shopping.service.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isReady: false, //是否已加载完成
        order: {}, //订单信息
        subtotal: 0.00, //小计
        card: [] //已领取的卡券信息
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this,
            order = JSON.parse(options.order);

        this.setData({
            subtotal: __PRICE__.totalPrice(order.skuList),
            order: order
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
        this.queryUserCardsWrapper();
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

    /**
     *  申请退款
     */
    bindTapRefund: function() {
        wx.navigateTo({
            url: '/pages/shopping/refund-reason/refund-reason?order=' + JSON.stringify(this.data.order)
        })
    },

    /**
     * 	查询退款单
     */
    bindTapQueryRefund: function() {
        wx.navigateTo({
            url: '/pages/shopping/refund/refund?order=' + JSON.stringify(this.data.order)
        })
    },

    /**
     * 	重新支付
     */
    bindTapRepay: function() {
        __WX_PAY_SERVICE__
            .repay( //  发起重新支付的动作
                wx.getStorageSync('__SESSION_KEY__'), //  用户 session
                this.data.order.out_trade_no
            )
            .then(__WX_API_PROMISE__.requestPayment) //  调用支付接口
            .then(res => {
                // 支付成功
                if (res.errMsg === 'requestPayment:ok') {
                    __WX_API_PROMISE__
                        .showToast('支付成功', 'success', '') //  提示
                        .then(() => __WX_API_PROMISE__.redirectTo('/pages/my/orders/orders')) //	跳转至 我的订单
                }
            }, res => {
                if (res.errMsg === "requestPayment:fail cancel") {
                    // 用户取消支付
                    __WX_API_PROMISE__
                        .showToast('支付已取消', 'none', '/icons/public/hint.png') //	提示
                } else {
                    // 订单已过期，请重新下单
                    __WX_API_PROMISE__
                        .showToast(res.err_desc, 'none', '/icons/public/hint.png') //	提示
                }
            })
    },

    /**
     *  关闭订单
     */
    bindTapCloseOrder: function() {
        __WX_PAY_SERVICE__
            .closeOrder( //  发起重新支付的动作
                wx.getStorageSync('__SESSION_KEY__'), //  用户 session
                this.data.order.out_trade_no
            )
            .then(res => {
                console.log(res);
                if (res.data.code === 0) {
                    __WX_API_PROMISE__
                        .showToast('已关闭', 'success', '') //  提示
                        .then(() => __WX_API_PROMISE__.redirectTo('/pages/my/orders/orders')) //	跳转至 我的订单
                }
            });
    },

    /**
     * 	领取至微信卡包
     */
    bindTapCardHolder: function(evt) {
        let that = this;

        __WX_PAY_SERVICE__
            .putIntoCardHolder( //	放入微信卡包
                wx.getStorageSync('__SESSION_KEY__'), //  用户 session
                evt.currentTarget.dataset.pid,
                this.data.order.out_trade_no
            )
            .then(result => {
                console.log(result);
                //领取成功后
                if (result.errMsg === 'addCard:ok' &&
                    result.cardList.length > 0 &&
                    result.cardList[0].isSuccess) {
                    let cardExt = JSON.parse(result.cardList[0].cardExt);
                    let cardList = result.cardList.map(card => {
                        return {
                            cardId: card.cardId,
                            code: card.code
                        }
                    })
                    that.setData({
                        card: cardList
                    });
                    //记录用户领取记录
                    __WX_PAY_SERVICE__
                        .recordUserCard(
                            wx.getStorageSync('__SESSION_KEY__'), //	SESSION
                            result.cardList[0].cardId, //卡券ID
                            cardExt.openid, //用户
                            cardExt.timestamp, //创建时间戳
                            that.data.order.out_trade_no, //交易ID
                            result.cardList[0].code) //卡券CODE
                        .then(res => {
                            console.log(res);
                            wx.showToast({
                                title: '成功领取'
                            });
                        });
                }
            })
            .catch(err => {
                console.error(err);
            })
    },

    /**
     *  出示卡券
     */
    bindTapShowCard: function() {
        __WX_PAY_SERVICE__
            .openUserCardList(
                wx.getStorageSync('__SESSION_KEY__'),
                JSON.stringify([this.data.order.out_trade_no])
            )
            .then(res => {
                console.log(res);
            })
    },

    /**
     * 	查询用户是否已经领取过卡券
     */
    queryUserCards: function() {
        let that = this;

        __WX_PAY_SERVICE__
            .queryUserCards(
                wx.getStorageSync('__SESSION_KEY__'), //	SESSION
                JSON.stringify([this.data.order.out_trade_no])
            )
            .then(res => {
                console.log(res)
                if (res.data.code === 0 && res.data.msg.length > 0) {
                    let cardList = res.data.msg.map(card => {
                        return {
                            cardId: card.cardid,
                            code: card.code
                        }
                    })
                    that.setData({
                        card: cardList
                    });
                }
            });
    },

    queryUserCardsWrapper: function() {
        if (this.data.isReady) {
            this.queryUserCards();
        } else {
            setTimeout(() => {
                this.queryUserCardsWrapper();
            }, 1000);
        }
    }
})