// pages/shopping/product/product.js
const __USER__ = require('../../../services/credential.service.js');
const __SHOPPING__ = require('../../../services/wechat.pay.service.js');
const __URI__ = require('../../../utils/uri.constant.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperHeight: 320, //  滚动图片的高度
        product: {}, //  商品信息
        amount: 1, //  当前SKU的购买数量
        price: '0.01', //  当前SKU的单位价格
        remaining: 0, //  当前SKU剩余的库存
        chosenSkuId: 0, //  选中的SKU的ID
        chosenItems: [], //  已选择的参数
        toView: '', //  定位至View的Id
        scrollViewHeight: 0 //  ScrollView的高度
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this;
        console.log(options);
        const product = JSON.parse(options.product);
        this.data.product.name = product.name;
		this.data.product.description = decodeURIComponent(product.description);
        this.data.product.freight = 0; // 初始设置运费为 0
        this.data.product.thumbnails = product.thumbnails;
        // 获取详细数据
        __SHOPPING__
            .fetchProductDetail(product.pid)
            .then(res => {
                console.log(res)
                if (0 === res.data.code) { //	code: 0 返回正确结果
                    that.data.product.sku = res.data.msg.skuList; //  赋值 skuList
                    let isHit, standards = [];
                    for (let i = 0; i < res.data.msg.standards.length; i++) { //  遍历规格数组
                        isHit = false;
                        for (let j = 0; j < standards.length; j++) {
                            if (standards[j].attribute === res.data.msg.standards[i].name) {
                                isHit = true;
                                standards[j].collections.push({ //	聚集有相同的 attribute 的 属性值 
                                    skuValueId: res.data.msg.standards[i].vid,
                                    value: res.data.msg.standards[i].value
                                })
                            } /** end of if */
                        } /** end of for */
                        if (!isHit) { // 如果未命中
                            standards.push({ // 则添加为新元素 属性名 + 值 
                                attribute: res.data.msg.standards[i].name,
                                collections: [{
                                    skuValueId: res.data.msg.standards[i].vid,
                                    value: res.data.msg.standards[i].value
                                }]
                            })
                        } /** end of if */
                    } /**	end of for */
                    that.data.product.standards = standards; //  赋值 standards
                    const units = that.data.product.sku.map((item) => {
                        return item.unit;
                    }); //  获取SKU的单价数组
                    that.data.product.gallery = res.data.msg.gallery.map(image => {
                        image.name = __URI__.imageUrlPrefix(image.name);
                        return image;
                    })
                    console.log(that.data.product);
                    that.setData({
                        product: that.data.product,
                        price: Math.min.apply(null, units) + ' ~ ' + Math.max.apply(null, units)
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
        const scale = wx.getStorageSync('__WindowScale__');

        this.setData({
            // product: mockData,
            scrollViewHeight: scale.height,
            swiperHeight: scale.width
        })
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
     *   跳转至商城
     */
    bindTapBackToMall: function(e) {
        wx.redirectTo({
            url: '/pages/shopping/index/index',
        })
    },

    /**
     *   跳转至购物车
     */
    bindTapBackToCart: function(e) {
        wx.navigateTo({
            url: '/pages/shopping/cart/cart',
        })
    },

    /**
     *   加入购物车
     */
    bindTapJoinToCart: function(e) {
        var index,
            _cart = [];

        index = this.isHit();
        // 如果商品参数未全部设定，则将页面滚动至指定位置
        if (index === -1) {
            this.setData({
                toView: 'intro'
            })
        } else {
            _cart.push({
                stock_no: this.data.chosenSkuId,
                amount: this.data.amount,
            });

            __USER__
                .joinToCart(
                    wx.getStorageSync('__SESSION_KEY__'),
                    JSON.stringify(_cart)
                )
                .then((res) => {
                    console.log(res);
                    wx.showToast({
                        title: '已放入购物车',
                        icon: 'success',
                        duration: 3000
                    })
                });
        }
    },

    /**
     *    购买
     */
    bindTapBuy: function(e) {
        var i,
            length,
            index,
            attributes = [],
            _cart = [];

        index = this.isHit();
        console.log(index)
        // 如果商品参数未全部设定，则将页面滚动至指定位置
        if (index === -1) {
            this.setData({
                toView: 'intro'
            })
        } else {
            if (0 === this.data.remaining) {
                wx.showToast({
                    title: '没有库存',
                    image: "/icons/public/hint.png"
                })
            } else {
                for (i = 0, length = this.data.chosenItems.length; i < length; i++) {
                    attributes.push(this.getSku(this.data.chosenItems[i]));
                }
                _cart.push({
                    stock_no: this.data.chosenSkuId,
                    name: this.data.product.name,
                    unit: this.data.price,
                    amount: this.data.amount,
                    attributes: attributes,
                    thumbnails: this.data.product.thumbnails
                });

                wx.navigateTo({
                    url: '/pages/shopping/buy/buy?cart=' + JSON.stringify(_cart)
                })
            }
        }
    },

    /**
     *   选择规格参数
     */
    bindTapChooseItem: function(e) {
        var i, j, count, length, vid, index;

        const currentChosenAttribute = e.currentTarget.dataset.attribute;
        const currentChosenValueId = e.currentTarget.dataset.valueid;

        // 遍历standards数组
        for (i = 0, count = this.data.product.standards.length; i < count; i++) {
            // 判断是否等于当前的attribute
            if (this.data.product.standards[i].attribute === currentChosenAttribute) {
                for (j = 0, length = this.data.product.standards[i].collections.length; j < length; j++) {
                    // 遍历已选择的元素数组 chosenItems 
                    index = this.data.chosenItems.indexOf(this.data.product.standards[i].collections[j].skuValueId);
                    // 判断是否等于当前的 valueId
                    if (currentChosenValueId === this.data.product.standards[i].collections[j].skuValueId) {
                        this.data.product.standards[i].collections[j].enable = true;
                        // 判断是否已在数组 chosenItems
                        if (index === -1) {
                            this.data.chosenItems.push(this.data.product.standards[i].collections[j].skuValueId)
                        }
                    } else {
                        // 判断其之前是否已选中
                        if (this.data.product.standards[i].collections[j].enable) {
                            this.data.product.standards[i].collections[j].enable = false;
                            if (index > -1) {
                                this.data.chosenItems.splice(index, 1);
                            }
                        }
                    }
                }
                break;
            }
        } /** end of for */
        index = this.isHit();
        if (index === -1) {
            this.setData({
                product: this.data.product
            });
        } else {
            // 命中
            // 设置为对应的SKU参数
            this.setData({
                amount: 1, //  初始化购买数量 
                product: this.data.product, //  选中的规格底色发生变化 
                chosenSkuId: this.data.product.sku[index].stock_no, //  stock_no
                price: this.data.product.sku[index].unit, //  单价
                remaining: this.data.product.sku[index].stock //  库存
            })
        }
    },

    bindTapMinus: function() {
        if (this.data.amount > 1) {
            this.data.amount--;
            this.setData({
                amount: this.data.amount
            });
        }
    },

    bindTapAdd: function() {
        if (this.data.amount < this.data.remaining) {
            this.data.amount++;
            this.setData({
                amount: this.data.amount
            });
        }
    },

    /**
     *   判断是否已选择全部参数
     */
    isHit: function() {
        var i, count, currentStandards;

        //  如果已选参数数组长度不足，直接返回 -1
        if (this.data.chosenItems.length === this.data.product.standards.length) {
            currentStandards = this.data.chosenItems.sort().join(',');
            //  遍历sku数组，找到对应参数的 SKU
            for (i = 0, count = this.data.product.sku.length; i < count; i++) {
                if (currentStandards === this.data.product.sku[i].attributes.split(',').filter(char => {
                        return char !== '';
                    }).sort().join(',')) {
                    return i; // 返回sku数组的索引值 
                }
            }
        }
        return -1;
    },

    /**
     *   获取SKU的属性名及属性值
     */
    getSku: function(skuValueId) {
        var i,
            j,
            count,
            length;

        for (i = 0, count = this.data.product.standards.length; i < count; i++) {
            for (j = 0, length = this.data.product.standards[i].collections.length; j < length; j++) {
                if (skuValueId === this.data.product.standards[i].collections[j].skuValueId) {
                    return this.data.product.standards[i].attribute + ": " + this.data.product.standards[i].collections[j].value;
                }
            }
        }
        return "";
    }
})