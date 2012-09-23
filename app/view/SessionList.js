Ext.define('GS.view.SessionList', {
  extend: 'Ext.List',
  xtype: 'sessionlist',
  requires: [
    'GS.store.Session',
    'GS.view.Session',
  ],

  config: {
    title: 'Session List',
    itemTpl: '{id}, {peer}',
    store: 'Session',
  }
});
