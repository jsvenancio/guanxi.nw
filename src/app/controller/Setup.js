Ext.define('Guanxi.controller.Setup', {
    extend: 'Ext.app.Controller',

    // instead of showing the main panel, show a popup or panel 'wizard'

    // maybe this goes into a util and not in any MVC component
    init : function() {
        debugger;
        var fs = require('fs');

        var paths = process.env.PATH.split(':');
        var guanxiHome = process.env.HOME + '/.guanxi';
        var ginxiHome = guanxiHome + '/usr/bin/inxi';
        var oldPath;

        // check for local version
        if (!fs.existsSync(ginxiHome)) {
            // see if system version
            Ext.each(paths, function(path) {
                var path = path + '/inxi';
                if (fs.existsSync(path)) {
                    oldPath = path;
                    return false;
                }
            });

            if (Ext.isEmpty(oldPath)) {// system version?
                // notify user, ask to retreive inxi
                // go get a version and load to local, parse for guanxi
                // cp guanxi.conf
            }

            // notify user inxi found, show user updating and parsing inxi
            // cp guanxi.conf
            // parse local inxi, replace SCRIPT_NAME with 'guanxi'
        }

        // now we have local version, let's go
        this.application.getController('Display');
    }
});