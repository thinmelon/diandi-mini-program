// components/background/background.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        hint: {
            type: String,
            value: ''
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        backgroundFillHeight: 0,
    },

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    ready: function() {
        console.log('============== ready ==============')
        const scale = wx.getStorageSync('__WINDOW_SCALE__');
        //	滚动定位
        this.setData({
            backgroundFillHeight: scale.height
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})