Ext.define('GS.controller.SessionList', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      main: 'mainpanel'
    },

    control: {
      'sessionlist': {
        disclose: 'showSessionDetail'
      }
    }
  },

  showSessionDetail: function(list, session) {
    this.getMain().push({
      xtype: 'sessiondetail',
      title: session.get('peer'),
      data: session.getData()
    });
  }
});
