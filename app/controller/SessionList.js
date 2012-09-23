Ext.define('GS.controller.SessionList', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      main: 'mainpanel',
      session: 'session',
      sessionSend: "sessionSend",
      sendButton: 'button[id=SendMessage]',
    },

    control: {
      'sessionlist': {
        itemtap: 'showSessionDetail'
      },
      'button[id=SendMessage]': {
        tap: 'sendMessage'
      }
    }
  },

  showSessionDetail: function(list, index, target, session) {
    this.getMain().push({
      xtype: 'session',
      title: session.get('peer'),
      data: session.getData()
    });
  },

  sendMessage: function() {

    var message = Ext.ComponentQuery.query('#message')[0].getValue(); 
    console.log(message);
  }

});
