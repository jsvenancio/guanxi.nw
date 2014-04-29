Ext.define('Guanxi.view.Viewport', {
    extend : 'Ext.container.Viewport',

    layout : 'fit',

    requires : 'Guanxi.view.Display',

    items : [{
        region: 'center',
        xtype : 'displayview'
    }]
});
