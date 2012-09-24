Ext.define('GS.view.session.SendBar', {
  extend: 'Ext.Toolbar',
  xtype: 'messagesendbar',

  config: {

    layout: {
      type: 'hbox',
      align: 'center'
    },

    scrollable: false,

    items: [
      {
        xtype: 'button',
        text: 'avatar'
      },
      { 
        xtype: 'textfield',
        flex: 1,
        text: 'Send',
        placeHolder: 'Text Message',
        // TODO Remove
        id: 'message',
      },
      { 
        xtype: 'button',
        text: 'Send',
        // TODO Remove
        id: 'SendMessage'
      }
    ]
  }
});
