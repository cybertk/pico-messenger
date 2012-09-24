Ext.define('GS.view.session.Detail', {
  extend: 'Ext.Panel',
  xtype: 'session',

  requires: [
    "GS.view.session.MessageList",
    "GS.view.session.SendBar"
  ],

  config: {

    layout: 'vbox',

    scrollable: false,

    title: 'Session',

    items: [
      {
        xtype: 'messagelist',
        flex: 1
      },
      {
        xtype: 'messagesendbar',
      }
    ]
  }
});
