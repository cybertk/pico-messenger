Ext.application({
  name: 'GS',

  requires: [
      'Ext.MessageBox'
  ],

 
  controllers: ['Sessions'],
  views: ['Main'],
  stores: ['Sessions', 'SessionMessages'],
  models: ['Message', 'Session'],

  launch: function() {

    // XMPP Auth and listening.
    xmpp_init();

    Ext.Viewport.add({
      xtype: 'mainpanel'
    });
  }
});
