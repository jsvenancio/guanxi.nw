Ext.Loader.setConfig({enabled:true});

Ext.app.Application({
    name: 'Guanxi',

    autoCreateViewport: true,

    models: [
        'InxiModel'
    ],

    stores: [
        'InxiStore'
    ],

    views : [
        'DisplayView'
    ],

    controllers: [
        'Master'
    ]
});