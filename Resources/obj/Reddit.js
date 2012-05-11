function Reddit(url, type) {

	var STR_REDDITBASE = 'http://www.reddit.com'
	this.getPosts = function(callback) {
		var xhr = Titanium.Network.createHTTPClient();

		xhr.onload = function() {
			var parsedJson = JSON.parse(this.responseText);
			if(parsedJson && parsedJson.data && parsedJson.data.children) {
				var items = [];
				for(var i = 0, j = parsedJson.data.children.length; i < j; i++) {
					var postData = parsedJson.data.children[i].data;
					items.push({
						title : postData.title,
						url : STR_REDDITBASE + postData.permalink,
						id : postData.id,
						commentCount : postData.num_comments,
						points : postData.score,
						time : postData.created_utc,
						timetype : 'timestamp',
						user : postData.author,
						thumbnail : postData.thumbnail,
						details : (type==='proggit')?postData.domain:postData.subreddit
					});
				};
				Ti.API.log(items);
				callback.call(this, items);
			}
		};
		// open the client
		xhr.open('GET', url);

		// send the data
		xhr.send();

	};
};

module.exports = Reddit;
