Ext.Loader.setConfig({enabled:true});

Ext.application({
    name: 'Guanxi',

    autoCreateViewport: true,

    models: [
        'Inxi'
    ],

    stores: [
        'Inxi'
    ],

    controllers: [
        'Display'
    ],

    views : [
        'Display'
    ]
});