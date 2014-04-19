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

    /**
     *  Function called before display view is rendered
     */
    onViewRendered : function() {
        this.getSysInfo(this.parseSysInfo);
    },

    /**
     * Retrieve the system information
     * @param callback
     */
    getSysInfo : function(callback) {
        var me = this;

        var spawn = require('child_process').exec;

        var sysInfo = spawn('inxi -F -c0', function(error, stdout, stderr) {
            callback(error, stdout, stderr, me);
        });
    },

    /**
     * Bring scope back in line.  Using 'me' as the scope, then calling
     * the method, sets the scope for the rest of the called methods.
     *
     * The callback puts scope at the 'window', this method causes the scope
     * to be 'this.display'
     * @param err: errors in the caller
     * @param stdout: output of the process
     * @param stderr: errors of the process
     * @param me
     */
    parseSysInfo : function(err, stdout, stderr, me) {
        me.parseOutput(err, stdout, stderr);
    },

    /**
     * Initial parse of the output, basically splits the lines into
     * perspective types, e.g. Graphics, System, CPU
     * @param err
     * @param stdout
     * @param stderr
     */
    parseOutput : function(err, stdout, stderr) {
        var stdout = stdout.toString();
        var rawLines = stdout.split('\n');
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

    /**
     * Iterate over each type and setup objects
     * @param hash
     */
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

    /**
     * Parses a record (text line) into an object
     * @param record
     * @param isMasterNode
     */
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
                if (lastSet) { // the last line should contain no additional keys
                    var keyNode = Ext.create('Guanxi.model.Inxi');
                    keyNode.setKey(word);
                    keyNode.setText(word);

                    var subRec = Ext.create('Guanxi.model.Inxi');
                    subRec.setKey(word + 'Node');
                    subRec.setText(keys[count].trim());
                    subRec.setLeaf(true);

                    keyNode.appendChild(subRec);
                    record.appendChild(keyNode);
                } else if (isNested && isMasterNode) {// line may contain additional keys, get them and their objects
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
                } else if (!isMasterNode) {// create the key:text object when other keys exist in 'text'
                    delete words[words.length - 1];
                    record.setText(words.join().replace(/,/g, ' ').trim());
                }
                count++;
            }, this);
        }
    }
});
