var BOSH_SERVICE = '/xmpp-httpbind';

Ext.define('GS.controller.Sessions', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      main: 'mainpanel',
      sessions: "sessionlist",
      session: 'session',
      messageList: "session messagelist",
      sendSessionMessageButton: 'session #sendMessageButton',
      sessionMessageField: "session #messageField",
      editMessagesButton: '#editMessagesButton',
      editSessionsButton: '#editSessionsButton',
      composeButton: '#composeButton',
      composePeerField: "sessioncompose #peerField",
      composeMessageField: "sessioncompose #messageField",
      sendComposeMessageButton: 'sessioncompose #sendMessageButton',
      login: 'login',
      loginButton: 'login #loginButton',
      registerButton: 'login #registerButton'
    },

    control: {
      main: {
        push: 'onMainPush',
        pop: 'onMainPop',
      },

      sessions: {
        initialize: 'initSessions',
        itemtap: 'onSessionTap'
      },
      session: {
        initialize: 'initSession',
      },
      sessionMessageField: {
        keyup: "onMessageFieldChange"
      },
      composeMessageField: {
        keyup: "onMessageFieldChange"
      },
      composePeerField: {
        keyup: "onPeerFieldChange"
      },
      sendMessageButton: {
        tap: 'onSendMessageButtonTap'
      },
      sendSessionMessageButton: {
        tap: 'onSendSessionMessageButtonTap'
      },
      sendComposeMessageButton: {
        tap: 'onSendComposeMessageButtonTap'
      },
      composeButton: {
        tap: 'onComposeButtonTap'
      },
      loginButton: {
        tap: 'onLoginButtonTap'
      }
    }
  },

  // Peer of current active session.
  activePeer: '',
  activeNavItem: undefined,

  xmppConnection: undefined,

  // @overide
  init: function() {

    // TODO find somewhere better to carry init xmpp code.
    // XMPP Auth and listening.
    //this.xmppConnection = new Strophe.Connection(BOSH_SERVICE);

    //this.xmppConnection.connect(__JID, __PASSWORD, this.onXmppConnect);
  },

  onMainPush: function(view, item) {

    this.updateNavBar();
  },

  onMainPop: function(view, item) {

    if (item.xtype == 'session') {

      // Reset active peer.
      this.activePeer = '';
    }

    this.updateNavBar();
  },

  // Update navigation bar accroding to currentView.
  updateNavBar: function() {

    var x = this.getMain().getActiveItem().xtype,
        editSessionsButton = this.getEditSessionsButton(),
        editMessagesButton = this.getEditMessagesButton(),
        composeButton = this.getComposeButton();

    if (x == this.activeNavItem)
      return;

    // Update activeNavItem.
    this.activeNavItem = x;

    console.log('nav: ' + x);

    if (x == "sessionlist") {

      editMessagesButton.hide();
      editSessionsButton.show();
      composeButton.show();

    } else if (x == "sessioncompose") {

      editMessagesButton.hide();
      editSessionsButton.hide();
      composeButton.hide();
    } else if (x == "session") {

      editMessagesButton.show();
      editSessionsButton.hide();
      composeButton.hide();
    }
  },

  initSessions: function() {
    this.messageStore = Ext.getStore('SessionMessages');
    this.messageStore.load({
      callback: this.onSessionMessagesStoreLoad,
      scope: this,
    });
  },
  
  onXmppMessage: function(msg) {
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {

      var text = Strophe.getText(elems[0]),
          peer = from.split('/')[0];

	    console.log('recv from: ' + peer + ' ' + text);

      GS.app.getController('Sessions')
        .saveMessage({ peer: peer, direction: 'rx', text: text});
    }

    return true;
  },

  initSession: function() {
    this.messageStore.addAfterListener('addrecords',
        this.onMessageStoreAddRecords, this, {delay:200});
    console.log('init');
  },

  onMessageStoreAddRecords: function() {
    console.log('onadd');

    // Scroll to bottom.
    var scroller = this.getMessageList().getScrollable().getScroller();
    
    scroller.scrollToEnd();
  },

  switchSession: function(session) {

    var peer = session.get('peer'),
        session_id = session.get('id');

    // Update active session.
    this.activePeer = peer;

    // TODO: reuse
    //if (!this.session) {
    this.session = Ext.widget('session');
    //}
    //
    this.session.setTitle(peer);
    this.getMain().push(this.session)

    this.messageStore.filter('session_id', session_id);

    console.log("active session: " + peer);
  },

  // Show session detail and load the messages.
  onSessionTap: function(list, idx, el, record) {

    if (this.sessionTaped) return;
    this.seesionTaped = true;
    this.switchSession(record);
  },

  // The SessionMessage is loaded. show them.
  onSessionMessagesStoreLoad: function(records, operation, success) {

    console.log("messagestore: " + records.length + ' loaded');

    if (records.length == 0) {
      return;
    }
  },

  saveMessage: function(msg) {

    var sessionStore = Ext.getStore('Sessions'),
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

    this.messageStore.add(msg);
    this.messageStore.sync();

    return session;
  },

  onSendSessionMessageButtonTap: function(btn) {

    var messageField = this.getSessionMessageField(),
        sendButton = this.getSendSessionMessageButton(),
        peer = this.activePeer,
        text = messageField.getValue();

    this.saveMessage({ peer: peer, direction: 'tx', text: text});
    this.sendXmppMessage(peer, text);

    // Reset if success.
    messageField.reset();
    sendButton.disable(); 
  },

  onSendComposeMessageButtonTap: function(btn) {

    var text = btn.getParent().child('#messageField').getValue(),
        peer = this.getComposePeerField().getValue(),
        msg, session;

    msg = {
      peer: peer,
      direction: 'tx',
      text: text
    };

    session = this.saveMessage(msg);
    this.sendXmppMessage(peer, text);

    this.redirectToSession(session);
  },

  redirectToSession: function(session) {

    this.getMain().pop();

    this.switchSession(session);
  },

  sendXmppMessage: function(peer, text) {

    console.log('send to ' + peer + ': ' + text);

    var msg = $msg({
      from: __JID,
      to: peer
      })
      .cnode(Strophe.xmlElement('body'))
      .t(text);

    this.xmppConnection.send(msg.tree());
  },

  // Compose new message.
  onComposeButtonTap: function() {
    
    this.compose = Ext.widget('sessioncompose');

    this.getMain().push(this.compose);
  },
  
  onMessageFieldChange: function(field) {

    var text = field.getValue(),
        button = field.getParent().child('#sendMessageButton');

    if (text != '' && this.activePeer != '') {
      button.enable();
    } else {
      button.disable();
    }
  },

  onPeerFieldChange: function(field) {

    var messageField = this.getComposeMessageField();

    this.activePeer = field.getValue();

    // Trigger message field validation.
    messageField.fireEvent('keyup', messageField);
  },

  onXmppConnect: function(status) {

    if (status == Strophe.Status.CONNECTING) {
      console.log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
      console.log('Strophe failed to connect.');
    } else if (status == Strophe.Status.DISCONNECTING) {
	    console.log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
      console.log('Strophe is disconnected.');
    } else if (status == Strophe.Status.CONNECTED) {

      var me = GS.app.getController('Sessions');

      console.log('Strophe is connected.');

	    me.xmppConnection.send($pres().tree());
	    me.xmppConnection.addHandler(me.onXmppMessage, null, 'message', null, null,  null); 
    }
  },

  onLoginButtonTap: function(btn) {

    var login = this.getLogin(),
        cred = login.getValues();
    console.log(cred);

    if (cred.username != '' && cred.password != '') {

      // Disable UI to prevent interaction with users.
      login.setMasked({xtype: 'loadmask', message: 'Logging in...'});
      this.xmppConnection = new Strophe.Connection(BOSH_SERVICE);
      this.xmppConnection.connect(cred.username, cred.password,
          this.onXmppConnect);
    }
  }
});
