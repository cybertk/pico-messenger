// Implement as class static member, active().
var currentSession = null;

Ext.define('GS.controller.Sessions', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      main: 'mainpanel',
      sessions: "sessionlist",
      session: 'session',
      messageList: "session sessionDetail",
      sessionSend: "sessionSend",
      sendButton: 'button[id=SendMessage]',
    },

    control: {
      sessions: {
        initialize: 'initSessions',
        itemtap: 'onSessionTap'
      },
      session: {
        initialize: 'initSession',
      },
      'button[id=SendMessage]': {
        tap: 'sendMessage'
      }
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

  sendMessage: function() {

    var message = Ext.ComponentQuery.query('#message')[0].getValue(); 
    var body = Strophe.xmlElement('body');
    var msg = $msg({from: 'web@ejabberd.local', to: 'alice@ejabberd.local'}).cnode(body).t(message);

    connection.send(msg.tree());

    this.messageStore.add({
      direction: 'dir-send',
      time: Date.now(),
      text: message
    });

    // TODO: POST to REST API.
    //this.messageStore.sync();

    console.log(this.messageStore);
  }

});
