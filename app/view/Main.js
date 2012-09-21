Ext.define("GS.view.Main", {
    extend: 'Ext.navigation.View',
    xtype: 'mainpanel',

    requires: [
        'GS.view.SessionList'
    ],
    config: {
        items: [
          {xtype: 'sessionlist'}
        ]
    }
});
