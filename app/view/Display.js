/**
 * Created with IntelliJ IDEA.
 * User: Scott
 * Date: 4/15/14
 * Time: 8:55 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Guanxi.view.Display', {
    extend : 'Ext.tree.Panel',

    alias : 'widget.display',

    store : 'Inxi',

    title : 'inxi - System Info',

    collapsible : false,

    useArrows : true,

    rootVisible : false,

    multiSelect : false,

    viewConfig:{
        markDirty:false
    }
});