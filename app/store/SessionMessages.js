Ext.define('GS.store.SessionMessages', {
  extend: 'Ext.data.Store',

  requires: [
    'Ext.data.proxy.LocalStorage',
  ],

  config: {
    model: 'GS.model.Message',

    /*
    remoteFilter: true,

    proxy: {
      type: 'ajax',
      url: 'test/messages.json',
      reader: {
        type: 'json'
      }
    }
    */

    proxy: {
      type: 'localstorage',
      id: 'session-messages'
    }
  }
});
