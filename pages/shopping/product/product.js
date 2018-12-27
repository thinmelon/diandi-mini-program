// pages/shopping/product/product.js
const __CRYPT__ = require('../../../utils/crypt.js');
const __URI__ = require('../../../utils/uri.constant.js');
const __USER__ = require('../../../services/user.service.js');
const __SHOPPING__ = require('../../../services/shopping.service.js');

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
        scrollViewHeight: 0, //  ScrollView的高度
        isHidden: true, //	是否隐藏video组件
        videoContext: null, //  视频模块上下文
        videoUrl: '', //	视频播放地址
        isProductDataReady: false, //商品信息是否已获取
        orderId: '', //用户下过的订单号
        card: null, //用户已领取的卡券
        showCardButton: false //是否显示卡券按键
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const that = this;

        wx.setStorageSync('__AUTHORIZER_BUSINESSID__', options.bid); //	商户ID
        that.data.product.pid = options.pid; //	商品ID
        // 获取详细数据
        __SHOPPING__
            .fetchProductDetail(encodeURIComponent(__CRYPT__.encryptData('')), options.pid)
            .then(res => {
                if (0 === res.data.code) { //	code: 0 返回正确结果
                    //	商品标题
                    that.data.product.name = decodeURIComponent(res.data.data.name);
                    //  商品详情
                    that.data.product.description = decodeURIComponent(res.data.data.description);
                    //  商品类型
                    that.data.product.type = res.data.data.type;
                    // 初始设置运费为 0
                    that.data.product.freight = 0;
                    //  赋值 skuList
                    that.data.product.sku = res.data.data.sku;
                    //  赋值 standards
                    that.data.product.standards = res.data.data.attributes.map(item => {
                        let index = 0;
                        item.values = item.values.map(value => {
                            return {
                                index: ++index,
                                value: value,
                                enable: false
                            };
                        });
                        return item;
                    });
                    //  获取SKU的单价数组
                    const units = res.data.data.sku.map((item) => {
                        return item.unit;
                    });
                    //  商品微缩图
                    that.data.product.thumbnails = res.data.data.thumbnails;
                    //  商品详情图
                    that.data.product.gallery = res.data.data.details;
                    //  商品视频
                    that.data.product.videos = res.data.data.videos;
                    console.log(that.data.product);

                    /**
                     * 如果商品当前的属性，以及属性下的值个数仅为1
                     * 则默认选中
                     */
                    if (that.data.product.standards.length === 1 &&
                        that.data.product.standards[0].values.length === 1) {
                        that.selectSKU(that.data.product.standards[0].name, that.data.product.standards[0].values[0].value);
                    } else {
                        that.setData({
                            isProductDataReady: true,
                            product: that.data.product,
                            price: Math.min.apply(null, units) + ' ~ ' + Math.max.apply(null, units)
                        });
                    }
                }
            });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        /**
         * 创建并返回 video 上下文 videoContext 对象。
         * 在自定义组件下，第二个参数传入组件实例this，以操作组件内 <video/> 组件
         */
        this.videoContext = wx.createVideoContext('productIntroVideo', this);
        this.everBoughtWrapper();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        const scale = wx.getStorageSync('__WINDOW_SCALE__');
        //	滚动定位
        this.setData({
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
    onShareAppMessage: function(options) {
        return {
            title: this.data.product.name,
            path: '/pages/shopping/product/product?pid=' + this.data.product.pid,
            imageUrl: this.data.product.thumbnails[0].name
        }

    },

    /**
     *  如果商品为卡券类
     *  判断用户是否之前已购买过
     *  如果已购买，显示打开卡包
     */
    everBougthCoupon: function() {
        let that = this;

        if (this.data.product.type === 1) {
            console.log(this.data.product)
            __SHOPPING__
                .queryEverBought(
                    encodeURIComponent(__CRYPT__.encryptData('')),
                    this.data.product.sku[0]._id
                )
                .then(res => {
                    console.log(res);
                    if (res.data.code === 0) { //	设置属性为已购买
                        that.setData({
                            showCardButton: true,
                            orderId: res.data.data._id,
                            card: res.data.data.card ? res.data.data.card : null
                        });
                    } else {
                        that.setData({
                            showCardButton: true
                        });
                    }
                });
        }
    },

    /**
     * 		判断数据是否已完备
     */
    everBoughtWrapper: function() {
        if (this.data.isProductDataReady) {
            this.everBougthCoupon();
        } else {
            setTimeout(() => {
                this.everBoughtWrapper();
            }, 1000);
        }
    },

    /**
     *   跳转至商城
     */
    bindTapBackToMall: function(e) {
        wx.reLaunch({
            url: '/pages/shopping/index/index?bid=' + wx.getStorageSync('__AUTHORIZER_BUSINESSID__')
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
        var index;

        index = this.isHit();
        // 如果商品参数未全部设定，则将页面滚动至指定位置
        if (index === -1) {
            this.setData({
                toView: 'intro'
            })
        } else {
            __USER__
                .joinToCart(
                    encodeURIComponent(__CRYPT__.encryptData('')),
                    this.data.chosenSkuId,
                    this.data.amount
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
            _cart = [];

        if (this.data.isProductDataReady === false) {
            wx.showToast({
                title: '加载中',
                image: "/icons/public/hint.png"
            })
            return;
        }

        index = this.isHit();
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
                _cart.push({
                    pid: this.data.product.pid,
                    stock_no: this.data.chosenSkuId,
                    name: this.data.product.name,
                    type: this.data.product.type,
                    unit: this.data.price,
                    amount: this.data.amount,
                    attributes: this.data.chosenItems,
                    thumbnail: this.data.product.thumbnails[0].url
                });

                wx.navigateTo({
                    url: '/pages/shopping/buy/buy?bid=' + wx.getStorageSync('__AUTHORIZER_BUSINESSID__') + '&cart=' + JSON.stringify(_cart)
                })
            }
        }
    },

    /**
     *   选择规格参数
     */
    bindTapChooseItem: function(e) {
        this.selectSKU(e.currentTarget.dataset.attribute, e.currentTarget.dataset.value);
    },

    /**
     * 	 减少购买数量
     */
    bindTapMinus: function() {
        if (this.data.amount > 1) {
            this.data.amount--;
            this.setData({
                amount: this.data.amount
            });
        }
    },

    /**
     * 	增加购买数量 
     */
    bindTapAdd: function() {
        if (this.data.amount < this.data.remaining) {
            this.data.amount++;
            this.setData({
                amount: this.data.amount
            });
        }
    },

    /**
     *  领取卡券
     */
    bindTapCardHolder: function(evt) {
        let that = this;

        __SHOPPING__
            .putIntoCardHolder( //	放入微信卡包
                encodeURIComponent(__CRYPT__.encryptData('')),
                wx.getStorageSync('__AUTHORIZER_APPID__'),
                this.data.product.pid,
                this.data.orderId
            )
            .then(result => {
                console.log(result);
                //领取成功后
                if (result.errMsg === 'addCard:ok' &&
                    result.cardList.length > 0 &&
                    result.cardList[0].isSuccess) {
                    let cardExt = JSON.parse(result.cardList[0].cardExt);
                    //记录用户领取记录
                    __SHOPPING__
                        .recordUserCard(
                            encodeURIComponent(__CRYPT__.encryptData('')),
                            result.cardList[0].cardId, //卡券ID
                            cardExt.openid, //用户
                            cardExt.timestamp, //创建时间戳
                            that.data.orderId, //交易订单号
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
            });
    },

    /**
     *  出示卡券
     *  跳转至微信卡券列表
     */
    bindTapShowCards: function() {
        __SHOPPING__
            .openUserCardList(
                encodeURIComponent(__CRYPT__.encryptData('')),
                this.data.orderId
            )
            .then(res => {
                console.log(res);
            })
    },

    /**
     *   判断是否已选择全部参数
     */
    isHit: function() {
        let i, j, count, length, isHit;

        //  如果已选参数数组长度不足，直接返回 -1
        if (this.data.chosenItems.length === this.data.product.standards.length) {
            //  遍历sku数组，找到对应参数的 SKU
            for (i = 0, count = this.data.product.sku.length; i < count; i++) {
                isHit = true;
                for (j = 0, length = this.data.chosenItems.length; j < length; j++) {
                    if (this.data.product.sku[i][this.data.chosenItems[j].name] !== this.data.chosenItems[j].value) {
                        isHit = false;
                        break;
                    }
                }
                if (isHit) {
                    return i;
                }
            }
        }
        return -1;
    },

    /**
     *  选中SKU
     */
    selectSKU: function(currentChosenAttribute, currentChosenValue) {
        let i, j, count, length, isExist, index;

        // 遍历standards数组
        for (i = 0, count = this.data.product.standards.length; i < count; i++) {
            // 判断是否等于当前的attribute
            if (this.data.product.standards[i].name === currentChosenAttribute) {
                for (j = 0, length = this.data.product.standards[i].values.length; j < length; j++) {
                    // 遍历已选择的元素数组 chosenItems 
                    isExist = false;
                    if (currentChosenValue === this.data.product.standards[i].values[j].value) {
                        this.data.product.standards[i].values[j].enable = true;
                        // 判断所选择的元素是否已在 chosenItems 数组中
                        this.data.chosenItems = this.data.chosenItems.map(item => {
                            if (item.name === currentChosenAttribute) {
                                item.value = currentChosenValue;
                                isExist = true;
                            }
                            return item;
                        });
                        // 如果不存在，则加入 chosenItems 数组
                        if (!isExist) {
                            this.data.chosenItems.push({
                                name: currentChosenAttribute,
                                value: this.data.product.standards[i].values[j].value
                            })
                        }
                    } else {
                        this.data.product.standards[i].values[j].enable = false;
                    }
                }
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
                isProductDataReady: true,
                amount: 1, //  初始化购买数量 
                product: this.data.product, //  选中的规格底色发生变化 
                chosenSkuId: this.data.product.sku[index]._id, //  stock_no
                price: this.data.product.sku[index].unit, //  单价
                remaining: this.data.product.sku[index].amount //  库存
            })
        }
    },

    /**
     * 	播放视频
     */
    onPlayVideo: function(evt) {
        this.setData({
            videoUrl: evt.currentTarget.dataset.url,
            isHidden: false
        })
        this.videoContext.play();
    },

    /**
     * 	退出播放
     */
    onCloseVideo: function() {
        this.videoContext.pause();
        this.setData({
            isHidden: true
        });
    }
})