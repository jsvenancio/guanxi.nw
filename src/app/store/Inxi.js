Ext.define('Guanxi.store.Inxi', {
    extend: 'Ext.data.TreeStore',

    model : 'Guanxi.model.Inxi',

    root : {
        expanded : true,
        children : []
    }//,
//
//    /**
//     * API call to load the store.
//     */
//    loadSysInfo : function() {
//        this.readSysInfo(this.parseSysInfo);
//    },
//
//    /**
//     * More or less a private method, wouldn't do a lot of good from outside.
//     * @param callback
//     */
//    readSysInfo : function(callback) {
//        var me = this;
//        var cp = require('child_process').exec;
//
//        cp('inxi -F -c0', function(error, stdout, stderr) {
//            callback(error, stdout, stderr, me);
//        });
//    },
//
//    /**
//     * Bring scope back in line.  Using 'me' as the scope, then calling
//     * the method, sets the scope for the rest of the called methods.
//     *
//     * The callback puts scope at the 'window', this method causes the scope
//     * to be 'this.display'
//     * @param err: errors in the caller
//     * @param stdout: output of the process
//     * @param stderr: errors of the process
//     * @param me
//     */
//    parseSysInfo : function(err, stdout, stderr, me) {
//        me.parseOutput(err, stdout, stderr);
//    },
//
//    /**
//     * Break the output up into primary sections
//     * @param err
//     * @param stdout
//     * @param stderr
//     */
//    parseOutput : function(err, stdout, stderr) {
//        if (Ext.isEmpty(err) && Ext.isEmpty(stderr)) {
//            stdout = stdout.toString();
//            var rawLines = stdout.split('\n');
//            var hash = {};
//            var key = '';
//            var rootNode = this.getRootNode();
//
//            Ext.each(rawLines, function(line) {
//                if (line.match(/^[ ]/)) {
//                    var record = rootNode.findChild('key', key);
//                    hash[key] = hash[key] + ' ' + line.replace('\n', '').trim();
//                    record.setChildText(hash[key]);
//                } else {
//                    key = line.split(':', 1)[0];
//                    if (!Ext.isEmpty(key)) {
//                        var topRec = Ext.create('Guanxi.model.Inxi');
//                        hash[key] = line.substring(key.length + 1, line.length).trim();
//                        topRec.setKey(key);
//                        topRec.setText(key);
//                        topRec.setChildText(hash[key]);
//                        rootNode.appendChild(topRec);
//                    }
//                }
//            },this);
//            this.parseLines(hash);
//        } else if (!Ext.isEmpty(err)) {
//            this.errorHandler(err);
//        } else if (!Ext.isEmpty(stderr)) {
//            this.errorHandler(stderr);
//        }
//    },
//
//    /**
//     * Parse subsections from primaries
//     * @param hash
//     */
//    parseLines : function(hash) {
//        var rootNodeKeys = Ext.Object.getKeys(hash);
//        var rootNode = this.getRootNode();
//
//        Ext.each(rootNodeKeys, function(nodeKey){
//            var record = rootNode.findChild('key', nodeKey);
//            this.parser(record, true);
//            record.setChildText('');
//        },this);
//    },
//
//    /**
//     * Heavy lifter.  Parses strings into child objects
//     * @param record
//     * @param isMasterNode
//     */
//    parser : function(record, isMasterNode) {
//        var subRec;
//        var keys = record.getChildText().split(':');
//        var subHash = {};
//
//        if (isMasterNode && keys.length == 1) {
//            var subRec = Ext.create('Guanxi.model.Inxi');
//            subRec.setText(keys[0]);
//            subRec.setLeaf(true);
//            record.appendChild(subRec);
//        } else {
//            var count = 1;
//            Ext.each(keys, function(key){
//                key = key.trim();
//                var lastSet = count + 1 == keys.length  && isMasterNode;
//                var isNested = count < keys.length;
//                var words = key.split(' ');
//                var word = words[words.length - 1];
//                if (lastSet) {
//                    var keyNode = Ext.create('Guanxi.model.Inxi');
//                    keyNode.setKey(word);
//                    keyNode.setText(word);
//
//                    var subRec = Ext.create('Guanxi.model.Inxi');
//                    subRec.setKey(word + 'Node');
//                    subRec.setText(keys[count].trim());
//                    subRec.setLeaf(true);
//
//                    keyNode.appendChild(subRec);
//                    record.appendChild(keyNode);
//                } else if (isNested && isMasterNode) {
//                    var keyNode = Ext.create('Guanxi.model.Inxi');
//                    keyNode.setKey(word);
//                    keyNode.setText(word);
//
//                    var subRec = Ext.create('Guanxi.model.Inxi');
//                    var text = keys[count].trim();
//                    subRec.setKey(word + 'Node');
//                    subRec.setChildText(text);
//                    this.parser(subRec, false);
//                    subRec.setChildText('');
//                    subRec.setLeaf(true);
//
//                    keyNode.appendChild(subRec);
//                    record.appendChild(keyNode);
//                } else if (!isMasterNode) {
//                    delete words[words.length - 1];
//                    record.setText(words.join().replace(/,/g, ' ').trim());
//                }
//                count++;
//            }, this);
//        }
//    },
//
//    /**
//     * Show the user an error message.
//     * @param errMsg: The message to tell the user.
//     */
//    errorHandler : function(errMsg) {
//        var rootNode = this.getRootNode();
//        var errRec = Ext.create('Guanxi.model.Inxi');
//        errRec.setKey('error');
//        errRec.setText(errMsg);
//        errRec.set('cls', 'x-tab-noicon');
//        rootNode.appendChild(errRec);
//    }
});