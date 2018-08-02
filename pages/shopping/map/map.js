// pages/shopping/map/map.js

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
        markers: [{
                iconPath: "/icons/public/location.png",
                id: 0,
                latitude: 25.43279,
                longitude: 119.01699,
                width: 30,
                height: 30,
                label: {
					content: '德古拉比萨',
                    color: '#000000',
                    fontSize: 10,
                    anchorX: -20,
                    anchorY: 0,
                    padding: 3,
                    textAlign: 'center'
                }
            },
            {
                iconPath: "/icons/public/location.png",
                id: 1,
                latitude: 25.4239,
                longitude: 119.01004,
                width: 30,
                height: 30,
				label: {
					content: '郝太爷',
					color: '#000000',
					fontSize: 10,
					anchorX: -20,
					anchorY: 0,
					padding: 3,
					textAlign: 'center'
				}
            },
            {
                iconPath: "/icons/public/location.png",
                id: 2,
                latitude: 25.428061,
                longitude: 119.025383,
                width: 30,
                height: 30,
				label: {
					content: '炭再说',
					color: '#000000',
					fontSize: 10,
					anchorX: -20,
					anchorY: 0,
					padding: 3,
					textAlign: 'center'
				}
            }
        ],
        isBusinessShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        qqMapSDK = new __QQ_MAP__({
            key: 'C2CBZ-MTCWO-VVBW4-STO3P-TZZDT-57BL5'
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
        console.log('======== Marker ======== ')
        console.log(e);
        this.setData({
            isBusinessShow: true
        })
    },

    bindTapController: function(e) {
        console.log('======== Controller ======== ')
        this.setData({
            isBusinessShow: false
        })
    },

    catchTapNavigator: function(e) {
        console.log('======== Navigator ======== ')
        wx.openLocation({
            latitude: 23.362490,
            longitude: 116.715790,
            scale: 18,
            name: '华乾大厦',
            address: '金平区长平路93号'
        })
    },

    catchTapOfficial: function(e) {
        wx.navigateTo({
            url: '/pages/shopping/official/official',
        })
    },

    catchTapProduct: function(e) {
        wx.navigateTo({
            url: '/pages/shopping/product/product?pid=' + 'DHt9gYpFFu9nFKQjA1lo3HJ2vvOvv5Mp'
        })
    }
})