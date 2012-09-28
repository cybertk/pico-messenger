Ext.application({
  name: 'GS',

  requires: [
      'Ext.MessageBox'
  ],

 
  controllers: [
    'Sessions',
    'Compose'
  ],

  views: [
    'Main',
    "Login",

    "Compose",
    
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
