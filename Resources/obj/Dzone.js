function DZone() {

	// Dzone api is not maintained anymore. Using feedburner instead
	var STR_DZONE_URL = 'http://dzone-api.heroku.com/items.json';

	function getDZoneScore(clicks, voteups, votedowns) {
		return clicks;
	}


	this.getPosts = function(callback) {
		var xhr = Titanium.Network.createHTTPClient();

		xhr.onload = function() {
			var parsedJson = JSON.parse(this.responseText);
			if(parsedJson) {
				var items = [];
				for(var i = 0, j = parsedJson.length; i < j; i++) {
					var postData = parsedJson[i];
					items.push({
						title : postData.title,
						url : postData.deep_link,
						id : postData.id,
						commentCount : postData.comments,
						points : getDZoneScore(postData.clicks, postData.vote_up, postData.vote_down),
						time : postData.publishing_date,
						timetype : 'datetime',
						user : postData.submitter_name,
						thumbnail : postData.thumbnail
					});
				};
				callback.call(this, items);
			}
		};
		// open the client
		xhr.open('GET', STR_DZONE_URL);

		// send the data
		xhr.send();

	};
};

module.exports = DZone;
