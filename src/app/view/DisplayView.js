Ext.define('Guanxi.view.DisplayView', {
    extend : 'Ext.tree.Panel',

    alias : 'widget.displayview',

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