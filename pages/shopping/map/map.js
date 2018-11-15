// pages/shopping/map/map.js
const __SHOPPING__ = require('../../../services/wechat.pay.service.js');
const __WX_API_PROMISE__ = require('../../../utils/wx.api.promise.js');
// 引入SDK核心类
const __QQ_MAP__ = require('../../../lib/qqmap-wx-jssdk.js');
let qqMapSDK;

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
        isBusinessShow: false,
        location: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        qqMapSDK = new __QQ_MAP__({
            key: 'C2CBZ-MTCWO-VVBW4-STO3P-TZZDT-57BL5'
        })
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
        var that = this;

        //  我的位置
        __WX_API_PROMISE__
            .getLocation()
            .then(res => {
                console.log(res)
                if (res.errMsg === "getLocation:ok") {
                    console.log(that.data.markers);
                    that.setMyLocation(res.longitude, res.latitude);
                }
            });
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
     * 		显示浮层
     */
    bindMarkerTap: function(e) {
        let tmp = this.data.markers.filter(marker => {
            return marker.id === e.markerId;
        });
        let marker = tmp.length > 0 ? tmp[0] : null;
        if (marker) {
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
        }
    },

    /**
     * 		关闭浮层
     */
    bindTapController: function(e) {
        this.setData({
            isBusinessShow: false
        })
    },

    /**
     * 		进入商户导航
     */
    catchTapNavigator: function(e) {
        wx.openLocation({
            latitude: e.currentTarget.dataset.marker.latitude,
            longitude: e.currentTarget.dataset.marker.longitude,
            scale: 18,
            name: e.currentTarget.dataset.marker.name,
            address: e.currentTarget.dataset.marker.address
        })
    },

    /**
     * 		进入商户所关联的软文
     */
    catchTapOfficial: function(e) {
        console.log(e);
        wx.navigateTo({
            url: '/pages/official/index/index?mid=' + e.currentTarget.dataset.media
        })
    },

    /**
     * 		进入商户所关联的优惠政策
     */
    catchTapProduct: function(e) {
        wx.navigateTo({
            url: '/pages/shopping/product/product?pid=' + e.currentTarget.dataset.product
        })
    },

    /**
     * 		确认是否已登录
     * 		登录后获取在线的商户列表
     */
    fetchOnlineBusinessListWrapper: function() {
        console.log('isLogin  ==>  ' + getApp().isLogIn);
        if (getApp().isLogIn) {
            this.fetchOnlineBusinessList();
        } else {
            setTimeout(() => {
                this.fetchOnlineBusinessListWrapper();
            }, 1000);
        }
    },

    /**
     * 		获取在线的商户列表
     */
    fetchOnlineBusinessList: function() {
        var that = this;

        __SHOPPING__
            .fetchOnlineBusinessList(
                wx.getStorageSync('__SESSION_KEY__'),
                wx.getStorageSync('__AUTHORIZER_APPID__')
            )
            .then(result => {
                console.log(result);
                if (result.data.code === 0) {
                    let index = 0;
                    result.data.data.map(item => {
                        that.data.markers.push({
							iconPath: "/icons/public/favorite.png",
                            id: ++index,
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
                            bid: item._id,
                            name: item.name,
                            address: item.address,
                            shopHours: item.shopHours,
                            consumptionPerPerson: item.consumptionPerPerson,
                            phone: item.phone,
                            mediaId: item.material.length > 0 ? item.material[0] : null,
                            productId: item.productId
                        });
                    });
                    that.setData({
                        markers: that.data.markers
                    })
                }
            });
    },

    /**
     * 		更换定位
     */
    bindConfirmLocation: function() {
        var that = this;

        // 调用由地址描述到所述位置坐标的转换接口
        qqMapSDK.geocoder({
            address: this.data.location,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {
                console.log(res);
                if (res.status === 0) {
                    that.setMyLocation(res.result.location.lng, res.result.location.lat);
                } else if (res.status === 347) {
                    wx.showToast({
                        title: res.message,
                        icon: 'success',
                        duration: 2000
                    });
                }
            }
        });
    },

    /**
     * 		定位输入文本框输入事件
     */
    bindInputLocation: function(evt) {
        this.data.location = evt.detail.value;
    },

    /**
     * 		设置我的位置
     */
    setMyLocation: function(longitude, latitude) {
        this.data.markers.push({
			iconPath: "/icons/public/location.png",
            id: 0,
            longitude: longitude,
            latitude: latitude,
            width: 30,
            height: 30,
            label: {
                content: '我的位置',
                color: '#000000',
                fontSize: 10,
                anchorX: -23,
                anchorY: 0,
                padding: 3,
                textAlign: 'center'
            }
        });

        console.log(this.data.markers)

        this.setData({
            markers: this.data.markers,
            centerLongitude: longitude,
            centerLatitude: latitude
        });
    }

})