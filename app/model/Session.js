Ext.define('GS.model.Session', {
  extend: 'Ext.data.Model',

  config: {
    fields: ['id', 'peer'],
    
    hasMany: {
      model: 'GS.model.Message',
      name: 'messages'
    }
  }

});
