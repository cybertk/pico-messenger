Ext.define('GS.view.Compose', {
  extend: 'Ext.Panel',
  xtype: 'sessioncompose',

  requires: [
    'GS.view.session.SendBar',
  ],

  config: {
    title: 'New Message',

    layout: 'vbox',
    scrollable: false,

    items: [
      {
        xtype: 'textfield',
        label: 'To:',
        labelWidth: 50,
        placeHolder: "Your friend's Jabber ID"
      },
      {
        xtype: 'panel',
        flex: 1
      },
      {
        xtype: 'messagesendbar'
      }
    ]
  }
});
