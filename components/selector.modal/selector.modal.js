// components/selector.modal/selector.modal.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        // btnText: {
        //     type: String,
        //     value: '发送'
        // },
        // mobile: {
        //     type: String,
        //     value: ''
        // }
    },
    data: {
        hasSent: false,
        timerId: 0
    },
	/**
     * 组件生命周期函数
     * 在组件实例进入页面节点树时执行
     * 注意此时不能调用 setData
     */
    created: function () {
        console.log('==============  created  ==============')
    },
	/**
	 * 组件生命周期函数
	 * 在组件实例进入页面节点树时执行
	 */
    attached: function () {
        console.log('==============  attached  ==============')
    },
	/**
	 * 组件生命周期函数
	 * 在组件布局完成后执行
	 * 此时可以获取节点信息（使用 SelectorQuery ）
	 */
    ready: function () {
        console.log('==============  ready  ==============')
    },
	/**
	 * 组件生命周期函数
	 * 在组件实例被移动到节点树另一个位置时执行
	 */
    moved: function () {
        console.log('==============  moved  ==============')
    },
	/**
	 * 组件生命周期函数
	 * 在组件实例被从页面节点树移除时执行
	 */
    detached: function () {
        console.log('==============  detached  ==============')
    },
	/**
	 * 组件方法
	 * 包括事件响应函数和任意的自定义方法
	 * 生命周期函数无法在组件方法中通过 this 访问到
	 */
    methods: {

    }
})