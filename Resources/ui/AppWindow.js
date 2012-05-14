function AppWindow(title, postsLoader) {

	var ExternalLinkWindow = require('ui/ExternalLinkWindow');
	var CommonUtils = require('util/CommonUtils');
	var commonUtils = new CommonUtils();

	var ROW_BACKGROUND_IMAGE_URL = '/images/bg-row.png';
	var REFRESH_IMAGE_URL = '/images/refresh.png';
	var FEEDBACK_IMAGE_URL = '/images/feedback.png';
	var ABOUT_US_IMAGE_URL = '/images/aboutUs.png';
	var INT_LEFT = 10;
	var CHARS_PER_ROW = 47;

	var aboutUs = 'Sapan Diwakar:\ndiwakar.sapan@gmail.com\nPulkit Goyal:\npulkit110@gmail.com\n Ferhat Elmas:\nelmas.ferhat@gmail.com \n';
	var self = Ti.UI.createWindow({
		title : title,
		backgroundColor : 'white'
	});

	// For application menu
	var activity = self.activity;
	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var refreshItem = menu.add({
			title : "Refresh"
		});
		refreshItem.setIcon(REFRESH_IMAGE_URL);
		refreshItem.addEventListener("click", function(e) {
			beginLoadPosts();
		});

		var feedbackItem = menu.add({
			title : "Feedback"
		});
		feedbackItem.setIcon(FEEDBACK_IMAGE_URL);
		feedbackItem.addEventListener("click", function(e) {

			var emailDialog = Titanium.UI.createEmailDialog();
			if(!emailDialog.isSupported()) {
				Ti.UI.createAlertDialog({
					title : 'Error',
					message : 'Email not available'
				}).show();
				return;
			}
			emailDialog.setSubject('Feedback');
			emailDialog.setToRecipients(['android-support-hackurls@gmail.com']);

			emailDialog.setMessageBody('Enter your comments here..');

			emailDialog.addEventListener('complete', function(e) {
				if(e.result == emailDialog.SENT) {
					// Create a notification
					var n = Ti.UI.createNotification({
						message : 'Thanks for your feedback. '
					});
					// Set the duration to either Ti.UI.NOTIFICATION_DURATION_LONG or NOTIFICATION_DURATION_SHORT
					n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;

					// Setup the X & Y Offsets
					n.offsetX = 100;
					n.offsetY = 75;
					n.show();
				} else {
					alert("Unable to send message at this time.");
				}
			});
			emailDialog.open();

		});

		var aboutUsItem = menu.add({
			title : "About Us"
		});

		aboutUsItem.setIcon(ABOUT_US_IMAGE_URL);
		aboutUsItem.addEventListener("click", function(e) {
			var alertDialog = Titanium.UI.createAlertDialog({
				title : 'Hack Url Reader',
				message : aboutUs,
				buttonNames : ['OK']
			});
			alertDialog.show();
		});
	};

	/**
	 * Adds "swipe" event support to Android, and adds swipe up and down to iOS.
	 * @param view The view that should be made swipeable.
	 * @param allowVertical Whether or not vertical swipes (up and down) are allowed; default is false.
	 * @param tolerance How much further you need to go in a particular direction before swipe is fired; default is 2.
	 */
	function makeSwipeable(view, allowVertical, tolerance) {
		Ti.API.info('make swipeable called');

		tolerance = tolerance || 2;
		var start;
		view.addEventListener('touchstart', function(evt) {
			start = evt;
		});
		view.addEventListener('touchend', function(end) {
			var dx = end.x - start.x, dy = end.y - start.y;
			var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
			// only trigger if dragged further than 50 pixels
			if(dist < 50) {
				return;
			}
			var isVertical = Math.abs(dx / dy) < 1 / tolerance;
			var isHorizontal = Math.abs(dy / dx) < 1 / tolerance;
			// only trigger if dragged in a particular direction
			if(!isVertical && !isHorizontal) {
				return;
			}
			// disallow vertical swipe, depending on the setting
			if(!allowVertical && isVertical) {
				return;
			}
			// now fire the event off so regular 'swipe' handlers can use this!
			end.direction = isHorizontal ? ((dx < 0) ? 'left' : 'right') : ((dy < 0) ? 'up' : 'down');
			end.type = 'swipe';
			Ti.API.info('firing swipe');
			view.fireEvent('swipe', end);
		});
	}

	// create table view to show the results.
	var tableview = Titanium.UI.createTableView();

	/**
	 * Now call the function on our window, and we'll enable vertical swipes while we're at it.
	 */
	makeSwipeable(tableview, true);

	/**
	 * Now add a regular event listener for "swipe". It will work cross platform!
	 */
	tableview.addEventListener('swipe', function(evt) {
		alert('Swiped ' + evt.direction + '!');
	});

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
			backgroundImage : '/images/posetdHoursAgo.png',
			bottom : 2,
			right : 115,
			width : 32,
			height : 32
		});
		row.add(calendar);

		var postedAgo = post.time;
		if(post.timetype === 'timestamp') {
			postedAgo = commonUtils.prettyDateFromDate(new Date(post.time * 1000));
		} else if(post.timetype === 'datetime') {
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
		if(!arr_posts)
			return;

		data = [];
		for(var i = 0, j = arr_posts.length; i < j; i++) {
			var post = arr_posts[i];
			data.push(new PostRow(post));
		};
		tableview.setData(data);
		Titanium.App.Properties.setList("cacheData", arr_posts);
		Ti.App.fireEvent('LoadComplete');
	}

	function beginLoadPosts() {
		if(!Titanium.Network.online) {
			var arr_posts = Titanium.App.Properties.getList("cacheData");
			loadPosts(arr_posts);
		} else {
			Ti.API.info('Loading from internet');
			postsLoader.getPosts(loadPosts);
		}
	}

	beginLoadPosts();

	// Open the post in a new window
	tableview.addEventListener('click', function(e) {
		var externalLinkWindow = new ExternalLinkWindow(e.row.title, e.row.post.url);
		self.containingTab.open(externalLinkWindow);
	});
	self.add(tableview);

	return self;
};

module.exports = AppWindow;
