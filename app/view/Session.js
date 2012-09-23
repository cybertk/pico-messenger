Ext.define('GS.view.Session', {
  extend: 'Ext.Panel',
  xtype: 'session',
  requires: [
    'GS.view.session.Detail',
    'GS.view.session.Send'
  ],

  config: {

    layout: {
      type: 'vbox',
      align: 'stretch'
    },

    items: [
      { 
        xtype: 'sessionDetail',
        flex: 1
      },
      { xtype: 'sessionSend' }
    ]
  }
});
