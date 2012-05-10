function Feedburner(url) {

	function getDZoneScore(clicks, voteups, votedowns) {
		return clicks;
	}
	
	this.getPosts = function(callback) {
		var xhr = Titanium.Network.createHTTPClient();

		xhr.onload = function() {
			var parsedJson = JSON.parse(this.responseText);
			if(parsedJson && parsedJson.responseData && parsedJson.responseData.feed && parsedJson.responseData.feed.entries) {
				var items = [];
				for(var i = 0, j = parsedJson.responseData.feed.entries.length; i < j; i++) {
					var postData = parsedJson.responseData.feed.entries[i];
					items.push({
						title : postData.title,
						url : postData.link,
						id : -1, 
						commentCount : -1, 
						points : -1,
						postedAgo : postData.publishedDate,
						postedBy : postData.author,
						snippet : postData.contentSnippet
					});
				};
				callback.call(this, items);
			}
		};
		// open the client
		xhr.open('GET', url);

		// send the data
		xhr.send();

	};
};

module.exports = Feedburner;
