Ext.define('GS.view.session.List', {
  extend: 'Ext.List',
  xtype: 'sessionlist',

  requires: [
    'GS.store.Sessions',
    'GS.view.session.Detail',
  ],

  config: {
    title: 'Session List',
    itemTpl: '{peer}',
    store: 'Sessions',
  }
});
