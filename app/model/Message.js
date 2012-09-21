Ext.define('GS.model.Message', {
  extend: 'Ext.data.Model',

  config: {
    fields: ['id', 'session_id', 'direction', 'time', 'text'],

    belongsTo: 'Session'
  }
});
