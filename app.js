Ext.application({
  name: 'GS',

  requires: [
      'Ext.MessageBox'
  ],

 
  controllers: ['SessionList'],
  views: ['Main'],
  stores: ['Message', 'Session'],
  models: ['Message', 'Session'],

  launch: function() {

    Ext.Viewport.add({
      xtype: 'mainpanel'
    });
  }
});
