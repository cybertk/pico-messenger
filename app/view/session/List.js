Ext.define('GS.view.session.List', {
  extend: 'Ext.List',
  xtype: 'sessionlist',

  requires: [
    'GS.store.Sessions',
    'GS.view.session.Detail',
  ],

  config: {
    title: 'Session List',
    store: 'Sessions',

    itemCls: 'session',
    itemTpl: [
      '<div class="avatar" stype="background-image: url(avatar.jpeg);"></div>',
      '<h3>{peer}</h3>',
      '<h4>{text}</h4>'
    ]
  },

});
