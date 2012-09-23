Ext.define('GS.view.SessionList', {
  extend: 'Ext.List',
  xtype: 'sessionlist',
  requires: [
    'GS.store.Sessions',
    'GS.view.Session',
  ],

  config: {
    title: 'Session List',
    itemTpl: '{id}, {peer}',
    store: 'Sessions',
  }
});
