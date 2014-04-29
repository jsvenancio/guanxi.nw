Ext.define('Guanxi.controller.Master', {
    extend: 'Ext.app.Controller',

    init : function() {
        this.application.getController('Setup');
    }
});