Ext.define('GS.store.Message', {
  extend: 'Ext.data.Store',

  config: {
    model: 'GS.model.Message',

    proxy: {
      type: 'ajax',
      url: 'test/messages.json',
      reader: {
        type: 'json'
      }
    },

    autoLoad: true
  }
});
