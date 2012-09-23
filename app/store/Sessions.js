Ext.define('GS.store.Sessions', {
  extend: 'Ext.data.Store',

  config: {
    model: "GS.model.Session",

    proxy: {
      type: 'ajax',
      url: 'test/sessions.json',
      reader: {
        type: 'json'
      }
    },

    autoLoad: true
  }
});
