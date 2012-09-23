// Implement as class static member, active().
var currentSession = null;

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

    currentSession = session;
  },

  sendMessage: function() {

    var message = Ext.ComponentQuery.query('#message')[0].getValue(); 
    var body = Strophe.xmlElement('body');
    var msg = $msg({from: 'web@ejabberd.local', to: 'alice@ejabberd.local'}).cnode(body).t(message);

    connection.send(msg.tree());

    console.log(currentSession.get('messages'));

    var Session = Ext.ModelMgr.getModel('GS.model.Session');
    var session = currentSession;

    session.messages().add({
      direction: 'dir-send',
      time: Date.now(),
      text: message
    });

    session.messages().sync();

    console.log(currentSession.get('messages'));
    console.log(currentSession.getData());
  }

});
