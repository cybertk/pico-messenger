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
        iconMask: true,
        iconCls: 'add'
      },
      { 
        xtype: 'textfield',
        flex: 1,
        text: 'Send',
        placeHolder: 'Text Message',
        // TODO Remove
        id: 'messageField',
      },
      { 
        xtype: 'button',
        text: 'Send',
        disabled: true,
        id: 'sendMessageButton'
      }
    ]
  }
});
