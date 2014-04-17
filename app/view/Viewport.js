/**
 * Created with IntelliJ IDEA.
 * User: Scott
 * Date: 4/12/14
 * Time: 6:56 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Guanxi.view.Viewport', {
    extend : 'Ext.container.Viewport',

    layout : 'fit',

    requires : 'Guanxi.view.DisplayTree',

    items : [{
        region: 'center',
        xtype : 'displaytree'
    }]
});
