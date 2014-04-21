Ext.define('Guanxi.store.Inxi', {
    extend: 'Ext.data.TreeStore',

    model : 'Guanxi.model.Inxi',

    root : {
        expanded : true,
        children : []
    }
});