Ext.define('Session', {
  extend: 'Ext.data.Model',

  config: {
    fields: ['id', 'peer'],
    
    hasMany: 'Message'
  }

});
