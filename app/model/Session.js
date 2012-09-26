Ext.define('GS.model.Session', {
  extend: 'Ext.data.Model',

  config: {
    identifier: 'uuid',

    fields: ['id', 'peer'],
    
    hasMany: {
      model: 'GS.model.Message',
      name: 'messages'
    }
  }

});
