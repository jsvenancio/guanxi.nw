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