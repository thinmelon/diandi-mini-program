// pages/my/orders/orders.js
const __CRYPT__ = require('../../../utils/crypt.js');
const __URI__ = require('../../../utils/uri.constant.js');
const __DATE__ = require('../../../utils/date.formatter.js');
const __USER__ = require('../../../services/user.service.js');
const __WX_PAY_SERVICE__ = require('../../../services/shopping.service.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.fetchMyOrdersWrapper();
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

    fetchMyOrdersWrapper: function() {
        if (getApp().isLogIn) {
            this.fetchMyOrders();
        } else {
            setTimeout(() => {
                this.fetchMyOrdersWrapper();
            }, 1000);
        }
    },

    fetchMyOrders: function() {
        let orders = [],
            that = this;

        __USER__.fetchMyOrders(
                encodeURIComponent(__CRYPT__.encryptData('')),
                0, 5
            )
            .then(res => {
                if (res.data.code === 0) {
                    console.log(res.data.data.product)
                    res.data.data.order.map(order => {
                        let skuList = [];
                        for (let key in order.sku) {
                            for (let i = 0, length = res.data.data.product.length; i < length; i++) {
                                let isHit = false,
                                    attributes = [],
                                    unit;

                                res.data.data.product[i].sku.map(item => {
                                    if (item._id === order.sku[key].stock_no) {
                                        isHit = true;
                                        for (let param in item) {
                                            if (param !== '_id' && param !== 'unit' && param !== 'amount') {
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
                                    skuList.push({
                                        "pid": res.data.data.product[i]._id,
                                        "stock_no": order.sku[key].stock_no,
                                        "name": decodeURIComponent(res.data.data.product[i].name),
                                        "unit": unit,
                                        "amount": order.sku[key].amount,
                                        "attributes": attributes,
                                        "thumbnail": res.data.data.product[i].thumbnails[0].url,
                                        "type": res.data.data.product[i].type
                                    });
                                }
                            } /** end of for */
                        } /** end of for */
                        orders.push({
                            out_trade_no: order._id, //  订单编号
                            createTime: order.createTime, //	创建时间
                            completeTime: order.completeTime, //	创建时间
                            status: __WX_PAY_SERVICE__.__ENUM_ORDER_STATUS__[order.status], //  找到状态值相应的文字描述
                            //  订单总金额，保留小数点后两位，单位：元
                            totalFee: (order.totalFee / 100).toFixed(2),
                            consignee: order.consignee,
                            skuList: skuList //  SKU列表
                        });
                    });
                    if (orders.length > 0) {
                        that.setData({
                            orderList: orders
                        });
                    }
                }

                //     if (0 === orders.filter((item) => item.out_trade_no === res.data.msg.order[key].out_trade_no).length) {
                //         orders.push({
                //             //  订单编号
                //             out_trade_no: res.data.msg.order[key].out_trade_no,
                //             //	创建时间
                //             createTime: res.data.msg.order[key].createTime,
                //             //  找到状态值相应的文字描述
                //             status: __WX_PAY_SERVICE__.__ENUM_ORDER_STATUS__[res.data.msg.order[key].status],
                //             //  订单总金额，保留小数点后两位，单位：元
                //             totalFee: (res.data.msg.order[key].totalFee / 100).toFixed(2),
                //             //  SKU列表
                //             skuList: [sku]
                //         });
                //     } else {
                //         orders = orders.map((item) => {
                //             if (item.out_trade_no === res.data.msg.order[key].out_trade_no) {
                //                 item.skuList.push(sku)
                //             }
                //             return item;
                //         });
                //     }
                // }
            });

    },

    bindTapOrderDetail: function(e) {
        wx.navigateTo({
            url: '/pages/shopping/order/order?order=' + JSON.stringify(e.currentTarget.dataset.order)
        })
    }
})