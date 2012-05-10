function ExternalLinkWindow(title, url) {
	var self = Ti.UI.createWindow({
		title:title,
		// backgroundColor:'white'
	});
	Ti.API.log(url);
	var webview = Titanium.UI.createWebView({url:url});
	self.add(webview); 
	
	return self;
};

module.exports = ExternalLinkWindow;
