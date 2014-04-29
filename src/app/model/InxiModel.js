Ext.define('Guanxi.model.InxiModel', {
    extend : 'Ext.data.Model',

    fields : [
        {
            name : 'key',
            type : 'string'
        },{
            name : 'text',
            type : 'string'
        },{
            name : 'leaf',
            type : 'boolean'
        },{
            name : 'childText',
            type : 'string'
        }
    ],

    /*
        Getters and setters for ease of use
     */

    getKey : function() {
        return this.get('key');
    },

    setKey : function(value) {
        this.set('key', value);
    },

    getText : function() {
        return this.get('text');
    },

    setText : function(value) {
        this.set('text', value);
    },

    isLeaf : function() {
        return this.get('leaf');
    },

    setLeaf : function(value) {
        this.set('leaf', value);
    },

    getChildText : function() {
        return this.get('childText');
    },

    setChildText : function(value) {
        this.set('childText', value);
    }
});