Ext.define('GS.store.Session', {
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
