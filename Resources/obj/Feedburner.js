function Feedburner(url) {

	function getDZoneScore(clicks, voteups, votedowns) {
		return clicks;
	}

	var INT_NUM_TAGS = 2;

	this.getPosts = function(callback) {
		var xhr = Titanium.Network.createHTTPClient();

		xhr.onload = function() {
			var parsedJson = JSON.parse(this.responseText);
			if(parsedJson && parsedJson.responseData && parsedJson.responseData.feed && parsedJson.responseData.feed.entries) {
				var items = [];
				for(var i = 0, j = parsedJson.responseData.feed.entries.length; i < j; i++) {
					var postData = parsedJson.responseData.feed.entries[i];
					
					// Build tags list
					var details = "";
					var separator = "";
					for (var k=0; k < INT_NUM_TAGS && k < postData.categories.length; k++) {
					  details += separator + postData.categories[k];
					  separator = " | ";
					};
					// If no category, then use author name
					if (postData.categories.length == 0) {
						details = postData.author;
					} 
					
					items.push({
						title : postData.title,
						url : postData.link,
						id : -1,
						commentCount : -1,
						points : -1,
						time : postData.publishedDate,
						timetype : 'datetime',
						user : postData.author,
						snippet : postData.contentSnippet,
						details : details
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
