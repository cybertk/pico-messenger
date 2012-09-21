Ext.define('GS.view.SessionDetail', {
  extend: 'Ext.List',
  xtype: 'sessiondetail',
  requires: ['GS.store.Message'],

  config: {
    title: 'Details',
    itemTpl: '{id}, {direction}, {text}',
    store: 'Message',
  }
});
