Ext.define('GS.view.session.Detail', {
  extend: 'Ext.List',
  xtype: 'sessionDetail',
  requires: ['GS.store.Message'],

  config: {
    title: 'Details',
    itemTpl: '{id}, {direction}, {text}',
  }
});
