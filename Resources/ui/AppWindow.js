function AppWindow(title, postsLoader) {

	var ExternalLinkWindow = require('ui/ExternalLinkWindow');
	var CommonUtils = require('util/CommonUtils');
	var commonUtils = new CommonUtils();
	
	var ROW_BACKGROUND_IMAGE_URL = '/images/bg-row.png';
	var INT_LEFT = 10;
	var CHARS_PER_ROW = 47;

	var self = Ti.UI.createWindow({
		title : title,
		backgroundColor : 'white'
	});

	// create table view to show the results.
	var tableview = Titanium.UI.createTableView();

	function chr(code) {
		return String.fromCharCode(code);
	}

	function fixSpecialChars(text) {
		var charmap = {
			'&euro;&trade;' : '\'', // Right-apostrophe (eg in I'm)
			'&euro;&oelig;' : '"', // Opening speech mark
			'&euro;&ldquo;' : '-', // Long dash
			'&euro;?' : '"', // Closing speech mark
			'&euro;' : '"', // Closing speech mark
			'&amp;' : '&' //ampersand
		};

		for(var index in charmap) {
			text = text.replace(index, charmap[index]);
		}
		return text;
	};

	function PostRow(post) {
		// Truncate long titles
		if(post.title.length > 2 * CHARS_PER_ROW - 10) {
			post.title = post.title.substring(0, CHARS_PER_ROW * 2 - 10);
			post.title += '...';
		}

		var row = Ti.UI.createTableViewRow();
		row.selectedBackgroundColor = '#fff';
		// row.height = (post.title.length/CHARS_PER_ROW >= 1)?110:70;
		row.className = 'datarow';
		row.clickName = 'row';

		Ti.API.info('details: ' + post.details);
		var details = Ti.UI.createLabel({
			color : '#576996',
			font : {
				fontSize : 16,
				fontWeight : 'bold',
				fontFamily : 'Arial'
			},
			left : INT_LEFT,
			bottom : 2,
			text : post.details
		});

		row.add(details);

		var fontSize = 22;
		var title = Ti.UI.createLabel({
			color : '#222',
			font : {
				fontSize : fontSize,
				fontWeight : 'normal',
				fontFamily : 'Arial'
			},
			bottom : 35,
			left : INT_LEFT,
			text : fixSpecialChars(post.title)
		});
		row.add(title);

		var calendar = Ti.UI.createView({
			backgroundImage : '/images/eventsButton.png',
			bottom : 2,
			right : 110,
			width : 32,
			height : 32
		});
		row.add(calendar);

		var postedAgo = post.time;
		if(post.timetype === 'timestamp') {
			postedAgo = commonUtils.prettyDateFromDate(new Date(post.time * 1000));
		} else if (post.timetype === 'datetime') {
			postedAgo = commonUtils.prettyDateFromDate(new Date(post.time));
		}

		var date = Ti.UI.createLabel({
			color : '#999',
			font : {
				fontSize : 13,
				fontWeight : 'normal',
				fontFamily : 'Arial'
			},
			bottom : 5,
			height : 20,
			right : 10,
			width : 100,
			text : postedAgo
		});
		row.add(date);

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
