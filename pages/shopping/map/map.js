// pages/shopping/map/map.js
const __SHOPPING__ = require('../../../services/wechat.pay.service.js');
// 引入SDK核心类
// const __QQ_MAP__ = require('../../../lib/qqmap-wx-jssdk.js');
// let qqMapSDK;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        centerLongitude: 119.003326,
        centerLatitude: 25.43034,
        scale: 15,
        markers: [],
        chosenMarker: {},
        isBusinessShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // qqMapSDK = new __QQ_MAP__({
        //     key: 'C2CBZ-MTCWO-VVBW4-STO3P-TZZDT-57BL5'
        // })
        this.fetchOnlineBusinessListWrapper();

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
        // 调用接口
        // console.log(qqMapSDK)
        // qqMapSDK.geocoder({
        //     address: '莆田市荔城区坊巷119号',
        //     success: function(res) {
        //         console.log(res);
        //     },
        //     fail: function(res) {
        //         console.log(res);
        //     },
        //     complete: function(res) {
        //         console.log(res);
        //     }
        // })
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

    bindMarkerTap: function(e) {
        let marker = this.data.markers[e.markerId];
        this.data.chosenMarker = {
            bid: marker.bid,
            name: marker.name,
            address: marker.address,
            latitude: marker.latitude,
            longitude: marker.longitude,
            consumptionPerPerson: marker.consumptionPerPerson,
            phone: marker.phone,
            shopHours: marker.shopHours,
            mediaId: marker.mediaId,
            productId: marker.productId
        }
        this.setData({
            isBusinessShow: true,
            chosenMarker: this.data.chosenMarker
        })
    },

    bindTapController: function(e) {
        this.setData({
            isBusinessShow: false
        })
    },

    catchTapNavigator: function(e) {
        wx.openLocation({
            latitude: e.currentTarget.dataset.marker.latitude,
            longitude: e.currentTarget.dataset.marker.longitude,
            scale: 18,
            name: e.currentTarget.dataset.marker.name,
            address: e.currentTarget.dataset.marker.address
        })
    },

    catchTapOfficial: function(e) {
        console.log(e);
        wx.navigateTo({
            url: '/pages/official/index/index?mid=' + e.currentTarget.dataset.media
        })
    },

    catchTapProduct: function(e) {
        wx.navigateTo({
            url: '/pages/shopping/product/product?pid=' + e.currentTarget.dataset.product
        })
    },

    fetchOnlineBusinessListWrapper: function () {
        console.log('isLogin  ==>  ' + getApp().isLogIn);
        if (getApp().isLogIn) {
            this.fetchOnlineBusinessList();
        } else {
            setTimeout(() => {
                this.fetchOnlineBusinessListWrapper();
            }, 1000); 
        }
    },

    fetchOnlineBusinessList: function() {
        var that = this;

        __SHOPPING__
            .fetchOnlineBusinessList(wx.getStorageSync('__SESSION_KEY__'))
            .then(result => {
                console.log(result);
                if (result.data.code === 0) {
                    let index = 0;
                    result.data.msg.map(item => {
                        that.data.markers.push({
                            iconPath: "/icons/public/location.png",
                            id: index++,
                            latitude: item.latitude,
                            longitude: item.longitude,
                            width: 30,
                            height: 30,
                            label: {
                                content: item.name,
                                color: '#000000',
                                fontSize: 10,
                                anchorX: -20,
                                anchorY: 0,
                                padding: 3,
                                textAlign: 'center'
                            },
                            bid: item.bid,
                            name: item.name,
                            address: item.address,
                            shopHours: item.shopHours,
                            consumptionPerPerson: item.consumptionPerPerson,
                            phone: item.phone,
                            mediaId: item.mediaId,
                            productId: item.productId
                        });
                    });
                    that.setData({
                        markers: that.data.markers
                    })
                }
            });
    }


})