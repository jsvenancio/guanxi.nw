Ext.Loader.setConfig({enabled:true});

Ext.app.Application({
    name: 'Guanxi',

    autoCreateViewport: true,

    models: [
        'Inxi'
    ],

    stores: [
        'Inxi'
    ],

    views : [
        'Display'
    ],

    controllers: [
        'Master'
    ]
});