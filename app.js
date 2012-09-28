Ext.application({
  name: 'GS',

  requires: [
      'Ext.MessageBox'
  ],

 
  controllers: ['Sessions'],
  views: [
    'Main',
    "Login",
    
    "session.Card",
    "session.List"
  ],

  stores: ['Sessions', 'SessionMessages'],
  models: ['Message', 'Session'],

  launch: function() {

    Ext.Viewport.add({
      xtype: 'login',
    });
  }
});
