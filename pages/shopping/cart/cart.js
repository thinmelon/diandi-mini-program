// pages/shopping/cart/cart.js
const __CRYPT__ = require('../../../utils/crypt.js');
const __URI__ = require('../../../utils/uri.constant.js');
const __PRICE__ = require('../../../utils/math.price.js');
const __USER__ = require('../../../services/user.service.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hint: "购物车空空也~ ~",
        subtotal: 0.00,
        cart: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.fetchMyCartWrapper();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

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
        if (getApp().isLogIn) {
            this.fetchMyCart();
        }
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

    fetchMyCartWrapper: function() {
        if (getApp().isLogIn) {
            this.fetchMyCart();
        } else {
            setTimeout(() => {
                this.fetchMyCartWrapper();
            }, 1000);
        }
    },

    fetchMyCart: function() {
        let that = this,
            cart = [];

        __USER__
            .fetchMyCart(encodeURIComponent(__CRYPT__.encryptData('')))
            .then(res => {
                console.log(res.data)
                if (res.data.code === 0) {
                    for (let key in res.data.data.cart) {
                        for (let i = 0, length = res.data.data.product.length; i < length; i++) {
                            let isHit = false,
                                attributes = [],
                                unit;

                            res.data.data.product[i].sku.map(item => {
                                if (item._id === res.data.data.cart[key].stock_no) {
                                    isHit = true;
                                    for (let param in item) {
                                        if (param !== '_id' && param !== 'unit' && param !== 'amount') {
                                            // attributes.push(param + ": " + item[param]);
                                            attributes.push({
                                                name: param,
                                                value: item[param]
                                            });
                                        }
                                    }
                                    unit = item.unit;
                                }
                            })
                            if (isHit) {
                                cart.push({
                                    "pid": res.data.data.product[i]._id,
                                    "stock_no": res.data.data.cart[key].stock_no,
                                    "name": decodeURIComponent(res.data.data.product[i].name),
                                    "unit": unit,
                                    "amount": res.data.data.cart[key].amount,
                                    "attributes": attributes,
                                    "thumbnail": res.data.data.product[i].thumbnails[0].url,
                                    "type": res.data.data.product[i].type
                                });
                            }
                        } /** end of for */
                    } /** end of for */
                    if (cart.length > 0) {
                        console.log(cart)
                        that.setData({
                            hint: "", //  提示
                            subtotal: __PRICE__.checkedPrice(cart), //  计算总金额
                            cart: cart //  购物车
                        });
                    } /** end of if */
                } /** end of if */
            })
    },

    /**
     *   编辑
     */
    onEditEvent: function(e) {
        let cart = e.detail.map(item => {
            return {
                stock_no: item.stock_no,
                amount: item.amount
            }
        })
        __USER__
            .updateMyCart(
                encodeURIComponent(__CRYPT__.encryptData('')),
                JSON.stringify(cart)
            )
            .then((res) => {
                console.log(res);
            });
        this.setData({
            cart: e.detail,
            subtotal: __PRICE__.checkedPrice(e.detail)
        });
    },

    /**
     *   删除
     */
    onDeleteEvent: function(e) {
        this.setData({
            cart: e.detail,
            subtotal: __PRICE__.checkedPrice(e.detail)
        });
    },

    /**
     *   单选
     */
    cartCheckboxChange: function(e) {
        this.setData({
            cart: e.detail,
            subtotal: __PRICE__.checkedPrice(e.detail)
        });
    },

    /**
     *   全选 
     */
    selectAllCheckboxChange: function(e) {
        this.setData({
            cart: e.detail,
            subtotal: __PRICE__.checkedPrice(e.detail)
        });
    },

    /**
     *   结算
     */
    bindTapSettleAccount: function() {
        var i,
            length,
            final = [];

        for (i = 0, length = this.data.cart.length; i < length; i++) {
            if (this.data.cart[i].checked) {
                final.push(this.data.cart[i]);
            }
        }

        if (final.length > 0) {
            wx.navigateTo({
                url: '/pages/shopping/buy/buy?bid=' + wx.getStorageSync('__AUTHORIZER_BUSINESSID__') + '&cart=' + JSON.stringify(final)
            })
        } else {
            wx.showToast({
                title: '选择要买的商品',
                image: "/icons/public/hint.png",
                duration: 3000
            })
        }
    }
})