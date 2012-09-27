Ext.define('GS.view.session.MessageList', {
  extend: 'Ext.List',
  xtype: 'messagelist',

  requires: [
    'GS.store.SessionMessages'
  ],

  config: {
    title: 'Session List',
    itemTpl: '<div class="{direction}"><div class="message-text">{text}</div><div class="time">{time:date("g:ia")}</div></div>',
    store: 'SessionMessages',
  }
});
