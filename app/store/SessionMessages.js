Ext.define('GS.store.SessionMessages', {
  extend: 'Ext.data.Store',

  config: {
    model: 'GS.model.Message',

    proxy: {
      type: 'ajax',
      url: 'test/messages.json',
      reader: {
        type: 'json'
      }
    }
  }
});
