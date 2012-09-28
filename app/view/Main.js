Ext.define("GS.view.Main", {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    config: {

      tabBarPosition: 'bottom',

      items: [
        { xclass: 'GS.view.session.Card' },
        { xclass: 'GS.view.Compose' }
      ],
    }
});
