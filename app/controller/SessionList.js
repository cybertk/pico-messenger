Ext.define('GS.controller.SessionList', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      main: 'mainpanel'
    },

    control: {
      'sessionlist': {
        itemtap: 'showSessionDetail'
      }
    }
  },

  showSessionDetail: function(list, index, target, session) {
    this.getMain().push({
      xtype: 'sessiondetail',
      title: session.get('peer'),
      data: session.getData()
    });
  }
});
