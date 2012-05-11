function HackerNews() {

	// var STR_HN_URL = 'http://api.ihackernews.com/page'; // Doesn't work sometimes
	var STR_HN_URL = 'http://hndroidapi.appspot.com/news/format/json/page/?appid=hackurls';
	var STR_HN_BASE = 'http://news.ycombinator.com/';

	function getDomain(url) {
		var match = url.match(/:\/\/(.[^/]+)/);
		if(match === null) {
			return ' ';
		}
		return (match[1]).replace('www.', '');
	}


	this.getPosts = function(callback) {
		var xhr = Titanium.Network.createHTTPClient();

		xhr.onload = function() {
			Ti.API.info(this.responseText);
			var parsedJson = JSON.parse(this.responseText);

			if(parsedJson !== undefined && parsedJson.items !== undefined) {
				var items = [];
				for(var i = 0, j = parsedJson.items.length; i < j; i++) {
					var post = parsedJson.items[i];
					var domain = getDomain(post.url);
					items.push({
						title : post.title,
						url : (domain == ' ') ? STR_HN_BASE + post.url : post.url,
						id : post.item_id,
						commentCount : post.comments,
						time : post.time,
						timetype : 'pretty',
						details : domain,
						user : post.user,
						points : post.score,
						description : post.description
					});
				};
				callback.call(this, items);
			}
		};
		// open the client
		xhr.open('GET', STR_HN_URL);

		// send the data
		xhr.send();

	};
};

module.exports = HackerNews;
