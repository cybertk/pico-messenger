Ext.define("GS.view.Main", {
    extend: 'Ext.navigation.View',
    xtype: 'mainpanel',

    requires: [
        'GS.view.SessionList',
        'GS.view.SessionDetail'
    ],
    config: {
        items: [
          {xtype: 'sessionlist'}
        ]
    }
});
