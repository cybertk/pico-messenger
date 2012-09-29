var BOSH_SERVICE = '/xmpp-httpbind';

Ext.define('GS.controller.Main', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      main: 'main',
      sessionContainer: 'sessioncontainer',
      compose: 'compose',
      login: 'login',
    },

    control: {
      // TODO ondemand register.
      compose: {
        send: 'onComposeSend'
      },
      sessionContainer: {
        send: 'onSessionSend'
      },
      login: {
        authenticated: 'onAuthenticated'
      }
    }
  },

  // current active credential(local side, username/password).
  activeCred: null,

  xmppConnection: undefined,

  onXmppMessage: function(msg) {
    var from = msg.getAttribute('from'),
        //to = msg.getAttribute('to'),
        type = msg.getAttribute('type'),
        elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {

      var text = Strophe.getText(elems[0]),
          peer = from.split('/')[0];

	    console.log('recv from: ' + peer + ' ' + text);

      GS.app.getController('Main')
        .saveMessage({ peer: peer, direction: 'rx', text: text});
    }

    return true;
  },

  initSession: function() {
    this.messageStore.addAfterListener('addrecords',
        this.onMessageStoreAddRecords, this, {delay:200});
    console.log('init');
  },

  switchSession: function(session) {

    var peer = session.get('peer'),
        session_id = session.get('id');

    // TODO: reuse
    //if (!this.session) {
    this.session = Ext.widget('session');
    //}
    //
    this.session.setTitle(peer);
    this.getSessionContainer().push(this.session)

    this.messageStore.filter('session_id', session_id);

    console.log("active session: " + peer);
  },

  saveMessage: function(msg) {

    var me = GS.app.getController('Main'),
        sessionStore = Ext.getStore('Sessions'),
        messageStore = Ext.getStore('SessionMessages'),
        idx = sessionStore.findExact('peer', msg.peer.toLowerCase()),
        session, session_id;

    if (idx == -1) {

      session = sessionStore.add({ peer: msg.peer.toLowerCase()})[0];
      console.log("Create new seesion ");
      sessionStore.sync();
    } else {
      session = sessionStore.getAt(idx);
    }

    session_id = session.get('id');

    // Update message.
    msg.session_id = session_id;
    msg.time = new Date();

    // TODO validate message.

    console.log(me);
    messageStore.add(msg);
    messageStore.sync();

    return session;
  },

  redirectToSession: function(session) {

    this.getSessionContainer().pop();
    this.getMain().setActiveItem(0);
    this.switchSession(session);
  },

  sendXmppMessage: function(peer, text) {

    console.log('send to ' + peer + ': ' + text);

    var msg = $msg({
      from: this.xmppConnection.jid,
      to: peer
      })
      .cnode(Strophe.xmlElement('body'))
      .t(text);

    this.xmppConnection.send(msg.tree());
  },

  onAuthenticated: function(conn) {
    var me = this,
        viewport = Ext.Viewport;

    me.xmppConnection = conn;
	  me.xmppConnection.addHandler(me.onXmppMessage, null, 'message', null, null,  null); 

    // Remove login FormPanel, and activate TabPanel.
    viewport.setMasked(false);
    viewport.removeAll(true, false);
    viewport.setActiveItem({ xtype: 'main' });
  },

  onSessionSend: function(msg) {

    // Update Message.
    msg.direction = 'tx';
    this.saveMessage(msg);
    this.sendXmppMessage(msg.peer, msg.text);
  },

  onComposeSend: function(msg) {
    console.log('recv' + msg);

    // Update Message.
    msg.direction = 'tx';

    session = this.saveMessage(msg);
    this.sendXmppMessage(msg.peer, msg.text);

    this.redirectToSession(session);
  }
});
