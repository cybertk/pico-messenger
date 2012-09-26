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
      editMessagesButton: '#editMessagesButton',
      editSessionsButton: '#editSessionsButton',
      composeButton: '#composeButton',
      composePeerField: "sessioncompose #peerField",
      sendComposeMessageButton: 'sessioncompose #sendMessageButton'
    },

    control: {
      main: {
        push: 'onMainPush',
        pop: 'onMainPop'
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

    var messageStore = records[0].stores[0];

    this.getMessageList().setStore(messageStore);

  },

  onSendSessionMessageButtonTap: function(btn) {

    var text = btn.getParent().child('#messageField').getValue();

    var msg = {
      direction: 'tx',
      time: Date.now(),
      text: text
    };

    this.messageStore.add(msg);

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
    this.messageStore.clearFilter();
    this.messageStore.filter([
      {
        property: 'session_id',
        // TODO
        value: 1
      }
    ]);

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
