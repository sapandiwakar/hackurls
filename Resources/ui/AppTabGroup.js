function AppTabGroup() {

	// xml feeds. Use google feed api to convert xml to json
	var STR_SLASHDOT_URL = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&q=http://feeds.feedburner.com/slashdot/?format=xml';
	var STR_TECHMEME_URL = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&q=http://www.techmeme.com/feed.xml';
	var STR_WIRED_URL = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&q=http://feeds.wired.com/wired/index?format=xml';
	var STR_DZONE_URL = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=30&q=http://feeds.dzone.com/dzone/frontpage?format=xml';

	// json feeds
	var STR_REDDIT_URL = 'http://www.reddit.com/hot.json';
	var STR_PROGGIT_URL = 'http://www.reddit.com/r/programming/hot.json';

	// Images
	var STR_DZONE_IMAGE_URL = '/images/dzone/dzone-2-icon_64x64.png';
	var STR_REDDIT_IMAGE_URL = '/images/reddit/reddit-icon_72x72.png';
	var STR_SLASHDOT_IMAGE_URL = '/images/slashdot/slashdot-icon_72x72.png';
	var STR_TECHMEME_IMAGE_URL = '/images/techmeme/techmeme-icon_72x72.png';
	var STR_WIRED_IMAGE_URL = '/images/wired/wired-icon_72x72.png';
	var STR_HN_IMAGE_URL = '/images/hackernews/hackernews-icon_72x72.png';
	var STR_PROGGIT_IMAGE_URL = '/images/proggit/proggit-icon_72x72.png';

	// Modules
	var BOO_SHOW_DZONE = false;

	// Constants
	var INT_NUM_APPS = 6;

	//declare module dependencies
	var AppWindow = require('ui/AppWindow');

	//create module instance
	var self = Ti.UI.createTabGroup();

	var HackerNews = require('obj/HackerNews');
	var hackernews = new HackerNews();

	var Reddit = require('obj/Reddit');
	var reddit = new Reddit(STR_REDDIT_URL, 'reddit');
	var proggit = new Reddit(STR_PROGGIT_URL, 'proggit');

	var Feedburner = require('obj/Feedburner');
	var slashdot = new Feedburner(STR_SLASHDOT_URL);
	var techmeme = new Feedburner(STR_TECHMEME_URL);
	var wired = new Feedburner(STR_WIRED_URL);
	var dzone = new Feedburner(STR_DZONE_URL);

	//create app tabs
	var win1 = new AppWindow(L('hackernews'), hackernews);
	var win2 = new AppWindow(L('reddit'), reddit);
	var win3 = new AppWindow(L('proggit'), proggit);
	var win4 = new AppWindow(L('dzone'), dzone);
	var win5 = new AppWindow(L('slashdot'), slashdot);
	var win6 = new AppWindow(L('techmeme'), techmeme);
	var win7 = new AppWindow(L('wired'), wired);

	var tab1 = Ti.UI.createTab({
		title : L('hackernews'),
		icon : STR_HN_IMAGE_URL,
		window : win1
	});
	win1.containingTab = tab1;

	var tab2 = Ti.UI.createTab({
		title : L('reddit'),
		icon : STR_REDDIT_IMAGE_URL,
		window : win2
	});
	win2.containingTab = tab2;

	var tab3 = Ti.UI.createTab({
		title : L('proggit'),
		icon : STR_PROGGIT_IMAGE_URL,
		window : win3
	});
	win3.containingTab = tab3;

	if(BOO_SHOW_DZONE) {
		var tab4 = Ti.UI.createTab({
			title : L('dzone'),
			icon : STR_DZONE_IMAGE_URL,
			window : win4
		});
		win4.containingTab = tab4;
	}

	var tab5 = Ti.UI.createTab({
		title : L('slashdot'),
		icon : STR_SLASHDOT_IMAGE_URL,
		window : win5
	});
	win5.containingTab = tab5;

	var tab6 = Ti.UI.createTab({
		title : L('techmeme'),
		icon : STR_TECHMEME_IMAGE_URL,
		window : win6
	});
	win6.containingTab = tab6;

	var tab7 = Ti.UI.createTab({
		title : L('wired'),
		icon : STR_WIRED_IMAGE_URL,
		window : win7
	});
	win7.containingTab = tab7;

	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	
	if(BOO_SHOW_DZONE)
		self.addTab(tab4);

	self.addTab(tab5);
	self.addTab(tab6);
	self.addTab(tab7);
	
	return self;
};

module.exports = AppTabGroup;
