//app.js
const wxApiPromise = require('./utils/wx.api.promise.js');

App({
	onLaunch: function () {
		wxApiPromise
			.login()
			.then(result => {
				console.log(result);
			});

		wxApiPromise
			.getSystemInfo()
			.then(result => {
				return new Promise((resolve, reject) => {
					resolve({
						key: '__WindowScale__',
						data: {
							height: result.windowHeight,
							width: result.windowWidth
						}
					})
				});
			})
			.then(wxApiPromise.setStorage);
	}
})