/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.
 * A starting point for tab-based application with multiple top-level windows.
 * Requires Titanium Mobile SDK 1.8.0+.
 *
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *
 */

if(!Titanium.Network.online) {
	// Create a notification
	var n = Ti.UI.createNotification({
		message : 'You appear to lost your data connection! Please check and relaunch the application'
	});
	// Set the duration to either Ti.UI.NOTIFICATION_DURATION_LONG or NOTIFICATION_DURATION_SHORT
	n.duration = Ti.UI.NOTIFICATION_DURATION_LONG;

	// Setup the X & Y Offsets
	n.offsetX = 100;
	n.offsetY = 75;
	n.show();
}

//bootstrap and check dependencies
if(Ti.version < 1.8) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
} else if(Ti.Platform.osname === 'mobileweb') {
	alert('Mobile web is not yet supported by this template');
} else {
	//require and open top level UI component
	var AppTabGroup = require('ui/AppTabGroup');
	new AppTabGroup().open();
}
