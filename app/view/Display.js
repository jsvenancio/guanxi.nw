/**
 * Created with IntelliJ IDEA.
 * User: Scott
 * Date: 4/13/14
 * Time: 2:11 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Guanxi.view.Display', {
    extend: 'Ext.panel.Panel',

    alias : 'widget.viewdisplay',

    store : 'Components',

    layout : 'fit',

    title : 'inxi',

    initComponent : function() {
        console.log('init.display.view: ');

        this.html = 'Before Read';

        this.callParent();

        this.update('After Read');

//        this.readFile(this.parseFile);
    },

    readFile : function(callback) {
        var me = this;
        var file = require('fs');
        file.readFile('./inxiout.txt', 'utf-8', function(error, contents) {
            var lines = contents.split('\n');
            var keys = {};
            var key = '';
            for (var i = 0, len = lines.length; i < len; i++) {
                var line = lines[i];
                if (line.match(/^[ ]/)) {
                    keys[key] = keys[key] + ' ' + line.replace('\n', '').trim();
                } else {
                    key = line.split(':', 1)[0];
                    keys[key] = line.substring(key.length + 1, line.length).trim();
                }
            }
            callback(me, keys);
        });
    },

    parseFile : function(scope, object) {
        console.log('Guanxi.view.Display: ');
        console.log(object);
        scope.update('After read');
    }

});