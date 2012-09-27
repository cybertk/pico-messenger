Ext.define('GS.model.Session', {
  extend: 'Ext.data.Model',

  requires: [
    'Ext.data.identifier.Uuid'
  ],

  config: {
    identifier: 'uuid',

    fields: ['id', 'peer'],
    
    hasMany: {
      model: 'GS.model.Message',
      name: 'messages'
    }
  }

});
