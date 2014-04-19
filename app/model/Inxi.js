/**
 * Created with IntelliJ IDEA.
 * User: Scott
 * Date: 4/13/14
 * Time: 11:15 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Guanxi.model.Inxi', {
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