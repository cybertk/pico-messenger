Ext.define('GS.model.Message', {
  extend: 'Ext.data.Model',

  config: {
    identifier: 'uuid',

    fields: ['id', 'session_id', 'direction', 'time', 'text'],

    belongsTo: 'GS.model.Session'
  }
});
