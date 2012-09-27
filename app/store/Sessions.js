Ext.define('GS.store.Sessions', {
  extend: 'Ext.data.Store',

  requires: [
    'Ext.data.proxy.LocalStorage',
  ],

  config: {
    model: "GS.model.Session",

    proxy: {
      type: 'localstorage',
      id: 'sessions'
    },

    autoLoad: true
  }
});
