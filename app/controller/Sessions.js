Ext.define('GS.controller.Sessions', {
  extend: 'Ext.app.Controller',

  config: {
    refs: {
      sessionContainer: 'sessioncontainer',
      sessionList: "sessionlist",
      session: 'session',
      messageList: "session messagelist",
      sendButton: 'session #sendMessageButton',
      messageField: "session #messageField",
    },

    control: {
      sessionlist: {
        initialize: 'initSessions',
        itemtap: 'onSessionTap'
      },
      session: {
        initialize: 'initSession',
      },
      messageField: {
        keyup: "onMessageFieldChange"
      },
      sendButton: {
        tap: 'onSendButtonTap'
      },
    }
  },

  activePeer: '',

  initSessions: function() {
    this.messageStore = Ext.getStore('SessionMessages');
    this.messageStore.load({
      callback: this.onSessionMessagesStoreLoad,
      scope: this,
    });
  },
  
  initSession: function() {
    this.messageStore.addAfterListener('addrecords',
        this.onMessageStoreAddRecords, this, {delay:200});
    console.log('init');
  },

  // Show session detail and load the messages.
  onSessionTap: function(list, idx, el, record) {

    this.switchSession(record);
  },

  // The SessionMessage is loaded. show them.
  onSessionMessagesStoreLoad: function(records, operation, success) {

    console.log("messagestore: " + records.length + ' loaded');

    if (records.length == 0) {
      return;
    }
  },

  onSendButtonTap: function(btn) {

    var messageField = this.getMessageField(),
        sendButton = this.getSendButton(),
        sessionContainer = this.getSessionContainer(),
        text = messageField.getValue(),
        msg;

    // Reset.
    messageField.reset();
    sendButton.disable(); 

    msg = { peer: this.activePeer, text: text };

    sessionContainer.fireEvent('send', msg);
  },

  redirectToSession: function(session) {

    this.getSessionContainer().pop();
    this.getMain().setActiveItem(0);
    this.switchSession(session);
  },

  onMessageFieldChange: function(field) {

    var text = field.getValue(),
        button = this.getSendButton();

    if (text != '' && this.activePeer != '') {
      button.enable();
    } else {
      button.disable();
    }
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
    this.getSessionContainer().push(this.session)

    this.messageStore.filter('session_id', session_id);

    console.log("active session: " + peer);
  },


});
