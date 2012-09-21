Ext.define('GS.view.SessionDetail', {
  extend: 'Ext.Panel',
  xtype: 'sessiondetail',
  requires: ['GS.store.Session'],

  config: {
    title: 'Details',
    scrollable: 'vertical',
    tpl: [
      'Hello {peer}'
    ]
  }
});
