Ext.define('GS.store.Session', {
  extend: 'Ext.data.Store',

  config: {
    model: "GS.model.Session",

    data: [
      { id:1, peer: "caoxx"},
      { id:2, peer: "xxcao"}
    ]
  }
});
