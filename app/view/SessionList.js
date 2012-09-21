Ext.define('GS.view.SessionList', {
  extend: 'Ext.List',
  xtype: 'sessionlist',
  requires: ['GS.store.Session'],

  config: {
    title: 'Session List',
    itemTpl: '{id}, {peer}',
    store: 'Session',
  }
});
