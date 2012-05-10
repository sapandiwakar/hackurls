function AppTabGroup() {
	//declare module dependencies
	var AppWindow = require('ui/AppWindow');
	
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	var HackerNews = require('obj/HackerNews');
	var hackernews = new HackerNews();
	var Reddit = require('obj/Reddit');
	var reddit = new Reddit('http://www.reddit.com/hot.json');
	var proggit = new Reddit('http://www.reddit.com/r/programming/hot.json');
	
	//create app tabs
	var win1 = new AppWindow(L('hackernews'), hackernews),
		win2 = new AppWindow(L('reddit'), reddit), 
		win3 = new AppWindow(L('PROGGIT'), proggit);
	
	var tab1 = Ti.UI.createTab({
		title: L('hackernews'),
		icon: '/images/KS_nav_ui.png',
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('reddit'),
		icon: '/images/KS_nav_views.png',
		window: win2
	});
	win2.containingTab = tab2;
	
	var tab3 = Ti.UI.createTab({
		title: L('proggit'),
		icon: '/images/KS_nav_views.png',
		window: win3
	});
	win3.containingTab = tab3;
	
	self.addTab(tab1);
	self.addTab(tab2);
	self.addTab(tab3);
	
	return self;
};

module.exports = AppTabGroup;
