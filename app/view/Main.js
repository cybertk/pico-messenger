Ext.define("GS.view.Main", {
    extend: 'Ext.navigation.View',
    xtype: 'mainpanel',

    requires: [
        'GS.view.SessionList'
    ],
    config: {

        navigationBar: {
          items: [
            {
              xtype: 'button',
              id: 'editSessionsButton',
              text: 'edit',
              align: 'left'
            },
            {
              xtype: 'button',
              id: 'editMessagesButton',
              text: 'edit',
              align: 'right',
              hidden: true
            },
            {
              xtype: 'button',
              id: 'composeButton',
              iconMask: true,
              iconCls: 'compose',
              align: 'right'
            }
          ]
        },

        items: [
          {xtype: 'sessionlist'}
        ]
    }
});
