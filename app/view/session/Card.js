Ext.define("GS.view.session.Card", {
    extend: 'Ext.navigation.View',
    xtype: 'sessioncontainer',

    config: {

      title: 'Sessions',

      /*
      navigationBar: {
        items: [
          {
            xtype: 'button',
            text: 'Edit',
            id: 'editButton'
          }
        ]
      },
      */

      items: [
        {xtype: 'sessionlist'}
      ]
    }
});
