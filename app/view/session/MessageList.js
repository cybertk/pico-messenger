Ext.define('GS.view.session.MessageList', {
  extend: 'Ext.List',
  xtype: 'messagelist',

  requires: [
    'GS.store.SessionMessages'
  ],

  config: {
    title: 'Session List',
    itemTpl: '<div class="{direction}">{text}</div>',
    store: 'SessionMessages',
  }
});
