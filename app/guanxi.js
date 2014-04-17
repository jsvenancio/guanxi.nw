/**
 * Created with IntelliJ IDEA.
 * User: scott
 * Date: 4/12/14
 * Time: 3:30 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.Loader.setConfig({enabled:true});

Ext.application({
    name: 'Guanxi',

    autoCreateViewport: true,

    models: [
        'Inxi'
    ],

    stores: [
        'ComponentTree'
    ],

    controllers: [
        'Display'
    ],

    views : [
        'DisplayTree'
    ]
});