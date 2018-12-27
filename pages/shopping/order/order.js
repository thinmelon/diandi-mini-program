// pages/shopping/order/order.js
const __CRYPT__ = require('../../../utils/crypt.js');
const __PRICE__ = require('../../../utils/math.price.js');
const __WX_API_PROMISE__ = require('../../../utils/wx.api.promise.js');
const __SHOPPING_SERVICE__ = require('../../../services/shopping.service.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        order: {}, //订单信息
        subtotal: 0.00, //小计
        isCoupon: false, //是否虚拟商品
        cardId: '' //已领取的卡券ID
    },

    /**
     * 用于记录卡券的商品ID
     */
    productId: '',

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this,
            order = JSON.parse(options.order);

        console.log(order);
        order.skuList.map(sku => { //	判断是否是卡券类商品
            if (sku.type === 1) {
                this.data.isCoupon = true;
                this.productId = sku.pid;
            }
            return sku;
        })
        order.freight = order.freight ? order.freight : 0.00; //运费默认为0
        this.setData({
            subtotal: __PRICE__.totalPrice(order.skuList), //总价
            isCoupon: this.data.isCoupon, //是否卡券
            order: order //订单详情
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
        this.queryUserCards();
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
        __SHOPPING_SERVICE__
            .repay( //  发起重新支付的动作
                encodeURIComponent(__CRYPT__.encryptData('')),
                wx.getStorageSync('__AUTHORIZER_APPID__'),
                this.data.order.out_trade_no
            )
            .then(__WX_API_PROMISE__.requestPayment) //  调用支付接口
            .then(res => {
                if (res.errMsg === 'requestPayment:ok') { // 支付成功
                    __WX_API_PROMISE__
                        .showToast('支付成功', 'success', '') //  提示
                        .then(() => __WX_API_PROMISE__.redirectTo('/pages/my/orders/orders')) //	跳转至 我的订单
                }
            }, res => {
                if (res.errMsg === "requestPayment:fail cancel") { // 用户取消支付
                    __WX_API_PROMISE__
                        .showToast('支付已取消', 'none', '/icons/public/hint.png') //	提示
                } else { // 订单已过期，请重新下单
                    __WX_API_PROMISE__
                        .showToast(res.err_desc, 'none', '/icons/public/hint.png') //	提示
                }
            })
    },

    /**
     *  关闭订单
     */
    bindTapCloseOrder: function() {
        __SHOPPING_SERVICE__
            .closeOrder( //  发起重新支付的动作
                encodeURIComponent(__CRYPT__.encryptData('')), //  用户 session
                wx.getStorageSync('__AUTHORIZER_APPID__'),
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
     * 	查询用户是否已经领取过卡券
     */
    queryUserCards: function() {
        let that = this;

        __SHOPPING_SERVICE__
            .queryUserCards(
                encodeURIComponent(__CRYPT__.encryptData('')),
                this.data.order.out_trade_no
            )
            .then(res => {
                console.log(res)
                if (res.data.code === 0 && res.data.data.hasOwnProperty('card')) {
                    that.setData({
                        cardId: res.data.data.card.id
                    });
                }
            });
    },

    /**
     * 	将领取卡券以及成功领取后记录操作两个步骤封装起来
     */
    bindTapCardHolder: function() {
        let that = this,
            orderId = this.data.order.out_trade_no;

        __SHOPPING_SERVICE__
            .putIntoCardHolder( //	放入微信卡包
                encodeURIComponent(__CRYPT__.encryptData('')),
                wx.getStorageSync('__AUTHORIZER_APPID__'),
                this.productId,
                orderId
            )
            .then(result => {
                console.log(result);
                //领取成功后
                if (result.errMsg === 'addCard:ok' &&
                    result.cardList.length > 0 &&
                    result.cardList[0].isSuccess) {
                    let cardExt = JSON.parse(result.cardList[0].cardExt);
                    //记录用户领取记录
                    __SHOPPING_SERVICE__
                        .recordUserCard(
                            encodeURIComponent(__CRYPT__.encryptData('')),
                            result.cardList[0].cardId, //卡券ID
                            cardExt.openid, //用户
                            cardExt.timestamp, //创建时间戳
                            orderId, //交易订单号
                            result.cardList[0].code) //卡券CODE
                        .then(res => {
                            console.log(res);
                            if (res.data.code === 0) {
                                that.setData({
                                    cardId: result.cardList[0].cardId
                                });
                                wx.showToast({
                                    title: '成功领取卡券'
                                });
                            } else {
                                wx.showToast({
                                    title: '领取卡券失败'
                                });
                            }
                        });
                }
            })
            .catch(err => {
                console.error(err);
            });
    },

    /**
     *  出示卡券
     */
    bindTapShowCard: function() {
        __SHOPPING_SERVICE__
            .openUserCardList(
                encodeURIComponent(__CRYPT__.encryptData('')),
                this.data.order.out_trade_no
            )
            .then(res => {
                console.log(res);
            })
    }
})