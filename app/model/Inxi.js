/**
 * Created with IntelliJ IDEA.
 * User: Scott
 * Date: 4/13/14
 * Time: 11:15 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Guanxi.model.Inxi', {
    extend : 'Ext.data.Model',

    fields : [
        {
            name : 'section',
            type : 'string',
            mapping : 'id'
        },{
            name : 'description',
            type : 'string',
            mapping : 'text'
        }
    ]
});