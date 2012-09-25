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
      sendMessageButton: '#sendMessageButton',
      editMessagesButton: '#editMessagesButton',
      editSessionsButton: '#editSessionsButton',
      composeButton: '#composeButton'
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
      sendMessageButton: {
        tap: 'onSendMessageButtonTap'
      },
      composeButton: {
        tap: 'onComposeButtonTap'
      }
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

    // TODO: reuse
    //if (!this.session) {
    this.session = Ext.widget('session');
    //}

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

  onSendMessageButtonTap: function() {

    var messageField = Ext.ComponentQuery.query('#message')[0];
    var message = messageField.getValue(); 
    var body = Strophe.xmlElement('body');
    var msg = $msg({from: 'web@ejabberd.local', to: 'alice@ejabberd.local'}).cnode(body).t(message);

    connection.send(msg.tree());

    this.messageStore.add({
      direction: 'tx',
      time: Date.now(),
      text: message
    });

    // TODO: POST to REST API.
    //this.messageStore.sync();

    // Reset if success.
    messageField.reset();

    console.log(this.messageStore);
  },

  // Compose new message.
  onComposeButtonTap: function() {
    
    this.compose = Ext.widget('sessioncompose');

    this.getMain().push(this.compose);
  }
});
