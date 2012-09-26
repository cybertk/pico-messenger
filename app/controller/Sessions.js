// Implement as class static member, active().
var currentSession = null;

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
      sendComposeMessageButton: 'sessioncompose #sendMessageButton'
    },

    control: {
      main: {
        push: 'onMainPush',
        pop: 'onMainPop',
        initialize: 'init'
      },

      sessions: {
        initialize: 'initSessions',
        itemtap: 'onSessionTap'
      },
      session: {
        initialize: 'initSession',
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

      currentSession: undefined,
      activeNavItem: undefined
    }
  },

  init: function() {

    console.log("rolling in the deep");
    // TODO find somewhere better to carry init xmpp code.
    // XMPP Auth and listening.
    xmpp_init(this.onXmppMessage);
  },

  onMainPush: function(view, item) {

    this.updateNavBar();
  },

  onMainPop: function(view, item) {

    if (item.xtype == 'session') {

      // Reset Session.
      this.currentSession = undefined;
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
  },
  
  onXmppMessage: function(msg) {
    var to = msg.getAttribute('to');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
    var elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {

      var text = Strophe.getText(elems[0]);

	    log('recv from: ' + from + ' ' + text);

      var msg = {
        direction: 'rx',
        time: Date.now(),
        text: text
      };

      var controller = GS.app.getController('Sessions');

      controller.messageStore.add(msg);
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

  onMessageListRefresh: function() {
    console.log('aa');
  },

  // Show session detail and load the messages.
  onSessionTap: function(list, idx, el, record) {

    // Update current session.
    this.currentSession = record;

    // TODO: reuse
    //if (!this.session) {
    this.session = Ext.widget('session');
    //}

    var peer = record.get('peer');

    this.session.setTitle(peer);
    this.getMain().push(this.session)

    this.messageStore.removeAll();

    // Setup filter.
    this.messageStore.clearFilter();
    this.messageStore.filter([
      {
        property: 'session_id',
        value: record.get('id')
      }
    ]);

    this.messageStore.load({
      callback: this.onSessionMessagesStoreLoad,
      scope: this,
    });
  },

  // The SessionMessage is loaded. show them.
  onSessionMessagesStoreLoad: function(records, operation, success) {

    console.log("messagestore: " + records.length + ' loaded');

    if (records.length == 0) {
      return;
    }

    var messageStore = Ext.getStore('SessionMessages');
    console.log(messageStore);

    //this.getMessageList().setStore(this.messageStore);

  },

  onSendSessionMessageButtonTap: function(btn) {

    var messageField = this.getSessionMessageField(),
        text = messageField.getValue();

    var msg = {
      direction: 'tx',
      time: Date.now(),
      text: text
    };

    this.messageStore.add(msg);
    this.messageStore.sync();

    this.sendXmppMessage(this.currentSession.get('peer'), msg.text);

    // TODO: POST to REST API.
    //this.messageStore.sync();

    // Reset if success.
    messageField.reset();

    console.log(this.messageStore);
  },

  onSendComposeMessageButtonTap: function(btn) {

    var text = btn.getParent().child('#messageField').getValue();
    
    var peer = this.getComposePeerField().getValue();

    var msg = {
      direction: 'tx',
      time: Date.now(),
      text: text
    };

    this.messageStore.add(msg);
    this.sendXmppMessage(peer, text);

    // Add session.
    var sessionStore = Ext.getStore('Sessions');

    var idx = sessionStore.findExact('peer', peer);
    if (idx == -1) {

      sessionStore.add({ peer: peer});
      console.log("Create new seesion ");
    }
    sessionStore.sync();

    this.redirectToSession(peer);
  },

  redirectToSession: function(peer) {

    this.session = Ext.widget('session');
    //}

    this.session.setTitle(peer);
    this.getMain().pop();
    this.getMain().push(this.session)

    this.messageStore.removeAll();

    // Setup filter.
    /*
    this.messageStore.clearFilter();
    this.messageStore.filter([
      {
        property: 'session_id',
        // TODO
        value: 1
      }
    ]);
    */

    this.messageStore.load({
      callback: this.onSessionMessagesStoreLoad,
      scope: this,
    });
  },

  sendXmppMessage: function(peer, text) {

    console.log('send to ' + peer + ': ' + text);

    var msg = $msg({
      from: __JID,
      to: peer
      })
      .cnode(Strophe.xmlElement('body'))
      .t(text);

    connection.send(msg.tree());
  },

  // Compose new message.
  onComposeButtonTap: function() {
    
    this.compose = Ext.widget('sessioncompose');

    this.getMain().push(this.compose);
  }
});
