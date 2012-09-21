Ext.application({
  name: 'GS',

  requires: [
      'Ext.MessageBox'
  ],

  views: ['Main'],
  stores: ['Message', 'Session'],
  models: ['Message', 'Session'],

  launch: function() {

    Ext.Viewport.add({
      xtype: 'mainpanel'
    });
  }
});
