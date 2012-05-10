function AppWindow(title, postsLoader) {

	var ExternalLinkWindow = require('ui/ExternalLinkWindow');

	var self = Ti.UI.createWindow({
		title : title,
		backgroundColor : 'white'
	});

	// create table view to show the results.
	var tableview = Titanium.UI.createTableView();

	function PostRow(post) {
		var row = Ti.UI.createTableViewRow({
			// hasChild : true,
			// backgroundImage : ROW_BACKGROUND_IMAGE_URL,
			// selectedBackgroundImage : ROW_SELECTED_BACKGROUND_IMAGE_URL
		});
		row.title = post.title;
		row.post = post;
		return row;
	}

	function loadPosts(arr_posts) {
		data = [];
		for(var i = 0, j = arr_posts.length; i < j; i++) {
			var post = arr_posts[i];
			data.push(new PostRow(post));
		};
		tableview.setData(data);
	}

	postsLoader.getPosts(loadPosts);

	// Open the post in a new window
	tableview.addEventListener('click', function(e) {
		var externalLinkWindow = new ExternalLinkWindow(e.row.title, e.row.post.url);
		self.containingTab.open(externalLinkWindow);
	});
	self.add(tableview);

	return self;
};

module.exports = AppWindow;
