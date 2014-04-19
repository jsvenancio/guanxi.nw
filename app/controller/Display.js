Ext.define('Guanxi.controller.Display', {
    extend: 'Ext.app.Controller',

    models : [
        'Inxi'
    ],

    stores : [
        'Inxi'
    ],

    views : [
        'Display'
    ],

    init : function() {
        Ext.data.NodeInterface.decorate('Guanxi.model.Inxi');
        this.control({
            'viewport > display' : {
                beforerender : this.onViewRendered,
                scope : this
            }
        });
    },

    onViewRendered : function() {
        var file = require('fs');
        var inxi = file.readFileSync('./inxioutMod.txt').toString();
        this.parseFile(inxi);
    },

    parseFile : function(contents) {
        var rawLines = contents.split('\n');
        var hash = {};
        var key = '';
        var store = this.getInxiStore();
        var rootNode = store.getRootNode();

        Ext.each(rawLines, function(line) {
            if (line.match(/^[ ]/)) {
                var record = rootNode.findChild('key', key);
                hash[key] = hash[key] + ' ' + line.replace('\n', '').trim();
                record.setChildText(hash[key]);
            } else {
                key = line.split(':', 1)[0];
                if (!Ext.isEmpty(key)) {
                    var topRec = Ext.create('Guanxi.model.Inxi');
                    hash[key] = line.substring(key.length + 1, line.length).trim();
                    topRec.setKey(key);
                    topRec.setText(key);
                    topRec.setChildText(hash[key]);
                    rootNode.appendChild(topRec);
                }
            }
        },this);
        this.parseLines(hash);
    },

    parseLines : function(hash) {
        var rootNodeKeys = Ext.Object.getKeys(hash);
        var store = this.getInxiStore();
        var rootNode = store.getRootNode();

        Ext.each(rootNodeKeys, function(nodeKey){
            var record = rootNode.findChild('key', nodeKey);
            this.parser(record, true);
            record.setChildText('');
        },this);
    },

    parser : function(record, isMasterNode) {
        var subRec;
        var keys = record.getChildText().split(':');
        var subHash = {};

        if (isMasterNode && keys.length == 1) {
            var subRec = Ext.create('Guanxi.model.Inxi');
            subRec.setText(keys[0]);
            subRec.setLeaf(true);
            record.appendChild(subRec);
        } else {
            var count = 1;
            Ext.each(keys, function(key){
                key = key.trim();
                var lastSet = count + 1 == keys.length  && isMasterNode;
                var isNested = count < keys.length;
                var words = key.split(' ');
                var word = words[words.length - 1];
                if (lastSet) {
                    var keyNode = Ext.create('Guanxi.model.Inxi');
                    keyNode.setKey(word);
                    keyNode.setText(word);

                    var subRec = Ext.create('Guanxi.model.Inxi');
                    subRec.setKey(word + 'Node');
                    subRec.setText(keys[count].trim());
                    subRec.setLeaf(true);

                    keyNode.appendChild(subRec);
                    record.appendChild(keyNode);
                } else if (isNested && isMasterNode) {
                    var keyNode = Ext.create('Guanxi.model.Inxi');
                    keyNode.setKey(word);
                    keyNode.setText(word);

                    var subRec = Ext.create('Guanxi.model.Inxi');
                    var text = keys[count].trim();
                    subRec.setKey(word + 'Node');
                    subRec.setChildText(text);
                    this.parser(subRec, false);
                    subRec.setChildText('');
                    subRec.setLeaf(true);

                    keyNode.appendChild(subRec);
                    record.appendChild(keyNode);
                } else if (!isMasterNode) {
                    delete words[words.length - 1];
                    record.setText(words.join().replace(/,/g, ' ').trim());
                }
                count++;
            }, this);
        }
    }
});