Ext.define('Guanxi.controller.Display', {
    extend: 'Ext.app.Controller',

    models : [
        'Inxi'
    ],

    stores : [
        'ComponentTree'
    ],

    views : [
        'DisplayTree'
    ],

    init : function() {
        this.control({
            'viewport > displaytree' : {
                itemclick : this.onItemclicked,
                render : this.onViewRendered
            }
        });
    },

    onItemclicked : function(view, record) {
    },

    onViewRendered : function(displayTree) {
        // debugger;
        this.readFile(this.parseFile);
    },

    readFile : function(callback) {
        var me = this;
        var file = require('fs');
        file.readFile('./inxiout.txt', 'utf-8', function(error, contents) {
            callback(me, error, contents);
        });
    },

    parseLines : function(hash) {
        var keys = Ext.Object.getKeys(hash);

        Ext.each(keys, function(key){
            debugger;
            var words = hash[key].split(' ');
            var subKeys = [];
            for (var i = 0, len = words.length; i < len; i++) {
                var word = words[i];
                if (word.indexOf(':', word.length - word.length) !== -1) {
                    subKeys.push(word);
                }
            }
            debugger;
            if (subKeys.length > 0) {
                var values = hash[key].split(':');
                var subHash = {};

                for (var i = 0, len = values.length; i < len; i++) {
                    var value = values[i];
                    for (var j = 0, len = subKeys.length; i < len; j++) {
                        var subKey = subKeys[j];
                        if (value.indexOf(subKey) !== -1) {
                            subHash[subKey] = values[i + 1];
                        }
                    }
                }
            }
            debugger;
        });
        // console.log('Guanxi.view.Display: ');
        // console.log(object);
        // scope.update('After read');
        debugger;
    },

    parseFile : function(scope, error, contents) {
        var rawLines = contents.split('\n');
        var hash = {};
        var key = '';
        for (var i = 0, len = rawLines.length; i < len; i++) {
            var line = rawLines[i];
            if (line.match(/^[ ]/)) {
                hash[key] = hash[key] + ' ' + line.replace('\n', '').trim();
            } else {
                key = line.split(':', 1)[0];
                if (!Ext.isEmpty(key)) {
                    hash[key] = line.substring(key.length + 1, line.length).trim();
                }
            }
        }
        scope.parseLines(hash);
    }
});