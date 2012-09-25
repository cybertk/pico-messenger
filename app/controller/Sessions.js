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

      currentSession: undefined
    }
  },

  onMainPush: function(view, item) {

    var editSessionsButton = this.getEditSessionsButton();
    var editMessagesButton = this.getEditMessagesButton();
    var composeButton = this.getComposeButton();

    console.log('push ' + item.xtype);
    if (item.xtype == 'session') {

      composeButton.hide();
      editSessionsButton.hide();
      editMessagesButton.show();
    } else if (item.xtype == 'sessioncompose') {

      composeButton.hide();
      editSessionsButton.hide();
    }
  },

  onMainPop: function(view, item) {

    var editSessionsButton = this.getEditSessionsButton();
    var editMessagesButton = this.getEditMessagesButton();
    var composeButton = this.getComposeButton();

    console.log('pop ' + item.xtype);
    if (item.xtype == 'session') {

      // Reset Session.
      this.currentSession = undefined;

      // Reverse operation of onMainPush
      editMessagesButton.hide();
      editSessionsButton.show();
      composeButton.show();
    } else if (item.xtype == 'sessioncompose') {

      composeButton.show();
      editSessionsButton.show();
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

  onSendSessionMessageButtonTap: function() {

    var messageField = Ext.ComponentQuery.query('#message')[0];
    var message = messageField.getValue(); 

    var msg = {
      direction: 'tx',
      time: Date.now(),
      text: message
    };

    this.messageStore.add(msg);

    this.sendXmppMessage(this.currentSession.get('peer'), msg.text);

    // TODO: POST to REST API.
    //this.messageStore.sync();

    // Reset if success.
    messageField.reset();

    console.log(this.messageStore);
  },

  onSendComposeMessageButtonTap: function() {
    this.sendXmppMessage('alice@ejabberd.local', 'a');
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
