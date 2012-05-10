function HackerNews() {

	var STR_HN_URL = 'http://api.ihackernews.com/page';

	this.getPosts = function(callback) {
		var xhr = Titanium.Network.createHTTPClient();

		xhr.onload = function() {
			Ti.API.info(this.responseText);
			var parsedJson = JSON.parse(this.responseText);
			Ti.API.info(parsedJson);
			if(parsedJson !== undefined && parsedJson.items !== undefined) {
				callback.call(this, parsedJson.items);
			}
		};
		// open the client
		xhr.open('GET', STR_HN_URL);

		// send the data
		xhr.send();

	};
};

module.exports = HackerNews;
