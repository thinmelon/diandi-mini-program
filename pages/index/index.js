//index.js
const __STORAGE__ = require('../../services/storage.service.js');
const __WX_API_PROMISE__ = require('../../utils/wx.api.promise.js');
const __URI__ = require('../../utils/uri.constant.js');

Page({
	data: {

	},

	onLoad: function () {

	},

	fetchSTSToken: function () {
		__STORAGE__.
			fetchSTSToken(wx.getStorageSync('__SESSION_KEY__'))
			.then(res => {
				console.log(res);
			})
	},

	/**
	 * 		上传图片
	 */
	chooseImage: function () {
		__WX_API_PROMISE__					//	选择图片
			.chooseImage({
				count: 9
			})
			.then(res => {
				console.log(res)
				wx.showLoading({						//  显示上传等待框
					title: '正在上传...',
					mask: true
				})

				let tasks = [];									//	并行上传所选的图片
				for (let i = 0; i < res.tempFilePaths.length; i++) {
					tasks.push(__WX_API_PROMISE__.uploadFile({
						url: __URI__.uploadImage(),
						filePath: res.tempFilePaths[i],
						name: 'wxChooseImage',
						formData: {
							fieldName: 'wxChooseImage'
						}
					}));
				}
				return new Promise((resolve, reject) => { resolve(tasks) });
			})
			.then(res => {
				return Promise.all(res);				//	返回结果
			})
			.then(res => {
				console.log(res);
			})
			.catch(exception => {
				console.error(exception)
			})
			.finally(() => {
				wx.hideLoading();						//	关闭等待框
			})
	},

	/**
	 * 		上传视频
	 */
	chooseVideo: function () {
		__WX_API_PROMISE__					//	选择图片
			.chooseVideo({
			})
			.then(res => {
				return __WX_API_PROMISE__.uploadFile({
					url: __URI__.uploadVideo(),
					filePath: res.tempFilePath,
					name: 'wxChooseVideo',
					formData: {
						fieldName: 'wxChooseVideo'
					}
				})
			})
			.then(res => {
				console.log(res);
			})
			.catch(exception => {
				console.error(exception)
			})
			.finally(() => {
				wx.hideLoading();						//	关闭等待框
			})
	}

})

