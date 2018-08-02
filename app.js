//app.js
const wxApiPromise = require('./utils/wx.api.promise.js');
const __CREDENTIAL__ = require('./services/credential.service.js');

App({
    isLogIn: false,

    onLaunch: function() {
        let that = this;

        wxApiPromise
            .showLoading({ //  开始，显示加载框
                title: '玩命加载中',
                mask: true
            })
            .then(wxApiPromise.login) //	  调用登录接口获取临时登录凭证（code）
            .then(__CREDENTIAL__.userLogin) //  	访问后端，用code获取session key
            .then(result => { //   对结果进行转换
                console.log(result);
                return new Promise((resolve, reject) => {
                    resolve({
                        key: '__SESSION_KEY__',
                        data: result.data
                    })
                })
            })
            .then(wxApiPromise.setStorage) //  存入本地
            .then(result => {
                that.isLogIn = true;
                return new Promise((resolve, reject) => {
                    resolve('Log in.')
                })
            })
            // .then(wxApiPromise.hideLoading)  				//  关闭加载框
            .catch(exception => {
                console.error(exception);
            })
            .finally(() => {
                wxApiPromise.hideLoading();
            })


        wxApiPromise.getSystemInfo() //  获取设备信息
            .then(result => {
                return new Promise((resolve, reject) => { //  获取屏宽高
                    resolve({
                        key: '__WindowScale__',
                        data: {
                            height: result.windowHeight,
                            width: result.windowWidth
                        }
                    })
                });
            })
            .then(wxApiPromise.setStorage); //  存入本地
    }
})

/** app.json */

// "tabBar": {
//     "color": "#888888",
//     "selectedColor": "#FFFFFF",
//     "backgroundColor": "#813c85",
//     "borderStyle": "white",
//     "list": [{
//             "pagePath": "pages/shopping/index/index",
//             "text": "好物",
//             "iconPath": "icons/tabBar/nice-grey.png",
//             "selectedIconPath": "icons/tabBar/nice-white.png"
//         },
//         {
//             "pagePath": "pages/my/orders/orders",
//             "text": "我的",
//             "iconPath": "icons/tabBar/my-grey.png",
//             "selectedIconPath": "icons/tabBar/my-white.png"
//         }
//     ]
// }