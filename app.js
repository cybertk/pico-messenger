Ext.application({
  name: 'GS',

  requires: [
      'Ext.MessageBox'
  ],

 
  controllers: ['Sessions'],
  views: [
    'Main',
    "GS.view.Login"
  ],
  stores: ['Sessions', 'SessionMessages'],
  models: ['Message', 'Session'],

  launch: function() {

    Ext.Viewport.add({
      xtype: 'mainpanel'
    });
  }
});
