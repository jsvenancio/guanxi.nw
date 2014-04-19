/**
 * Created with IntelliJ IDEA.
 * User: Scott
 * Date: 4/15/14
 * Time: 8:20 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Guanxi.store.Inxi', {
    extend: 'Ext.data.TreeStore',

    root : {
        expanded : true,
        children : []
    }
});